package main

import (
	"fmt"

	_ "github.com/lib/pq"

	s "servermanagement.com/infraadmin/asset"
	a "servermanagement.com/infraadmin/auto_expire"
	m "servermanagement.com/infraadmin/mail"
)

func main() {
	s.HandleFunc()
	fmt.Scanln()
	m.RunCronJobs()
	a.RunCronJobs1()
	fmt.Scanln()

}
