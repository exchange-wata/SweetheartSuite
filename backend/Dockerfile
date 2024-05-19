FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm i @nestjs/cli -g

COPY . .

EXPOSE 3001

RUN apt-get update -y && apt-get install -y openssl

CMD ["npm", "run", "start:dev"]
