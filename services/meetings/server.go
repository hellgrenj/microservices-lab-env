package main

import (
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/gomodule/redigo/redis"
)

var (
	Pool *redis.Pool
)

func handler(writer http.ResponseWriter, reader *http.Request) {
	enableCors(&writer)
	seconds := make([]int, 0)
	seconds = append(seconds,
		10,
		22,
		37,
		18)
	rand.Seed(time.Now().Unix()) // initialize global pseudo random generator
	fmt.Fprintf(writer, "%d seconds left to your next meeting", seconds[rand.Intn(len(seconds))])
	c, err := redis.Dial("tcp", "redis:6379")
	defer c.Close()
	if err != nil {
		return
	}
	c.Do("PUBLISH", "systemevents", "MEETINGS_SERVICE > (GET) /timetonextmeeting")
}

func main() {

	http.HandleFunc("/timetonextmeeting", handler)
	log.Print("now listening on port 1337")
	http.ListenAndServe(":1337", nil)
}
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
