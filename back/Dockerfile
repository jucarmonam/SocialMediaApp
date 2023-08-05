FROM node:18-alpine

RUN npm i -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml tsconfig.json tsconfig.build.json ./

RUN pnpm install

COPY src/ ./src/

COPY prisma/ ./prisma/

RUN pnpm run build

EXPOSE 3000

CMD [ "node", "dist/main.js" ]