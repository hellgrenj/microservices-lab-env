FROM golang:1.13-buster
WORKDIR /app
COPY . .
ENV GOBIN /go/bin

RUN go get -v github.com/gomodule/redigo/redis
RUN go build -o server .
EXPOSE 1337
CMD ["./server"]