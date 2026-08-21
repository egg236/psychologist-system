## Docker

Сборка образа:

```bash
docker build -t psychologist-system:local .
```

Запуск контейнера:

```bash
docker run --rm -p 8080:80 psychologist-system:local
```

После запуска сайт будет доступен по адресу `http://localhost:8080`.

## Deployment

### Repository secrets

Необходимые GitHub Actions secrets:

- `SSH_HOST`
- `SSH_USER`
- `SSH_PRIVATE_KEY`
- `DEPLOY_PATH`

### Server requirements

На VPS должны быть установлены:

- Docker Engine
- Docker Compose plugin
- Traefik

Пользователь из `SSH_USER` должен иметь право запускать Docker.

Workflow копирует в `DEPLOY_PATH`:

- `compose.yaml`
- `.env.example`

При первом деплое `.env` создаётся из `.env.example`. Последующие деплои не перезаписывают существующий `.env`.

### Environment variables

```dotenv
DOMAIN=psychologist-system.pet.tnabiullin.tech
TRAEFIK_NETWORK=traefik
TRAEFIK_ENTRYPOINT=websecure
TRAEFIK_CERTRESOLVER=letsencrypt
IMAGE=ghcr.io/egg236/psychologist-system:latest
```

Значения `TRAEFIK_NETWORK`, `TRAEFIK_ENTRYPOINT` и `TRAEFIK_CERTRESOLVER` должны соответствовать конфигурации Traefik на VPS.