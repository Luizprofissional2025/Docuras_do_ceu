/* =========================================================
   POST /api/auth-google
   Recebe o "credential" (ID token JWT) que o botão do Google
   devolve no navegador, valida com o Google, cria ou atualiza
   o usuário no banco e abre a sessão (cookie httpOnly).
========================================================= */
const { OAuth2Client } = require("google-auth-library");
const { sql } = require("@vercel/postgres");
const { createSessionToken, setSessionCookie } = require("../lib/auth");
const { ensureUsersTable } = require("../lib/db");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método não permitido" });
    return;
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    res.status(500).json({ error: "GOOGLE_CLIENT_ID não configurado no servidor." });
    return;
  }

  const { credential } = req.body || {};
  if (!credential) {
    res.status(400).json({ error: "Token do Google ausente." });
    return;
  }

  try {
    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({ idToken: credential, audience: clientId });
    const payload = ticket.getPayload();

    if (!payload || !payload.sub || !payload.email) {
      res.status(401).json({ error: "Não foi possível validar o login do Google." });
      return;
    }

    await ensureUsersTable();

    const { rows } = await sql`
      INSERT INTO users (google_id, email, name, picture)
      VALUES (${payload.sub}, ${payload.email}, ${payload.name || ""}, ${payload.picture || ""})
      ON CONFLICT (google_id)
      DO UPDATE SET email = EXCLUDED.email, name = EXCLUDED.name, picture = EXCLUDED.picture, updated_at = now()
      RETURNING id, email, name, picture, idade, endereco, bolo_preferido;
    `;

    const user = rows[0];
    const token = await createSessionToken(user.id);
    setSessionCookie(res, token);

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        idade: user.idade,
        endereco: user.endereco,
        boloPreferido: user.bolo_preferido,
      },
      profileComplete: Boolean(user.idade && user.endereco && user.bolo_preferido),
    });
  } catch (err) {
    console.error("auth-google error:", err);
    res.status(500).json({ error: "Erro ao processar o login. Tente novamente." });
  }
};
