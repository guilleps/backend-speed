FROM node:22.14.0

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
COPY .env .env

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
