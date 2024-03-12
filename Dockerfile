FROM node:18-alpine as base
WORKDIR /opt

RUN apk update && apk upgrade

COPY --chown=node:node package*.json ./

USER root

FROM base as build

ENV NODE_ENV development

COPY --chown=node:node . .

RUN npm install && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

RUN npm run frontend-build

FROM base as modules

RUN npm install && npm cache clean --force

FROM base as production

COPY --from=build --chown=node:node /opt/dist ./dist
COPY --from=modules --chown=node:node /opt/node_modules ./node_modules

CMD nodemon /opt/src/backend/app.mjs