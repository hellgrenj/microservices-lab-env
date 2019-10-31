package main

import (
	"fmt"
	"log"
	"net/http"
	"math/rand"
  	"time"
)

func handler(writer http.ResponseWriter, reader *http.Request) {
	seconds := make([]int, 0)
	seconds = append(seconds,
		10,
		22,
		37,
		18)
	rand.Seed(time.Now().Unix()) // initialize global pseudo random generator
	fmt.Fprintf(writer, "%d seconds left to your next meeting", seconds[rand.Intn(len(seconds))] )
}

func main() {
	http.HandleFunc("/timetonextmeeting", handler)
	log.Print("now listening on port 1337")
	http.ListenAndServe(":1337", nil)
	
}
