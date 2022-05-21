// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type AddServerResponse struct {
	ID string `json:"id"`
}

type Server struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type ServerTime struct {
	ID   string `json:"id"`
	Time string `json:"time"`
}

type ServersChanged struct {
	Added   []*Server `json:"added"`
	Removed []string  `json:"removed"`
	Updated []*Server `json:"updated"`
}