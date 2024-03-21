FROM node:20

RUN echo "@ken dockerfile starting"

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5000

CMD [ "index.js" ]