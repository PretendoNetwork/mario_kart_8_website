# syntax=docker/dockerfile:1

ARG app_dir="/home/node/app"


# * Base Node.js image
FROM node:20-alpine AS base
ARG app_dir
WORKDIR ${app_dir}


# * Installing all dependencies and building the application
FROM base AS build

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .
RUN npm run build


# * Running the final application
FROM base AS final
ARG app_dir

RUN mkdir .next

ENV NODE_ENV=production
ENV PORT=3000
USER node

EXPOSE 3000

COPY --from=build ${app_dir}/public ${app_dir}/public

COPY --from=build ${app_dir}/.next/standalone ${app_dir}
COPY --from=build ${app_dir}/.next/static ${app_dir}/.next/static

CMD ["node", "server.js"]
