FROM node:18-alpine

WORKDIR /usr/src/app/client

COPY . .
RUN npm install --production
RUN npm run build

CMD ["npm", "start"]