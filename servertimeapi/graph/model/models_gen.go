// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"github.com/romanmlm/servertime/servertimeapi/graph/custommodel"
)

type AddServerResponse struct {
	ID string `json:"id"`
}

type ServerTime struct {
	ID   string `json:"id"`
	Time string `json:"time"`
}

type ServersChanged struct {
	Added   []*custommodel.Server `json:"added"`
	Removed []string              `json:"removed"`
	Updated []*custommodel.Server `json:"updated"`
}
