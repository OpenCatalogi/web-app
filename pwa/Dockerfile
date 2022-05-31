FROM node:14 AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# install node modules and build assets
RUN yarn install && yarn build

FROM nginx
EXPOSE 80
COPY --from=builder /app/public /usr/share/nginx/html
