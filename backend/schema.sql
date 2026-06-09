-- Schema para la prueba técnica

CREATE TABLE IF NOT EXISTS empresas (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS chats (
  id SERIAL PRIMARY KEY,
  empresa_id INTEGER NOT NULL REFERENCES empresas(id),
  nombre TEXT NOT NULL,
  telefono TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS mensajes (
  id SERIAL PRIMARY KEY,
  chat_id INTEGER NOT NULL REFERENCES chats(id),
  contenido TEXT NOT NULL,
  direccion TEXT NOT NULL CHECK (direccion IN ('entrante', 'saliente')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Datos de ejemplo
INSERT INTO empresas (nombre)
VALUES ('Empresa Demo')
on conflict do nothing;

INSERT INTO chats (empresa_id, nombre, telefono)
VALUES (1, 'Cliente Demo', '+1234567890')
on conflict do nothing;

INSERT INTO mensajes (chat_id, contenido, direccion)
VALUES
  (1, 'Hola', 'entrante'),
  (1, '¡Hola! ¿En qué puedo ayudarte?', 'saliente'),
  (1, 'Quiero información', 'entrante');
