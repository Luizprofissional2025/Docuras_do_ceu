/* =========================================================
   POST /api/register
   Cria uma conta nova com nome, e-mail e senha. Abre a sessão
   (cookie httpOnly) na hora, igual ao login.
========================================================= */
const { sql } = require("@vercel/postgres");
const { createSessionToken, setSessionCookie } = require("../lib/auth");
const { ensureUsersTable } = require("../lib/db");
const { hashPassword } = require("../lib/password");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método não permitido" });
    return;
  }

  const { nome, email, senha } = req.body || {};
  const nomeTrim = String(nome || "").trim();
  const emailNorm = String(email || "").trim().toLowerCase();

  if (!nomeTrim || nomeTrim.length < 2) {
    res.status(400).json({ error: "Digite seu nome." });
    return;
  }
  if (!EMAIL_RE.test(emailNorm)) {
    res.status(400).json({ error: "Digite um e-mail válido." });
    return;
  }
  if (!senha || String(senha).length < 6) {
    res.status(400).json({ error: "A senha precisa ter pelo menos 6 caracteres." });
    return;
  }

  try {
    await ensureUsersTable();

    const existing = await sql`SELECT id FROM users WHERE email = ${emailNorm};`;
    if (existing.rows.length) {
      res.status(409).json({ error: "Já existe uma conta com esse e-mail. Tente entrar." });
      return;
    }

    const passwordHash = await hashPassword(String(senha));

    const { rows } = await sql`
      INSERT INTO users (email, password_hash, name)
      VALUES (${emailNorm}, ${passwordHash}, ${nomeTrim})
      RETURNING id, email, name, idade, endereco, bolo_preferido;
    `;

    const user = rows[0];
    const token = await createSessionToken(user.id);
    setSessionCookie(res, token);

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        idade: user.idade,
        endereco: user.endereco,
        boloPreferido: user.bolo_preferido,
      },
      profileComplete: Boolean(user.idade && user.endereco && user.bolo_preferido),
    });
  } catch (err) {
    console.error("register error:", err);
    res.status(500).json({ error: "Erro ao criar a conta. Tente novamente." });
  }
};
