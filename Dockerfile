#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM node:15.14.0-alpine AS base
WORKDIR /app
RUN npm install --global serve
RUN apk update && apk add --no-cache git
ARG REACT_APP_MAIN_URL=localhost:5000
ENV REACT_APP_MAIN_URL=$REACT_APP_MAIN_URL
EXPOSE 3000

FROM base AS restore
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .

FROM restore AS build
RUN npm run build


FROM base AS final
WORKDIR /app
RUN apk update && apk add --no-cache curl
HEALTHCHECK --interval=5s --timeout=10s --retries=3 CMD curl --silent --fail http://localhost/feed || exit 1
COPY --from=build /src/build .
ENTRYPOINT ["serve","-s"]