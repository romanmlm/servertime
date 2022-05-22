package graph

// import (
// 	"log"
// 	"sync"
// 	"time"

// 	"github.com/romanmlm/servertime/servertimeapi/graph/model"
// )

// type LocalServerTimeSubscriber struct {
// 	subscribers map[string]*tickerSubscriberChannels
// 	lock        sync.Mutex
// }

// type tickerSubscriberChannels struct {
// 	ticker             *time.Ticker
// 	subscriberChannels []chan *model.ServerTime
// }

// func (s *LocalServerTimeSubscriber) subscribeToServerTime(subscriberDone <-chan struct{}, id string) (<-chan int, error) {
// 	log.Println("Subscribing to server time notifications with id:", id)
// 	subscriberC := s.addSubscriber(id)
// 	go s.listenToUnsubscribe(subscriberDone, subscriberC, id)

// 	return subscriberC, nil
// }

// func (s *LocalServerTimeSubscriber) addSubscriber(id string) chan int {
// 	s.lock.Lock()
// 	if s.subscribers == nil {
// 		s.subscribers = make(map[string]*tickerSubscriberChannels)
// 	}
// 	subscriberC := s.newTickerSubscriber(id)
// 	s.lock.Unlock()

// 	return subscriberC
// }

// func (s *LocalServerTimeSubscriber) newTickerSubscriber(id string) chan int {
// 	tickerSubscriberC, exists := s.subscribers[id]
// 	var subscriberC chan int
// 	if !exists {
// 		log.Println("Creating a new timer for id:", id)
// 		ticker := time.NewTicker(5 * time.Second)
// 		subscriberC = s.serverTimeChannel(ticker, id)
// 		subscriberChannels := []chan *model.ServerTime{subscriberC}
// 		tickerSubscriberC = &tickerSubscriberChannels{
// 			ticker,
// 			subscriberChannels,
// 		}
// 		s.subscribers[id] = tickerSubscriberC
// 	} else {
// 		subscriberC = s.serverTimeChannel(tickerSubscriberC.ticker, id)
// 		tickerSubscriberC.subscriberChannels = append(tickerSubscriberC.subscriberChannels, subscriberC)
// 	}

// 	return subscriberC
// }

// func (s *LocalServerTimeSubscriber) listenToUnsubscribe(subscriberDone <-chan struct{}, serverTimeC chan int, id string) {
// 	<-subscriberDone
// 	close(serverTimeC)
// 	s.lock.Lock()
// 	tickerSubscriberC, exists := s.subscribers[id]
// 	if exists {
// 		removeAt := -1
// 		for i, subscriberChannel := range tickerSubscriberC.subscriberChannels {
// 			if subscriberChannel == serverTimeC {
// 				removeAt = i
// 				break
// 			}
// 		}
// 		if removeAt >= 0 {
// 			tickerSubscriberC.subscriberChannels = append(tickerSubscriberC.subscriberChannels[:removeAt], tickerSubscriberC.subscriberChannels[removeAt+1:]...)
// 		}

// 		if len(tickerSubscriberC.subscriberChannels) == 0 {
// 			tickerSubscriberC.ticker.Stop()
// 			delete(s.subscribers, id)
// 		}
// 	}
// 	s.lock.Unlock()
// 	log.Printf("Unsubscribed id:%v from server time notifications\n", id)
// }

// func (s *LocalServerTimeSubscriber) serverTimeChannel(ticker *time.Ticker, id string) chan int {
// 	serverTimeC := make(chan int)

// 	go func() {
// 		for currentTime := range ticker.C {
// 			utcTimeFormatted := currentTime.UTC().String()
// 			log.Println("current server UTC time:", utcTimeFormatted)
// 			serverTime := model.ServerTime{
// 				Time: utcTimeFormatted,
// 			}

// 			s.lock.Lock()
// 			for _, subscriberC := range s.subscribers[id].subscriberChannels {
// 				subscriberC <- &serverTime
// 			}
// 			s.lock.Unlock()
// 		}
// 	}()

// 	return serverTimeC
// }
