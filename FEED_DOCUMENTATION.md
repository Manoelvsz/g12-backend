# 📚 Feed de Conteúdo - Documentação Completa

## 📋 Resumo da Implementação

Este documento descreve a implementação completa do Feed de Conteúdo (Posts Institucionais) para o Projeto PIBB G12, incluindo backend NestJS + Prisma e frontend React Native (Expo).

---

## 🏗️ PARTE 1: BACKEND (NestJS + Prisma + PostgreSQL)

### ✅ Arquivos Criados/Modificados

#### 1. **Database Schema** (`prisma/schema.prisma`)
```prisma
model Post {
  id        String   @id @default(uuid())
  title     String?  // Título opcional
  content   String   @db.Text // Conteúdo principal
  imageUrl  String?  // URL da imagem destaque
  published Boolean  @default(true) // Controla visibilidade
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@map("posts")
}
```

#### 2. **DTOs com Validações** (`src/posts/dto/`)
- `create-post.dto.ts` - Validação para criação
- `update-post.dto.ts` - Validação para atualização

**Validações incluídas:**
- Título: 3-255 caracteres (opcional)
- Conteúdo: 5+ caracteres (obrigatório)
- ImageUrl: string válida (opcional)

#### 3. **Posts Service** (`src/posts/posts.service.ts`)
Métodos principais:
- `create(dto)` - Cria novo post
- `findAll()` - Lista posts publicados (ordenado por data DESC)
- `findOne(id)` - Busca post específico
- `update(id, dto)` - Atualiza post
- `remove(id)` - Deleta post

**Tratamento de erros:**
- ✅ Exceções NestJS apropriadas
- ✅ Logs informativos em português
- ✅ Mensagens de erro claras

#### 4. **Posts Controller** (`src/posts/posts.controller.ts`)
Endpoints REST:
```
GET    /posts           → Lista todos os posts
GET    /posts/:id       → Busca post por ID
POST   /posts           → Cria novo post (admin)
PUT    /posts/:id       → Atualiza post (admin)
DELETE /posts/:id       → Deleta post (admin)
```

Respostas padronizadas com estrutura:
```json
{
  "status": "success",
  "message": "...",
  "data": {...},
  "count": 5
}
```

#### 5. **Posts Module** (`src/posts/posts.module.ts`)
Agrupa Controller, Service e dependências.

#### 6. **Migration** (`prisma/migrations/20251228_create_posts_table/`)
- Script SQL para criar tabela `posts`
- Índices e constraints

#### 7. **Seed** (`prisma/seed.ts`)
Popula banco com posts mockados:
```bash
npx prisma db seed
```

---

## 🎨 PARTE 2: FRONTEND (React Native + Expo + TypeScript)

### ✅ Arquivos Criados

#### 1. **Tipos** (`src/types/posts.types.ts`)
```typescript
interface Post {
  id: string;
  title?: string;
  content: string;
  imageUrl?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

type PostLoadingState = 'idle' | 'loading' | 'success' | 'error';
```

#### 2. **API Service** (`src/shared/service/api/posts.api.ts`)
```typescript
postsAPI.getAll()      // Busca todos os posts
postsAPI.getById(id)   // Busca post específico
postsAPI.create(data)  // Cria post
postsAPI.update(id, data) // Atualiza post
postsAPI.delete(id)    // Deleta post
```

**Recursos:**
- ✅ Tratamento de erros
- ✅ Tipagem TypeScript total
- ✅ Logs console para debug

#### 3. **Hook Custom** (`src/shared/hooks/useFeedPosts.ts`)
```typescript
const { posts, loading, error, retry } = useFeedPosts();
```

**Features:**
- ✅ Busca automática ao montar
- ✅ Estados de loading/error/success
- ✅ Função retry para tente novamente
- ✅ Sem memory leaks (useCallback)

#### 4. **Componente FeedCard** (`src/shared/components/feed/FeedCard.tsx`)
Renderiza um post individual:
- ✅ Imagem de destaque (se disponível)
- ✅ Título truncado
- ✅ Data formatada (DD/MM/YYYY HH:mm)
- ✅ Conteúdo com limite 150 caracteres + "..."
- ✅ Botão "Ler mais"
- ✅ Touch feedback

#### 5. **Componente FeedList** (`src/shared/components/feed/FeedList.tsx`)
Renderiza lista otimizada com FlatList:
- ✅ State loading (spinner)
- ✅ State error (botão retry)
- ✅ State vazio (mensagem)
- ✅ State sucesso (lista de cards)
- ✅ Scroll otimizado

#### 6. **Integração no index.tsx**
```tsx
<View style={styles.feedSection}>
  <Text style={styles.feedTitle}>📰 Comunicados e Notícias</Text>
  <FeedList
    posts={posts}
    loading={loading}
    error={error}
    onPostPress={handlePostPress}
    onRetry={retry}
  />
</View>
```

---

## 🚀 COMO USAR

### Backend Setup

#### 1. Criar Migration
```bash
cd backend
npx prisma migrate dev --name create_posts_table
```

#### 2. Seed do Banco
```bash
npx prisma db seed
```

#### 3. Iniciar Servidor
```bash
npm run start:dev
```

Servidor rodando em: `http://localhost:3000`

### Frontend Setup

#### 1. Instalar dependências
```bash
cd frontend
npm install
```

#### 2. Configurar API URL
Verificar em `src/config/api.config.ts`

#### 3. Iniciar App
```bash
npm run dev
```

---

## 📡 FLUXO DE DADOS

```
Frontend (useFeedPosts hook)
  ↕ HTTP GET /posts
Backend (PostsController)
  ↕ SQL Query
PostgreSQL Database
```

---

## ✅ Status: Implementação Concluída!
