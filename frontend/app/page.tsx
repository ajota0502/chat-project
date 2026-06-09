export default function Home() {
  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>Chat Demo</h1>
      <p style={{ color: "#374151", marginBottom: 24 }}>
        El frontend está instalado. Abre el chat de ejemplo con el botón de abajo.
      </p>

      <div style={{ display: "grid", gap: 16 }}>
        <a
          href="/chats/1"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 20px",
            borderRadius: 12,
            background: "#111827",
            color: "white",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Abrir chat de ejemplo /chats/1
        </a>

        <div style={{ padding: 18, borderRadius: 16, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p style={{ margin: 0, color: "#475569" }}>
            Si la ruta no carga, revisa que la API esté desplegada en Cloudflare y que
            `NEXT_PUBLIC_API_URL` esté apuntando a <strong>https://backend.authcodechatbot.workers.dev</strong>.
          </p>
        </div>
      </div>
    </main>
  );
}
