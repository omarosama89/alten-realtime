FROM node:7.7.2-alpine

WORKDIR /realtime_code

COPY . /realtime_code
RUN npm install --quiet

