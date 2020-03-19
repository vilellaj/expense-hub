# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:13.10.1 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.17.8-alpine

# Install curl
RUN apk add curl

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Health check container
HEALTHCHECK --interval=60s --timeout=3s CMD curl --fail http://localhost || exit 1