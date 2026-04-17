# 🧱 Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# copy package
COPY package*.json ./

RUN npm install

# copy source
COPY . .

# build project
RUN npm run build


# 🚀 Stage 2: Serve with nginx
FROM nginx:alpine

# remove default nginx config
RUN rm -rf /usr/share/nginx/html/*

# copy build files
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
