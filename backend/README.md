```txt
npm install
npm run dev
```

```txt
npm run deploy
```

Para producción, configura el secreto `DATABASE_URL` en Cloudflare Workers:

```powershell
cd backend
bunx wrangler secret put DATABASE_URL
```

Asegúrate de que el valor sea la misma cadena de conexión que tienes en `.env`.

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiating `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
