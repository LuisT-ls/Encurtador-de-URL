# Encurtador de URL

Um encurtador de URLs simples, moderno e responsivo, desenvolvido em JavaScript, HTML e CSS, utilizando Firebase Firestore como backend para armazenamento e redirecionamento.

## Demonstração

Cole uma URL, clique em **Encurtar** e obtenha um link curto para compartilhar. O histórico das últimas URLs encurtadas é exibido na interface.

---

## Funcionalidades

- **Encurtamento de URLs**: Gere links curtos exclusivos.
- **Redirecionamento automático**: Acesse o link curto e seja redirecionado para a URL original.
- **Histórico**: Visualize as últimas URLs encurtadas e copie rapidamente.
- **Contador de cliques**: Cada acesso ao link curto incrementa o contador.
- **Validação de URL**: Apenas URLs válidas são aceitas.
- **Modo escuro**: Alternância entre tema claro e escuro.
- **Interface responsiva**: Layout adaptado para dispositivos móveis e desktop.
- **Integração com Firebase Firestore**: Armazenamento seguro e escalável.

---

## Estrutura do Projeto

```
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   └── modules/
│   │       ├── base/          # Estilos fundamentais
│   │       ├── components/    # Componentes reutilizáveis
│   │       ├── features/      # Funcionalidades específicas
│   │       ├── layout/        # Estrutura das páginas
│   │       └── utils/         # Utilitários e helpers
│   └── img/
│       └── favicon/
├── js/
│   ├── main.js                # Lógica principal da interface
│   └── modules/
│       ├── firebaseConfig.js  # Configuração do Firebase
│       ├── urlShortener.js    # Lógica de encurtamento
│       ├── urlRedirect.js     # Lógica de redirecionamento
│       └── validateURL.js     # Validação de URLs
├── pages/
│   ├── css/                   # Estilos específicos de páginas
│   ├── privacy.html           # Política de privacidade
│   └── terms-of-service.html  # Termos de uso
├── index.html                 # Página principal
├── redirect.html              # Página de redirecionamento
├── manifest.json              # (Reservado para PWA)
├── sw.js                      # (Reservado para Service Worker)
├── robots.txt
└── data/
    ├── LICENSE
    └── README.md
```

---

## Como usar

1. **Clone o repositório** e abra o `index.html` em seu navegador.
2. **Configure o Firebase**:
   - O projeto já está configurado para usar um projeto Firebase de exemplo.
   - Para usar seu próprio backend, edite `js/modules/firebaseConfig.js` com suas credenciais.
3. **Encurte URLs**:
   - Cole a URL no campo indicado e clique em **Encurtar**.
   - O link curto será exibido e poderá ser copiado.
4. **Acesse o link curto**:
   - O acesso ao link curto redireciona automaticamente para a URL original e incrementa o contador de cliques.
5. **Histórico**:
   - As últimas URLs encurtadas aparecem na interface, com opção de copiar rapidamente.

---

## Detalhes Técnicos

### Lógica de Encurtamento

- O arquivo `js/modules/urlShortener.js` gera um ID aleatório de 6 caracteres e salva a URL original no Firestore, junto com a data e contador de cliques.
- O link curto é do tipo:
  ```
  https://seusite.com/redirect.html?i=ID
  ```

### Redirecionamento

- O arquivo `js/modules/urlRedirect.js` lê o parâmetro `i` da URL, busca a URL original no Firestore e redireciona o usuário.
- O contador de cliques é incrementado a cada acesso.

### Validação

- O módulo `js/modules/validateURL.js` garante que apenas URLs válidas sejam aceitas.

### Interface

- Desenvolvida com Bootstrap 5 e CSS modular.
- Suporte a dark mode com toggle e persistência via `localStorage`.

### Firebase

- Utiliza Firestore para persistência dos dados.
- Configuração em `js/modules/firebaseConfig.js`.

---

## Personalização

- **Tema**: Edite os arquivos em `assets/css/modules/` para customizar o visual.
- **Firebase**: Substitua as credenciais em `firebaseConfig.js` para usar seu próprio projeto.
- **PWA**: O projeto já possui arquivos reservados para manifest e service worker, podendo ser facilmente adaptado para funcionar offline.

---

## Páginas Adicionais

- **Política de Privacidade**: `pages/privacy.html`
- **Termos de Uso**: `pages/terms-of-service.html`
- _(Os arquivos estão prontos para serem preenchidos conforme sua necessidade legal.)_

---

## Licença

Consulte o arquivo `data/LICENSE` para detalhes.

---

## Observações

- O projeto é totalmente front-end, sem dependências de build.
- Para produção, recomenda-se hospedar em HTTPS e configurar regras de segurança no Firebase.
