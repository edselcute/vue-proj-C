FROM node:15.4 as build
WORKDIR /app
COPY package*.json ./

RUN npm install \ 
    npm update 

COPY . ./

RUN npm run build 

FROM nginx:latest
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf "/usr/share/nginx/html/*"
COPY --from=build /app/dist /usr/share/nginx/html