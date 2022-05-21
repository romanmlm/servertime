# stage1 as builder
FROM node:14-alpine as builder

COPY package.json package-lock.json ./

RUN mkdir - ./node_modules

# Install the dependencies and make the folder
RUN npm install typescript -g

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

## Copy from the stage 1
COPY --from=builder /build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]