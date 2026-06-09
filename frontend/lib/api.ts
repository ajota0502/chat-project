const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8788";

async function parseResponse(res: Response) {
  const data = await res.json();

  if (!res.ok || data.status === "error") {
    throw new Error(data.message || "No se pudo completar la solicitud");
  }

  return data;
}

export async function getMessages(chatId: string) {
  const res = await fetch(`${API_URL}/chats/${chatId}/mensajes`);
  return parseResponse(res);
}

export async function sendMessage(chatId: string, contenido: string) {
  const res = await fetch(`${API_URL}/chats/${chatId}/mensajes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contenido }),
  });

  return parseResponse(res);
}

export async function deleteMessage(_chatId: string, id: number) {
  const res = await fetch(`${API_URL}/mensajes/${id}`, {
    method: "DELETE",
  });

  return parseResponse(res);
}