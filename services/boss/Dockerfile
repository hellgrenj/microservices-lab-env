FROM node:12-alpine
WORKDIR /app
COPY . .
RUN npm install -only=production && npm install typescript -g
EXPOSE 3000
ENTRYPOINT ["node","dist/server.js"]
