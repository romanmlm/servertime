package server

type ServerStore interface {
	Add(serverName string) (string, error)
	Remove(id string) error
	Get(id string) (*Server, error)
	List() ([]*Server, error)
}
