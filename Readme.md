# Psychologist System

Демонстрационный одностраничный сайт психолога на React и TypeScript.

Проект сделан как полноценный frontend-кейс: адаптивная вёрстка, контентная модель, доступная навигация, плавные анимации, E2E-тесты, Lighthouse quality gate, Docker-образ и автоматический деплой на VPS.

Решение использовать React было осознанным. Для текущего объёма проекта он не является обязательным, однако позволяет удобно разделить интерфейс на независимые компоненты, вынести контент из представления и без перестройки приложения добавлять интерактивные сценарии, например форму записи, интеграцию с API или дополнительные страницы.

> Важно: имя специалиста, биография, квалификация, цены и условия консультаций в демо-версии вымышлены.

## Demo

[psychologist-system.pet.tnabiullin.tech](https://psychologist-system.pet.tnabiullin.tech)

## Stack

### Frontend

- React 19
- TypeScript
- Vite
- CSS Modules
- `@fontsource`

### Quality

- Playwright
- Lighthouse

## Быстрый старт

### Требования

- Node.js `22.19` или новее
- npm `10` или новее

### Установка и запуск

```bash
npm ci
npm run dev
```

### Production build

```bash
npm run build
npm run preview
```

## Команды

| Команда | Назначение |
| --- | --- |
| `npm run dev` | Запуск dev-сервера Vite |
| `npm run lint` | Статический анализ через Oxlint |
| `npm run build` | Проверка TypeScript и production build |
| `npm run preview` | Локальный просмотр production build |
| `npm run test:e2e` | Smoke E2E-тесты Playwright |
| `npm run test:lighthouse` | Три desktop-прогона Lighthouse |
| `npm run test:quality` | Playwright, затем Lighthouse |

## Проверки качества

Перед первым локальным запуском Playwright установите Chromium:

```bash
npx playwright install chromium
```

Полная локальная проверка:

```bash
npm run lint
npm run test:quality
```

### E2E-сценарии

Smoke suite проверяет:

- открытие главной страницы;
- desktop-навигацию и активный раздел;
- мобильное меню;
- основную CTA-ссылку;
- ссылку на Telegram;

### Lighthouse gate

Lighthouse запускается в desktop-режиме три раза. Для каждой категории используется медианный результат.

Минимальный score:

- Performance: `0.95`
- Accessibility: `0.95`
- Best Practices: `0.95`
- SEO: `0.95`

## Deployment

Подробное описание: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)