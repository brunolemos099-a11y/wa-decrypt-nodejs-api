const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { decryptMedia } = require("@open-wa/wa-decrypt");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API wa-decrypt-nodejs ativa ✅");
});

app.post("/decrypt", async (req, res) => {
  try {
    const { mimetype, data, mediaKey, filehash, mediaKeyTimestamp, type } = req.body;
    const buffer = Buffer.from(data, "base64");

    const decrypted = await decryptMedia(buffer, {
      type: type || "image",
      mediaKey,
      filehash,
      mediaKeyTimestamp,
    });

    res.json({ base64: decrypted.toString("base64") });
  } catch (err) {
    console.error("Erro ao descriptografar via POST:", err.message);
    res.status(500).json({ error: "Falha na descriptografia" });
  }
});

app.get("/decrypt", async (req, res) => {
  try {
    const { mimetype, data, mediaKey, filehash, mediaKeyTimestamp, type } = req.query;
    const buffer = Buffer.from(data, "base64");

    const decrypted = await decryptMedia(buffer, {
      type: type || "image",
      mediaKey,
      filehash,
      mediaKeyTimestamp,
    });

    res.setHeader("Content-Type", mimetype || "application/octet-stream");
    res.send(decrypted);
  } catch (err) {
    console.error("Erro ao descriptografar via GET:", err.message);
    res.status(500).json({ error: "Falha na descriptografia" });
  }
});

const PORT = 3030;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});