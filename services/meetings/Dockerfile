FROM golang:1.13-alpine
WORKDIR /app
COPY . .
RUN go build -o server .
EXPOSE 1337
CMD ["./server"]