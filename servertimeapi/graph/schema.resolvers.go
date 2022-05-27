package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/romanmlm/servertime/servertimeapi/graph/custommodel"
	"github.com/romanmlm/servertime/servertimeapi/graph/generated"
	"github.com/romanmlm/servertime/servertimeapi/graph/model"
)

func (r *mutationResolver) AddServer(ctx context.Context, name string) (*model.AddServerResponse, error) {
	id, err := r.Resolver.ServerTimeDataSource.addServer(name)
	if err != nil {
		return nil, err
	}
	return &model.AddServerResponse{ID: id}, nil
}

func (r *mutationResolver) RemoveServer(ctx context.Context, id string) (bool, error) {
	return r.Resolver.ServerTimeDataSource.removeServer(id)
}

func (r *mutationResolver) StartServer(ctx context.Context, id string) (bool, error) {
	return r.Resolver.ServerTimeDataSource.startServer(id)
}

func (r *mutationResolver) StopServer(ctx context.Context, id string) (bool, error) {
	return r.Resolver.ServerTimeDataSource.stopServer(id)
}

func (r *queryResolver) Servers(ctx context.Context) ([]*custommodel.Server, error) {
	return r.Resolver.ServerTimeDataSource.getServers()
}

func (r *queryResolver) Server(ctx context.Context, id string) (*custommodel.Server, error) {
	return r.Resolver.ServerTimeDataSource.getServer(id)
}

func (r *serverResolver) Running(ctx context.Context, obj *custommodel.Server) (bool, error) {
	return r.Resolver.ServerTimeDataSource.isServerRunning(obj.ID)
}

func (r *subscriptionResolver) ServerTick(ctx context.Context, id string) (<-chan int, error) {
	return r.Resolver.ServerTimeSubscriber.subscribeToServerTick(ctx.Done(), id)
}

func (r *subscriptionResolver) ServersChanged(ctx context.Context) (<-chan *model.ServersChanged, error) {
	return r.Resolver.subscribeToServersChanged(ctx.Done())
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// Server returns generated.ServerResolver implementation.
func (r *Resolver) Server() generated.ServerResolver { return &serverResolver{r} }

// Subscription returns generated.SubscriptionResolver implementation.
func (r *Resolver) Subscription() generated.SubscriptionResolver { return &subscriptionResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type serverResolver struct{ *Resolver }
type subscriptionResolver struct{ *Resolver }
