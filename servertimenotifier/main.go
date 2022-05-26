package main

import (
	"log"
	"os"
	"os/signal"

	"github.com/nats-io/nats.go"
	"github.com/romanmlm/servertime/servertimenotifier/notifier"
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
	println("Hello from servertimenotifier")
	exitChannel := make(chan os.Signal)
	signal.Notify(exitChannel, os.Interrupt)

	tickerNotifier := notifier.InitTickerNotifier()
	defer tickerNotifier.Close()

	log.Println("Connecting to nats")
	nn, err := notifier.InitNatsNotifier(getNatsUrl(), tickerNotifier)

	if err != nil {
		panic(err)
	}
	defer nn.Close()

	err = nn.Listen()
	if err != nil {
		panic(err)
	}
	log.Println("Listening for messages. Press Ctrl+C to exit ...")

	<-exitChannel
}
