const express = require("express");
const { decryptMedia } = require("@open-wa/wa-decrypt");
const axios = require("axios");
const fs = require("fs-extra");
const { v4: uuidv4 } = require("uuid");
const morgan = require("morgan");
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("WA Decrypt API está rodando...");
});

app.get("/decrypt", async (req, res) => {
  const { url, mediaKey, mimetype, fileEncSHA256, directPath, type } = req.query;

  if (!url || !mediaKey || !mimetype || !fileEncSHA256 || !directPath || !type) {
    return res.status(400).json({ error: "Parâmetros ausentes" });
  }

  try {
    const { data } = await axios.get(url, { responseType: "arraybuffer" });
    const buffer = Buffer.from(data);

    const decrypted = await decryptMedia({
      type,
      mediaKey,
      data: buffer,
      mimetype,
      directPath,
      fileEncSha256: fileEncSHA256,
    });

    const filename = `audio-${uuidv4()}.ogg`;
    const filePath = `${__dirname}/${filename}`;
    await fs.writeFile(filePath, decrypted);

    res.download(filePath, filename, async () => {
      await fs.remove(filePath);
    });
  } catch (error) {
    console.error("Erro na descriptografia:", error.message);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API rodando na porta", PORT));