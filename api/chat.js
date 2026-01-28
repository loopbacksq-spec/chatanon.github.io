// Хранилище сообщений (в памяти — сбросится при перезапуске)
let messages = [];

export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Получить последние 50 сообщений
    return res.json(messages.slice(-50));
  }

  if (req.method === 'POST') {
    // Отправить новое сообщение
    const body = req.body;
    if (!body || !body.nick || !body.text) {
      return res.status(400).json({ error: 'Требуется nick и text' });
    }

    const message = {
      id: Date.now().toString(36),
      nick: body.nick,
      text: body.text,
      time: Date.now()
    };

    messages.push(message);
    if (messages.length > 50) messages = messages.slice(-50);

    return res.status(201).json({ ok: true });
  }

  res.status(405).json({ error: 'Метод не разрешён' });
}
