"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getMessages, sendMessage, deleteMessage } from "@/lib/api";
import { useMemo, useState, type FormEvent } from "react";

export default function ChatPage() {
  const params = useParams();
  const chatId = params.id as string;
  const queryClient = useQueryClient();
  const [text, setText] = useState("");

  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString("es-HN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const { data, isLoading, error } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => getMessages(chatId),
  });

  const messages = useMemo(() => data?.mensajes ?? [], [data]);

  const mutation = useMutation({
    mutationFn: (contenido: string) => sendMessage(chatId, contenido),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", chatId] });
      setText("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteMessage(chatId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", chatId] });
    },
  });

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const contenido = text.trim();

    if (!contenido) return;

    mutation.mutate(contenido);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Eliminar este mensaje?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Chat #{chatId}</h1>
      <p style={{ color: "#666", marginBottom: 16 }}>Historial y respuestas del cliente.</p>

      {isLoading && <p style={{ color: "#2563eb" }}>Cargando mensajes…</p>}
      {error && <p style={{ color: "#b91c1c" }}>No se pudieron cargar los mensajes.</p>}

      {!isLoading && !error && (
        <section style={{ border: "1px solid #e5e7eb", borderRadius: 16, padding: 16, minHeight: 340, background: "#fafafa" }}>
          {messages.length === 0 ? (
            <p style={{ color: "#6b7280", textAlign: "center", marginTop: 40 }}>Aún no hay mensajes.</p>
          ) : (
            messages.map((m: any) => (
              <article
                key={m.id}
                style={{
                  display: "flex",
                  justifyContent: m.direccion === "saliente" ? "flex-end" : "flex-start",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    maxWidth: "72%",
                    borderRadius: 14,
                    padding: "10px 12px",
                    background: m.direccion === "saliente" ? "#dcfce7" : "#ffffff",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  }}
                >
                  <p style={{ margin: "0 0 6px", whiteSpace: "pre-wrap" }}>{m.contenido}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>{formatTime(m.created_at)}</span>
                    <button
                      type="button"
                      onClick={() => handleDelete(m.id)}
                      disabled={deleteMutation.isPending}
                      style={{ fontSize: 12, color: "#b91c1c", background: "transparent", border: "none", cursor: "pointer" }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>
      )}

      <form onSubmit={handleSend} style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe una respuesta para el cliente"
          style={{ flex: 1, border: "1px solid #d1d5db", borderRadius: 999, padding: "10px 14px" }}
        />
        <button
          type="submit"
          disabled={mutation.isPending || !text.trim()}
          style={{ borderRadius: 999, padding: "10px 14px", background: "#111827", color: "white", cursor: "pointer" }}
        >
          {mutation.isPending ? "Enviando…" : "Enviar"}
        </button>
      </form>
      {mutation.isError && (
        <p style={{ color: "#b91c1c", marginTop: 8 }}>
          {mutation.error instanceof Error ? mutation.error.message : "No se pudo enviar el mensaje."}
        </p>
      )}
    </main>
  );
}