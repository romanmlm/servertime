package notifier

import (
	"fmt"
	"log"
	"sync"
	"time"
)

const TICKER_SECONDS = 5

type TickerNotifier struct {
	tickers       map[string]*time.Ticker
	lock          sync.RWMutex
	tickerChannel chan struct {
		d  time.Duration
		id string
	}
}

func InitTickerNotifier() *TickerNotifier {
	tickerChannel := make(chan struct {
		d  time.Duration
		id string
	})
	return &TickerNotifier{make(map[string]*time.Ticker), sync.RWMutex{}, tickerChannel}
}

func (n *TickerNotifier) Close() {
	log.Println("Closing ticker notifier")
	n.lock.RLock()
	defer n.lock.RUnlock()
	defer close(n.tickerChannel)
	for _, ticker := range n.tickers {
		ticker.Stop()
	}
}

func (t *TickerNotifier) onTicker(tickerChannel <-chan time.Time, id string, startTime time.Time) {
	for tickTime := range tickerChannel {
		log.Printf("Seconds since id: %s started: %d\n", id, int(tickTime.Sub(startTime).Seconds()))
		t.tickerChannel <- struct {
			d  time.Duration
			id string
		}{tickTime.Sub(startTime), id}
	}
}

func (t *TickerNotifier) Start(id string) error {
	log.Println("Starting ticker for id:", id)
	t.lock.Lock()
	defer t.lock.Unlock()
	if _, exists := t.tickers[id]; exists {
		return fmt.Errorf("Ticker already exists for id: %s", id)
	}
	now := time.Now()
	ticker := time.NewTicker(TICKER_SECONDS * time.Second)
	t.tickers[id] = ticker
	go t.onTicker(ticker.C, id, now)

	return nil
}

func (t *TickerNotifier) Stop(id string) error {
	log.Println("Stopping ticker for id:", id)
	t.lock.Lock()
	defer t.lock.Unlock()
	if ticker, exists := t.tickers[id]; !exists {
		return fmt.Errorf("Ticker does not exist for id: %s", id)
	} else {
		ticker.Stop()
	}
	delete(t.tickers, id)
	return nil
}

func (t *TickerNotifier) List() ([]string, error) {
	t.lock.RLock()
	defer t.lock.RUnlock()
	var ids []string
	for id := range t.tickers {
		ids = append(ids, id)
	}
	return ids, nil
}

func (t *TickerNotifier) GetNotifierChannel() <-chan struct {
	d  time.Duration
	id string
} {
	return t.tickerChannel
}
