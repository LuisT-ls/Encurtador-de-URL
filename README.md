# Encurtador de URL

## Rodando localmente

1. Clone o repositório e acesse a pasta raiz.
2. Instale as dependências do frontend e backend:

```bash
cd client && npm install
cd ../server && npm install
```

3. Crie um arquivo `.env` na pasta `/server` com sua string do MongoDB e BASE_URL (veja `.env.example`).

4. Para rodar frontend e backend juntos em modo desenvolvimento:

```bash
npm run dev
```

> Isso usa o `concurrently` para rodar ambos os servidores.

## Deploy

- **Frontend (client):**

  - Deploy recomendado no [Vercel](https://vercel.com/)
  - Rode `npm run build` na pasta `/client` e faça deploy da pasta `build/`.

- **Backend (server):**
  - Deploy recomendado no [Railway](https://railway.app/) ou [Render](https://render.com/)
  - Configure as variáveis de ambiente `MONGODB_URI`, `BASE_URL` e `PORT`.
  - O comando de start deve ser `npm start`.

---

Dúvidas? Abra uma issue ou entre em contato!
