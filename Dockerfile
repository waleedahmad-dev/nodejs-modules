FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm i -g nodemon
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]