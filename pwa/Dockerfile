FROM node:18 AS builder
# Set working directory
WORKDIR /app

COPY package.json package-lock.json ./

# Copy all files from current directory to working dir in image
# install node modules and build assets
RUN npm install

RUN npm install @parcel/watcher

COPY . .

RUN npm run build

FROM nginx
COPY --from=builder /app/public /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx && chmod -R 755 /usr/share/nginx && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf
USER nginx
EXPOSE 8080
