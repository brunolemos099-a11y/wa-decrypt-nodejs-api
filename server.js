const express = require('express');
const fetch = require('node-fetch');
const { decryptMediaMessageBuffer } = require('@open-wa/wa-decrypt');
const app = express();

app.get('/decrypt', async (req, res) => {
  try {
    const { url, mediaKey, mimetype, directPath, fileEncSHA256, type } = req.query;

    if (!url || !mediaKey || !mimetype || !directPath || !fileEncSHA256 || !type) {
      return res.status(400).json({ error: 'Parâmetros ausentes' });
    }

    const response = await fetch(url);
    const buffer = await response.buffer();

    const decrypted = await decryptMediaMessageBuffer({
      type,
      mediaKey,
      data: buffer,
      mimetype,
      directPath,
      fileEncSha256B64: fileEncSHA256
    });

    res.setHeader('Content-Type', mimetype);
    res.send(decrypted);
  } catch (err) {
    console.error('Erro:', err);
    res.status(500).json({ error: 'Falha na descriptografia' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});