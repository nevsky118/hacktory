FROM node:18-alpine

WORKDIR /usr/src/app/server

COPY tsconfig*.json ./
COPY package*.json ./

RUN npm ci --omit=dev

COPY src/ src/

RUN npm run build

CMD [ "node", "dist/main.js" ]