package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"

	"github.com/nats-io/nats.go"
	"github.com/romanmlm/servertimestore/server"
)

func main() {
	exitChannel := make(chan os.Signal)
	signal.Notify(exitChannel, os.Interrupt)

	log.Println("Connecting to nats at:", nats.DefaultURL)
	store := server.InitInMemStore()
	natsStore, err := server.InitNatsStore(nats.DefaultURL, store)
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
