FROM node:12-alpine
WORKDIR /app
COPY . .
WORKDIR /app/client
RUN npm install
RUN npm run build
WORKDIR /app
RUN npm install -only=production
EXPOSE 4000
ENTRYPOINT ["npm","run","start"]