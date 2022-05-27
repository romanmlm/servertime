package graph

import (
	"time"

	"github.com/nats-io/nats.go"
	"github.com/romanmlm/servertime/servertimeapi/graph/custommodel"
)

const (
	ADD_SERVER_MSG        = "add-server"
	REMOVE_SERVER_MSG     = "remove-server"
	GET_SERVER_MSG        = "get-server"
	LIST_SERVERS_MSG      = "list-servers"
	START_NOTIFIER_MSG    = "start-notifier"
	STOP_NOTIFIER_MSG     = "stop-notifier"
	LIST_NOTIFIERS_MSG    = "list-notifiers"
	IS_SERVER_RUNNING_MSG = "is-server-running"
)

const RESPONSE_TIMEOUT_SEC = 60 * time.Second

type NatsServerTimeDataSource struct {
	Connection *nats.EncodedConn
}

func (s *NatsServerTimeDataSource) addServer(name string) (string, error) {
	var server addServerReply
	err := s.Connection.Request(ADD_SERVER_MSG, name, &server, RESPONSE_TIMEOUT_SEC)
	if err != nil {
		return "", err
	}
	return server.ID, nil
}

func (s *NatsServerTimeDataSource) removeServer(id string) (bool, error) {
	stopOk, err := s.stopServer(id)
	if err != nil {
		return false, err
	}
	var reply removeServerReply
	err = s.Connection.Request(REMOVE_SERVER_MSG, id, &reply, RESPONSE_TIMEOUT_SEC)
	if err != nil {
		return false, err
	}
	return stopOk && reply.Success, nil
}

func (s *NatsServerTimeDataSource) startServer(id string) (bool, error) {
	var reply startStopNotifierReply
	err := s.Connection.Request(START_NOTIFIER_MSG, id, &reply, RESPONSE_TIMEOUT_SEC)
	if err != nil {
		return false, err
	}
	return reply.Success, nil
}

func (s *NatsServerTimeDataSource) stopServer(id string) (bool, error) {
	var reply startStopNotifierReply
	err := s.Connection.Request(STOP_NOTIFIER_MSG, id, &reply, RESPONSE_TIMEOUT_SEC)
	if err != nil {
		return false, err
	}
	return reply.Success, nil
}

func (s *NatsServerTimeDataSource) getServer(id string) (*custommodel.Server, error) {
	var server getServerReply
	err := s.Connection.Request(GET_SERVER_MSG, id, &server, RESPONSE_TIMEOUT_SEC)
	if err != nil {
		return nil, err
	}
	return server.Server, nil
}

func (s *NatsServerTimeDataSource) getServers() ([]*custommodel.Server, error) {
	var serversReply listServersReply
	err := s.Connection.Request(LIST_SERVERS_MSG, nil, &serversReply, RESPONSE_TIMEOUT_SEC)
	if err != nil {
		return nil, err
	}
	return serversReply.Servers, nil
}

func (s *NatsServerTimeDataSource) isServerRunning(id string) (bool, error) {
	var isServerRunningReply bool
	err := s.Connection.Request(IS_SERVER_RUNNING_MSG, id, &isServerRunningReply, RESPONSE_TIMEOUT_SEC)
	if err != nil {
		return false, err
	}
	return isServerRunningReply, nil
}

var _ ServerTimeDataSource = (*NatsServerTimeDataSource)(nil)
