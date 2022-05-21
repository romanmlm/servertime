package server

import (
	"log"

	"github.com/nats-io/nats.go"
)

type NatsStore struct {
	connection    *nats.EncodedConn
	subscriptions map[string]*nats.Subscription
	store         ServerStore
}

const (
	ADD_SERVER_MSG      = "add-server"
	REMOVE_SERVER_MSG   = "remove-server"
	GET_SERVER_MSG      = "get-server"
	LIST_SERVERS_MSG    = "list-servers"
	SERVERS_CHANGED_MSG = "servers-changed"
)

func InitNatsStore(natsUrl string, store ServerStore) (*NatsStore, error) {
	nc, err := nats.Connect(natsUrl)
	if err != nil {
		return nil, err
	}
	connection, _ := nats.NewEncodedConn(nc, nats.JSON_ENCODER)
	subscriptions := make(map[string]*nats.Subscription)
	return &NatsStore{connection, subscriptions, store}, nil
}

func (s *NatsStore) Start() error {
	return s.subscribe()
}

func (s *NatsStore) Close() {
	defer s.connection.Close()

	if _, ok := s.subscriptions[ADD_SERVER_MSG]; ok {
		s.subscriptions[ADD_SERVER_MSG].Unsubscribe()
	}
	if _, ok := s.subscriptions[REMOVE_SERVER_MSG]; ok {
		s.subscriptions[REMOVE_SERVER_MSG].Unsubscribe()
	}
	if _, ok := s.subscriptions[GET_SERVER_MSG]; ok {
		s.subscriptions[GET_SERVER_MSG].Unsubscribe()
	}
	if _, ok := s.subscriptions[LIST_SERVERS_MSG]; ok {
		s.subscriptions[LIST_SERVERS_MSG].Unsubscribe()
	}
}

func (s *NatsStore) subscribe() error {
	err := s.subscribeToAdd()
	if err != nil {
		return err
	}

	err = s.subscribeToRemove()
	if err != nil {
		return err
	}

	err = s.subscribeToGet()
	if err != nil {
		return err
	}

	err = s.subscribeToList()
	if err != nil {
		return err
	}

	return nil
}

func (s *NatsStore) subscribeToAdd() error {
	log.Println("Subscribing to:", ADD_SERVER_MSG)
	sub, err := s.connection.Subscribe(ADD_SERVER_MSG, func(sub, reply string, serverName string) {
		log.Println("Handling", ADD_SERVER_MSG)
		id, e := s.add(serverName)
		if e != nil {
			s.connection.Publish(reply, addServerReply{Success: false, Message: e.Error()})
		} else {
			s.connection.Publish(reply, addServerReply{ID: id, Success: true})
			s.connection.Publish(SERVERS_CHANGED_MSG, serversChanged{Added: []*Server{{id, serverName}}})
		}
	})

	if err != nil {
		log.Println("Failed to subscribe to:", ADD_SERVER_MSG)
		return err
	}

	s.subscriptions[ADD_SERVER_MSG] = sub

	return nil
}

func (s *NatsStore) subscribeToRemove() error {
	log.Println("Subscribing to:", REMOVE_SERVER_MSG)
	sub, err := s.connection.Subscribe(REMOVE_SERVER_MSG, func(sub, reply string, id string) {
		log.Println("Handling", REMOVE_SERVER_MSG)
		e := s.remove(id)
		if e != nil {
			s.connection.Publish(reply, removeServerReply{Success: false, Message: e.Error()})
		} else {
			s.connection.Publish(reply, removeServerReply{Success: true})
			s.connection.Publish(SERVERS_CHANGED_MSG, serversChanged{Removed: []string{id}})
		}
	})
	if err != nil {
		log.Println("Failed to subscribe to:", REMOVE_SERVER_MSG)
		return err
	}

	s.subscriptions[REMOVE_SERVER_MSG] = sub

	return nil
}

func (s *NatsStore) subscribeToGet() error {
	log.Println("Subscribing to:", GET_SERVER_MSG)
	sub, err := s.connection.Subscribe(GET_SERVER_MSG, func(sub, reply, id string) {
		log.Println("Handling", GET_SERVER_MSG)
		server, e := s.get(id)
		if e != nil {
			s.connection.Publish(reply, getServerReply{Server: server, Success: false, Message: e.Error()})
		} else {
			s.connection.Publish(reply, getServerReply{Server: server, Success: true})
		}
	})
	if err != nil {
		log.Println("Failed to subscribe to:", GET_SERVER_MSG)
		return err
	}
	s.subscriptions[GET_SERVER_MSG] = sub

	return nil
}

func (s *NatsStore) subscribeToList() error {
	log.Println("Subscribing to:", LIST_SERVERS_MSG)
	sub, err := s.connection.Subscribe(LIST_SERVERS_MSG, func(msg *nats.Msg) {
		log.Println("Handling", LIST_SERVERS_MSG)
		servers, e := s.list()
		if e != nil {
			s.connection.Publish(msg.Reply, listServersReply{Servers: servers, Success: false, Message: e.Error()})
		} else {
			s.connection.Publish(msg.Reply, listServersReply{Servers: servers, Success: true})
		}
	})
	if err != nil {
		log.Println("Failed to subscribe to:", LIST_SERVERS_MSG)
		return err
	}
	s.subscriptions[LIST_SERVERS_MSG] = sub

	return nil
}

func (s *NatsStore) add(serverName string) (string, error) {
	return s.store.Add(serverName)
}

func (s *NatsStore) remove(id string) error {
	return s.store.Remove(id)
}

func (s *NatsStore) get(id string) (*Server, error) {
	return s.store.Get(id)
}

func (s *NatsStore) list() ([]*Server, error) {
	return s.store.List()
}
