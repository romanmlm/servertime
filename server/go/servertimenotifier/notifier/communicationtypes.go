package notifier

type startStopNotifierReply struct {
	Success bool   `json:"success"`
	Message string `json:"message,ommitempty"`
}

type listNotifiersReply struct {
	Success bool     `json:"success"`
	Message string   `json:"message,ommitempty"`
	IDs     []string `json:"ids,ommitempty"`
}
