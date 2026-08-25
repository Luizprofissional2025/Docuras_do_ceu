/* =========================================================
   lib/db.js
   Cria a tabela "users" se ainda não existir. Chamado no
   início de cada função que mexe no banco — é barato e evita
   um passo manual de setup (mas você também pode rodar esse
   SQL uma vez direto no painel da Vercel, ver README).
========================================================= */
const { sql } = require("@vercel/postgres");

let ensured = false;

async function ensureUsersTable() {
  if (ensured) return;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      google_id TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      picture TEXT,
      idade INTEGER,
      endereco TEXT,
      bolo_preferido TEXT,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );
  `;
  ensured = true;
}

module.exports = { ensureUsersTable };
