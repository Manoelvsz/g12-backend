🧪 GUIA DE TESTES - FEED DE CONTEÚDO
=====================================

## TESTES DE BACKEND

### 1. Verificar Estrutura do Prisma
```bash
cd backend
npx prisma validate
# Resposta esperada: ✅ Prisma schema is valid
```

### 2. Criar Migration (Se necessário sincronizar com DB real)
```bash
npx prisma migrate deploy
# Resposta esperada: Successfully migrated
```

### 3. Popular Banco (Seed)
```bash
npx prisma db seed
# Resposta esperada: ✅ Seed concluído com sucesso!
```

### 4. Verificar Dados no Banco
```bash
npx prisma studio
# Abre interface visual do banco
# Verificar tabela "posts" com 5 registros
```

### 5. Iniciar Backend
```bash
npm run start:dev
# Resposta esperada: [Nest] ... - ... Server running on http://localhost:3000
```

### 6. Testar Endpoints com cURL

#### GET /posts (Listar todos)
```bash
curl http://localhost:3000/posts
```
Resposta esperada:
```json
{
  "status": "success",
  "message": "Posts recuperados com sucesso",
  "data": [
    {
      "id": "uuid-1",
      "title": "🙏 Culto de Celebração - Domingo",
      "content": "Neste domingo teremos...",
      "imageUrl": "https://via.placeholder.com/...",
      "published": true,
      "createdAt": "2025-12-28T...",
      "updatedAt": "2025-12-28T..."
    }
  ],
  "count": 5
}
```

#### GET /posts/:id (Buscar específico)
```bash
curl http://localhost:3000/posts/{ID_DO_POST}
```

#### POST /posts (Criar novo)
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Novo Post Teste",
    "content": "Conteúdo do post de teste",
    "imageUrl": null
  }'
```

#### PUT /posts/:id (Atualizar)
```bash
curl -X PUT http://localhost:3000/posts/{ID} \
  -H "Content-Type: application/json" \
  -d '{"title": "Título Atualizado"}'
```

#### DELETE /posts/:id (Deletar)
```bash
curl -X DELETE http://localhost:3000/posts/{ID}
```

───────────────────────────────────────────────────────────────

## TESTES DE FRONTEND

### 1. Instalar Dependências
```bash
cd frontend
npm install
```

### 2. Verificar Configuração de API
Abrir: src/config/api.config.ts
Verificar se API_URL está correto (http://localhost:3000)

### 3. Iniciar App
```bash
npm run dev
# ou
expo start
```

### 4. Testes Manuais na App

#### Cenário 1: Feed Carregando
- [ ] App abre página principal
- [ ] Vê "Comunicados e Notícias" seção
- [ ] Spinner aparece enquanto carrega

#### Cenário 2: Feed Carregado com Sucesso
- [ ] 5 cards de posts aparecem
- [ ] Cada card mostra:
  - [ ] Imagem de destaque (se houver)
  - [ ] Título em negrito
  - [ ] Data em formato DD/MM/YYYY HH:mm
  - [ ] Conteúdo truncado em 150 caracteres + "..."
  - [ ] Botão "Ler mais →" em azul

#### Cenário 3: Erro ao Carregar
- Desligar backend e testar
- [ ] Mensagem de erro exibe
- [ ] Botão "Tentar novamente" aparece
- [ ] Clicar botão e reconectar backend

#### Cenário 4: Feed Vazio
- Deletar todos os posts no banco
- [ ] Mensagem "📭 Nenhum post disponível" aparece
- [ ] Mensagem descritiva exibe

### 5. Testes de Navegação
- [ ] Clicar em card → executa onPostPress
- [ ] Clicar "Ler mais" → comportamento esperado
- [ ] Scroll lista → performance OK (FlatList otimizado)

───────────────────────────────────────────────────────────────

## TESTES DE INTEGRAÇÃO

### 1. Backend Rodando + Frontend Rodando
```bash
# Terminal 1 - Backend
cd backend && npm run start:dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### 2. Fluxo Completo
- [ ] App inicia
- [ ] Hook useFeedPosts() executa
- [ ] GET /posts chamado
- [ ] Posts carregam na FlatList
- [ ] Renderização perfeitamente

### 3. Teste de Performance
- [ ] Feed com 100 posts
- [ ] Scroll suave (sem lag)
- [ ] Imagens carregam eficientemente

───────────────────────────────────────────────────────────────

## TROUBLESHOOTING

### Problema: Posts não aparecem
Checklist:
1. [ ] Backend rodando? (curl http://localhost:3000/posts)
2. [ ] Banco tem dados? (npx prisma studio)
3. [ ] API URL correta? (src/config/api.config.ts)
4. [ ] Hook rodando? (console.log em useFeedPosts)
5. [ ] Componentes corretos? (import/export)

### Problema: Erro de CORS
Solução - Adicionar ao backend main.ts:
```typescript
app.enableCors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
});
```

### Problema: Migration falhou
```bash
npx prisma migrate reset  # Cuidado: deleta dados!
npx prisma migrate deploy
```

### Problema: Imagens não carregam
- [ ] URLs válidas nos posts
- [ ] Usar placeholder default no FeedCard

───────────────────────────────────────────────────────────────

✅ Todos os testes passaram? Implementação completa e funcional!
