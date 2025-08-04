FROM rust:1-alpine3.20 as rust

RUN apk add --no-cache \
  build-base \
  openssl-dev \
  pkgconfig \
  musl-dev

RUN cargo install sqlx-cli --no-default-features --features rustls,postgres

FROM oven/bun:canary-alpine as bun

WORKDIR /app

FROM bun AS install

COPY package.json bun.lock /app/

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

# copy production dependencies and source code into final image
FROM bun AS release

COPY --from=install /app/dist /app/dist
COPY --from=rust /usr/local/cargo/bin/sqlx /usr/local/bin/sqlx

# run the app
EXPOSE 3000

CMD [ "bun", "--cwd=dist/server", "run", "index.js" ]
