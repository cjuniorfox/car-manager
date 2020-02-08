FROM node
WORKDIR /usr/src/app
COPY ./dist/car-manager .
EXPOSE 3001
RUN npm install -g angular-http-server
CMD angular-http-server -p 3001 --silent .
