# Build version
FROM node:16-slim as BUILDER
LABEL maintainer="Dyego Soriano"
LABEL version="1.0"

WORKDIR /usr/app

COPY . .

RUN yarn install \
    && yarn build \
    && rm -rf node_modules \
    && yarn install --production

# Final version
FROM node:16-alpine3.14

WORKDIR /usr/app

COPY --from=BUILDER /usr/app/ ./

EXPOSE 3333

CMD ["yarn", "start"]