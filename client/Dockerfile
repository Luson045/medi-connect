FROM node:18

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY  . .

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]