FROM node:15.9.0-alpine

WORKDIR /app

ENV HOST=0.0.0.0
ENV NODE_ENV=develop

COPY ./package*.json /app/
RUN npm ci

EXPOSE 8000

COPY . /app

CMD npm start
