# Social Media Application

Aplicação web full-stack de rede social com autenticação JWT, feed de postagens e perfis de usuário.

## 🚀 Tecnologias

### Monorepo
- **Yarn Workspaces** - Gerenciamento de monorepo
- **TypeScript** - Tipagem estática

### Backend
- **Node.js + Express** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **Prisma ORM** - ORM moderno para TypeScript
- **JWT** - Autenticação stateless
- **Bcrypt** - Hash de senhas
- **Zod** - Validação de schemas
- **Jest + Supertest** - Testes automatizados

### Frontend
- **React 18** - Biblioteca UI
- **Vite** - Build tool e dev server
- **TypeScript** - Tipagem estática
- **shadcn/ui** - Componentes UI
- **Tailwind CSS** - Estilização
- **React Hook Form + Zod** - Formulários e validação
- **Axios** - Cliente HTTP
- **React Router** - Roteamento
- **Jest + React Testing Library** - Testes

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- Yarn >= 1.22.0
- PostgreSQL >= 14

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/alef-carvalho/desafio-tecnico-social-media-app.git
cd desafio-tecnico-social-media-ap
```

### 2. Instale as dependências

```bash
yarn install
```

### 3. Configure as variáveis de ambiente

**Backend** (`packages/backend/.env`):
```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/social_media_db"

# JWT
JWT_SECRET="seu-secret-super-seguro-aqui"
JWT_EXPIRES_IN="7d"

# Server
PORT=3001
NODE_ENV=development
```

**Frontend** (`packages/frontend/.env`):
```env
VITE_API_URL=http://localhost:3001/api
```

### 4. Configure o banco de dados

```bash
# Gerar Prisma Client
yarn backend:prisma:generate

# Executar migrations
yarn backend:prisma:migrate:deploy
```

## 🚀 Executando a aplicação

### Desenvolvimento (Backend + Frontend simultaneamente)

```bash
yarn dev
```

Isso iniciará:
- Backend em: `http://localhost:3001`
- Frontend em: `http://localhost:5173`

### Executar separadamente

**Backend apenas:**
```bash
yarn workspace @social-media/backend dev
```

**Frontend apenas:**
```bash
yarn workspace @social-media/frontend dev
```

# 🚀 Executar via Docker

A infraestrutura necessária para subir a aplicação será configurada com base no arquivo `.env.local` na raiz do projeto:

```bash
# Subir tudo (PostgreSQL + Backend + Frontend)
docker-compose up -d

# Popular com dados de teste (opcional)
docker-compose exec backend yarn prisma:seed

# Acessar aplicação
# Frontend: http://localhost
# Backend: http://localhost:3001
```

**Login de teste:**
- Email: `csilva.alef@gmail.com`
- Senha: `abc12345`

## 🧪 Testes

### Executar todos os testes

```bash
yarn test
```

### Testes do Backend

```bash
yarn test:backend
```

### Testes do Frontend

```bash
yarn test:frontend
```

## 📚 API

### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Dados do usuário logado (protegida)

### Posts
- `GET /api/posts` - Listar posts (pública)
- `POST /api/posts` - Criar post (protegida)
- `PUT /api/posts/:id` - Editar post (protegida)
- `DELETE /api/posts/:id` - Deletar post (protegida)

### Perfil
- `GET /api/profile` - Ver perfil (protegida)
- `PUT /api/profile` - Atualizar perfil (protegida)

## 👨‍💻 Autor

- [Alef Carvalho](mailto:csilva.alef@gmail.com)
