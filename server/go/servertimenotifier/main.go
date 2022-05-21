package main

import (
	"log"
	"os"
	"os/signal"

	"github.com/nats-io/nats.go"
	"github.com/perkinelmer/servertimenotifier/notifier"
)

func main() {
	println("Hello from servertimenotifier")
	exitChannel := make(chan os.Signal)
	signal.Notify(exitChannel, os.Interrupt)

	tickerNotifier := notifier.InitTickerNotifier()
	defer tickerNotifier.Close()

	log.Println("Connecting to nats")
	nn, err := notifier.InitNatsNotifier(nats.DefaultURL, tickerNotifier)

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
