package graph

// import (
// 	"fmt"
// 	"log"
// 	"time"

// 	"github.com/romanmlm/servertime/servertimeapi/graph/model"
// )

// type LocalServerTimeDataSource struct {
// }

// func (s *LocalServerTimeDataSource) getServerTime() (*model.ServerTime, error) {
// 	currentTime := time.Now().UTC()
// 	currentTimeUtc := fmt.Sprintf("%v", currentTime)
// 	log.Println("Current server time:", currentTimeUtc)
// 	serverTime := model.ServerTime{
// 		Time: currentTimeUtc,
// 	}
// 	return &serverTime, nil
// }
