FROM node:18-alpine AS base

WORKDIR /app

COPY package.json yarn.lock tsconfig.base.json ./
COPY packages/frontend/package.json ./packages/frontend/

RUN yarn install --frozen-lockfile

COPY packages/frontend ./packages/frontend

WORKDIR /app/packages/frontend
RUN yarn build

FROM nginx:alpine AS production

COPY --from=base /app/packages/frontend/dist /usr/share/nginx/html

COPY packages/frontend/docker/config/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
