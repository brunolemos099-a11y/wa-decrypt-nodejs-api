FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache git

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3030

CMD ["npm", "start"]