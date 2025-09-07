
const express = require("express");
const { decryptMedia } = require("@open-wa/wa-decrypt");
const axios = require("axios");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("🟢 API WA-DECRYPT rodando!");
});

app.get("/decrypt", async (req, res) => {
  const { url, mediaKey, fileEncSHA256, directPath, mimetype, type } = req.query;

  if (!url || !mediaKey || !fileEncSHA256 || !directPath || !mimetype || !type) {
    return res.status(400).json({ error: "Parâmetros obrigatórios ausentes." });
  }

  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const decrypted = await decryptMedia(response.data, {
      mediaKey: mediaKey,
      mediaKeyTimestamp: 0,
      type: type,
      mimetype: mimetype,
      filename: "audio.ogg",
      directPath: directPath,
      fileEncSha256B64: fileEncSHA256,
    });

    res.set("Content-Type", mimetype);
    res.send(decrypted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao descriptografar o arquivo." });
  }
});

app.listen(port, () => {
  console.log(`🟢 Servidor rodando na porta ${port}`);
});
