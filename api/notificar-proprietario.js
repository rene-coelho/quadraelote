export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method not allowed' });
  }

  const { nome, tel, tipo, endereco, msg } = req.body || {};

  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ error: 'telegram env vars not configured' });
  }

  const texto = [
    '🏠 *Novo cadastro de imóvel*',
    '',
    `*Nome:* ${nome || '-'}`,
    `*Telefone:* ${tel || '-'}`,
    `*Tipo:* ${tipo || '-'}`,
    `*Endereço:* ${endereco || '-'}`,
    msg ? `*Mensagem:* ${msg}` : null
  ].filter(Boolean).join('\n');

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: texto,
        parse_mode: 'Markdown'
      })
    });

    if (!tgRes.ok) {
      const errBody = await tgRes.text();
      return res.status(502).json({ error: 'telegram request failed', detail: errBody });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'internal error', detail: String(err) });
  }
}
