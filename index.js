import express from 'express';
import { decryptMedia } from '@open-wa/wa-decrypt';
import mime from 'mime-types';
import fs from 'fs';

const app = express();
app.use(express.json({ limit: '50mb' }));

app.post('/decrypt', async (req, res) => {
  const message = req.body;

  if (!message.mimetype || !message.data) {
    return res.status(400).json({ error: 'Faltam campos: mimetype ou data' });
  }

  try {
    const mediaBuffer = await decryptMedia(message);
    const base64 = mediaBuffer.toString('base64');
    res.json({ base64 });
  } catch (error) {
    console.error('Erro ao descriptografar:', error);
    res.status(500).json({ error: 'Falha na descriptografia' });
  }
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`API wa-decrypt rodando na porta ${PORT}`);
});