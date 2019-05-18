FROM node:7.7.2-alpine

WORKDIR /alten-realtime

COPY package.json .
RUN npm install --quiet

COPY . .
CMD ["npm", "start"]