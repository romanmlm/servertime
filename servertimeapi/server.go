package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/gorilla/websocket"
	"github.com/nats-io/nats.go"
	"github.com/romanmlm/servertime/servertimeapi/graph"
	"github.com/romanmlm/servertime/servertimeapi/graph/generated"
	"github.com/rs/cors"
)

const defaultPort = "4000"

func getNatsUrl() string {
	url, ok := os.LookupEnv("NATS_URL")
	if ok {
		log.Println("Found NATS_URL environment variable:", url)
		return url
	}
	log.Println("NATS_URL environment variable is not defined. Using the default:", nats.DefaultURL)
	return nats.DefaultURL
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	log.Println("Connecting to nats at", getNatsUrl())
	nc, err := nats.Connect(nats.DefaultURL)

	if err != nil {
		panic(err)
	}
	defer nc.Close()

	connection, _ := nats.NewEncodedConn(nc, nats.JSON_ENCODER)

	router := chi.NewRouter()
	router.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:4000", "http://localhost:3008"},
		AllowCredentials: true,
		Debug:            true,
	}).Handler)

	srv := handler.New(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{
		ServerTimeDataSource:  &graph.NatsServerTimeDataSource{Connection: connection},
		ServerTimeSubscriber:  &graph.NatsServerTimeSubscriber{Connection: nc},
		ServerStoreSubscriber: &graph.NatsServerStoreSubscriber{Connection: connection},
	}}))
	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.Websocket{

		KeepAlivePingInterval: 10 * time.Second,
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		}})
	srv.Use(extension.Introspection{})

	router.Handle("/", playground.Handler("Server Time", "/graphql"))
	router.Handle("/graphql", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	err = http.ListenAndServe(":4000", router)
	if err != nil {
		panic(err)
	}
}
