import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { createConnection } from 'node:net'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import lighthouse from 'lighthouse'
import { chromium } from 'playwright'

const root = path.dirname(fileURLToPath(import.meta.url))
const baseURL = 'http://127.0.0.1:4173/'
const runs = 3
const minScore = 0.8
const categories = ['performance', 'accessibility', 'best-practices', 'seo']
const debugPort = 9222
const outDir = path.join(root, '.lighthouseci')

function waitForPort(port, timeoutMs = 60_000) {
  const started = Date.now()
  return new Promise((resolve, reject) => {
    const tryConnect = () => {
      const socket = createConnection({ host: '127.0.0.1', port }, () => {
        socket.end()
        resolve()
      })
      socket.on('error', () => {
        socket.destroy()
        if (Date.now() - started > timeoutMs) {
          reject(new Error(`Timed out waiting for port ${port}`))
          return
        }
        setTimeout(tryConnect, 250)
      })
    }
    tryConnect()
  })
}

function startPreview() {
  // Spawn Vite directly in its own process group so CI can kill the tree.
  return spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['vite', 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    {
      cwd: root,
      stdio: 'ignore',
      detached: process.platform !== 'win32',
      shell: process.platform === 'win32',
    },
  )
}

function stopPreview(preview) {
  if (!preview?.pid) return

  try {
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', String(preview.pid), '/T', '/F'], {
        stdio: 'ignore',
        shell: true,
      })
      return
    }

    process.kill(-preview.pid, 'SIGKILL')
  } catch {
    try {
      preview.kill('SIGKILL')
    } catch {
      // ignore shutdown races
    }
  }
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid]
}

async function main() {
  mkdirSync(outDir, { recursive: true })

  const preview = startPreview()
  let browser

  try {
    await waitForPort(4173)
    browser = await chromium.launch({
      headless: true,
      args: [
        `--remote-debugging-port=${debugPort}`,
        '--no-sandbox',
        '--disable-dev-shm-usage',
      ],
    })
    await waitForPort(debugPort)

    const scoresByCategory = Object.fromEntries(
      categories.map((name) => [name, []]),
    )

    for (let i = 0; i < runs; i += 1) {
      const result = await lighthouse(baseURL, {
        port: debugPort,
        output: 'json',
        logLevel: 'error',
        preset: 'desktop',
      })

      if (!result?.lhr) {
        throw new Error(`Lighthouse run #${i + 1} returned no result`)
      }

      writeFileSync(
        path.join(outDir, `lhr-${i + 1}.json`),
        JSON.stringify(result.lhr, null, 2),
      )

      for (const name of categories) {
        const score = result.lhr.categories[name]?.score
        if (typeof score !== 'number') {
          throw new Error(`Missing category score: ${name}`)
        }
        scoresByCategory[name].push(score)
      }

      console.log(
        `Run #${i + 1}:`,
        categories
          .map((name) => `${name}=${result.lhr.categories[name].score}`)
          .join(' '),
      )
    }

    const failures = []
    for (const name of categories) {
      const value = median(scoresByCategory[name])
      console.log(`median ${name}: ${value}`)
      if (value < minScore) {
        failures.push(`${name}=${value} (< ${minScore})`)
      }
    }

    if (failures.length > 0) {
      throw new Error(`Lighthouse assertions failed: ${failures.join(', ')}`)
    }

    console.log('Lighthouse assertions passed (>= 0.8)')
  } finally {
    await browser?.close().catch(() => {})
    stopPreview(preview)
  }
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
