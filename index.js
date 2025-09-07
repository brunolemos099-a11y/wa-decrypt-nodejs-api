const express = require("express");
const axios = require("axios");
const { decryptMediaMessageBuffer } = require("@open-wa/wa-decrypt");

const app = express();
const PORT = 3000;

app.get("/decrypt", async (req, res) => {
  try {
    const { url, mediaKey, mimetype, directPath, fileEncSHA256, type } = req.query;
    if (!url || !mediaKey || !mimetype || !directPath || !fileEncSHA256 || !type) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const response = await axios.get(url, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);

    const decrypted = await decryptMediaMessageBuffer({
      mediaKey,
      mediaData: buffer,
      mimetype,
      directPath,
      fileEncSha256B64: fileEncSHA256,
      type,
    });

    res.setHeader("Content-Type", mimetype);
    res.send(decrypted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Falha na descriptografia" });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});