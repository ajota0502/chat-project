# Chat Project

Mini módulo de mensajes full-stack con:
- Backend: Hono + TypeScript en Cloudflare Workers.
- Base de datos: Neon Postgres.
- Frontend: Next.js App Router + @tanstack/react-query.

## URLs deployadas
- Frontend: https://frontend-g0nbutkoy-alejandro-madrid-s-projects.vercel.app
- Backend: https://backend.authcodechatbot.workers.dev

## Ejemplo
Abre el chat de prueba en:

- https://frontend-g0nbutkoy-alejandro-madrid-s-projects.vercel.app/chats/1

## Cómo correr local

### Backend
```bash
cd backend
bun install
bunx wrangler dev
```

Necesitas la variable:
- `DATABASE_URL`

### Frontend
```bash
cd frontend
bun install
bun run dev
```

Necesitas la variable:
- `NEXT_PUBLIC_API_URL`

El frontend local debe usar la URL de la API local del backend.

## Variables de entorno
- `DATABASE_URL`: cadena de conexión de Neon para el worker.
- `NEXT_PUBLIC_API_URL`: URL pública de la API en Cloudflare o local.

## Schema de base de datos
El archivo `backend/schema.sql` crea:
- `empresas`
- `chats`
- `mensajes`

También inserta un chat demo con mensajes iniciales.

## Qué hace el proyecto
- `GET /chats/:chatId/mensajes`: lista mensajes ordenados.
- `POST /chats/:chatId/mensajes`: crea mensaje saliente.
- `DELETE /mensajes/:id`: borra mensaje.

La UI muestra los mensajes alineados por dirección y permite enviar/borrar mensajes.
