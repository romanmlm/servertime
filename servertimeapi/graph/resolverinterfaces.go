package graph

import (
	"github.com/romanmlm/servertime/servertimeapi/graph/custommodel"
	"github.com/romanmlm/servertime/servertimeapi/graph/model"
)

type ServerTimeDataSource interface {
	addServer(name string) (string, error)
	removeServer(id string) (bool, error)
	startServer(id string) (bool, error)
	stopServer(id string) (bool, error)
	getServer(id string) (*custommodel.Server, error)
	getServers() ([]*custommodel.Server, error)
	isServerRunning(id string) (bool, error)
}

type ServerTimeSubscriber interface {
	subscribeToServerTick(subscriberDone <-chan struct{}, id string) (<-chan int, error)
}

type ServerStoreSubscriber interface {
	subscribeToServersChanged(subscriberDone <-chan struct{}) (<-chan *model.ServersChanged, error)
}
