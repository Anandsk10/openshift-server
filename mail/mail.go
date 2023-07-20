package mail

import (
	"bytes"
	"log"
	"strings"
	"text/template"

	_ "github.com/lib/pq"

	"fmt"
	"net/smtp"

	"gopkg.in/robfig/cron.v2"
	dbs "servermanagement.com/infraadmin/database"
)

var db = dbs.Connect()
var Email, Asset_Name_List, Duration_List string

// func mail() {

// 	rows, err := db.Query("SELECT u.email_id,string_agg(a.asset_name, ', ') AS asset_name_list,string_agg((a.required_finish_date-current_date)::character varying , ', ') AS duration_list from  asset a,users u where u.user_id=a.assigned_to and (a.required_finish_date-current_date)<=14 and (a.required_finish_date-current_date)>=0 GROUP BY u.email_id;")
// 	if err != nil {
// 		fmt.Print(err)
// 		return
// 	}
// 	for rows.Next() {

// 		err := rows.Scan(&Email, &Asset_Name_List, &Duration_List)
// 		if err != nil {
// 			fmt.Println(err)
// 			log.Printf("Failed to build content from sql rows: %v\n", err)

// 		}
// 		// Sender data.
// 		from := "sushmitha.k@infobellit.com"
// 		password := "qkuppsqmjpbhhtyd"

// 		// Receiver email address.
// 		to := []string{
// 			Email,
// 		}

// 		smtpHost := "smtp.gmail.com"
// 		smtpPort := "587"
// 		////////////////////////////////////////////
// 		type info struct {
// 			Asset_Name_List string
// 			Duration_List   string
// 		}
// 		fmt.Println(Asset_Name_List)
// 		Asset_Name := strings.Split(Asset_Name_List, ",")
// 		Duration := strings.Split(Duration_List, ",")
// 		// m := make(map[string]string)
// 		var students []info
// 		u := info{}
// 		for i := 0; i < len(Asset_Name); i++ {
// 			students = append(students, info{Asset_Name_List: Asset_Name[i], Duration_List: Duration[i]})
// 			u.Asset_Name_List = Asset_Name[i]
// 			u.Duration_List = Duration[i]
// 		}
// 		studStr, _ := json.MarshalIndent(students, "", " ")
// 		fmt.Println(string(studStr))
// 		t, _ := template.ParseFiles("template.html")

// 		var body bytes.Buffer
// 		mimeHeaders := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
// 		body.Write([]byte(fmt.Sprintf("Subject: Notification Mail\r\n\r\n"+"This mail is for notifying the end date for the server '"+fmt.Sprint(Asset_Name_List)+"' is less than "+fmt.Sprint(Duration_List)+" days to expire.\r\n", mimeHeaders)))

// 		fmt.Println(students)
// 		t.Execute(&body, string(studStr))

// 		// err = t.ExecuteTemplate(os.Stdout, "template.html", string(studStr))
// 		// if err != nil {
// 		// 	log.Fatalln(err)
// 		// }
// 		// message := []byte("Subject: Notification Mail\r\n\r\n" + "This mail is for notifying the end date for the server '" + fmt.Sprint(Asset_Name_List) + "' is less than " + fmt.Sprint(Duration_List) + " days to expire.\r\n")

// 		auth := smtp.PlainAuth("", from, password, smtpHost)
// 		err1 := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, body.Bytes())
// 		if err1 != nil {
// 			fmt.Println(err1)
// 			return
// 		}
// 		fmt.Println(Email)
// 		fmt.Println("Email Sent Successfully!")
// 	}
// }

func mail() {

	rows, err := db.Query("SELECT u.email_id,string_agg(a.asset_name, ', ') AS asset_name_list,string_agg((a.required_finish_date-current_date)::character varying , ', ') AS duration_list from  asset a,users u where u.user_id=a.assigned_to and (a.required_finish_date-current_date)<=14 and (a.required_finish_date-current_date)>=0 GROUP BY u.email_id;")
	if err != nil {
		fmt.Print(err)
		return
	}
	for rows.Next() {

		err := rows.Scan(&Email, &Asset_Name_List, &Duration_List)
		if err != nil {
			fmt.Println(err)
			log.Printf("Failed to build content from sql rows: %v\n", err)

		}
		// Sender data.
		from := "sushmitha.k@infobellit.com"
		password := "qkuppsqmjpbhhtyd"

		// Receiver email address.
		to := []string{
			Email,
		}

		smtpHost := "smtp.gmail.com"
		smtpPort := "587"

		t, _ := template.ParseFiles("template.html")

		var body bytes.Buffer

		mimeHeaders := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
		body.Write([]byte(fmt.Sprintf("Subject: Notification Mail\n%s\n\r\n\r\n"+"This mail is for notifying the end date for the server  is less than 2 weeks to expire.\r\n", mimeHeaders)))
		Asset_Name := strings.Split(Asset_Name_List, ",")
		Duration := strings.Split(Duration_List, ",")
		a := map[string]interface{}{"Asset_Name_List": Asset_Name, "Duration_List": Duration}
		fmt.Println(a)
		t.Execute(&body, a)
		// message := []byte("Subject: Notification Mail\n%s\n\r\n\r\n" + "This mail is for notifying the end date for the server  is less than 2 weeks to expire.\r\n" + "\r\n" + fmt.Sprint("Asset Name") + "\t\t\t\t" + fmt.Sprint("Duration Left") + "\r\n" + fmt.Sprint(Asset_Name_List) + "\t\t" + fmt.Sprintf("%v days respectively", Duration_List))
		auth := smtp.PlainAuth("", from, password, smtpHost)
		err1 := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, body.Bytes())
		if err1 != nil {
			fmt.Println(err1)
			return
		}
		fmt.Println(Email)
		fmt.Println("Email Sent Successfully!")
	}
}

func RunCronJobs() {

	s := cron.New()

	s.AddFunc("07 15 * * *", func() {
		mail()
	})

	s.Start()
}
