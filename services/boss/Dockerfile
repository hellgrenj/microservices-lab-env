FROM node:12-alpine
WORKDIR /app
COPY . .
RUN npm install && npm install typescript -g
EXPOSE 3000
ENTRYPOINT ["npm","run", "start"]
