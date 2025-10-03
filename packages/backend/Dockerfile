FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

COPY package.json yarn.lock tsconfig.base.json ./
COPY packages/backend/package.json ./packages/backend/
COPY packages/backend/tsconfig.json ./packages/backend/
COPY packages/backend/tsconfig.build.json ./packages/backend/
COPY packages/backend/tsconfig.seed.json ./packages/backend/

RUN yarn install --frozen-lockfile

COPY packages/backend ./packages/backend

WORKDIR /app/packages/backend
RUN yarn prisma:generate
RUN yarn build

RUN ls -la dist

FROM node:18-alpine AS production

RUN apk add --no-cache openssl

WORKDIR /app/packages/backend

COPY --from=base /app/node_modules /app/node_modules

COPY --from=base /app/packages/backend/package.json ./
COPY --from=base /app/packages/backend/node_modules ./node_modules
COPY --from=base /app/packages/backend/dist ./dist
COPY --from=base /app/packages/backend/prisma ./prisma
COPY --from=base /app/packages/backend/tsconfig.seed.json ./packages/backend/

# Verificar estrutura
RUN ls -la dist

EXPOSE 3001

CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node dist/server.js"]
