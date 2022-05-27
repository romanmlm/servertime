package graph

import (
	"github.com/romanmlm/servertime/servertimeapi/graph/custommodel"
)

type addServerReply struct {
	ID      string `json:"id,omitempty"`
	Success bool   `json:"success"`
	Message string `json:"message,omitempty"`
}

type getServerReply struct {
	Server  *custommodel.Server `json:"server,omitempty"`
	Success bool                `json:"success"`
	Message string              `json:"message,omitempty"`
}

type removeServerReply struct {
	Success bool   `json:"success"`
	Message string `json:"message,omitempty"`
}

type listServersReply struct {
	Servers []*custommodel.Server `json:"servers,omitempty"`
	Success bool                  `json:"success"`
	Message string                `json:"message,omitempty"`
}

type startStopNotifierReply struct {
	Success bool   `json:"success"`
	Message string `json:"message,ommitempty"`
}

type listNotifiersReply struct {
	Success bool     `json:"success"`
	Message string   `json:"message,ommitempty"`
	IDs     []string `json:"ids,ommitempty"`
}
