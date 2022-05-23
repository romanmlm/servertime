package server

import (
	"fmt"
	"sync"

	"github.com/google/uuid"
)

type InMemStore struct {
	servers map[string]*Server
	lock    sync.RWMutex
}

func InitInMemStore() *InMemStore {
	return &InMemStore{make(map[string]*Server), sync.RWMutex{}}
}

func (s *InMemStore) Add(serverName string) (string, error) {
	s.lock.Lock()
	defer s.lock.Unlock()
	id := uuid.NewString()
	s.servers[id] = &Server{id, serverName}
	return id, nil
}

func (s *InMemStore) Remove(id string) error {
	s.lock.Lock()
	defer s.lock.Unlock()
	if _, ok := s.servers[id]; !ok {
		return fmt.Errorf("server with id %s not found", id)
	}
	delete(s.servers, id)
	return nil
}

func (s *InMemStore) Get(id string) (*Server, error) {
	s.lock.RLock()
	defer s.lock.RUnlock()
	if server, ok := s.servers[id]; !ok {
		return nil, fmt.Errorf("server with id %s not found", id)
	} else {
		return server, nil
	}
}

func (s *InMemStore) List() ([]*Server, error) {
	s.lock.RLock()
	defer s.lock.RUnlock()
	var servers []*Server
	for _, server := range s.servers {
		servers = append(servers, server)
	}
	return servers, nil
}
