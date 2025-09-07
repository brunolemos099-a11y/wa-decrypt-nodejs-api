const express = require("express");
const axios = require("axios");
const { decryptMediaMessageBuffer } = require("@open-wa/wa-decrypt");

const app = express();
const port = 3000;

app.get("/decrypt", async (req, res) => {
  const { url, mediaKey, fileEncSha256, directPath, mimetype, type } = req.query;

  if (!url || !mediaKey || !fileEncSha256 || !directPath || !mimetype || !type) {
    return res.status(400).json({ error: "Parâmetros obrigatórios ausentes." });
  }

  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const decrypted = await decryptMediaMessageBuffer({
      type,
      mediaKey,
      mediaData: response.data,
      mimetype,
      directPath,
      fileEncSha256
    });

    res.set("Content-Type", mimetype);
    return res.send(decrypted);
  } catch (err) {
    console.error("Erro ao descriptografar:", err.message);
    return res.status(500).json({ error: "Falha na descriptografia" });
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});