# wa-decrypt-nodejs-api

API para descriptografar mídia criptografada do WhatsApp usando `@open-wa/wa-decrypt`.

## Como usar

Envie uma requisição POST para `http://<host>/decrypt` com o corpo:

```json
{
  "mimetype": "image/jpeg ou audio/ogg ...",
  "data": "<base64 do arquivo .enc>",
  "t": "timestamp opcional",
  "mediaKey": "...", // se necessário
  "filehash": "..." // opcional
}
```

Resposta:

```json
{
  "base64": "<base64 do arquivo descriptografado>"
}
```

## Docker

```bash
docker build -t wa-decrypt-api .
docker run -p 3030:3030 wa-decrypt-api
```

Ou use com Docker Compose:

```yaml
services:
  wa-decrypt:
    build: .
    ports: ["3030:3030"]
```