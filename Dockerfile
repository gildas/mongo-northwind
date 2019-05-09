#FROM node:10-alpine
FROM node:10
LABEL vendor="GENESYS, Inc."
LABEL maintainer="Gildas Cherruel <gildas.cherruel@genesys.com>"

ENV APP_ROOT /usr/local/src

#set our node environment
ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}
ARG MONGODB=localhost
ENV MONGODB ${MONGODB}
ARG PORT=3000
ENV PORT ${PORT}

# Expose web port
EXPOSE ${PORT}

# Install app dependencies
#RUN apk update && apk upgrade && apk add git

# Install application, dependencies first
WORKDIR ${APP_ROOT}
COPY package.json yarn.lock ${APP_ROOT}/
RUN  yarn install
ENV  PATH ${APP_ROOT}/node_modules/.bin:$PATH

COPY . ${APP_ROOT}/
RUN yarn run build

CMD [ "yarn", "start" ]
