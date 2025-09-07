# WA Decrypt API

API feita para descriptografar arquivos de áudio `.enc` do WhatsApp com `@open-wa/wa-decrypt`.

## 🚀 Como usar

### 1. Build Docker
```bash
docker build -t wa-decrypt-api .
```

### 2. Rodar a API
```bash
docker run -p 3000:3000 wa-decrypt-api
```

## 📥 Endpoint: `/decrypt`

### Método: `GET`

### Parâmetros obrigatórios:

| Parâmetro        | Descrição                         |
|------------------|-----------------------------------|
| url              | URL do arquivo .enc               |
| mediaKey         | Chave do WhatsApp                 |
| mimetype         | Tipo de mídia, ex: audio/ogg      |
| fileEncSHA256    | Hash do arquivo                   |
| directPath       | Caminho direto                    |
| type             | Tipo de mídia, ex: audio          |

### Exemplo de chamada:

```bash
curl 'http://localhost:3000/decrypt?url=https://...&mediaKey=...&mimetype=audio/ogg&fileEncSHA256=...&directPath=...&type=audio'
```

## 📦 Retorno

Um arquivo `.ogg` descriptografado.

---
Feito com ❤️ por ChatGPT para Bruno Lemos