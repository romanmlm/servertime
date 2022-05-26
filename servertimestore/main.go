package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"

	"github.com/nats-io/nats.go"
	"github.com/romanmlm/servertime/servertimestore/server"
)

func getNatsUrl() string {
	url, ok := os.LookupEnv("NATS_URL")
	if ok {
		log.Println("Found NATS_URL environment variable:", url)
		return url
	}
	log.Println("NATS_URL environment variable is not defined. Using the default:", nats.DefaultURL)
	return nats.DefaultURL
}

func main() {
	exitChannel := make(chan os.Signal)
	signal.Notify(exitChannel, os.Interrupt)
	natsUrl := getNatsUrl()
	store := server.InitInMemStore()
	natsStore, err := server.InitNatsStore(natsUrl, store)
	if err != nil {
		log.Println("Failed to start server store:")
		panic(err)
	}
	defer func() {
		log.Println("Closing server store ...")
		natsStore.Close()
	}()

	log.Println("Starting server store ...")
	err = natsStore.Start()
	if err != nil {
		log.Println("Failed to start server store")
		panic(err)
	}
	fmt.Println("Server store started. Press Ctrl+C to stop ...")

	<-exitChannel
}
