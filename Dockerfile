FROM node:10-alpine
LABEL vendor="GENESYS, Inc."
LABEL maintainer="Gildas Cherruel <gildas.cherruel@genesys.com>"

ENV APP_ROOT /usr/local/src
WORKDIR ${APP_ROOT}

#set our node environment
ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}
ARG HOST=0.0.0.0
ENV HOST ${HOST}
ARG DB_HOST=localhost
ENV DB_HOST ${DB_HOST}
ARG PORT=3000
ENV PORT ${PORT}

# Expose web port
EXPOSE ${PORT}

# Install application, dependencies first
COPY . ${APP_ROOT}/
ENV  PATH ${APP_ROOT}/node_modules/.bin:$PATH
RUN  yarn install
RUN  yarn run build

USER node

CMD [ "yarn", "start" ]
