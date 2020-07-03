FROM node:12.16.1-alpine3.9

WORKDIR /app

COPY package*.json ./

RUN yarn install --production --no-progress --frozen-lockfile

COPY . .

RUN yarn build

COPY --chown=node:node . .
USER node

EXPOSE 3000

CMD ["yarn", "start"]
