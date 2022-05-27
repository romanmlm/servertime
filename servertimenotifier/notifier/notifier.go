package notifier

import "time"

type Notifier interface {
	Start(id string) error
	Stop(id string) error
	List() ([]string, error)
	IsServerRunning(id string) (bool, error)
	GetNotifierChannel() <-chan struct {d time.Duration; id string}
	Close()
}