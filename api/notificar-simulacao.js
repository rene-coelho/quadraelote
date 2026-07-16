export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method not allowed' });
  }

  const { imovel, entrada, entPct, prazo, whats, email } = req.body || {};

  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ error: 'telegram env vars not configured' });
  }

  const texto = [
    '📊 *Nova simulação — Crédito Imobiliário*',
    '',
    `*Imóvel:* ${imovel || '-'}`,
    `*Entrada:* ${entrada || '-'} (${entPct != null ? entPct : '-'}%)`,
    `*Prazo:* ${prazo || '-'} anos`,
    `*WhatsApp:* ${whats || '-'}`,
    `*E-mail:* ${email || '-'}`
  ].join('\n');

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
