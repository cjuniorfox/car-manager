FROM node
WORKDIR /usr/src/app
COPY ./dist/car-manager .
EXPOSE 3001
RUN npm install -g http-server
CMD http-server -c-1 -p 3001 .
