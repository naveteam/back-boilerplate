FROM node:12.16.1-alpine3.9

WORKDIR /app

COPY package*.json /app

ENV YARN_VERSION 1.22.1

RUN apk add --no-cache --virtual .build-deps-yarn curl \
    && curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
    && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
    && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarn /usr/local/bin/yarn \
    && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarnpkg /usr/local/bin/yarnpkg \
    && rm yarn-v$YARN_VERSION.tar.gz \
    && apk del .build-deps-yarn

RUN yarn install --production --no-progress --frozen-lockfile
COPY . /app
RUN yarn build

COPY . .
COPY --chown=node:node . .
USER node

EXPOSE 3000

CMD ["yarn", "start"]
