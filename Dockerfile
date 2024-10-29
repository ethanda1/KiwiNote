FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY server ./server

EXPOSE 3001

CMD ["node", "server/server.mjs"]