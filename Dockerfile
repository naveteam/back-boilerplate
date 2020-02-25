FROM node:12.16.1-alpine3.9

WORKDIR /app

COPY package*.json /app

RUN apk add --update curl \
  yarn


RUN yarn install
COPY . /app
RUN yarn build

COPY . .
COPY --chown=node:node . .
USER node

EXPOSE 3000

CMD [ "yarn", "start" ]
