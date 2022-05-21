package server

import "github.com/google/uuid"

type Server struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func NewServer(name string) *Server {
	return &Server{string(uuid.NewString()), name}
}