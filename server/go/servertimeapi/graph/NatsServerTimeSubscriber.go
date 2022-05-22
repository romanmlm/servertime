package graph

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/nats-io/nats.go"
)

type NatsServerTimeSubscriber struct {
	Connection *nats.Conn
}

const SERVER_SECONDS_EVENT = "server-seconds"

func (s *NatsServerTimeSubscriber) subscribeToServerTick(subscriberDone <-chan struct{}, id string) (<-chan int, error) {
	log.Println("Subscribing to server time notifications with id:", id)
	subscriberC, err := s.addSubscriber(subscriberDone, id)
	if err != nil {
		return nil, err
	}
	return subscriberC, nil
}

func (s *NatsServerTimeSubscriber) addSubscriber(subscriberDone <-chan struct{}, id string) (chan int, error) {
	serverSeconds := fmt.Sprintf("%s-%s", SERVER_SECONDS_EVENT, id)
	log.Println("Subscribing to:", serverSeconds)

	channel := make(chan *nats.Msg)
	timeSubscriber, err := s.Connection.ChanSubscribe(serverSeconds, channel)
	if err != nil {
		return nil, err
	}
	subscriberC := s.serverTimeChannel(channel, id)
	go s.listenToUnsubscribe(subscriberDone, timeSubscriber, subscriberC, id)
	return subscriberC, nil
}

func (s *NatsServerTimeSubscriber) listenToUnsubscribe(subscriberDone <-chan struct{}, timeSubscriber *nats.Subscription, serverTimeC chan int, id string) {
	defer timeSubscriber.Unsubscribe()
	defer close(serverTimeC)
	<-subscriberDone
	log.Printf("Unsubscribed id:%v from server time notifications\n", id)
}

func (s *NatsServerTimeSubscriber) serverTimeChannel(timeChannel <-chan *nats.Msg, id string) chan int {
	serverTimeC := make(chan int)

	go func() {
		for timeJson := range timeChannel {
			var duration int
			err := json.Unmarshal(timeJson.Data, &duration)
			if err != nil {
				log.Println(err)
				continue
			}
			serverTimeC <- duration
		}
	}()

	return serverTimeC
}

var _ ServerTimeSubscriber = (*NatsServerTimeSubscriber)(nil)
