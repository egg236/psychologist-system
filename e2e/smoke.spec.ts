import { expect, test } from '@playwright/test'

const TELEGRAM_URL = 'https://t.me/yumyum135'

test.describe('landing smoke', () => {
  test('homepage opens', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Анна Морозова/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('menu works with active emphasizing', async ({ page }) => {
    await page.goto('/')

    const desktopNav = page.getByRole('navigation', {
      name: 'Навигация по разделам',
    })
    const aboutLink = desktopNav.locator('a[href="#about"]')
    await aboutLink.click()
    await expect(page.locator('#about')).toBeInViewport()
    await page.locator('#about').evaluate((el) => {
      el.scrollIntoView({ block: 'start', behavior: 'instant' })
    })
    await expect(aboutLink).toHaveAttribute('aria-current', 'true', {
      timeout: 10_000,
    })

    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    await page.getByRole('button', { name: 'Открыть меню' }).click()
    const mobileNav = page.getByRole('navigation', {
      name: 'Мобильная навигация',
    })
    await expect(mobileNav).toBeVisible()
    await mobileNav.locator('a[href="#price"]').click()
    await expect(page.locator('#price')).toBeInViewport()
    await expect(mobileNav).toBeHidden()
  })

  test('CTA works', async ({ page }) => {
    await page.goto('/')
    const cta = page.getByRole('link', {
      name: 'Обсудить первую встречу',
      exact: true,
    })
    await expect(cta).toHaveAttribute('href', TELEGRAM_URL)
    await expect(cta).toHaveAttribute('target', '_blank')
  })

  test('telegram works', async ({ page }) => {
    await page.goto('/')
    const telegram = page.getByRole('link', {
      name: 'Написать в Telegram',
      exact: true,
    })
    await expect(telegram).toHaveAttribute('href', TELEGRAM_URL)
    await expect(telegram).toHaveAttribute('target', '_blank')
  })
})
