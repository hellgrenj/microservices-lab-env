FROM node:12-alpine
WORKDIR /app
COPY . .
RUN npm install -only=production && npm install tsc -g
EXPOSE 3000
ENTRYPOINT ["node","dist/server.js"]