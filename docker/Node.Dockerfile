ARG NODE_VERSION=20.5.1
ARG STAGE=test

FROM node:${NODE_VERSION} as base

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN apt-get update && \
    apt-get install -y python3 && \
    npm i && \
    npm i -g node-gyp

RUN cd addon && \
    node-gyp clean && \
    node-gyp remove v${NODE_VERSION} && \
    node-gyp configure && \
    node-gyp build

FROM base as test
CMD [ "npm", "run", "test" ]

FROM base as main
CMD [ "npm", "run", "dev" ]

FROM ${STAGE} AS after
FROM after