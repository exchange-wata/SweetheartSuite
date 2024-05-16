FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm i @nestjs/cli -g

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start:dev"]
