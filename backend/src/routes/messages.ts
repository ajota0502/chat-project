import { Hono } from "hono";
import { createDb } from "../db";

type Bindings = {
  DATABASE_URL: string;
};

const messages = new Hono<{ Bindings: Bindings }>();



messages.get("/chats/:chatId/mensajes", async (c) => {
  try {
    const chatId = c.req.param("chatId");

    if (!Number.isFinite(Number(chatId)) || Number(chatId) <= 0) {
      return c.json({ status: "error", message: "chatId inválido" }, 400);
    }

    const db = createDb(c.env);
    const chat = await db`SELECT id FROM chats WHERE id = ${Number(chatId)}`;

    if (chat.length === 0) {
      return c.json({ status: "error", message: "Chat no encontrado" }, 404);
    }

    const result = await db`
      SELECT *
      FROM mensajes
      WHERE chat_id = ${Number(chatId)}
      ORDER BY created_at ASC
    `;

    return c.json({ status: "success", mensajes: result });
  } catch (err) {
    
    return c.json({ status: "error", message: "Error interno del servidor" }, 500);
  }
});

messages.post("/chats/:chatId/mensajes", async (c) => {
  try {
    const chatId = c.req.param("chatId");

    if (!Number.isFinite(Number(chatId)) || Number(chatId) <= 0) {
      return c.json({ status: "error", message: "chatId inválido" }, 400);
    }

    let body: any;

    try {
      body = await c.req.json();
    } catch {
      return c.json({ status: "error", message: "JSON inválido" }, 400);
    }

    const contenido = typeof body?.contenido === "string" ? body.contenido.trim() : "";

    if (!contenido) {
      return c.json({ status: "error", message: "El contenido es requerido" }, 400);
    }

    const db = createDb(c.env);
    const chat = await db`SELECT id FROM chats WHERE id = ${Number(chatId)}`;

    if (chat.length === 0) {
      return c.json({ status: "error", message: "Chat no encontrado" }, 404);
    }

    const result = await db`
      INSERT INTO mensajes (chat_id, contenido, direccion)
      VALUES (${Number(chatId)}, ${contenido}, 'saliente')
      RETURNING *
    `;

    return c.json({ status: "success", mensajes: result });
  } catch (err) {
    
    return c.json({ status: "error", message: "Error interno del servidor" }, 500);
  }
});

messages.delete("/mensajes/:id", async (c) => {
  try {
    const id = c.req.param("id");

    if (!Number.isFinite(Number(id)) || Number(id) <= 0) {
      return c.json({ status: "error", message: "id inválido" }, 400);
    }

    const db = createDb(c.env);
    const result = await db`
      DELETE FROM mensajes
      WHERE id = ${Number(id)}
      RETURNING *
    `;

    if (result.length === 0) {
      return c.json({ status: "error", message: "Mensaje no encontrado" }, 404);
    }

    return c.json({ status: "success", mensajes: result });
  } catch (err) {
    
    return c.json({ status: "error", message: "Error interno del servidor" }, 500);
  }
});

export default messages;