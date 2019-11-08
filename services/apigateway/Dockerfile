FROM node:12-alpine
WORKDIR /app
COPY . .
RUN npm install -only=production
EXPOSE 8585
ENTRYPOINT ["npm","run", "start"]
