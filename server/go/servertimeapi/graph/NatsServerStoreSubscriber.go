package graph

import (
	"log"

	"github.com/nats-io/nats.go"
	"github.com/perkinelmer/servertime/graph/model"
)

type NatsServerStoreSubscriber struct {
	Connection *nats.EncodedConn
}

const SERVERS_CHANGED_EVENT = "servers-changed"

func (s *NatsServerStoreSubscriber) subscribeToServersChanged(subscriberDone <-chan struct{}) (<-chan *model.ServersChanged, error) {
	log.Println("Subscribing to servers changed notifications")
	subscriberC, err := s.addSubscriber(subscriberDone)
	if err != nil {
		return nil, err
	}
	return subscriberC, nil
}

func (s *NatsServerStoreSubscriber) addSubscriber(subscriberDone <-chan struct{}) (<-chan *model.ServersChanged, error) {
	channel := make(chan *model.ServersChanged)
	subscriber, err := s.Connection.Subscribe(SERVERS_CHANGED_EVENT, func(serversChanged *model.ServersChanged) {
		channel <- serversChanged
	})
	if err != nil {
		return nil, err
	}
	go s.listenToUnsubscribe(subscriberDone, subscriber, channel)
	return channel, nil
}

func (s *NatsServerStoreSubscriber) listenToUnsubscribe(subscriberDone <-chan struct{}, subscriber *nats.Subscription, serversChangedChannel chan *model.ServersChanged) {
	defer subscriber.Unsubscribe()
	defer close(serversChangedChannel)
	<-subscriberDone
	log.Printf("Unsubscribed from servers changed notification")
}

var _ ServerStoreSubscriber = (*NatsServerStoreSubscriber)(nil)