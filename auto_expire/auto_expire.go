package auto_expire

import (
	"fmt"

	"gopkg.in/robfig/cron.v2"
	dbs "servermanagement.com/infraadmin/database"
)

var db = dbs.Connect()

//-------------------------- auto expire serer to the pool -------------------------
func Auto_expire() {

	var reserved bool
	err := db.QueryRow("SELECT Reserved FROM Asset where reserved=true").Scan(&reserved)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(reserved)

	if reserved {
		_, err = db.Exec("update asset set reserved=false where reserved=true and ((required_finish_date-current_date)<=1);")
		// if err != nil {
		//  w.WriteHeader(http.StatusAccepted)
		//  json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
		//  return
		// }

		_, err := db.Exec(`INSERT into Historic_details (Asset_ID,Asset_Name,Created_on,Created_by,BMC_IP,Assigned_to,Assigned_from,Updated_on,Updated_by,Remarks)
    SELECT Asset_ID,Asset_Name,Created_on,Created_by,BMC_IP,Assigned_to,Assigned_from,LOCALTIMESTAMP(0),Updated_by,'Server Released' FROM Asset `)

		if err != nil {
			fmt.Println(err)
		}

		//json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Server Released", "Status Code": "200 OK"})
	}
}

func RunCronJobs1() {
	s := cron.New()
	s.AddFunc("0 0 * * *", func() {
		Auto_expire()
	})

	s.Start()
}
