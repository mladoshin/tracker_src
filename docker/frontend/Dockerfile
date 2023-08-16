###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:lts-alpine As dev

WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY --chown=node:node . .

USER node


###################
# BUILD FOR PRODUCTION
###################

FROM node:lts-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock ./



RUN yarn install --production --frozen-lockfile && yarn cache clean

COPY --chown=node:node . .

ENV NODE_ENV production

RUN yarn run build:prod

USER node

###################
# PRODUCTION
###################

FROM node:lts-alpine As prod

COPY --chown=node:node --from=build /usr/src/app/build ./build


