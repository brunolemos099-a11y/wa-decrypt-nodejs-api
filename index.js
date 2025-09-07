const express = require("express");
const { decryptMedia } = require("@open-wa/wa-decrypt");
const axios = require("axios");
const app = express();

app.get("/decrypt", async (req, res) => {
  const { url, mediaKey, fileEncSHA256, directPath, mimetype, type } = req.query;

  if (!url || !mediaKey || !fileEncSHA256 || !directPath || !mimetype || !type) {
    return res.status(400).json({ error: "Missing required query parameters." });
  }

  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const decrypted = await decryptMedia({
      mediaKeyBase64: mediaKey,
      mediaData: Buffer.from(response.data, "binary"),
      mediaType: type,
      mimetype,
      directPath,
      fileEncSha256B64: fileEncSHA256,
    });
    res.setHeader("Content-Type", mimetype);
    return res.send(decrypted);
  } catch (error) {
    console.error("Erro ao descriptografar mídia:", error);
    return res.status(500).json({ error: "Erro interno ao descriptografar mídia." });
  }
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});