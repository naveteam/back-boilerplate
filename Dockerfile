FROM node:10.13.0

ENV HOME=/home/app

COPY package.json yarn.lock $HOME/boilerplate/

WORKDIR $HOME/boilerplate

RUN yarn

COPY . $HOME/boilerplate

CMD ["npm", "start"]
