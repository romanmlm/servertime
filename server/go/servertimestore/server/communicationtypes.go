package server

type addServerReply struct {
	ID      string `json:"id,omitempty"`
	Success bool   `json:"success"`
	Message string `json:"message,omitempty"`
}

type getServerReply struct {
	Server  *Server `json:"server,omitempty"`
	Success bool    `json:"success"`
	Message string  `json:"message,omitempty"`
}

type removeServerReply struct {
	Success bool   `json:"success"`
	Message string `json:"message,omitempty"`
}

type listServersReply struct {
	Servers []*Server `json:"servers,omitempty"`
	Success bool      `json:"success"`
	Message string    `json:"message,omitempty"`
}

type serversChanged struct {
	Added   []*Server `json:"added"`
	Removed []string  `json:"removed"`
	Updated []*Server `json:"updated"`
}
