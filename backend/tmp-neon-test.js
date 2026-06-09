import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();
const sql = neon(process.env.DATABASE_URL);

try {
  const rows = await sql`INSERT INTO mensajes (chat_id, contenido, direccion) VALUES (1, 'Test', 'saliente') RETURNING *`;
  console.log('OK', rows);
} catch (err) {
  console.error('ERR', err);
  process.exitCode = 1;
}
