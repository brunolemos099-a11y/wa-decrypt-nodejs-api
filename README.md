# wa-decrypt-nodejs-api

API para descriptografar mídias (.enc) do WhatsApp via GET ou POST utilizando o pacote [@open-wa/wa-decrypt](https://www.npmjs.com/package/@open-wa/wa-decrypt).

## Rotas disponíveis

### GET /decrypt

**Parâmetros via query:**

- `type` = "image" ou "audio"
- `mimetype` = "image/jpeg" ou "audio/ogg"
- `data` = arquivo .enc em base64
- `mediaKey`, `filehash`, `mediaKeyTimestamp` = opcionais

**Exemplo:**

```
GET /decrypt?type=audio&mimetype=audio/ogg&data=...&mediaKey=...&filehash=...
```

Retorna o conteúdo descriptografado com o `Content-Type` correto.

---

### POST /decrypt

**Body JSON:**

```json
{
  "type": "audio",
  "mimetype": "audio/ogg",
  "data": "<base64 .enc>",
  "mediaKey": "...",
  "filehash": "...",
  "mediaKeyTimestamp": "..."
}
```

**Resposta:**

```json
{
  "base64": "<arquivo descriptografado>"
}
```

---

## Instalação

```bash
docker build -t wa-decrypt .
docker run -p 3030:3030 wa-decrypt
```

Ou via EasyPanel: use `build path` com os arquivos deste projeto.