package notifier

import (
	"fmt"
	"log"
	"time"

	"github.com/nats-io/nats.go"
)

type NatsNotifier struct {
	connection    *nats.EncodedConn
	subscriptions map[string]*nats.Subscription
	notifier      Notifier
}

const (
	START_NOTIFIER_MSG = "start-notifier"
	STOP_NOTIFIER_MSG  = "stop-notifier"
	LIST_NOTIFIERS_MSG = "list-notifiers"
)

func InitNatsNotifier(natsUrl string, notifier Notifier) (*NatsNotifier, error) {
	nc, err := nats.Connect(natsUrl)
	if err != nil {
		return nil, err
	}
	connection, _ := nats.NewEncodedConn(nc, nats.JSON_ENCODER)
	subscriptions := make(map[string]*nats.Subscription)
	return &NatsNotifier{connection, subscriptions, notifier}, nil
}

func (n *NatsNotifier) Listen() error {
	go n.listenToTicks(n.notifier.GetNotifierChannel())
	err := n.subscribeToStart()
	if err != nil {
		return err
	}

	err = n.subscribeToStop()
	if err != nil {
		return err
	}

	err = n.subscribeToList()
	if err != nil {
		return err
	}

	return nil
}

func (n *NatsNotifier) Start(id string) error {
	log.Println("Starting nats tickerNotifier for id:", id)
	return n.notifier.Start(id)
}

func (n *NatsNotifier) Stop(id string) error {
	log.Println("Stopping nats tickerNotifier for id:", id)
	return n.notifier.Stop(id)
}

func (n *NatsNotifier) List() ([]string, error) {
	log.Println("Listing nats tickerNotifiers")
	return n.notifier.List()
}

func (n *NatsNotifier) Close() {
	log.Println("Closing nats notifier")
	defer n.connection.Close()
	if _, ok := n.subscriptions[START_NOTIFIER_MSG]; ok {
		log.Println("Unsubscribing from:", START_NOTIFIER_MSG)
		n.subscriptions[START_NOTIFIER_MSG].Unsubscribe()
	}
	if _, ok := n.subscriptions[STOP_NOTIFIER_MSG]; ok {
		log.Println("Unsubscribing from:", STOP_NOTIFIER_MSG)
		n.subscriptions[STOP_NOTIFIER_MSG].Unsubscribe()
	}
	if _, ok := n.subscriptions[LIST_NOTIFIERS_MSG]; ok {
		log.Println("Unsubscribing from:", LIST_NOTIFIERS_MSG)
		n.subscriptions[LIST_NOTIFIERS_MSG].Unsubscribe()
	}
}

func (n *NatsNotifier) subscribeToStart() error {
	log.Println("Subscribing to:", START_NOTIFIER_MSG)
	sub, err := n.connection.Subscribe(START_NOTIFIER_MSG, func(sub, reply string, id string) {
		log.Println("Handling", START_NOTIFIER_MSG)
		e := n.Start(id)
		if e != nil {
			n.connection.Publish(reply, startStopNotifierReply{Success: false, Message: e.Error()})
		} else {
			n.connection.Publish(reply, startStopNotifierReply{Success: true})
		}
	})

	if err != nil {
		log.Println("Failed to subscribe to:", START_NOTIFIER_MSG)
		return err
	}

	n.subscriptions[START_NOTIFIER_MSG] = sub

	return nil
}

func (n *NatsNotifier) subscribeToStop() error {
	log.Println("Subscribing to:", STOP_NOTIFIER_MSG)
	sub, err := n.connection.Subscribe(STOP_NOTIFIER_MSG, func(sub, reply string, id string) {
		log.Println("Handling", STOP_NOTIFIER_MSG)
		e := n.Stop(id)
		if e != nil {
			n.connection.Publish(reply, startStopNotifierReply{Success: false, Message: e.Error()})
		} else {
			n.connection.Publish(reply, startStopNotifierReply{Success: true})
		}
	})

	if err != nil {
		log.Println("Failed to subscribe to:", STOP_NOTIFIER_MSG)
		return err
	}

	n.subscriptions[STOP_NOTIFIER_MSG] = sub

	return nil
}

func (n *NatsNotifier) subscribeToList() error {
	log.Println("Subscribing to:", LIST_NOTIFIERS_MSG)
	sub, err := n.connection.Subscribe(LIST_NOTIFIERS_MSG, func(sub, reply string, id string) {
		log.Println("Handling", LIST_NOTIFIERS_MSG)
		ids, e := n.List()
		if e != nil {
			n.connection.Publish(reply, listNotifiersReply{Success: false, Message: e.Error()})
		} else {
			n.connection.Publish(reply, listNotifiersReply{Success: true, IDs: ids})
		}
	})

	if err != nil {
		log.Println("Failed to subscribe to:", LIST_NOTIFIERS_MSG)
		return err
	}

	n.subscriptions[LIST_NOTIFIERS_MSG] = sub

	return nil
}

func (n *NatsNotifier) listenToTicks(tickerChannel <-chan struct {
	d  time.Duration
	id string
}) {
	for tick := range tickerChannel {
		log.Println("Ticker fired for id:", tick.id)
		n.connection.Publish(fmt.Sprintf("server-seconds-%s", tick.id), int(tick.d.Seconds()))
	}
}
