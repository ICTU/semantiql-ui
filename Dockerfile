FROM node:11.10.0-alpine as BUILD
COPY . /app
WORKDIR /app
RUN npm ci
RUN npm run build

FROM abiosoft/caddy
COPY --from=BUILD /app/build /srv
COPY Caddyfile /etc/Caddyfile

