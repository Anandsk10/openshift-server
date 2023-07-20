/*
Server Management using Golang.
This file contains funtions related to add asset,list all asset as infra admin(role).
*/
package asset

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/tls"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"math"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
	"golang.org/x/crypto/bcrypt"
	dbs "servermanagement.com/infraadmin/database"
)

type Asset[T any] struct {
	Asset_Id                 int       `json:"Asset_Id"`
	Asset_Name               string    `json:"Asset_Name"`
	Server_Serial            string    `json:"Server_Serial"`
	Server_Model             string    `json:"Server_Model"`
	Manufacturer             string    `json:"Manufacturer"`
	Owner                    string    `json:"Owner"`
	Category                 string    `json:"Category"`
	Still_needed             bool      `json:"Still_needed"`
	Current_Project          string    `json:"Current_Project"`
	Notes                    string    `json:"Notes"`
	Previous_Project         string    `json:"Previous_Project"`
	BOM                      string    `json:"BOM"`
	Support_case             string    `json:"Support_case"`
	Cluster_Id               string    `json:"Cluster_Id"`
	Asset_location           string    `json:"Asset_location"`
	Lab                      string    `json:"Lab"`
	Row                      int       `json:"Row"`
	Rack                     int       `json:"Rack"`
	RU                       int       `json:"RU"`
	DC_status                string    `json:"DC_status"`
	Cpu_model                string    `json:"Cpu_model"`
	Generation               string    `json:"Generation"`
	CPU_Sockets              string    `json:"CPU_Sockets"`
	PDU_IP                   string    `json:"PDU_IP"`
	PDU_User                 string    `json:"PDU_User"`
	PDU_Password             string    `json:"PDU_Password"`
	BMC_IP                   string    `json:"BMC_IP"`
	BMC_User                 string    `json:"BMC_User"`
	BMC_Password             string    `json:"BMC_Password"`
	BMC_FQDN                 string    `json:"BMC_FQDN"`
	Operating_System         string    `json:"Operating_System"`
	OS_IP                    string    `json:"OS_IP"`
	OS_User                  string    `json:"OS_User"`
	OS_Password              string    `json:"OS_Password"`
	DIMM_Size                string    `json:"DIMM_Size"`
	DIMM_Capacity            string    `json:"DIMM_Capacity"`
	Storage_Vendor           string    `json:"Storage_Vendor"`
	Storage_Controller       string    `json:"Storage_Controller"`
	Storage_Capacity         string    `json:"Storage_Capacity"`
	Network_Type             bool      `json:"Network_Type"`
	Network_speed            string    `json:"Network_speed"`
	Number_Of_Network_Ports  string    `json:"Number_Of_Network_Ports"`
	Special_Switching_Needs  string    `json:"Special_Switching_Needs"`
	Required_Start_Date      time.Time `json:"Required_Start_Date"`
	Required_Finish_Date     time.Time `json:"Required_Finish_Date"`
	Created_on               time.Time `json:"Created_on"`
	Created_by               string    `json:"Created_by"`
	Assigned_to              T         `json:"Assigned_to"`
	Assigned_from            time.Time `json:"Assigned_from"`
	Assigned_by              string    `json:"Assigned_by"`
	Updated_on               time.Time `json:"Updated_on"`
	Updated_by               string    `json:"Updated_by"`
	Purpose                  string    `json:"Purpose"`
	Delete                   int       `json:"Delete"`
	Reserved                 bool      `json:"Reserved"`
	Asset_type               string    `json:"Asset_type"`
	Power_Status             bool      `json:"Power_Status"`
	Memory_Id                string    `json:"Memory_Id"`
	Rank_Count               int       `json:"Rank_Count"`
	MemoryDeviceType         string    `json:"MemoryDeviceType"`
	Memory_CapacityMiB       int       `json:"Memory_CapacityMiB"`
	Memory_AllowedSpeedsMHz  int       `json:"Memory_AllowedSpeedsMHz"`
	Memory_OperatingSpeedMHz int       `json:"Memory_OperatingSpeedMHz"`
	Disk_Id                  string    `json:"Disk_Id"`
	Media_Type               string    `json:"Media_Type"`
	Disk_Description         string    `json:"Disk_Description"`
	Network_Id               string    `json:"Network_Id"`
	PCIeType                 string    `json:"PCIeType"`
	Processor_Id             string    `json:"Processor_Id"`
	Instruction_Set          string    `json:"Instruction_Set"`
	Processor_Model          string    `json:"Processor_Model"`
	Processor_Architecture   string    `json:"Processor_Architecture"`
	Total_Cores              int       `json:"Total_Cores"`
	Total_Threads            int       `json:"Total_Threads"`
	Socket                   string    `json:"Socket"`
	CPU_Family               string    `json:"CPU_Family"`
}

type userDetails struct {
	User_Id    int       `json:"User_Id"`
	Email_Id   string    `json:"Email_Id"`
	Password   string    `json:"Password"`
	First_Name string    `json:"First_Name"`
	Last_Name  string    `json:"Last_Name"`
	Created_on time.Time `json:"Created_on"`
	Created_by string    `json:"Created_by"`
	Updated_on time.Time `json:"Updated_on"`
	Updated_by string    `json:"Updated_by"`
	Role       string    `json:"Role"`
	Teams      string    `json:"Teams"`
	Delete     int       `json:"Delete"`
}
type Historic_details[T any] struct {
	Id            int       `json:"Id"`
	Asset_Id      int       `json:"Asset_Id"`
	Asset_Name    string    `json:"Asset_Name"`
	Created_on    time.Time `json:"Created_on"`
	Created_by    string    `json:"Created_by"`
	BMC_IP        string    `json:"BMC_IP"`
	Assigned_to   T         `json:"Assigned_to"`
	Assigned_from time.Time `json:"Assigned_from"`
	Updated_on    time.Time `json:"Updated_on"`
	Updated_by    string    `json:"Updated_by"`
	Remarks       string    `json:"Remarks"`
	Asset_type    string    `json:"Asset_type"`
}
type Server_Request struct {
	Id                       int       `json:"Id"`
	User_No                  int       `json:"User_No"`
	Requester                string    `json:"Requester"`
	Required_Start_Date      time.Time `json:"Required_Start_Date"`
	Required_End_Date        time.Time `json:"Required_End_Date"`
	Manufacturer             string    `json:"Manufacturer"`
	Operating_System         string    `json:"Operating_System"`
	Cpu_model                string    `json:"Cpu_model"`
	CPU_Sockets              string    `json:"CPU_Sockets"`
	DIMM_Size                string    `json:"DIMM_Size"`
	DIMM_Capacity            string    `json:"DIMM_Capacity"`
	Storage_Vendor           string    `json:"Storage_Vendor"`
	Storage_Controller       string    `json:"Storage_Controller"`
	Storage_Capacity         string    `json:"Storage_Capacity"`
	Network_Type             bool      `json:"Network_Type"`
	Network_speed            string    `json:"Network_speed"`
	Number_Of_Network_Ports  string    `json:"Number_Of_Network_Ports"`
	Special_Switching_Needs  string    `json:"Special_Switching_Needs"`
	Chat                     string    `json:"Chat"`
	Request                  bool      `json:"Request"`
	Updated_on               time.Time `json:"Updated_on"`
	Updated_by               string    `json:"Updated_by"`
	Asset_type               string    `json:"Asset_type"`
	Memory_Id                string    `json:"Memory_Id"`
	Rank_Count               int       `json:"Rank_Count"`
	MemoryDeviceType         string    `json:"MemoryDeviceType"`
	Memory_CapacityMiB       int       `json:"Memory_CapacityMiB"`
	Memory_AllowedSpeedsMHz  int       `json:"Memory_AllowedSpeedsMHz"`
	Memory_OperatingSpeedMHz int       `json:"Memory_OperatingSpeedMHz"`
	Disk_Id                  string    `json:"Disk_Id"`
	Media_Type               string    `json:"Media_Type"`
	Disk_Description         string    `json:"Disk_Description"`
	Network_Id               string    `json:"Network_Id"`
	PCIeType                 string    `json:"PCIeType"`
	Processor_Id             string    `json:"Processor_Id"`
	Instruction_Set          string    `json:"Instruction_Set"`
	Processor_Model          string    `json:"Processor_Model"`
	Processor_Architecture   string    `json:"Processor_Architecture"`
	Total_Cores              int       `json:"Total_Cores"`
	Total_Threads            int       `json:"Total_Threads"`
	Socket                   string    `json:"Socket"`
	CPU_Family               string    `json:"CPU_Family"`
	Purpose                  string    `json:"Purpose"`
}

type Chats struct {
	Id      int        `json:"Id"`
	Comment [][]string `json:"Comment"`
}

type changepwd struct {
	Email_Id     string `json:"Email_Id"`
	Old_Password string `json:"Old_Password"`
	New_Password string `json:"New_Password"`
}
type Users_DETAILS struct {
	Email_Id string `json:"Email_Id"`
	Password string `json:"Password"`
}
type loginDetails struct {
	Email_Id string `json:"Email_Id"`
	Password string `json:"Password"`
}
type Claims struct {
	Username string `json:"Username"`
	jwt.StandardClaims
}

type QueryInput struct {
	Count                    int      `json:"Count"`
	Page                     int      `json:"Page"`
	Search                   string   `json:"Search"`
	Reserved                 bool     `json:"Reserved"`
	Server_Models            []string `json:"Server_Models"`
	Manufacturers            []string `json:"Manufacturers"`
	BOMs                     []string `json:"BOMs"`
	Still_Neededs            []string `json:"Still_Neededs"`
	Cluster_Ids              []string `json:"Cluster_Ids"`
	Asset_locations          []string `json:"Asset_locations"`
	Labs                     []string `json:"Labs"`
	Rows                     []string `json:"Rows"`
	Racks                    []string `json:"Rack"`
	RUs                      []string `json:"RUs"`
	DC_statuss               []string `json:"DC_statuss"`
	Cpu_models               []string `json:"Cpu_models"`
	Generations              []string `json:"Generations"`
	CPU_Socketss             []string `json:"CPU_Socketss"`
	BMC_FQDNs                []string `json:"BMC_FQDNs"`
	Operating_Systems        []string `json:"Operating_Systems"`
	DIMM_Sizes               []string `json:"DIMM_Sizes"`
	DIMM_Capacitys           []string `json:"DIMM_Capacitys"`
	Storage_Vendors          []string `json:"Storage_Vendors"`
	Storage_Controllers      []string `json:"Storage_Controllers"`
	Storage_Capacitys        []string `json:"Storage_Capacitys"`
	Network_types            []string `json:"Network_Types"`
	Network_speeds           []string `json:"Network_Speeds"`
	Number_Of_Network_Portss []string `json:"Number_Of_Network_Portss"`
	Created_bys              []string `json:"Created_bys"`
	Assigned_tos             []string `json:"Assigned_tos"`
	Assigned_bys             []string `json:"Assigned_Bys"`
	Updated_bys              []string `json:"Updated_bys"`
	First_Names              []string `json:"First_Names"`
	Last_Names               []string `json:"Last_Names"`
	Roles                    []string `json:"Roles"`
	Teamss                   []string `json:"Teamss"`
}

type Page struct {
	Count                   int    `json:"Count"`
	Page                    int    `json:"Page"`
	Search                  string `json:"Search"`
	Reserved                bool   `json:"Reserved"`
	Server_Model            string `json:"Server_Model"`
	Manufacturer            string `json:"Manufacturer"`
	BOM                     string `json:"BOM"`
	Still_Needed            string `json:"Still_Needed"`
	Cluster_Id              string `json:"Cluster_Id"`
	Asset_location          string `json:"Asset_location"`
	Lab                     string `json:"Lab"`
	Row                     string `json:"Row"`
	Rack                    string `json:"Rack"`
	RU                      string `json:"RU"`
	DC_status               string `json:"DC_status"`
	Cpu_model               string `json:"Cpu_model"`
	Generation              string `json:"Generation"`
	CPU_Sockets             string `json:"CPU_Sockets"`
	BMC_FQDN                string `json:"BMC_FQDN"`
	Operating_System        string `json:"Operating_System"`
	DIMM_Size               string `json:"DIMM_Size"`
	DIMM_Capacity           string `json:"DIMM_Capacity"`
	Storage_Vendor          string `json:"Storage_Vendor"`
	Storage_Controller      string `json:"Storage_Controller"`
	Storage_Capacity        string `json:"Storage_Capacity"`
	Network_type            string `json:"Network_Type"`
	Network_speed           string `json:"Network_Speed"`
	Number_Of_Network_Ports string `json:"Number_Of_Network_Ports"`
	Created_by              string `json:"Created_by"`
	// Assigned_to             string `json:"Assigned_to"`
	Assigned_by string `json:"Assigned_By"`
	Updated_by  string `json:"Updated_by"`
	First_Name  string `json:"First_Name"`
	Last_Name   string `json:"Last_Name"`
	Role        string `json:"Role"`
	Teams       string `json:"Teams"`
}

var key = []byte("thisis32bitlongpassphraseimusing")

func encrypt(keyString string, stringToEncrypt string) (encryptedString string) {
	// convert key to bytes
	key, _ := hex.DecodeString(keyString)

	plaintext := []byte(stringToEncrypt)

	//Create a new Cipher Block from the key
	block, err := aes.NewCipher(key)
	if err != nil {
		panic(err.Error())
	}

	// The IV needs to be unique, but not secure. Therefore it's common to
	// include it at the beginning of the ciphertext.
	ciphertext := make([]byte, aes.BlockSize+len(plaintext))
	iv := ciphertext[:aes.BlockSize]
	if _, err := io.ReadFull(rand.Reader, iv); err != nil {

		panic(err)

	}

	stream := cipher.NewCFBEncrypter(block, iv)
	stream.XORKeyStream(ciphertext[aes.BlockSize:], plaintext)

	// convert to base64
	return base64.URLEncoding.EncodeToString(ciphertext)
}

func Decrypt(keyString string, stringToDecrypt string) string {
	key, _ := hex.DecodeString(keyString)
	ciphertext, _ := base64.URLEncoding.DecodeString(stringToDecrypt)

	block, err := aes.NewCipher(key)
	if err != nil {
		panic(err)
	}

	// The IV needs to be unique, but not secure. Therefore it's common to
	// include it at the beginning of the ciphertext.
	if len(ciphertext) < aes.BlockSize {
		panic("ciphertext too short")
	}
	iv := ciphertext[:aes.BlockSize]
	ciphertext = ciphertext[aes.BlockSize:]

	stream := cipher.NewCFBDecrypter(block, iv)

	// XORKeyStream can work in-place if the two arguments are the same.
	stream.XORKeyStream(ciphertext, ciphertext)

	return fmt.Sprintf("%s", ciphertext)
}

var db = dbs.Connect() //database connection using function
var secretkey string = "Infobellitsolution"
var jwtKey = []byte("InfobellItSolutions")
var v Server_Request

//----------------------------------------------------authorization file----------------------------------------------------------

func GeneratehashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
func GenerateJWT(email, role string) (string, error) {
	var mySigningKey = []byte(secretkey)
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)

	claims["authorized"] = true
	claims["email"] = email
	claims["role"] = role
	claims["exp"] = time.Now().Add(time.Minute * 30).Unix()

	tokenString, err := token.SignedString(mySigningKey)

	if err != nil {
		fmt.Printf("Something Went Wrong: %s", err.Error())
		return "", err
	}
	return tokenString, nil
}

func RefreshHandler(w http.ResponseWriter, r *http.Request) {
	//SetupCORS(&w)
	cookie, err := r.Cookie("token")
	if err != nil {
		if err == http.ErrNoCookie {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		w.WriteHeader(http.StatusBadRequest)
		return
	}

	tokenStr := cookie.Value

	claims := &Claims{}

	tkn, err := jwt.ParseWithClaims(tokenStr, claims, func(t *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	w.Write([]byte(fmt.Sprintf("Hello, %s", claims.Username)))
}

func HandleFunc() {
	mux := http.NewServeMux()

	//-------------------------------------------------------login----------------------------------------------------------------------
	mux.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func Login(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}
		var l loginDetails

		err := json.NewDecoder(r.Body).Decode(&l)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Message": "Invalid Input Syntax", "Status Code": "400 "})
			return
		}

		if l.Email_Id == "" || l.Password == "" {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]string{"Status Code": "202", "Message": "Email/Password Can't be empty"})
			return

		} else {
			row := db.QueryRow("SELECT User_ID,Email_ID,Password,Role from Users where Email_ID = '" + l.Email_Id + "'")
			// if(row==null || [])
			var EMAIL, PASSWORD, ROLE string
			var id int
			ID := strconv.Itoa(id)
			err_scan := row.Scan(&ID, &EMAIL, &PASSWORD, &ROLE)
			fmt.Println(EMAIL)
			if err_scan != nil {
				//panic(err_scan.Error())
				fmt.Println(err_scan)
				//fmt.Println("error in email")
			}
			fmt.Println("Compared result :", CheckPasswordHash(l.Password, PASSWORD))
			if ID == "" || EMAIL == "" || PASSWORD == "" || ROLE == "" {
				w.WriteHeader(http.StatusAccepted)
				json.NewEncoder(w).Encode(map[string]string{"Status Code": "202", "Message": "Invalid Email"})
			} else if CheckPasswordHash(l.Password, PASSWORD) {
				expirationTime := time.Now().Add(time.Minute * 5)
				claims := &Claims{
					Username: EMAIL,
					StandardClaims: jwt.StandardClaims{
						ExpiresAt: expirationTime.Unix(),
					},
				}

				token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
				tokenString, err := token.SignedString(jwtKey)
				if err != nil {
					fmt.Println("Error in generating JWT Err : ", err.Error())
					w.WriteHeader(http.StatusInternalServerError)
					json.NewEncoder(w).Encode(map[string]string{"Message": "The server encountered an unexpected condition that prevented it from fulfilling the request", "Status Code": "500 "})

					return
				}

				// http.SetCookie(w, &http.Cookie{
				//  Name:    "token",
				//  Value:   tokenString,
				//  Expires: expirationTime,
				// })

				username := strings.Split(l.Email_Id, "@")
				json.NewEncoder(w).Encode(map[string]string{"User_Id": ID, "Role": ROLE, "Username": username[0], "Token": tokenString, "status": "200 OK", "Message": "Successfully Logged In"})
			} else {
				w.WriteHeader(http.StatusUnauthorized)
				json.NewEncoder(w).Encode(map[string]string{"Status Code": "401", "Message": "Invalid password"})
			}

		}
	})

	//--------------------------------------------------------logout-----------------------------------------------------------------
	mux.HandleFunc("/logout", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func Logout(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodGet {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}
		cookie, err := r.Cookie("token")
		if err != nil {
			if err == http.ErrNoCookie {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		tokenStr := cookie.Value

		claims := &Claims{}

		tkn, err := jwt.ParseWithClaims(tokenStr, claims,
			func(t *jwt.Token) (interface{}, error) {
				return jwtKey, nil
			})

		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		if !tkn.Valid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		json.NewEncoder(w).Encode(map[string]interface{}{"Status Code": "200ok", "Message": "successfully logout", "By:": claims.Username})
	})

	//----------------------------------------------------Change Password----------------------------------------------------------
	mux.HandleFunc("/ChangePassword", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func ChangePassword(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}

		var p changepwd

		err := json.NewDecoder(r.Body).Decode(&p)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Message": "Invalid Input Syntax", "Status Code": "400 "})
			return
		}
		if p.Old_Password == "nil" || p.New_Password == "nil" {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Status Code": "400", "Message": "Invalid input syntax"})
			return

		} else {
			//id := strconv.Itoa(p.User_id)
			row := db.QueryRow("SELECT Email_Id,Password from Users where Email_Id = $1", p.Email_Id)
			//fmt.Println(row)
			var db_user, Password string
			err_scan := row.Scan(&db_user, &Password)
			if err_scan != nil {
				//panic(err_scan.Error())
				fmt.Println(err_scan.Error())
			}
			if db_user == "" || Password == "" {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]string{"Status Code": "400", "Message": "Invalid input syntax"})
			} else {
				//if user is available in table and password you entered matches the old password,new password is updated on table.
				temp_pwd, _ := GeneratehashPassword(p.New_Password)
				fmt.Println(temp_pwd)
				if CheckPasswordHash(p.Old_Password, Password) {
					hash_pwd, err_h := GeneratehashPassword(p.New_Password)
					fmt.Println(hash_pwd)
					if err_h != nil {
						log.Fatal(err_h)
					}
					change, err := db.Exec("update Users set Password =$1 where Email_Id=$2", hash_pwd, p.Email_Id)
					if err != nil {
						log.Fatal(err)
					}
					affectedRow, err := change.RowsAffected()
					if err != nil {
						log.Fatal(err)
					}
					json.NewEncoder(w).Encode(map[string]interface{}{"Status Code": "200", "Message": "Password Updated", "updated row": affectedRow})
				} else {
					w.WriteHeader(http.StatusUnauthorized)
					json.NewEncoder(w).Encode(map[string]string{"Status Code": "401", "Message": "Unauthorised Password"})

				}
			}

		}
	})

	//-----------------------------------------------------Reset password-----------------------------------------------------
	mux.HandleFunc("/ResetPassword", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func ResetPassword(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}
		var p Users_DETAILS //declare a variable p for type Users_DETAILS
		err := json.NewDecoder(r.Body).Decode(&p)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		//To convert the password in the encrypted form
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(p.Password), 14)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Status Code": "400", "Message": "Invalid input syntax"})
			return
		}

		var EmailId string
		err = db.QueryRow("SELECT Email_Id from Users where Email_Id =$1", p.Email_Id).Scan(&EmailId)
		if err != nil {
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "User doesn't Exist", "err": err, "Status Code": "404"})
			return
		}
		_, err2 := db.Exec("UPDATE Users SET Password=$2 WHERE Email_Id=$1;", p.Email_Id, string(hashedPassword))

		if err2 != nil {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err2, "Status Code": "202 Accepted"})
			return
		}

		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Password Reset Successfully !", "Status Code": "200 OK"})

	})

	//------------------------------------------------add asset(creating asset)---------------------------------------------------------------------
	mux.HandleFunc("/add_asset", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func AddAsset(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}
		var assets Asset[int]
		var Asset_Id int
		Asset_Id = 0

		err := json.NewDecoder(r.Body).Decode(&assets)
		fmt.Println(err)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Message": "Invalid Input Syntax", "Status Code": "400 "})
			return
		}

		err = db.QueryRow("Select Asset_Id from Asset where Asset_Id=$1", assets.Asset_Id).Scan(&Asset_Id)
		hashedPassword1, err := bcrypt.GenerateFromPassword([]byte(assets.PDU_Password), 8)
		// hashedPassword2, err := bcrypt.GenerateFromPassword([]byte(assets.BMC_Password), 8)
		keyStr := hex.EncodeToString(key)
		cryptoText := encrypt(keyStr, assets.BMC_Password)
		fmt.Println(cryptoText)
		hashedPassword2 := cryptoText
		//---------- decrypting caling function ----------------
		// text := decrypt(keyStr, hashedPassword2)
		// fmt.Println(text)

		hashedPassword3, err := bcrypt.GenerateFromPassword([]byte(assets.OS_Password), 8)
		Asset_Id = Asset_Id + 1
		addStatement := `INSERT INTO asset (Asset_Name,Server_Serial,Server_Model,Manufacturer,Owner,Category ,Still_needed,Current_Project,Notes,Previous_Project,BOM,Support_case,Cluster_Id,Asset_location,Lab,Row,Rack,RU,DC_status,Cpu_model,Generation,CPU_Sockets,PDU_IP,PDU_User,PDU_Password,BMC_IP, BMC_User, BMC_Password, BMC_FQDN,Operating_System,OS_IP,OS_User,OS_Password,DIMM_Size,DIMM_Capacity,Storage_Vendor,Storage_Controller,Storage_Capacity,Network_Type,Network_speed,Number_Of_Network_Ports,Special_Switching_Needs,Created_on,Created_by,Updated_on,Updated_by,Purpose,Delete,Reserved,Asset_type,Memory_Id ,Rank_Count ,MemoryDeviceType ,Memory_CapacityMiB ,Memory_AllowedSpeedsMHz ,Memory_OperatingSpeedMhz ,Disk_Id ,Media_Type ,Disk_Description ,Network_Id ,PCIeType,Processor_Id ,Instruction_Set ,Processor_Model ,Processor_Architecture ,Total_Cores ,Total_Threads ,Socket ,CPU_Family) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,LOCALTIMESTAMP(0),$43,LOCALTIMESTAMP(0),$44,$45,'0','f',$46,$47,$48,$49,$50,$51,$52,$53,$54,$55,$56,$57,$58,$59,$60,$61,$62,$63,$64,$65)`
		_, err = db.Exec(addStatement, assets.Asset_Name, assets.Server_Serial, assets.Server_Model, assets.Manufacturer, assets.Owner, assets.Category, assets.Still_needed, assets.Current_Project, assets.Notes, assets.Previous_Project, assets.BOM, assets.Support_case, assets.Cluster_Id, assets.Asset_location, assets.Lab, assets.Row, assets.Rack, assets.RU, assets.DC_status, assets.Cpu_model, assets.Generation, assets.CPU_Sockets, assets.PDU_IP, assets.PDU_User, string(hashedPassword1), assets.BMC_IP, assets.BMC_User, string(hashedPassword2), assets.BMC_FQDN, assets.Operating_System, assets.OS_IP, assets.OS_User, string(hashedPassword3), assets.DIMM_Size, assets.DIMM_Capacity, assets.Storage_Vendor, assets.Storage_Controller, assets.Storage_Capacity, assets.Network_Type, assets.Network_speed, assets.Number_Of_Network_Ports, assets.Special_Switching_Needs, assets.Created_by, assets.Updated_by, assets.Purpose, assets.Asset_type, assets.Memory_Id, assets.Rank_Count, assets.MemoryDeviceType, assets.Memory_CapacityMiB, assets.Memory_AllowedSpeedsMHz, assets.Memory_OperatingSpeedMHz, assets.Disk_Id, assets.Media_Type, assets.Disk_Description, assets.Network_Id, assets.PCIeType, assets.Processor_Id, assets.Instruction_Set, assets.Processor_Model, assets.Processor_Architecture, assets.Total_Cores, assets.Total_Threads, assets.Socket, assets.CPU_Family)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Println(err)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Invalid input syntax for IP ", "Status Code": "400 ", "Error": err})
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{"Status Code": "200 OK", "Message": "Recorded Successfully"})
	})

	//----------------------------------------------------Platform Profile---------------------------------------------------------------------
	mux.HandleFunc("/platformProfile", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func PlatformProfile(w http.ResponseWriter, r *http.Request) {
		//	SetupCORS(&w)
		if r.Method != http.MethodGet {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}
		b, _ := ioutil.ReadFile("PlatformProfile.json")
		rawIn := json.RawMessage(string(b))
		var objmap map[string]*json.RawMessage
		err := json.Unmarshal(rawIn, &objmap)
		if err != nil {
			fmt.Println(err)
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{"PlatformProfile": objmap, "Status Code": "200 OK", "Message": "Recorded sucessfully"})
	})

	//--------------------------------------------------------Assign Server--------------------------------------------------------------------------
	mux.HandleFunc("/assign_asset", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func Assign_asset(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}
		var p Asset[int]
		err := json.NewDecoder(r.Body).Decode(&p)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Invalid Syntax", "Status Code": "400 "})
			return
		}

		var reserved bool
		var delete int
		err = db.QueryRow("SELECT Reserved , Delete FROM Asset where Asset_ID=$1", p.Asset_Id).Scan(&reserved, &delete)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Server Already in Use", "Status Code": "401 "})
			return
		}
		var asset_type string
		err = db.QueryRow("SELECT Asset_type FROM Asset where Asset_ID=$1", p.Asset_Id).Scan(&asset_type)
		if err != nil {
			fmt.Println(err)

		}
		if !reserved && delete == 0 {

			_, err = db.Exec("UPDATE asset SET Assigned_to=$2,Assigned_from=LOCALTIMESTAMP(0),Assigned_by=$3,Updated_on=LOCALTIMESTAMP(0),Updated_by=$4,reserved = 'true',Required_Start_Date=$5,Required_Finish_Date=$6 WHERE Asset_ID=$1;", p.Asset_Id, p.Assigned_to, p.Assigned_by, p.Updated_by, p.Required_Start_Date.Format("2006-01-02"), p.Required_Finish_Date.Format("2006-01-02"))
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]string{"Message": "Invalid Input Syntax", "Status Code": "400 "})
				return
			}

			_, err := db.Exec(`INSERT into Historic_details (Asset_ID,Asset_Name,Created_on,Created_by,BMC_IP,Assigned_to,Assigned_from,Updated_on,Updated_by,Remarks,Asset_type)
		SELECT Asset_ID,Asset_Name,Created_on,Created_by,COALESCE(BMC_IP,'0.0.0.0'),Assigned_to,Assigned_from,Updated_on,Updated_by,'Server Assigned',Asset_type FROM Asset where Asset_ID=$1`, p.Asset_Id)

			if err != nil {
				fmt.Println(err)
			}

			json.NewEncoder(w).Encode(map[string]interface{}{"Message": fmt.Sprintf("%s Assigned", asset_type), "Status Code": "200 OK"})

		} else {
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": fmt.Sprintf("%s Can't be Assigned", asset_type), "Status Code": "401"})

		}
	})

	//-------------------------------------------------Delete Server(Updating delete and reserved column in asset table)-------------------------------
	mux.HandleFunc("/delete_asset", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func Delete_asset(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}
		var p Asset[int]
		err := json.NewDecoder(r.Body).Decode(&p)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 "})
			return
		}
		_, err = db.Exec("UPDATE asset SET Delete='1', Reserved = 'f' , Assigned_to = null, Assigned_by=null,Updated_on=LOCALTIMESTAMP(0),Updated_by=$2,Required_Start_Date=null,Required_Finish_Date=null  WHERE Asset_Id=$1;", p.Asset_Id, p.Updated_by)
		if err != nil {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
			return
		}
		var asset_type string
		err = db.QueryRow("SELECT Asset_type FROM Asset where Asset_ID=$1", p.Asset_Id).Scan(&asset_type)
		if err != nil {
			fmt.Println(err)

		}
		json.NewEncoder(w).Encode(map[string]interface{}{"Message": fmt.Sprintf("%s Deleted!", asset_type), "Status Code": "200 OK"})
		row := db.QueryRow("SELECT Delete from asset where Asset_Id=$1;", p.Asset_Id)
		var del int
		err1 := row.Scan(&del)
		if err1 != nil {
			log.Fatal(err1)
		}

		if !p.Reserved && del == 1 {
			_, err := db.Query(`INSERT into Historic_details (Asset_ID,Asset_Name,Created_on,Created_by,BMC_IP,Assigned_to,Assigned_from,Updated_on,Updated_by,Remarks,Asset_type) 
		SELECT Asset_ID,Asset_Name,Created_on,Created_by,COALESCE(BMC_IP,'0.0.0.0'),Assigned_to,COALESCE(Assigned_from, '0001-01-01'),Updated_on,Updated_by,'Server Deleted',Asset_type FROM Asset where Asset_Id=$1`, p.Asset_Id)
			if err != nil {
				w.WriteHeader(http.StatusAccepted)
				json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
				return
			}
		} else {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "No Update Required", "Status Code": "202"})
		}
	})

	//-----------------------------------------------------List server ------------------------------------------------
	mux.HandleFunc("/list_asset", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func ListServer(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodGet {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}
		str := "SELECT Asset_Id,Asset_Name,COALESCE(Server_Serial,''),COALESCE(Server_Model,''),COALESCE(Manufacturer,''),COALESCE(Owner,''),COALESCE(Category,'') ,COALESCE(Still_needed,false),COALESCE(Current_Project,''),COALESCE(Notes,''),COALESCE(Previous_Project,''),COALESCE(BOM,''),COALESCE(Support_case,''),COALESCE(Cluster_ID,''),COALESCE(Asset_location,''),COALESCE(Lab,''),COALESCE(Row,0),COALESCE(Rack,0),COALESCE(RU,0),COALESCE(DC_status,''),COALESCE(Cpu_model,''),COALESCE(Generation,''),COALESCE(CPU_Sockets,''),COALESCE(PDU_IP,'0.0.0.0'),COALESCE(PDU_User,''),COALESCE(PDU_Password,''),COALESCE(BMC_IP,'0.0.0.0'), COALESCE(BMC_User,''), COALESCE(BMC_Password,''), COALESCE(BMC_FQDN,''),COALESCE(Operating_System,''),COALESCE(OS_IP,'0.0.0.0'),COALESCE(OS_User,''),COALESCE(OS_Password,''),COALESCE(DIMM_Size,''),COALESCE(DIMM_Capacity,''),COALESCE(Storage_Vendor,''),COALESCE(Storage_Controller,''),COALESCE(Storage_Capacity,''),COALESCE(Network_Type,false),COALESCE(Network_speed,''),COALESCE(Number_Of_Network_Ports,''),COALESCE(Special_Switching_Needs,''),COALESCE(Required_Start_Date, '0001-01-01'),COALESCE(Required_Finish_Date, '0001-01-01'),Created_on,Created_by,COALESCE(Assigned_to, 0),COALESCE(Assigned_from, '0001-01-01'),COALESCE(Assigned_by, ''),COALESCE(Updated_on,'0001-01-01'),COALESCE(Updated_by, ''),COALESCE(Purpose,''),Delete,Reserved,Asset_type,COALESCE(Power_Status, 'false'),COALESCE(Memory_Id,'') ,COALESCE(Rank_Count,0) ,COALESCE(MemoryDeviceType,'') ,COALESCE(Memory_CapacityMiB,0) ,COALESCE(Memory_AllowedSpeedsMHz,0) ,COALESCE(Memory_OperatingSpeedMhz,0) ,COALESCE(Disk_Id,'') ,COALESCE(Media_Type,'') ,COALESCE(Disk_Description,'') ,COALESCE(Network_Id,'') ,COALESCE(PCIeType,''),COALESCE(Processor_Id,'') ,COALESCE(Instruction_Set,'') ,COALESCE(Processor_Model,'') ,COALESCE(Processor_Architecture,'') ,COALESCE(Total_Cores,0) ,COALESCE(Total_Threads,0) ,COALESCE(Socket,'') ,COALESCE(CPU_Family,'') FROM Asset;"

		rows, err := db.Query(str)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 "})
			return
		}
		result := []Asset[string]{} // creating slice
		for rows.Next() {
			var Asset_Id, Assigned_to, Delete, Row, Rack, RU, Rank_Count, Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMhz, Memory_CapacityMiB, Total_Cores, Total_Threads int
			var Asset_Name, Server_Serial, Server_Model, Manufacturer, OS_IP, OS_User, OS_Password,
				BMC_IP, BMC_User, BMC_Password, BMC_FQDN, Asset_location,
				Assigned_by, Created_by, Updated_by, Cluster_Id, Purpose, Generation,
				Lab, DC_status, PDU_IP, PDU_User, PDU_Password, Owner, Category,
				Current_Project, Notes, Previous_Project, BOM, Support_case, Cpu_model, CPU_Sockets,
				DIMM_Capacity, DIMM_Size, Storage_Vendor, Storage_Controller,
				Storage_Capacity, Network_speed, Number_Of_Network_Ports, Special_Switching_Needs, Operating_System, Asset_type,
				Memory_Id, MemoryDeviceType, Disk_Id, Media_Type, Disk_Description, Network_Id, PCIeType, Processor_Id, Instruction_Set, Processor_Model, Processor_Architecture,
				Socket, CPU_Family string
			var Created_on, Updated_on, Assigned_from, Required_Start_Date, Required_Finish_Date time.Time
			var Reserved, Still_needed, Network_Type, Power_Status bool

			err := rows.Scan(&Asset_Id, &Asset_Name, &Server_Serial, &Server_Model, &Manufacturer, &Owner, &Category, &Still_needed, &Current_Project, &Notes, &Previous_Project, &BOM, &Support_case, &Cluster_Id, &Asset_location, &Lab, &Row, &Rack, &RU, &DC_status, &Cpu_model, &Generation, &CPU_Sockets, &PDU_IP, &PDU_User, &PDU_Password, &BMC_IP, &BMC_User, &BMC_Password, &BMC_FQDN, &Operating_System, &OS_IP, &OS_User, &OS_Password, &DIMM_Size, &DIMM_Capacity, &Storage_Vendor, &Storage_Controller, &Storage_Capacity, &Network_Type, &Network_speed, &Number_Of_Network_Ports, &Special_Switching_Needs, &Required_Start_Date, &Required_Finish_Date, &Created_on, &Created_by, &Assigned_to, &Assigned_from, &Assigned_by, &Updated_on, &Updated_by, &Purpose, &Delete, &Reserved, &Asset_type, &Power_Status, &Memory_Id, &Rank_Count, &MemoryDeviceType, &Memory_CapacityMiB, &Memory_AllowedSpeedsMHz, &Memory_OperatingSpeedMhz, &Disk_Id, &Media_Type, &Disk_Description, &Network_Id, &PCIeType, &Processor_Id, &Instruction_Set, &Processor_Model, &Processor_Architecture, &Total_Cores, &Total_Threads, &Socket, &CPU_Family)

			if err != nil {
				fmt.Println(err)
				// log.Printf("Failed to build content from sql rows: %v\n", err)

			}

			marshal, _ := json.Marshal(result)
			var c []Historic_details[string]
			var username []string
			var mail string
			var user string
			_ = json.Unmarshal(marshal, &c)
			err = db.QueryRow(" SELECT Email_ID FROM users where User_ID=$1;", Assigned_to).Scan(&mail)
			if err != nil {
				// fmt.Println(err)
			}
			username = strings.Split(mail, "@")
			user = username[0]
			result = append(result, Asset[string]{Asset_Id: Asset_Id, Asset_Name: Asset_Name, Server_Serial: Server_Serial, Server_Model: Server_Model, Manufacturer: Manufacturer, Owner: Owner, Category: Category, Still_needed: Still_needed, Current_Project: Current_Project, Notes: Notes, Previous_Project: Previous_Project, BOM: BOM, Support_case: Support_case, Cluster_Id: Cluster_Id, Asset_location: Asset_location, Lab: Lab, Row: Row, Rack: Rack, RU: RU, DC_status: DC_status, Cpu_model: Cpu_model, Generation: Generation, CPU_Sockets: CPU_Sockets, PDU_IP: PDU_IP, PDU_User: PDU_User, PDU_Password: PDU_Password, BMC_IP: BMC_IP, BMC_User: BMC_User, BMC_Password: BMC_Password, BMC_FQDN: BMC_FQDN, Operating_System: Operating_System, OS_IP: OS_IP, OS_User: OS_User, OS_Password: OS_Password, DIMM_Size: DIMM_Size, DIMM_Capacity: DIMM_Capacity, Storage_Vendor: Storage_Vendor, Storage_Controller: Storage_Controller, Storage_Capacity: Storage_Capacity, Network_Type: Network_Type, Network_speed: Network_speed, Number_Of_Network_Ports: Number_Of_Network_Ports, Special_Switching_Needs: Special_Switching_Needs, Required_Start_Date: Required_Start_Date, Required_Finish_Date: Required_Finish_Date, Created_on: Created_on, Created_by: Created_by, Assigned_to: user, Assigned_from: Assigned_from, Assigned_by: Assigned_by, Updated_on: Updated_on, Updated_by: Updated_by, Purpose: Purpose, Delete: Delete, Reserved: Reserved, Asset_type: Asset_type, Power_Status: Power_Status, Memory_Id: Memory_Id, Rank_Count: Rank_Count, MemoryDeviceType: MemoryDeviceType, Memory_CapacityMiB: Memory_CapacityMiB, Memory_AllowedSpeedsMHz: Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMHz: Memory_OperatingSpeedMhz, Disk_Id: Disk_Id, Media_Type: Media_Type, Disk_Description: Disk_Description, Network_Id: Network_Id, PCIeType: PCIeType, Processor_Id: Processor_Id, Instruction_Set: Instruction_Set, Processor_Model: Processor_Model, Processor_Architecture: Processor_Architecture, Total_Cores: Total_Cores, Total_Threads: Total_Threads, Socket: Socket, CPU_Family: CPU_Family})
		}
		rev_slc := []Asset[string]{}
		for i := range result {
			// reverse the order
			rev_slc = append(rev_slc, result[len(result)-1-i])
		}
		json.NewEncoder(w).Encode(map[string]interface{}{"ListAsset": rev_slc, "Status Code": "200 OK", "Message": "Listing All Servers"})
	})

	// ----------------------------------------------list of Reserved Assets-----------------------------------------------------------
	mux.HandleFunc("/list_asset/Reserved", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func Reserved(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}
		a, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		var p Asset[string]
		if err := json.Unmarshal(a, &p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		var pg Page
		if err := json.Unmarshal(a, &pg); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		// err := json.NewDecoder(r.Body).Decode(&pg)
		// if err != nil {
		// 	http.Error(w, err.Error(), http.StatusBadRequest)
		// 	return
		// }
		var total int
		err2 := db.QueryRow("SELECT count(*) from asset where reserved='t'  and asset_type ~* $2 and asset ::text ~* $1;", pg.Search, p.Asset_type).Scan(&total) // exporting table
		if err2 != nil {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err2, "Status Code": "202 "})
			return
		}
		str := "SELECT Asset_Id,Asset_Name,COALESCE(Server_Serial,''),COALESCE(Server_Model,''),COALESCE(Manufacturer,''),COALESCE(Owner,''),COALESCE(Category,'') ,COALESCE(Still_needed,false),COALESCE(Current_Project,''),COALESCE(Notes,''),COALESCE(Previous_Project,''),COALESCE(BOM,''),COALESCE(Support_case,''),COALESCE(Cluster_ID,''),COALESCE(Asset_location,''),COALESCE(Lab,''),COALESCE(Row,0),COALESCE(Rack,0),COALESCE(RU,0),COALESCE(DC_status,''),COALESCE(Cpu_model,''),COALESCE(Generation,''),COALESCE(CPU_Sockets,''),COALESCE(PDU_IP,'0.0.0.0'),COALESCE(PDU_User,''),COALESCE(PDU_Password,''),COALESCE(BMC_IP,'0.0.0.0'), COALESCE(BMC_User,''), COALESCE(BMC_Password,''), COALESCE(BMC_FQDN,''),COALESCE(Operating_System,''),COALESCE(OS_IP,'0.0.0.0'),COALESCE(OS_User,''),COALESCE(OS_Password,''),COALESCE(DIMM_Size,''),COALESCE(DIMM_Capacity,''),COALESCE(Storage_Vendor,''),COALESCE(Storage_Controller,''),COALESCE(Storage_Capacity,''),COALESCE(Network_Type,false),COALESCE(Network_speed,''),COALESCE(Number_Of_Network_Ports,''),COALESCE(Special_Switching_Needs,''),COALESCE(Required_Start_Date, '0001-01-01'),COALESCE(Required_Finish_Date, '0001-01-01'),Created_on,Created_by,COALESCE(Assigned_to, 0),COALESCE(Assigned_from, '0001-01-01'),COALESCE(Assigned_by, ''),COALESCE(Updated_on,'0001-01-01'),COALESCE(Updated_by, ''),COALESCE(Purpose,''),Delete,Reserved,Asset_type,COALESCE(Power_Status, 'false'),COALESCE(Memory_Id,'') ,COALESCE(Rank_Count,0) ,COALESCE(MemoryDeviceType,'') ,COALESCE(Memory_CapacityMiB,0) ,COALESCE(Memory_AllowedSpeedsMHz,0) ,COALESCE(Memory_OperatingSpeedMhz,0) ,COALESCE(Disk_Id,'') ,COALESCE(Media_Type,'') ,COALESCE(Disk_Description,'') ,COALESCE(Network_Id,'') ,COALESCE(PCIeType,''),COALESCE(Processor_Id,'') ,COALESCE(Instruction_Set,'') ,COALESCE(Processor_Model,'') ,COALESCE(Processor_Architecture,'') ,COALESCE(Total_Cores,0) ,COALESCE(Total_Threads,0) ,COALESCE(Socket,'') ,COALESCE(CPU_Family,'') FROM Asset WHERE asset_type ~* $4 and Reserved='true' and asset ::text ~* $3 order by Updated_on desc limit $1 offset ($2-1)*$1;"
		rows, err := db.Query(str, pg.Count, pg.Page, pg.Search, p.Asset_type)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 "})
			return
		}

		result := []Asset[string]{} // creating slice
		for rows.Next() {
			var Asset_Id, Assigned_to, Delete, Row, Rack, RU, Rank_Count, Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMhz, Memory_CapacityMiB, Total_Cores, Total_Threads int
			var Asset_Name, Server_Serial, Server_Model, Manufacturer, OS_IP, OS_User, OS_Password,
				BMC_IP, BMC_User, BMC_Password, BMC_FQDN, Asset_location,
				Assigned_by, Created_by, Updated_by, Cluster_Id, Purpose, Generation,
				Lab, DC_status, PDU_IP, PDU_User, PDU_Password, Owner, Category,
				Current_Project, Notes, Previous_Project, BOM, Support_case, Cpu_model, CPU_Sockets,
				DIMM_Capacity, DIMM_Size, Storage_Vendor, Storage_Controller,
				Storage_Capacity, Network_speed, Number_Of_Network_Ports, Special_Switching_Needs, Operating_System, Asset_type,
				Memory_Id, MemoryDeviceType, Disk_Id, Media_Type, Disk_Description, Network_Id, PCIeType, Processor_Id, Instruction_Set, Processor_Model, Processor_Architecture,
				Socket, CPU_Family string
			var Created_on, Updated_on, Assigned_from, Required_Start_Date, Required_Finish_Date time.Time
			var Reserved, Still_needed, Network_Type, Power_Status bool

			err := rows.Scan(&Asset_Id, &Asset_Name, &Server_Serial, &Server_Model, &Manufacturer, &Owner, &Category, &Still_needed, &Current_Project, &Notes, &Previous_Project, &BOM, &Support_case, &Cluster_Id, &Asset_location, &Lab, &Row, &Rack, &RU, &DC_status, &Cpu_model, &Generation, &CPU_Sockets, &PDU_IP, &PDU_User, &PDU_Password, &BMC_IP, &BMC_User, &BMC_Password, &BMC_FQDN, &Operating_System, &OS_IP, &OS_User, &OS_Password, &DIMM_Size, &DIMM_Capacity, &Storage_Vendor, &Storage_Controller, &Storage_Capacity, &Network_Type, &Network_speed, &Number_Of_Network_Ports, &Special_Switching_Needs, &Required_Start_Date, &Required_Finish_Date, &Created_on, &Created_by, &Assigned_to, &Assigned_from, &Assigned_by, &Updated_on, &Updated_by, &Purpose, &Delete, &Reserved, &Asset_type, &Power_Status, &Memory_Id, &Rank_Count, &MemoryDeviceType, &Memory_CapacityMiB, &Memory_AllowedSpeedsMHz, &Memory_OperatingSpeedMhz, &Disk_Id, &Media_Type, &Disk_Description, &Network_Id, &PCIeType, &Processor_Id, &Instruction_Set, &Processor_Model, &Processor_Architecture, &Total_Cores, &Total_Threads, &Socket, &CPU_Family)

			if err != nil {
				fmt.Println(err)
				// log.Printf("Failed to build content from sql rows: %v\n", err)

			}

			marshal, _ := json.Marshal(result)
			var c []Historic_details[string]
			var username []string
			var mail string
			var user string
			_ = json.Unmarshal(marshal, &c)
			err = db.QueryRow(" SELECT Email_ID FROM users where User_ID=$1;", Assigned_to).Scan(&mail)
			if err != nil {
				fmt.Println(err)
			}
			username = strings.Split(mail, "@")
			user = username[0]
			result = append(result, Asset[string]{Asset_Id: Asset_Id, Asset_Name: Asset_Name, Server_Serial: Server_Serial, Server_Model: Server_Model, Manufacturer: Manufacturer, Owner: Owner, Category: Category, Still_needed: Still_needed, Current_Project: Current_Project, Notes: Notes, Previous_Project: Previous_Project, BOM: BOM, Support_case: Support_case, Cluster_Id: Cluster_Id, Asset_location: Asset_location, Lab: Lab, Row: Row, Rack: Rack, RU: RU, DC_status: DC_status, Cpu_model: Cpu_model, Generation: Generation, CPU_Sockets: CPU_Sockets, PDU_IP: PDU_IP, PDU_User: PDU_User, PDU_Password: PDU_Password, BMC_IP: BMC_IP, BMC_User: BMC_User, BMC_Password: BMC_Password, BMC_FQDN: BMC_FQDN, Operating_System: Operating_System, OS_IP: OS_IP, OS_User: OS_User, OS_Password: OS_Password, DIMM_Size: DIMM_Size, DIMM_Capacity: DIMM_Capacity, Storage_Vendor: Storage_Vendor, Storage_Controller: Storage_Controller, Storage_Capacity: Storage_Capacity, Network_Type: Network_Type, Network_speed: Network_speed, Number_Of_Network_Ports: Number_Of_Network_Ports, Special_Switching_Needs: Special_Switching_Needs, Required_Start_Date: Required_Start_Date, Required_Finish_Date: Required_Finish_Date, Created_on: Created_on, Created_by: Created_by, Assigned_to: user, Assigned_from: Assigned_from, Assigned_by: Assigned_by, Updated_on: Updated_on, Updated_by: Updated_by, Purpose: Purpose, Delete: Delete, Reserved: Reserved, Asset_type: Asset_type, Power_Status: Power_Status, Memory_Id: Memory_Id, Rank_Count: Rank_Count, MemoryDeviceType: MemoryDeviceType, Memory_CapacityMiB: Memory_CapacityMiB, Memory_AllowedSpeedsMHz: Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMHz: Memory_OperatingSpeedMhz, Disk_Id: Disk_Id, Media_Type: Media_Type, Disk_Description: Disk_Description, Network_Id: Network_Id, PCIeType: PCIeType, Processor_Id: Processor_Id, Instruction_Set: Instruction_Set, Processor_Model: Processor_Model, Processor_Architecture: Processor_Architecture, Total_Cores: Total_Cores, Total_Threads: Total_Threads, Socket: Socket, CPU_Family: CPU_Family})
		} // appending deatils to the result
		// rev_slc := []Asset[string]{}
		// for i := range result {
		// 	// reverse the order
		// 	rev_slc = append(rev_slc, result[len(result)-1-i])
		// }
		totalPage := math.Ceil(float64(total*1.0) / float64(pg.Count*1.0))
		json.NewEncoder(w).Encode(map[string]interface{}{"Count": pg.Count, "Page_no": pg.Page, "Total_entry": total, "Search": pg.Search, "Total_Page": totalPage, "ListAsset": result, "Status Code": "200 OK", "Message": "Listing All Servers"})
	})

	// --------------------------------------------------list of pools Assets--------------------------------------------------------
	mux.HandleFunc("/list_asset/pool", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func Pool(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}

		a, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		var p Asset[string]
		if err := json.Unmarshal(a, &p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		var pg Page
		if err := json.Unmarshal(a, &pg); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		var total int

		err2 := db.QueryRow("SELECT count(*) from asset where reserved='f' and asset_type ~* $2 and asset ::text ~* $1;", pg.Search, p.Asset_type).Scan(&total) // exporting table
		if err2 != nil {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
			return
		}
		str := "SELECT Asset_Id,Asset_Name,COALESCE(Server_Serial,''),COALESCE(Server_Model,''),COALESCE(Manufacturer,''),COALESCE(Owner,''),COALESCE(Category,'') ,COALESCE(Still_needed,false),COALESCE(Current_Project,''),COALESCE(Notes,''),COALESCE(Previous_Project,''),COALESCE(BOM,''),COALESCE(Support_case,''),COALESCE(Cluster_ID,''),COALESCE(Asset_location,''),COALESCE(Lab,''),COALESCE(Row,0),COALESCE(Rack,0),COALESCE(RU,0),COALESCE(DC_status,''),COALESCE(Cpu_model,''),COALESCE(Generation,''),COALESCE(CPU_Sockets,''),COALESCE(PDU_IP,'0.0.0.0'),COALESCE(PDU_User,''),COALESCE(PDU_Password,''),COALESCE(BMC_IP,'0.0.0.0'), COALESCE(BMC_User,''), COALESCE(BMC_Password,''), COALESCE(BMC_FQDN,''),COALESCE(Operating_System,''),COALESCE(OS_IP,'0.0.0.0'),COALESCE(OS_User,''),COALESCE(OS_Password,''),COALESCE(DIMM_Size,''),COALESCE(DIMM_Capacity,''),COALESCE(Storage_Vendor,''),COALESCE(Storage_Controller,''),COALESCE(Storage_Capacity,''),COALESCE(Network_Type,false),COALESCE(Network_speed,''),COALESCE(Number_Of_Network_Ports,''),COALESCE(Special_Switching_Needs,''),COALESCE(Required_Start_Date, '0001-01-01'),COALESCE(Required_Finish_Date, '0001-01-01'),Created_on,Created_by,COALESCE(Assigned_to, 0),COALESCE(Assigned_from, '0001-01-01'),COALESCE(Assigned_by, ''),COALESCE(Updated_on,'0001-01-01'),COALESCE(Updated_by, ''),COALESCE(Purpose,''),Delete,Reserved,Asset_type,COALESCE(Power_Status, 'false'),COALESCE(Memory_Id,'') ,COALESCE(Rank_Count,0) ,COALESCE(MemoryDeviceType,'') ,COALESCE(Memory_CapacityMiB,0) ,COALESCE(Memory_AllowedSpeedsMHz,0) ,COALESCE(Memory_OperatingSpeedMhz,0) ,COALESCE(Disk_Id,'') ,COALESCE(Media_Type,'') ,COALESCE(Disk_Description,'') ,COALESCE(Network_Id,'') ,COALESCE(PCIeType,''),COALESCE(Processor_Id,'') ,COALESCE(Instruction_Set,'') ,COALESCE(Processor_Model,'') ,COALESCE(Processor_Architecture,'') ,COALESCE(Total_Cores,0) ,COALESCE(Total_Threads,0) ,COALESCE(Socket,'') ,COALESCE(CPU_Family,'') FROM Asset WHERE asset_type ~* $4 and (Delete=B'0' AND Reserved='false' OR Reserved is null) and asset ::text ~* $3 order by Updated_on desc limit $1 offset ($2-1)*$1;"

		rows, err := db.Query(str, pg.Count, pg.Page, pg.Search, p.Asset_type)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 "})
			return
		}

		result := []Asset[string]{} // creating slice
		for rows.Next() {

			var Asset_Id, Assigned_to, Delete, Row, Rack, RU, Rank_Count, Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMhz, Memory_CapacityMiB, Total_Cores, Total_Threads int
			var Asset_Name, Server_Serial, Server_Model, Manufacturer, OS_IP, OS_User, OS_Password,
				BMC_IP, BMC_User, BMC_Password, BMC_FQDN, Asset_location,
				Assigned_by, Created_by, Updated_by, Cluster_Id, Purpose, Generation,
				Lab, DC_status, PDU_IP, PDU_User, PDU_Password, Owner, Category,
				Current_Project, Notes, Previous_Project, BOM, Support_case, Cpu_model, CPU_Sockets,
				DIMM_Capacity, DIMM_Size, Storage_Vendor, Storage_Controller,
				Storage_Capacity, Network_speed, Number_Of_Network_Ports, Special_Switching_Needs, Operating_System, Asset_type,
				Memory_Id, MemoryDeviceType, Disk_Id, Media_Type, Disk_Description, Network_Id, PCIeType, Processor_Id, Instruction_Set, Processor_Model, Processor_Architecture,
				Socket, CPU_Family string
			var Created_on, Updated_on, Assigned_from, Required_Start_Date, Required_Finish_Date time.Time
			var Reserved, Still_needed, Network_Type, Power_Status bool
			err := rows.Scan(&Asset_Id, &Asset_Name, &Server_Serial, &Server_Model, &Manufacturer, &Owner, &Category, &Still_needed, &Current_Project, &Notes, &Previous_Project, &BOM, &Support_case, &Cluster_Id, &Asset_location, &Lab, &Row, &Rack, &RU, &DC_status, &Cpu_model, &Generation, &CPU_Sockets, &PDU_IP, &PDU_User, &PDU_Password, &BMC_IP, &BMC_User, &BMC_Password, &BMC_FQDN, &Operating_System, &OS_IP, &OS_User, &OS_Password, &DIMM_Size, &DIMM_Capacity, &Storage_Vendor, &Storage_Controller, &Storage_Capacity, &Network_Type, &Network_speed, &Number_Of_Network_Ports, &Special_Switching_Needs, &Required_Start_Date, &Required_Finish_Date, &Created_on, &Created_by, &Assigned_to, &Assigned_from, &Assigned_by, &Updated_on, &Updated_by, &Purpose, &Delete, &Reserved, &Asset_type, &Power_Status, &Memory_Id, &Rank_Count, &MemoryDeviceType, &Memory_CapacityMiB, &Memory_AllowedSpeedsMHz, &Memory_OperatingSpeedMhz, &Disk_Id, &Media_Type, &Disk_Description, &Network_Id, &PCIeType, &Processor_Id, &Instruction_Set, &Processor_Model, &Processor_Architecture, &Total_Cores, &Total_Threads, &Socket, &CPU_Family)

			if err != nil {
				fmt.Println(err)
				// log.Printf("Failed to build content from sql rows: %v\n", err)

			}

			marshal, _ := json.Marshal(result)
			var c []Historic_details[string]
			var username []string
			var mail string
			var user string
			_ = json.Unmarshal(marshal, &c)
			err = db.QueryRow(" SELECT Email_ID FROM users where User_ID=$1;", Assigned_to).Scan(&mail)
			if err != nil {
				fmt.Println(err)
			}
			username = strings.Split(mail, "@")
			user = username[0]
			result = append(result, Asset[string]{Asset_Id: Asset_Id, Asset_Name: Asset_Name, Server_Serial: Server_Serial, Server_Model: Server_Model, Manufacturer: Manufacturer, Owner: Owner, Category: Category, Still_needed: Still_needed, Current_Project: Current_Project, Notes: Notes, Previous_Project: Previous_Project, BOM: BOM, Support_case: Support_case, Cluster_Id: Cluster_Id, Asset_location: Asset_location, Lab: Lab, Row: Row, Rack: Rack, RU: RU, DC_status: DC_status, Cpu_model: Cpu_model, Generation: Generation, CPU_Sockets: CPU_Sockets, PDU_IP: PDU_IP, PDU_User: PDU_User, PDU_Password: PDU_Password, BMC_IP: BMC_IP, BMC_User: BMC_User, BMC_Password: BMC_Password, BMC_FQDN: BMC_FQDN, Operating_System: Operating_System, OS_IP: OS_IP, OS_User: OS_User, OS_Password: OS_Password, DIMM_Size: DIMM_Size, DIMM_Capacity: DIMM_Capacity, Storage_Vendor: Storage_Vendor, Storage_Controller: Storage_Controller, Storage_Capacity: Storage_Capacity, Network_Type: Network_Type, Network_speed: Network_speed, Number_Of_Network_Ports: Number_Of_Network_Ports, Special_Switching_Needs: Special_Switching_Needs, Required_Start_Date: Required_Start_Date, Required_Finish_Date: Required_Finish_Date, Created_on: Created_on, Created_by: Created_by, Assigned_to: user, Assigned_from: Assigned_from, Assigned_by: Assigned_by, Updated_on: Updated_on, Updated_by: Updated_by, Purpose: Purpose, Delete: Delete, Reserved: Reserved, Asset_type: Asset_type, Power_Status: Power_Status, Memory_Id: Memory_Id, Rank_Count: Rank_Count, MemoryDeviceType: MemoryDeviceType, Memory_CapacityMiB: Memory_CapacityMiB, Memory_AllowedSpeedsMHz: Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMHz: Memory_OperatingSpeedMhz, Disk_Id: Disk_Id, Media_Type: Media_Type, Disk_Description: Disk_Description, Network_Id: Network_Id, PCIeType: PCIeType, Processor_Id: Processor_Id, Instruction_Set: Instruction_Set, Processor_Model: Processor_Model, Processor_Architecture: Processor_Architecture, Total_Cores: Total_Cores, Total_Threads: Total_Threads, Socket: Socket, CPU_Family: CPU_Family})
		} // appending deatils to the result
		// rev_slc := []Asset[string]{}
		// for i := range result {
		// 	// reverse the order
		// 	rev_slc = append(rev_slc, result[len(result)-1-i])
		// }

		totalPage := math.Ceil(float64(total*1.0) / float64(pg.Count*1.0))
		json.NewEncoder(w).Encode(map[string]interface{}{"Count": pg.Count, "Page_no": pg.Page, "Total_entry": total, "Search": pg.Search, "Total_Page": totalPage, "ListAsset": result, "Status Code": "200 OK", "Message": "Listing All Servers"})
	})

	//--------------------------------------------------update asset details------------------------------------------------------
	mux.HandleFunc("/update_asset_details", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func UpdateAssetDetails(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}
		var assets Asset[int]
		Delete := assets.Delete
		err := json.NewDecoder(r.Body).Decode(&assets)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		hashedPassword1, err := bcrypt.GenerateFromPassword([]byte(assets.PDU_Password), 8)
		// hashedPassword2, err := bcrypt.GenerateFromPassword([]byte(assets.BMC_Password), 8)
		keyStr := hex.EncodeToString(key)
		cryptoText := encrypt(keyStr, assets.BMC_Password)
		fmt.Println(cryptoText)
		hashedPassword2 := cryptoText

		hashedPassword3, err := bcrypt.GenerateFromPassword([]byte(assets.OS_Password), 8)

		_, err1 := db.Exec("UPDATE Asset SET Asset_Name=$2,Server_Serial=$3,Server_model=$4,Manufacturer=$5,Owner=$6,Category=$7,Still_needed=$8,Current_Project=$9,Notes=$10,Previous_Project=$11,BOM=$12,Support_case=$13,Cluster_Id=$14,Asset_location=$15,Lab=$16,Row=$17,Rack=$18,RU=$19,DC_status=$20,Cpu_model=$21,Generation=$22,CPU_Sockets=$23,PDU_IP=$24,PDU_User=$25,PDU_Password=$26,BMC_IP=$27,BMC_User=$28,BMC_Password=$29,BMC_FQDN=$30,Operating_System=$31,OS_IP=$32,OS_User=$33,OS_Password=$34,DIMM_Size=$35,DIMM_Capacity=$36,Storage_Vendor=$37,Storage_Controller=$38,Storage_Capacity=$39,Network_Type=$40,Network_speed=$41,Number_Of_Network_Ports=$42,Special_Switching_Needs=$43,Required_Start_Date=$44,Required_Finish_Date=$45,Updated_on=LOCALTIMESTAMP(0),Updated_by=$46,Purpose=$47,Memory_Id=$48 ,Rank_Count =$49,MemoryDeviceType =$50,Memory_CapacityMiB=$51 ,Memory_AllowedSpeedsMHz =$52,Memory_OperatingSpeedMhz=$53 ,Disk_Id =$54,Media_Type=$55 ,Disk_Description =$56,Network_Id =$57,PCIeType=$58,Processor_Id=$59 ,Instruction_Set=$60 ,Processor_Model =$61,Processor_Architecture=$62 ,Total_Cores=$63 ,Total_Threads=$64 ,Socket=$65 ,CPU_Family=$66 WHERE Asset_ID=$1;",
			assets.Asset_Id, assets.Asset_Name, assets.Server_Serial, assets.Server_Model, assets.Manufacturer, assets.Owner, assets.Category, assets.Still_needed, assets.Current_Project, assets.Notes, assets.Previous_Project, assets.BOM, assets.Support_case, assets.Cluster_Id, assets.Asset_location, assets.Lab, assets.Row, assets.Rack, assets.RU, assets.DC_status, assets.Cpu_model, assets.Generation, assets.CPU_Sockets, assets.PDU_IP, assets.PDU_User, string(hashedPassword1), assets.BMC_IP, assets.BMC_User, string(hashedPassword2), assets.BMC_FQDN, assets.Operating_System, assets.OS_IP, assets.OS_User, string(hashedPassword3), assets.DIMM_Size, assets.DIMM_Capacity, assets.Storage_Vendor, assets.Storage_Controller, assets.Storage_Capacity, assets.Network_Type, assets.Network_speed, assets.Number_Of_Network_Ports, assets.Special_Switching_Needs, assets.Required_Start_Date.Format("2006-01-02"), assets.Required_Finish_Date.Format("2006-01-02"), assets.Updated_by, assets.Purpose, assets.Memory_Id, assets.Rank_Count, assets.MemoryDeviceType, assets.Memory_CapacityMiB, assets.Memory_AllowedSpeedsMHz, assets.Memory_AllowedSpeedsMHz, assets.Disk_Id, assets.Media_Type, assets.Disk_Description, assets.Network_Id, assets.PCIeType, assets.Processor_Id, assets.Instruction_Set, assets.Processor_Model, assets.Processor_Architecture, assets.Total_Cores, assets.Total_Threads, assets.Socket, assets.CPU_Family)
		if err1 != nil {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err1, "Status Code": "202 "})
			fmt.Println(err1)
			return
		}

		if Delete == 1 || Delete == 0 {
			_, err := db.Query(`INSERT into Historic_details (Asset_ID,Asset_Name,Created_on,Created_by,BMC_IP,Assigned_to,Assigned_from,Updated_on,Updated_by,Remarks,Asset_type)
            SELECT Asset_ID,Asset_Name,Created_on,Created_by,COALESCE(BMC_IP,'0.0.0.0'),Assigned_to,Assigned_from,Updated_on,Updated_by,'Server Updated',Asset_type FROM Asset where Asset_ID=$1`, assets.Asset_Id)

			if err != nil {
				fmt.Println(err)
			}
			//fmt.Fprintf(w, "Record Updated!")
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Record Updated!", "Status Code": "200 OK"})

		} else {
			fmt.Println("No update is required")
		}
	})

	//----------------------------------------------Release server (updating Reserve table)------------------------
	mux.HandleFunc("/release_asset", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func Release(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}
		var p Asset[int]
		err := json.NewDecoder(r.Body).Decode(&p)
		if err != nil {
			panic(err.Error())
		}
		var reserved bool
		err = db.QueryRow("SELECT Reserved FROM Asset where Asset_ID=$1", p.Asset_Id).Scan(&reserved)
		if err != nil {
			fmt.Println(err)

		}
		var asset_type string
		err = db.QueryRow("SELECT Asset_type FROM Asset where Asset_ID=$1", p.Asset_Id).Scan(&asset_type)
		if err != nil {
			fmt.Println(err)

		}
		if reserved {

			_, err = db.Exec("UPDATE Asset SET Reserved='false',Assigned_to=null,Assigned_by=null,Updated_on=LOCALTIMESTAMP(0),Required_Start_Date=null, required_finish_date=null,Updated_by=$2 where Asset_ID=$1;", p.Asset_Id, p.Updated_by) // query for updating
			if err != nil {
				w.WriteHeader(http.StatusAccepted)
				json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
				return
			}

			_, err := db.Exec(`INSERT into Historic_details (Asset_ID,Asset_Name,Created_on,Created_by,BMC_IP,Assigned_to,Assigned_from,Updated_on,Updated_by,Remarks,Asset_type)
        	SELECT Asset_ID,Asset_Name,Created_on,Created_by,COALESCE(BMC_IP,'0.0.0.0'),Assigned_to,Assigned_from,LOCALTIMESTAMP(0),Updated_by,'Server Released',Asset_type FROM Asset where Asset_ID=$1`, p.Asset_Id)

			if err != nil {
				fmt.Println(err)
			}

			json.NewEncoder(w).Encode(map[string]interface{}{"Message": fmt.Sprintf("%s Released", asset_type), "Status Code": "200 OK"})

		} else {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": fmt.Sprintf("%s Can't be Released", asset_type), "Status Code": "400"})

		}
	})

	//------------------------------------------------------getmyasset--------------------------------------------------------
	mux.HandleFunc("/my_asset", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func GetAsset(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}

		a, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		var p Asset[int]
		if err := json.Unmarshal(a, &p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		var pg Page
		if err := json.Unmarshal(a, &pg); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		var total int
		err2 := db.QueryRow("SELECT count(*) from asset where Reserved='Yes' AND Assigned_to=$1 and asset_type ~* $3 and asset ::text ~* $2", p.Assigned_to, pg.Search, p.Asset_type).Scan(&total) // exporting table
		if err2 != nil {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
			return
		}
		fmt.Println(err2)
		// var pg Page
		// err := json.NewDecoder(r.Body).Decode(&pg)
		// if err != nil {
		// 	http.Error(w, err.Error(), http.StatusBadRequest)
		// 	return
		// }

		// var p Asset[int]
		// err1 := json.NewDecoder(r.Body).Decode(&p)
		// if err1 != nil {
		// 	http.Error(w, err.Error(), http.StatusBadRequest)
		// 	return
		// }

		rows, err := db.Query("SELECT Asset_Id,Asset_Name,COALESCE(Server_Serial,''),COALESCE(Server_Model,''),COALESCE(Manufacturer,''),COALESCE(Owner,''),COALESCE(Category,'') ,COALESCE(Still_needed,false),COALESCE(Current_Project,''),COALESCE(Notes,''),COALESCE(Previous_Project,''),COALESCE(BOM,''),COALESCE(Support_case,''),COALESCE(Cluster_ID,''),COALESCE(Asset_location,''),COALESCE(Lab,''),COALESCE(Row,0),COALESCE(Rack,0),COALESCE(RU,0),COALESCE(DC_status,''),COALESCE(Cpu_model,''),COALESCE(Generation,''),COALESCE(CPU_Sockets,''),COALESCE(PDU_IP,'0.0.0.0'),COALESCE(PDU_User,''),COALESCE(PDU_Password,''),COALESCE(BMC_IP,'0.0.0.0'), COALESCE(BMC_User,''), COALESCE(BMC_Password,''), COALESCE(BMC_FQDN,''),COALESCE(Operating_System,''),COALESCE(OS_IP,'0.0.0.0'),COALESCE(OS_User,''),COALESCE(OS_Password,''),COALESCE(DIMM_Size,''),COALESCE(DIMM_Capacity,''),COALESCE(Storage_Vendor,''),COALESCE(Storage_Controller,''),COALESCE(Storage_Capacity,''),COALESCE(Network_Type,false),COALESCE(Network_speed,''),COALESCE(Number_Of_Network_Ports,''),COALESCE(Special_Switching_Needs,''),COALESCE(Required_Start_Date, '0001-01-01'),COALESCE(Required_Finish_Date, '0001-01-01'),Created_on,Created_by,COALESCE(Assigned_to, 0),COALESCE(Assigned_from, '0001-01-01'),COALESCE(Assigned_by, ''),COALESCE(Updated_on,'0001-01-01'),COALESCE(Updated_by, ''),COALESCE(Purpose,''),Delete,Reserved,Asset_type,COALESCE(Power_Status, 'false'),COALESCE(Memory_Id,'') ,COALESCE(Rank_Count,0) ,COALESCE(MemoryDeviceType,'') ,COALESCE(Memory_CapacityMiB,0) ,COALESCE(Memory_AllowedSpeedsMHz,0) ,COALESCE(Memory_OperatingSpeedMhz,0) ,COALESCE(Disk_Id,'') ,COALESCE(Media_Type,'') ,COALESCE(Disk_Description,'') ,COALESCE(Network_Id,'') ,COALESCE(PCIeType,''),COALESCE(Processor_Id,'') ,COALESCE(Instruction_Set,'') ,COALESCE(Processor_Model,'') ,COALESCE(Processor_Architecture,'') ,COALESCE(Total_Cores,0) ,COALESCE(Total_Threads,0) ,COALESCE(Socket,'') ,COALESCE(CPU_Family,'') FROM Asset where Reserved ='Yes' AND Assigned_to = $1 and asset_type ~* $5 AND asset ::text ~* $4 order by Updated_on desc limit $2 offset ($3-1)*$2;", p.Assigned_to, pg.Count, pg.Page, pg.Search, p.Asset_type)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 "})
			return
		}

		assets := []Asset[string]{}
		for rows.Next() {
			var Asset_Id, Assigned_to, Delete, Row, Rack, RU, Rank_Count, Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMhz, Memory_CapacityMiB, Total_Cores, Total_Threads int
			var Asset_Name, Server_Serial, Server_Model, Manufacturer, OS_IP, OS_User, OS_Password,
				BMC_IP, BMC_User, BMC_Password, BMC_FQDN, Asset_location,
				Assigned_by, Created_by, Updated_by, Cluster_Id, Purpose, Generation,
				Lab, DC_status, PDU_IP, PDU_User, PDU_Password, Owner, Category,
				Current_Project, Notes, Previous_Project, BOM, Support_case, Cpu_model, CPU_Sockets,
				DIMM_Capacity, DIMM_Size, Storage_Vendor, Storage_Controller,
				Storage_Capacity, Network_speed, Number_Of_Network_Ports, Special_Switching_Needs, Operating_System, Asset_type,
				Memory_Id, MemoryDeviceType, Disk_Id, Media_Type, Disk_Description, Network_Id, PCIeType, Processor_Id, Instruction_Set, Processor_Model, Processor_Architecture,
				Socket, CPU_Family string
			var Created_on, Updated_on, Assigned_from, Required_Start_Date, Required_Finish_Date time.Time
			var Reserved, Still_needed, Network_Type, Power_Status bool

			err1 := rows.Scan(&Asset_Id, &Asset_Name, &Server_Serial, &Server_Model, &Manufacturer, &Owner, &Category, &Still_needed, &Current_Project, &Notes, &Previous_Project, &BOM, &Support_case, &Cluster_Id, &Asset_location, &Lab, &Row, &Rack, &RU, &DC_status, &Cpu_model, &Generation, &CPU_Sockets, &PDU_IP, &PDU_User, &PDU_Password, &BMC_IP, &BMC_User, &BMC_Password, &BMC_FQDN, &Operating_System, &OS_IP, &OS_User, &OS_Password, &DIMM_Size, &DIMM_Capacity, &Storage_Vendor, &Storage_Controller, &Storage_Capacity, &Network_Type, &Network_speed, &Number_Of_Network_Ports, &Special_Switching_Needs, &Required_Start_Date, &Required_Finish_Date, &Created_on, &Created_by, &Assigned_to, &Assigned_from, &Assigned_by, &Updated_on, &Updated_by, &Purpose, &Delete, &Reserved, &Asset_type, &Power_Status, &Memory_Id, &Rank_Count, &MemoryDeviceType, &Memory_CapacityMiB, &Memory_AllowedSpeedsMHz, &Memory_OperatingSpeedMhz, &Disk_Id, &Media_Type, &Disk_Description, &Network_Id, &PCIeType, &Processor_Id, &Instruction_Set, &Processor_Model, &Processor_Architecture, &Total_Cores, &Total_Threads, &Socket, &CPU_Family)

			if err1 != nil {
				log.Printf("Failed to build content from sql rows: %v \n", err1)
				return
			}
			marshal, _ := json.Marshal(assets)
			var c []Historic_details[string]
			var username []string
			var mail string
			var user string
			_ = json.Unmarshal(marshal, &c)
			err = db.QueryRow(" SELECT Email_ID FROM users where User_ID=$1;", Assigned_to).Scan(&mail)
			if err != nil {
				fmt.Println(err)
			}
			username = strings.Split(mail, "@")
			user = username[0]
			assets = append(assets, Asset[string]{Asset_Id: Asset_Id, Asset_Name: Asset_Name, Server_Serial: Server_Serial, Server_Model: Server_Model, Manufacturer: Manufacturer, Owner: Owner, Category: Category, Still_needed: Still_needed, Current_Project: Current_Project, Notes: Notes, Previous_Project: Previous_Project, BOM: BOM, Support_case: Support_case, Cluster_Id: Cluster_Id, Asset_location: Asset_location, Lab: Lab, Row: Row, Rack: Rack, RU: RU, DC_status: DC_status, Cpu_model: Cpu_model, Generation: Generation, CPU_Sockets: CPU_Sockets, PDU_IP: PDU_IP, PDU_User: PDU_User, PDU_Password: PDU_Password, BMC_IP: BMC_IP, BMC_User: BMC_User, BMC_Password: BMC_Password, BMC_FQDN: BMC_FQDN, Operating_System: Operating_System, OS_IP: OS_IP, OS_User: OS_User, OS_Password: OS_Password, DIMM_Size: DIMM_Size, DIMM_Capacity: DIMM_Capacity, Storage_Vendor: Storage_Vendor, Storage_Controller: Storage_Controller, Storage_Capacity: Storage_Capacity, Network_Type: Network_Type, Network_speed: Network_speed, Number_Of_Network_Ports: Number_Of_Network_Ports, Special_Switching_Needs: Special_Switching_Needs, Required_Start_Date: Required_Start_Date, Required_Finish_Date: Required_Finish_Date, Created_on: Created_on, Created_by: Created_by, Assigned_to: user, Assigned_from: Assigned_from, Assigned_by: Assigned_by, Updated_on: Updated_on, Updated_by: Updated_by, Purpose: Purpose, Delete: Delete, Reserved: Reserved, Asset_type: Asset_type, Power_Status: Power_Status, Memory_Id: Memory_Id, Rank_Count: Rank_Count, MemoryDeviceType: MemoryDeviceType, Memory_CapacityMiB: Memory_CapacityMiB, Memory_AllowedSpeedsMHz: Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMHz: Memory_OperatingSpeedMhz, Disk_Id: Disk_Id, Media_Type: Media_Type, Disk_Description: Disk_Description, Network_Id: Network_Id, PCIeType: PCIeType, Processor_Id: Processor_Id, Instruction_Set: Instruction_Set, Processor_Model: Processor_Model, Processor_Architecture: Processor_Architecture, Total_Cores: Total_Cores, Total_Threads: Total_Threads, Socket: Socket, CPU_Family: CPU_Family})
		}
		// rev_slc := []Asset[string]{}
		// for i := range assets {
		// 	// reverse the order
		// 	rev_slc = append(rev_slc, assets[len(assets)-1-i])
		// }
		totalPage := math.Ceil(float64(total*1.0) / float64(pg.Count*1.0))
		json.NewEncoder(w).Encode(map[string]interface{}{"Count": pg.Count, "Page_no": pg.Page, "Total_entry": total, "Search": pg.Search, "Total_Page": totalPage, "ListAsset": assets, "Status Code": "200 OK", "Message": "Listing Specified Servers"})

		if len(assets) == 0 {
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "User Not Found", "Status Code": "404 "})
			return
		}
	})

	//-------------------------------------------Historic Details(By Asset ID)-----------------------------------------------------------------------------------------------
	mux.HandleFunc("/historic_details_id", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}

		a, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		var p Historic_details[int]
		if err := json.Unmarshal(a, &p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		var pg Page
		if err := json.Unmarshal(a, &pg); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		var total int
		err2 := db.QueryRow("SELECT count(*) from historic_details where asset_id=$1 and historic_details ::text ~* $2", p.Asset_Id, pg.Search).Scan(&total) // exporting table
		if err2 != nil {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
			return
		}
		rows, err := db.Query("SELECT Id, Asset_ID,Asset_Name,Created_on,Created_by,COALESCE(BMC_IP,'0.0.0.0'),COALESCE(Assigned_to, 0), COALESCE(Assigned_from, '0001-01-01'), COALESCE(Updated_on,'0001-01-01'), Updated_by,Remarks,Asset_type FROM Historic_details WHERE Asset_ID=$1 AND historic_details ::text ~* $4 order by Updated_on desc limit $2 offset ($3-1)*$2;", p.Asset_Id, pg.Count, pg.Page, pg.Search)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 "})
			return
		}
		result := []Historic_details[string]{} // creating slice
		for rows.Next() {

			var Id, Asset_Id, Assigned_to int
			var Created_by, Updated_by, Remarks, Asset_Name, BMC_IP, Asset_type string
			var Created_on, Updated_on, Assigned_from time.Time

			err := rows.Scan(&Id, &Asset_Id, &Asset_Name, &Created_on, &Created_by, &BMC_IP, &Assigned_to, &Assigned_from, &Updated_on, &Updated_by, &Remarks, &Asset_type)

			if err != nil {
				fmt.Println(err)
				// log.Printf("Failed to build content from sql rows: %v\n", err)

			}
			marshal, _ := json.Marshal(result)
			var c []Historic_details[string]
			var username []string
			var user string
			var mail string
			_ = json.Unmarshal(marshal, &c)
			err = db.QueryRow(" SELECT Email_ID FROM users where User_ID=$1;", Assigned_to).Scan(&mail)
			if err != nil {
				fmt.Println(err)
			}
			username = strings.Split(mail, "@")
			user = username[0]
			result = append(result, Historic_details[string]{Id: Id, Asset_Id: Asset_Id, Asset_Name: Asset_Name, Created_on: Created_on, Created_by: Created_by, BMC_IP: BMC_IP, Assigned_to: user, Assigned_from: Assigned_from, Updated_on: Updated_on, Updated_by: Updated_by, Remarks: Remarks, Asset_type: Asset_type})
		}
		// rev_slc := []Historic_details[string]{}
		// for i := range result {
		// 	// reverse the order
		// 	rev_slc = append(rev_slc, result[len(result)-1-i])
		// }
		totalPage := math.Ceil(float64(total*1.0) / float64(pg.Count*1.0))
		json.NewEncoder(w).Encode(map[string]interface{}{"Count": pg.Count, "Page_no": pg.Page, "Total_entry": total, "Search": pg.Search, "Total_Page": totalPage, "Historic_Details": result, "Status Code": "200 OK", "Message": "Listing Historic details"})

	})

	// -------------------------------------------------view users list---------------------------------------------------------------
	mux.HandleFunc("/view_users", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func View_Role(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}

		var pg Page
		err := json.NewDecoder(r.Body).Decode(&pg)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		var total int
		err2 := db.QueryRow("SELECT count(*) from users where users ::text ~* $1", pg.Search).Scan(&total) // exporting table
		if err2 != nil {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
			return
		}
		//database connection using funcation
		rows, err := db.Query("SELECT User_ID, Email_ID, First_Name, Last_Name, Created_on, Created_by,COALESCE(Updated_on,'0001-01-01'),COALESCE(Updated_by, ''), Role, Teams from USERS where Delete=B'0' AND users ::text ~* $3 order by Updated_on desc limit $1 offset ($2-1)*$1;", pg.Count, pg.Page, pg.Search) // data selecting from user_table

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Status Code": "400", "Message": err})

		}

		users := []userDetails{}
		for rows.Next() {
			var User_Id int
			var Email_Id, First_Name, Last_Name, Created_by, Updated_by, Role, Teams string
			var Created_on, Updated_on time.Time

			err = rows.Scan(&User_Id, &Email_Id, &First_Name, &Last_Name, &Created_on, &Created_by, &Updated_on, &Updated_by, &Role, &Teams)

			if err != nil {
				log.Printf("Failed to build content from sql rows: %v \n", err)
			}
			users = append(users, userDetails{User_Id: User_Id, Email_Id: Email_Id, First_Name: First_Name, Last_Name: Last_Name, Created_on: Created_on, Created_by: Created_by, Updated_on: Updated_on, Updated_by: Updated_by, Role: Role, Teams: Teams})

		}
		// rev_slc := []userDetails{}
		// for i := range users {
		// 	// reverse the order
		// 	rev_slc = append(rev_slc, users[len(users)-1-i])
		// }
		totalPage := math.Ceil(float64(total*1.0) / float64(pg.Count*1.0))
		json.NewEncoder(w).Encode(map[string]interface{}{"Count": pg.Count, "Page_no": pg.Page, "Total_entry": total, "Search": pg.Search, "Total_Page": totalPage, "Listusers": users, "status code": " 200 Ok", "Message": "Record Found"})
	})
	// -------------------------------------------------view users reserving list---------------------------------------------------------------
	mux.HandleFunc("/view_users_reserve", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func View_Role(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}

		var pg Page
		err := json.NewDecoder(r.Body).Decode(&pg)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		//database connection using funcation
		rows, err := db.Query("SELECT User_ID,Email_Id from USERS where Role='User' and Delete=B'0' AND users ::text ~* $1 order by Updated_on desc;", pg.Search) // data selecting from user_table

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Status Code": "400", "Message": err})

		}
		type userDetails1 struct {
			User_Id  int    `json:"User_Id"`
			Email_Id string `json:"Email_Id"`
		}
		users := []userDetails1{}
		for rows.Next() {
			var User_Id int
			var Email_Id string

			err = rows.Scan(&User_Id, &Email_Id)

			if err != nil {
				log.Printf("Failed to build content from sql rows: %v \n", err)
			}
			users = append(users, userDetails1{User_Id: User_Id, Email_Id: Email_Id})

		}
		json.NewEncoder(w).Encode(map[string]interface{}{"Search": pg.Search, "Listusers": users, "status code": " 200 Ok", "Message": "Record Found"})
	})
	//----------------------------------------------------- create user------------------------------------------------------------------
	mux.HandleFunc("/create_user", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func Create_User(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}
		var user userDetails
		err := json.NewDecoder(r.Body).Decode(&user)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Status Code": "400", "Message": "Invalid Input Email Syntax"})

			return
		}
		var User_Id int
		User_Id = 0
		var Email string
		User_Id = User_Id + 1
		err = db.QueryRow("SELECT Email_ID FROM Users where Email_ID=$1", user.Email_Id).Scan(&Email)
		if user.Email_Id == Email {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Status": "202", "Message": "Email Already Exists"})
			return
		} else {

			hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 8)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Invalid Input Syntax for IP ", "Status Code": "400 ", "Error": err})
			}
			adduser := `insert into Users(Email_ID,Password,First_Name,Last_Name,Created_on,Created_by,Updated_on,Updated_by,Role,Teams,Delete) values ($1, $2, $3, $4,LOCALTIMESTAMP(0), $5,LOCALTIMESTAMP(0), $6, $7, $8,'0')`
			_, err = db.Exec(adduser, user.Email_Id, string(hashedPassword), user.First_Name, user.Last_Name, user.Created_by, user.Updated_by, user.Role, user.Teams)
			if err != nil {
				w.WriteHeader(http.StatusAccepted)
				json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
				return
			}
			json.NewEncoder(w).Encode(map[string]string{"Message": " User Added Succesfully!", "Status": "200 OK"})
		}
	})

	//------------------------------------------------ soft delete(1-not deleted,0-deleted)---------------------------------------------------
	mux.HandleFunc("/delete_user", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func Delete_User(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}
		var users userDetails
		err := json.NewDecoder(r.Body).Decode(&users)
		if err != nil {
			http.Error(w, err.Error(), http.StatusAccepted)
			return
		}
		rows, err := db.Query("SELECT User_ID, Email_ID,Password, First_Name, Last_Name, Created_on, Created_by,COALESCE(Updated_on,'0001-01-01'),COALESCE(Updated_by, ''), Role, Teams,Delete FROM USERS WHERE User_ID = $1", users.User_Id)
		User_ID := 0
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 "})
			return
		}

		for rows.Next() {
			err := rows.Scan(&users.User_Id, &users.Email_Id, &users.Password, &users.First_Name, &users.Last_Name, &users.Created_on, &users.Created_by, &users.Updated_on, &users.Updated_by, &users.Role, &users.Teams, &users.Delete)
			w.WriteHeader(http.StatusAccepted)
			if err != nil {
				w.WriteHeader(http.StatusAccepted)
				json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
				return
			}
			User_ID++
		}
		if User_ID == 0 {
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(map[string]interface{}{"Status Code": "404", "Message": "User Not Found"})

		} else {
			rows, err := db.Query("UPDATE users SET delete = '1' WHERE user_id= $1", users.User_Id)
			if err != nil {
				w.WriteHeader(http.StatusAccepted)
				json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
				return
			}
			users := []userDetails{}
			for rows.Next() {
				var User_Id = 0
				var Email_Id, Password, Role, First_Name, Last_Name, Created_by, Updated_by, Teams string
				var Delete int
				var Created_on, Updated_on time.Time

				err = json.NewDecoder(r.Body).Decode(&users)
				if err != nil {
					w.WriteHeader(http.StatusAccepted)
					json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
					return
				}
				err = rows.Scan(&User_Id, &Email_Id, &Password, &First_Name, &Last_Name, &Created_on, &Created_by, &Updated_on, &Updated_by, &Role, &Teams, &Delete)
				if err != nil {
					log.Printf("Failed to build content from sql rows: %v \n", err)
				}
				users = append(users, userDetails{User_Id: User_Id, Email_Id: Email_Id, Password: Password, Role: Role, First_Name: First_Name, Last_Name: Last_Name, Created_on: Created_on, Created_by: Created_by, Updated_on: Updated_on, Updated_by: Updated_by, Teams: Teams, Delete: Delete})
				w.WriteHeader(http.StatusOK)
			}
			json.NewEncoder(w).Encode(map[string]string{"Message": "Deleted Successfully", "Status Code": "200 OK"})
		}
	})

	// ------------------------------------------------------------update user-----------------------------------------------------------------
	mux.HandleFunc("/update_users", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func Update_User(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}
		var users userDetails
		err := json.NewDecoder(r.Body).Decode(&users)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 "})
			return
		}
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(users.Password), 8)
		if err != nil {
			log.Printf("Failed to build content from sql rows: %v \n", err)
		}
		_, err = db.Exec("UPDATE users SET password=$2, first_name=$3, last_name=$4, Updated_on=LOCALTIMESTAMP(0), Updated_by=$5,  role=$6, teams=$7 WHERE user_id=$1;", users.User_Id, string(hashedPassword), users.First_Name, users.Last_Name, users.Updated_by, users.Role, users.Teams)
		if err != nil {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
			return
		}
		json.NewEncoder(w).Encode(map[string]interface{}{"Status Code": "200", "Message": "Record Updated!"})
	})

	//-------------------------------------------------- List of request table ------------------------------------------------
	mux.HandleFunc("/list_request", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func ListRequest(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}

		a, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		var p Server_Request
		if err := json.Unmarshal(a, &p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		var pg Page
		if err := json.Unmarshal(a, &pg); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		// err := json.NewDecoder(r.Body).Decode(&pg)
		// if err != nil {
		// 	http.Error(w, err.Error(), http.StatusBadRequest)
		// 	return
		// }

		var total int
		err2 := db.QueryRow("SELECT count(*) from server_request where asset_type ~* $2 and server_request ::text ~* $1", pg.Search, p.Asset_type).Scan(&total) // exporting table
		if err2 != nil {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
			return
		}

		rows, err := db.Query("SELECT Id,User_No,Requester,COALESCE(Required_Start_Date, '0001-01-01'),COALESCE(Required_End_Date, '0001-01-01'),Manufacturer,COALESCE(Operating_System,''),COALESCE(Cpu_model,''),COALESCE(CPU_Sockets,''),COALESCE(DIMM_Size,''),COALESCE(DIMM_Capacity,''),COALESCE(Storage_Vendor,''),COALESCE(Storage_Controller,''),COALESCE(Storage_Capacity,''),COALESCE(Network_Type,false),COALESCE(Network_speed,''),COALESCE(Number_Of_Network_Ports,''),COALESCE(Special_Switching_Needs,''),COALESCE(Chat, ''),COALESCE(Request, false),COALESCE(Updated_on,'0001-01-01'),COALESCE(Updated_by, ''),Asset_type,COALESCE(Memory_Id,'') ,COALESCE(Rank_Count,0) ,COALESCE(MemoryDeviceType,'') ,COALESCE(Memory_CapacityMiB,0) ,COALESCE(Memory_AllowedSpeedsMHz,0) ,COALESCE(Memory_OperatingSpeedMhz,0) ,COALESCE(Disk_Id,'') ,COALESCE(Media_Type,'') ,COALESCE(Disk_Description,'') ,COALESCE(Network_Id,'') ,COALESCE(PCIeType,''),COALESCE(Processor_Id,'') ,COALESCE(Instruction_Set,'') ,COALESCE(Processor_Model,'') ,COALESCE(Processor_Architecture,'') ,COALESCE(Total_Cores,0) ,COALESCE(Total_Threads,0) ,COALESCE(Socket,'') ,COALESCE(CPU_Family,''),COALESCE(Purpose,'') from Server_Request where asset_type ~* $4 and Request='f' AND server_request ::text ~* $3 order by Updated_on desc limit $1 offset ($2-1)*$1;", pg.Count, pg.Page, pg.Search, p.Asset_type)

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Status Code": "400", "Message": err})
			return
		}

		users := []Server_Request{}
		for rows.Next() {
			var Id, User_No, Rank_Count, Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMhz, Memory_CapacityMiB, Total_Cores, Total_Threads int
			var Network_Type, Request bool
			var Updated_by, Requester, Manufacturer, Operating_System, Cpu_model, CPU_Sockets, Number_Of_Network_Ports, DIMM_Size, DIMM_Capacity, Storage_Vendor, Storage_Controller, Storage_Capacity, Network_speed, Chat, Special_Switching_Needs, Asset_type, Memory_Id, MemoryDeviceType, Disk_Id, Media_Type, Disk_Description, Network_Id, PCIeType, Processor_Id, Instruction_Set, Processor_Model, Processor_Architecture,
				Socket, CPU_Family, Purpose string
			var Required_Start_Date, Required_End_Date, Updated_on time.Time

			err = rows.Scan(&Id, &User_No, &Requester, &Required_Start_Date, &Required_End_Date, &Manufacturer, &Operating_System, &Cpu_model, &CPU_Sockets, &DIMM_Size, &DIMM_Capacity, &Storage_Vendor, &Storage_Controller, &Storage_Capacity, &Network_Type, &Network_speed, &Number_Of_Network_Ports, &Special_Switching_Needs, &Chat, &Request, &Updated_on, &Updated_by, &Asset_type, &Memory_Id, &Rank_Count, &MemoryDeviceType, &Memory_CapacityMiB, &Memory_AllowedSpeedsMHz, &Memory_OperatingSpeedMhz, &Disk_Id, &Media_Type, &Disk_Description, &Network_Id, &PCIeType, &Processor_Id, &Instruction_Set, &Processor_Model, &Processor_Architecture, &Total_Cores, &Total_Threads, &Socket, &CPU_Family, &Purpose)

			if err != nil {
				w.WriteHeader(http.StatusAccepted)
				fmt.Println(err)
				json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
				return
			}

			users = append(users, Server_Request{Id: Id, User_No: User_No, Requester: Requester, Required_Start_Date: Required_Start_Date, Required_End_Date: Required_End_Date, Manufacturer: Manufacturer, Operating_System: Operating_System, Cpu_model: Cpu_model, CPU_Sockets: CPU_Sockets, DIMM_Size: DIMM_Size, DIMM_Capacity: DIMM_Capacity, Storage_Vendor: Storage_Vendor, Storage_Controller: Storage_Controller, Storage_Capacity: Storage_Capacity, Network_Type: Network_Type, Network_speed: Network_speed, Number_Of_Network_Ports: Number_Of_Network_Ports, Special_Switching_Needs: Special_Switching_Needs, Chat: Chat, Request: Request, Updated_on: Updated_on, Updated_by: Updated_by, Asset_type: Asset_type, Memory_Id: Memory_Id, Rank_Count: Rank_Count, MemoryDeviceType: MemoryDeviceType, Memory_CapacityMiB: Memory_CapacityMiB, Memory_AllowedSpeedsMHz: Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMHz: Memory_OperatingSpeedMhz, Disk_Id: Disk_Id, Media_Type: Media_Type, Disk_Description: Disk_Description, Network_Id: Network_Id, PCIeType: PCIeType, Processor_Id: Processor_Id, Instruction_Set: Instruction_Set, Processor_Model: Processor_Model, Processor_Architecture: Processor_Architecture, Total_Cores: Total_Cores, Total_Threads: Total_Threads, Socket: Socket, CPU_Family: CPU_Family, Purpose: Purpose})

		}
		// rev_slc := []Server_Request{}
		// for i := range users {
		// 	// reverse the order
		// 	rev_slc = append(rev_slc, users[len(users)-1-i])
		// }
		totalPage := math.Ceil(float64(total*1.0) / float64(pg.Count*1.0))
		json.NewEncoder(w).Encode(map[string]interface{}{"Count": pg.Count, "Page_no": pg.Page, "Total_entry": total, "Search": pg.Search, "Total_Page": totalPage, "Listusers": users, "Status Code": "200 OK", "Message": "List of Requests"})
	})

	//---------------------------------------------------Creating user Request-----------------------------------------------------------------
	mux.HandleFunc("/create_request", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func CreateRequest(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}

		var requests Server_Request
		var ID int
		ID = 0

		err := json.NewDecoder(r.Body).Decode(&v)
		if err != nil {
			fmt.Println(err)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Status Code": "400 Bad Request", "Message": err})
			return
		}

		err = db.QueryRow("Select ID from Server_Request where Id=$1", requests.Id).Scan(&ID)
		ID = ID + 1

		addStatement := `INSERT INTO Server_Request(User_No,Requester,Required_Start_Date,Required_End_Date,Manufacturer,Operating_System,Cpu_model,CPU_Sockets,DIMM_Size,DIMM_Capacity,Storage_Vendor,Storage_Controller,Storage_Capacity,Network_Type,Network_speed ,Number_Of_Network_Ports ,Special_Switching_Needs,Chat, Request,Updated_on,Updated_by,Asset_type,Memory_Id ,Rank_Count ,MemoryDeviceType ,Memory_CapacityMiB ,Memory_AllowedSpeedsMHz ,Memory_OperatingSpeedMhz ,Disk_Id ,Media_Type ,Disk_Description ,Network_Id ,PCIeType,Processor_Id ,Instruction_Set ,Processor_Model ,Processor_Architecture ,Total_Cores ,Total_Threads ,Socket ,CPU_Family,Purpose) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,'',$18,LOCALTIMESTAMP(0),$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40)`
		_, err = db.Exec(addStatement, v.User_No, v.Requester, v.Required_Start_Date.Format("2006-01-02"), v.Required_End_Date.Format("2006-01-02"), v.Manufacturer, v.Operating_System, v.Cpu_model, v.CPU_Sockets, v.DIMM_Size, v.DIMM_Capacity, v.Storage_Vendor, v.Storage_Controller, v.Storage_Capacity, v.Network_Type, v.Network_speed, v.Number_Of_Network_Ports, v.Special_Switching_Needs, v.Request, v.Updated_by, v.Asset_type, v.Memory_Id, v.Rank_Count, v.MemoryDeviceType, v.Memory_CapacityMiB, v.Memory_AllowedSpeedsMHz, v.Memory_OperatingSpeedMHz, v.Disk_Id, v.Media_Type, v.Disk_Description, v.Network_Id, v.PCIeType, v.Processor_Id, v.Instruction_Set, v.Processor_Model, v.Processor_Architecture, v.Total_Cores, v.Total_Threads, v.Socket, v.CPU_Family, v.Purpose)

		if err != nil {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
			return
		}
		w.WriteHeader(http.StatusOK)

		json.NewEncoder(w).Encode(map[string]interface{}{"Status Code": "200 OK", "Message": "Request Added successfully"})
	})

	//-----------------------------------------------------------GetMyRequest--------------------------------------------
	mux.HandleFunc("/my_request", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func GetMyRequest(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}
		a, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		p := Server_Request{}
		if err := json.Unmarshal(a, &p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		var pg Page
		if err := json.Unmarshal(a, &pg); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		var total int
		err2 := db.QueryRow("SELECT count(*) from server_request WHERE  Request='f' and asset_type ~* $3 AND User_No = $1 and server_request ::text ~* $2", p.User_No, pg.Search, p.Asset_type).Scan(&total) // exporting table
		if err2 != nil {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
			return
		}
		// err := json.NewDecoder(r.Body).Decode(&p)
		// if err != nil {
		// 	http.Error(w, err.Error(), http.StatusBadRequest)
		// 	return
		// }

		rows, err := db.Query("SELECT Id,User_No,Requester,COALESCE(Required_Start_Date, '0001-01-01'),COALESCE(Required_End_Date, '0001-01-01'),Manufacturer,COALESCE(Operating_System,''),COALESCE(Cpu_model,''),COALESCE(CPU_Sockets,''),COALESCE(DIMM_Size,''),COALESCE(DIMM_Capacity,''),COALESCE(Storage_Vendor,''),COALESCE(Storage_Controller,''),COALESCE(Storage_Capacity,''),COALESCE(Network_Type,false),COALESCE(Network_speed,''),COALESCE(Number_Of_Network_Ports,''),COALESCE(Special_Switching_Needs,''),COALESCE(Chat, ''),COALESCE(Request, false),COALESCE(Updated_on,'0001-01-01'),COALESCE(Updated_by, ''),Asset_type,COALESCE(Memory_Id,'') ,COALESCE(Rank_Count,0) ,COALESCE(MemoryDeviceType,'') ,COALESCE(Memory_CapacityMiB,0) ,COALESCE(Memory_AllowedSpeedsMHz,0) ,COALESCE(Memory_OperatingSpeedMhz,0) ,COALESCE(Disk_Id,'') ,COALESCE(Media_Type,'') ,COALESCE(Disk_Description,'') ,COALESCE(Network_Id,'') ,COALESCE(PCIeType,''),COALESCE(Processor_Id,'') ,COALESCE(Instruction_Set,'') ,COALESCE(Processor_Model,'') ,COALESCE(Processor_Architecture,'') ,COALESCE(Total_Cores,0) ,COALESCE(Total_Threads,0) ,COALESCE(Socket,'') ,COALESCE(CPU_Family,''),COALESCE(Purpose,'') from Server_Request WHERE  Request='f' and asset_type ~* $5 AND User_No = $1 AND Server_Request ::text ~*  $4 order by Updated_on desc limit $2 offset ($3-1)*$2;", p.User_No, pg.Count, pg.Page, pg.Search, p.Asset_type)
		if err != nil {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202"})
			return
		}

		Requests := []Server_Request{}
		for rows.Next() {
			var Id, User_No, Rank_Count, Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMhz, Memory_CapacityMiB, Total_Cores, Total_Threads int
			var Network_Type, Request bool
			var Updated_by, Requester, Manufacturer, Operating_System, Cpu_model, CPU_Sockets, Number_Of_Network_Ports, DIMM_Size, DIMM_Capacity, Storage_Vendor, Storage_Controller, Storage_Capacity, Network_speed, Chat, Special_Switching_Needs, Asset_type, Memory_Id, MemoryDeviceType, Disk_Id, Media_Type, Disk_Description, Network_Id, PCIeType, Processor_Id, Instruction_Set, Processor_Model, Processor_Architecture,
				Socket, CPU_Family, Purpose string
			var Required_Start_Date, Required_End_Date, Updated_on time.Time

			err1 := rows.Scan(&Id, &User_No, &Requester, &Required_Start_Date, &Required_End_Date, &Manufacturer, &Operating_System, &Cpu_model, &CPU_Sockets, &DIMM_Size, &DIMM_Capacity, &Storage_Vendor, &Storage_Controller, &Storage_Capacity, &Network_Type, &Network_speed, &Number_Of_Network_Ports, &Special_Switching_Needs, &Chat, &Request, &Updated_on, &Updated_by, &Asset_type, &Memory_Id, &Rank_Count, &MemoryDeviceType, &Memory_CapacityMiB, &Memory_AllowedSpeedsMHz, &Memory_OperatingSpeedMhz, &Disk_Id, &Media_Type, &Disk_Description, &Network_Id, &PCIeType, &Processor_Id, &Instruction_Set, &Processor_Model, &Processor_Architecture, &Total_Cores, &Total_Threads, &Socket, &CPU_Family, &Purpose)
			if err1 != nil {
				log.Printf("Failed to build content from sql rows: %v \n", err1)
				return
			}

			Requests = append(Requests, Server_Request{Id: Id, User_No: User_No, Requester: Requester, Required_Start_Date: Required_Start_Date, Required_End_Date: Required_End_Date, Manufacturer: Manufacturer, Operating_System: Operating_System, Cpu_model: Cpu_model, CPU_Sockets: CPU_Sockets, DIMM_Size: DIMM_Size, DIMM_Capacity: DIMM_Capacity, Storage_Vendor: Storage_Vendor, Storage_Controller: Storage_Controller, Storage_Capacity: Storage_Capacity, Network_Type: Network_Type, Network_speed: Network_speed, Number_Of_Network_Ports: Number_Of_Network_Ports, Special_Switching_Needs: Special_Switching_Needs, Chat: Chat, Request: Request, Updated_on: Updated_on, Updated_by: Updated_by, Asset_type: Asset_type, Memory_Id: Memory_Id, Rank_Count: Rank_Count, MemoryDeviceType: MemoryDeviceType, Memory_CapacityMiB: Memory_CapacityMiB, Memory_AllowedSpeedsMHz: Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMHz: Memory_OperatingSpeedMhz, Disk_Id: Disk_Id, Media_Type: Media_Type, Disk_Description: Disk_Description, Network_Id: Network_Id, PCIeType: PCIeType, Processor_Id: Processor_Id, Instruction_Set: Instruction_Set, Processor_Model: Processor_Model, Processor_Architecture: Processor_Architecture, Total_Cores: Total_Cores, Total_Threads: Total_Threads, Socket: Socket, CPU_Family: CPU_Family, Purpose: Purpose})
		}
		// rev_slc := []Server_Request{}
		// for i := range Requests {
		// 	// reverse the order
		// 	fmt.Println("working")
		// 	rev_slc = append(rev_slc, Requests[len(Requests)-1-i])
		// }
		totalPage := math.Ceil(float64(total*1.0) / float64(pg.Count*1.0))
		json.NewEncoder(w).Encode(map[string]interface{}{"Count": pg.Count, "Page_no": pg.Page, "Total_entry": total, "Search": pg.Search, "Total_Page": totalPage, "ListMyRequests": Requests, "Status Code": "200 OK", "Message": "Listing Requests"})

		if len(Requests) == 0 {
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "No Current Requests", "Status Code": "404"})
			return
		}
	})

	//----------------------------------------------------update user request---------------------------------------------------
	mux.HandleFunc("/update_u_comments", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func UpdateUserComments(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		err := json.NewDecoder(r.Body).Decode(&v)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Status Code": "400", "Message": "Invalid Input Syntax"})

			return
		}
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]string{"Message": "method not found", "Status Code": "405"})
			return
		}
		currentTime := time.Now()

		// _, err1 := db.Exec("UPDATE Server_Request SET User_No=$2,Requester=$3,Required_Start_Date=$4,Required_End_Date=$5,Manufacturer=$6,Operating_System=$7,Cpu_model=$8,CPU_Sockets=$9,DIMM_Size=$10,DIMM_Capacity=$11,Storage_Vendor=$12,Storage_Controller=$13,Storage_Capacity=$14,Network_Type=$15,Network_speed=$16,Number_Of_Network_Ports=$17,Special_Switching_Needs=$18,Updated_on=LOCALTIMESTAMP(0),Updated_by=$19 WHERE ID=$1  ;", v.Id, v.User_No, v.Requester, v.Required_Start_Date, v.Required_End_Date, v.Manufacturer, v.Operating_System, v.Cpu_model, v.CPU_Sockets, v.DIMM_Size, v.DIMM_Capacity, v.Storage_Vendor, v.Storage_Controller, v.Storage_Capacity, v.Network_Type, v.Network_speed, v.Number_Of_Network_Ports, v.Special_Switching_Needs, v.Updated_by)

		// if err1 != nil {
		// 	w.WriteHeader(http.StatusAccepted)
		// 	json.NewEncoder(w).Encode(map[string]interface{}{"Message": err1, "Status Code": "202 "})
		// 	return
		// }

		_, err2 := db.Exec("UPDATE Server_Request SET Chat= $2 WHERE ID=$1;", v.Id, v.Chat+"(|"+currentTime.Format("2006-01-02 15:04:05"))

		if err2 != nil {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err2, "Status Code": "202 "})
			return
		}
		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Record Updated!", "Status Code": "200 OK"})
	})

	//-------------------------------------------------------Chat-----------------------------------------------------
	mux.HandleFunc("/chat", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

		if r.Method != http.MethodPost {
			w.WriteHeader(405)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}
		p := Server_Request{}
		err := json.NewDecoder(r.Body).Decode(&p)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		rows, err := db.Query("SELECT Id,COALESCE(Chat, '') from Server_Request where Id=$1", p.Id)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Status Code": "400", "Message": err})
			return
		}
		var chat []Chats
		var a []string
		for rows.Next() {
			var Id int
			var Chat string
			err := rows.Scan(&Id, &Chat)
			if err != nil {
				log.Fatal(err)
				json.NewEncoder(w).Encode(map[string]interface{}{"status": "400 Bad Request", "Message": err})
			}
			fmt.Println(Chat)
			index := strings.Split(string(Chat), "(|")
			for i := 0; i < len(index); i++ {
				a = append(a, index[i])
			}
			c := 4
			r := (len(a) + c - 1) / c
			b := make([][]string, r)
			lo, hi := 0, c
			for i := range b {
				if hi > len(a) {
					hi = len(a)
				}
				b[i] = a[lo:hi:hi]
				lo, hi = hi, hi+c

			}

			chat = append(chat, Chats{Id: Id, Comment: b})
		}
		json.NewEncoder(w).Encode(map[string]interface{}{"Chat": chat, "Status": "200 OK"})

	})

	//------------------------------------------------add asset(from request)---------------------------------------------------------------------
	mux.HandleFunc("/add_asset_request", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func AddAsset(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}
		var assets Asset[int]
		var Asset_Id int
		Asset_Id = 0

		err := json.NewDecoder(r.Body).Decode(&assets)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Message": "Invalid Input Syntax", "Status Code": "400 "})
			return
		}
		hashedPassword1, err := bcrypt.GenerateFromPassword([]byte(assets.PDU_Password), 8)

		// hashedPassword2, err := bcrypt.GenerateFromPassword([]byte(assets.BMC_Password), 8)
		keyStr := hex.EncodeToString(key)
		cryptoText := encrypt(keyStr, assets.BMC_Password)
		fmt.Println(cryptoText)
		hashedPassword2 := cryptoText
		//---------- decrypting caling function ----------------
		// text := decrypt(keyStr, hashedPassword2)
		// fmt.Println(text)

		hashedPassword3, err := bcrypt.GenerateFromPassword([]byte(assets.OS_Password), 8)
		err = db.QueryRow("Select Asset_Id from Asset where Asset_Id=$1", assets.Asset_Id).Scan(&Asset_Id)

		Asset_Id = Asset_Id + 1
		_, err = db.Exec(`INSERT INTO asset (Asset_Name,Server_Serial,Server_Model,Manufacturer,Owner,Category ,Still_needed,Current_Project,Notes,Previous_Project,BOM,Support_case,Cluster_Id,Asset_location,Lab,Row,Rack,RU,DC_status,Cpu_model,Generation,CPU_Sockets,PDU_IP,PDU_User,PDU_Password,BMC_IP, BMC_User, BMC_Password, BMC_FQDN,Operating_System,OS_IP,OS_User,OS_Password,DIMM_Size,DIMM_Capacity,Storage_Vendor,Storage_Controller,Storage_Capacity,Network_Type,Network_speed,Number_Of_Network_Ports,Special_Switching_Needs,Required_Start_Date,Required_Finish_Date,Created_on,Created_by,Assigned_to,Assigned_from,Assigned_by,Updated_on,Updated_by,Purpose,Delete,Reserved,Asset_type,Memory_Id ,Rank_Count ,MemoryDeviceType ,Memory_CapacityMiB ,Memory_AllowedSpeedsMHz ,Memory_OperatingSpeedMhz ,Disk_Id ,Media_Type ,Disk_Description ,Network_Id ,PCIeType,Processor_Id ,Instruction_Set ,Processor_Model ,Processor_Architecture ,Total_Cores ,Total_Threads ,Socket ,CPU_Family) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,LOCALTIMESTAMP(0),$45,$46,LOCALTIMESTAMP(0),$47,LOCALTIMESTAMP(0),$48,$49,'0','t',$50,$51,$52,$53,$54,$55,$56,$57,$58,$59,$60,$61,$62,$63,$64,$65,$66,$67,$68,$69)`,
			assets.Asset_Name, assets.Server_Serial, assets.Server_Model, assets.Manufacturer, assets.Owner, assets.Category, assets.Still_needed, assets.Current_Project, assets.Notes, assets.Previous_Project, assets.BOM, assets.Support_case, assets.Cluster_Id, assets.Asset_location, assets.Lab, assets.Row, assets.Rack, assets.RU, assets.DC_status, assets.Cpu_model, assets.Generation, assets.CPU_Sockets, assets.PDU_IP, assets.PDU_User, string(hashedPassword1), assets.BMC_IP, assets.BMC_User, string(hashedPassword2), assets.BMC_FQDN, assets.Operating_System, assets.OS_IP, assets.OS_User, string(hashedPassword3), assets.DIMM_Size, assets.DIMM_Capacity, assets.Storage_Vendor, assets.Storage_Controller, assets.Storage_Capacity, assets.Network_Type, assets.Network_speed, assets.Number_Of_Network_Ports, assets.Special_Switching_Needs, assets.Required_Start_Date.Format("2006-01-02"), assets.Required_Finish_Date.Format("2006-01-02"), assets.Created_by, assets.Assigned_to, assets.Assigned_by, assets.Updated_by, assets.Purpose, assets.Asset_type, assets.Memory_Id, assets.Rank_Count, assets.MemoryDeviceType, assets.Memory_CapacityMiB, assets.Memory_AllowedSpeedsMHz, assets.Memory_AllowedSpeedsMHz, assets.Disk_Id, assets.Media_Type, assets.Disk_Description, assets.Network_Id, assets.PCIeType, assets.Processor_Id, assets.Instruction_Set, assets.Processor_Model, assets.Processor_Architecture, assets.Total_Cores, assets.Total_Threads, assets.Socket, assets.CPU_Family)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Println(err)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Invalid Input Syntax for IP ", "Status Code": "400 ", "Error": err})
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{"Status Code": "200 OK", "Message": "Recorded Sucessfully"})

		if assets.Delete == 0 {
			_, err = db.Exec(`INSERT into Historic_details (Asset_ID,Asset_Name,Created_on,Created_by,BMC_IP,Assigned_to,Assigned_from,Updated_on,Updated_by,Remarks,Asset_type)
		SELECT Asset_ID,Asset_Name,Created_on,Created_by,COALESCE(BMC_IP,'0.0.0.0'),Assigned_to,Assigned_from,Updated_on,Updated_by,'Server Assigned',Asset_type FROM Asset where Asset_ID=(SELECT Asset_ID FROM Asset ORDER BY Asset_ID DESC LIMIT 1);`)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]string{"Message": "Invalid Input Syntax", "Status Code": "400 "})
				return
			}
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "History Updated", "Status Code": "200 OK"})
		}
	})

	//------------------------------------------------approve request(from request)---------------------------------------------------------------------
	mux.HandleFunc("/approve_request", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}
		var s Server_Request
		err := json.NewDecoder(r.Body).Decode(&s)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Message": "Invalid Input Syntax", "Status Code": "400 "})
			return
		}

		_, err = db.Exec("UPDATE server_request SET Request='t' WHERE Id=$1;", s.Id)
		if err != nil {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{"Status Code": "200 OK", "Message": "Approved Sucessfully"})

	})
	//----------------------------------------------------update request---------------------------------------------------
	mux.HandleFunc("/update_request", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func UpdateUserComments(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		err := json.NewDecoder(r.Body).Decode(&v)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Status Code": "400", "Message": "Invalid Input Syntax"})

			return
		}
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]string{"Message": "method not found", "Status Code": "405"})
			return
		}

		_, err1 := db.Exec("Update Server_Request SET User_No=$2,Requester=$3,Required_Start_Date=$4,Required_End_Date=$5,Manufacturer=$6,Operating_System=$7,Cpu_model=$8,CPU_Sockets=$9,DIMM_Size=$10,DIMM_Capacity=$11,Storage_Vendor=$12,Storage_Controller=$13,Storage_Capacity=$14,Network_Type=$15,Network_speed=$16,Number_Of_Network_Ports=$17,Special_Switching_Needs=$18,Updated_on=LOCALTIMESTAMP(0),Updated_by=$19,Memory_Id=$20 ,Rank_Count=$21 ,MemoryDeviceType=$22 ,Memory_CapacityMiB=$23 ,Memory_AllowedSpeedsMHz=$24 ,Memory_OperatingSpeedMhz=$25 ,Disk_Id =$26,Media_Type=$27 ,Disk_Description=$28,Network_Id=$29 ,PCIeType=$30,Processor_Id=$31 ,Instruction_Set=$32 ,Processor_Model=$33 ,Processor_Architecture=$34,Total_Cores=$35,Total_Threads=$36,Socket=$37 ,CPU_Family=$38,Purpose=$39  WHERE ID=$1  ;", v.Id, v.User_No, v.Requester, v.Required_Start_Date, v.Required_End_Date, v.Manufacturer, v.Operating_System, v.Cpu_model, v.CPU_Sockets, v.DIMM_Size, v.DIMM_Capacity, v.Storage_Vendor, v.Storage_Controller, v.Storage_Capacity, v.Network_Type, v.Network_speed, v.Number_Of_Network_Ports, v.Special_Switching_Needs, v.Updated_by, v.Memory_Id, v.Rank_Count, v.MemoryDeviceType, v.Memory_CapacityMiB, v.Memory_AllowedSpeedsMHz, v.Memory_OperatingSpeedMHz, v.Disk_Id, v.Media_Type, v.Disk_Description, v.Network_Id, v.PCIeType, v.Processor_Id, v.Instruction_Set, v.Processor_Model, v.Processor_Architecture, v.Total_Cores, v.Total_Threads, v.Socket, v.CPU_Family, v.Purpose)

		if err1 != nil {

			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err1, "Status Code": "202 "})
			return
		}

		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Record Updated!", "Status Code": "200 OK"})
	})

	//-------------------------------------------------------------------------power off/on(redfish)-----------------------------------------------------------------------------------------------------------------------
	type Actiontype struct {
		Action    string `json:"Action"`
		ResetType string `json:"ResetType"`
	}
	type ActioUI struct {
		ActionUI string `json:"ActionUI"`
	}

	mux.HandleFunc("/lightsOffOn", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}
		client := http.Client{Timeout: 5 * time.Second}
		http.DefaultTransport.(*http.Transport).TLSClientConfig = &tls.Config{InsecureSkipVerify: true}

		a, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Message": "Invalid Input Syntax", "Status Code": "400 "})
			return
		}
		var p Asset[string]
		if err := json.Unmarshal(a, &p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Message": "Invalid Input Syntax", "Status Code": "400 "})
			return
		}

		var aui ActioUI
		if err := json.Unmarshal(a, &aui); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Message": "Invalid Input Syntax", "Status Code": "400 "})
			return
		}

		var BMC_IP, BMC_User, BMC_Password string
		var Manufacturer string

		var atype = Actiontype{
			Action:    "Reset",
			ResetType: aui.ActionUI, //ForceOff....On
		}

		if aui.ActionUI == "On" || aui.ActionUI == "ForceRestart" || aui.ActionUI == "PushPowerButton" || aui.ActionUI == "Nmi" {
			_, err = db.Exec("UPDATE asset SET Updated_on=LOCALTIMESTAMP(0),Updated_by=$2,Power_Status='true' WHERE Asset_ID=$1;", p.Asset_Id, p.Updated_by)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]string{"Error": err.Error(), "Message": "Invalid Input Syntax", "Status Code": "400 "})
				return
			}
			_, err := db.Query(`INSERT into Historic_details (Asset_ID,Asset_Name,Created_on,Created_by,BMC_IP,Assigned_to,Assigned_from,Updated_on,Updated_by,Remarks,Asset_type) 
		SELECT Asset_ID,Asset_Name,Created_on,Created_by,BMC_IP,Assigned_to,COALESCE(Assigned_from, '0001-01-01'),Updated_on,Updated_by,'Power Status: On',Asset_type FROM Asset where Asset_Id=$1`, p.Asset_Id)
			if err != nil {
				w.WriteHeader(http.StatusAccepted)
				json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
				return
			}
		} else if aui.ActionUI == "ForceOff" || aui.ActionUI == "PushPowerButton" || aui.ActionUI == "GracefulShutdown" {
			_, err = db.Exec("UPDATE asset SET Updated_on=LOCALTIMESTAMP(0),Updated_by=$2,Power_Status='false' WHERE Asset_ID=$1;", p.Asset_Id, p.Updated_by)
			if err != nil {
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]string{"Message": "Invalid Input Syntax", "Status Code": "400 "})
				return
			}
			_, err := db.Query(`INSERT into Historic_details (Asset_ID,Asset_Name,Created_on,Created_by,BMC_IP,Assigned_to,Assigned_from,Updated_on,Updated_by,Remarks,Asset_type) 
		SELECT Asset_ID,Asset_Name,Created_on,Created_by,BMC_IP,Assigned_to,COALESCE(Assigned_from, '0001-01-01'),Updated_on,Updated_by,'Power Status: ForceOff',Asset_type FROM Asset where Asset_Id=$1`, p.Asset_Id)
			if err != nil {
				w.WriteHeader(http.StatusAccepted)
				json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
				return
			}
		} else {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "Invalid Action", "Status Code": "400 "})
			return
		}
		inputJSON, _ := json.Marshal(atype)
		byteJson := bytes.NewReader(inputJSON)

		err1 := db.QueryRow("SELECT BMC_IP,BMC_user,BMC_Password,Manufacturer FROM Asset where Asset_Id=$1", p.Asset_Id).Scan(&BMC_IP, &BMC_User, &BMC_Password, &Manufacturer)
		if err1 != nil {
			fmt.Println(err1)
		}
		keyStr := hex.EncodeToString(key)
		passwd := Decrypt(keyStr, BMC_Password)
		fmt.Println(passwd)
		baseURL := "https://" + fmt.Sprint(BMC_IP)
		suburl1 := "/redfish/v1/Systems"
		// https://10.216.170.9/redfish/v1/Systems/1/Actions/ComputerSystem.Reset
		req, err := http.NewRequest(http.MethodGet, baseURL+suburl1, nil)
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("Accept", "application/json")
		req.SetBasicAuth(BMC_User, passwd)

		// req.SetBasicAuth("admin", "amd1234!")

		resp, err := client.Do(req)
		if err != nil {
			log.Printf("Request Failed: %s", err)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Message": "Request Failed", "Status Code": "400 "})
			return
		}

		defer resp.Body.Close()
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Printf("Reading body failed: %s", err)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Message": "Reading body failed", "Status Code": "400 "})
			return
		}
		// bodyString := string(body)
		// fmt.Println(bodyString)

		var response1 map[string]interface{}
		err = json.Unmarshal(body, &response1)
		if err != nil {
			log.Fatal("Error during Unmarshal(): ", err)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Message": "Error during Unmarshal()", "Status Code": "400 "})

		}

		//suburl :

		suburl2 := response1["Members"].([]interface{})[0].(map[string]interface{})["@odata.id"]
		// fmt.Println(suburl2)
		subURL2 := fmt.Sprint(suburl2)
		//for next suburl:
		req1, err := http.NewRequest(http.MethodGet, baseURL+subURL2, nil)
		req1.Header.Set("Content-Type", "application/json")
		req1.Header.Set("Accept", "application/json")
		req1.SetBasicAuth(BMC_User, passwd)
		// req1.SetBasicAuth("admin", "amd1234!")

		resp1, err := client.Do(req1)
		if err != nil {
			log.Printf("Request Failed: %s", err)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Message": "Request Failed", "Status Code": "400 "})
			return
		}

		defer resp1.Body.Close()
		body1, err := ioutil.ReadAll(resp1.Body)
		if err != nil {
			log.Printf("Reading body failed: %s", err)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Message": "Reading body failed", "Status Code": "400 "})

			return
		}
		// bodyString1 := string(body1)
		// fmt.Println(bodyString1)

		var response2 map[string]interface{}
		err = json.Unmarshal(body1, &response2)
		if err != nil {
			log.Fatal("Error during Unmarshal(): ", err)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Message": "Error during Unmarshal()", "Status Code": "400 "})

		}

		//suburl

		suburl3 := response2["Actions"].(map[string]interface{})["#ComputerSystem.Reset"].(map[string]interface{})["target"]
		fmt.Println(suburl3)
		subURL3 := fmt.Sprint(suburl3)

		req2, err := http.NewRequest(http.MethodPost, baseURL+subURL3, byteJson)
		req2.Header.Set("Content-Type", "application/json")
		req2.Header.Set("Accept", "application/json")
		req2.SetBasicAuth(BMC_User, passwd)
		// req2.SetBasicAuth("admin", "amd1234!")

		resp2, err := client.Do(req2)

		if err != nil {
			log.Printf("Request Failed: %s", err)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Message": "Request Failed", "Status Code": "400 "})

			return
		}

		defer resp2.Body.Close()
		body2, err := ioutil.ReadAll(resp2.Body)
		// Log the request body
		bodyString2 := string(body2)
		log.Print(bodyString2)
		if err != nil {
			log.Printf("Reading body failed: %s", err)
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Message": "Reading body failed", "Status Code": "400 "})
			return
		}
		json.NewEncoder(w).Encode(map[string]interface{}{"Server_Msg": bodyString2, "Message": "DELL Inc Manufacturer matches", "Status Code": "200 OK"})

		fmt.Println(BMC_IP)
		fmt.Println(BMC_User)
		fmt.Println(passwd)
		fmt.Println(Manufacturer)

	})

	//--------------------------------------------------------------filter--------------------------------------------------------------
	mux.HandleFunc("/list_asset/pool/filter", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func Pool(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}

		var pg Page
		err := json.NewDecoder(r.Body).Decode(&pg)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		var total int

		err2 := db.QueryRow("SELECT count(*) from asset where reserved='f' and Server_Model ::text ~* $1 and manufacturer ::text ~* $2 and BOM ::text ~* $3 and Cluster_Id ::text ~* $4 and Asset_Location ::text ~* $5 and Lab ::text ~* $6 and DC_status ::text ~* $7 and CPU_model ::text ~* $8 and Generation ::text ~* $9 and CPU_Sockets ::text ~* $10 and BMC_FQDN ::text ~* $11 and Operating_System ::text ~* $12 and DIMM_Size ::text ~* $13 and DIMM_Capacity ::text ~* $14 and Storage_Vendor ::text ~* $15 and Storage_Controller ::text ~* $16 and Storage_Capacity ::text ~* $17 and Network_speed ::text ~* $18 and Number_Of_Network_Ports ::text ~* $19 and Created_by ::text ~* $20 and Updated_by ::text ~* $21 and asset ::text ~* $22", pg.Server_Model, pg.Manufacturer, pg.BOM, pg.Cluster_Id, pg.Asset_location, pg.Lab, pg.DC_status, pg.Generation, pg.CPU_Sockets, pg.Cpu_model, pg.BMC_FQDN, pg.Operating_System, pg.DIMM_Size, pg.DIMM_Capacity, pg.Storage_Vendor, pg.Storage_Controller, pg.Storage_Capacity, pg.Network_speed, pg.Number_Of_Network_Ports, pg.Created_by, pg.Updated_by, pg.Search).Scan(&total) // exporting table
		if err2 != nil {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
			return
		}
		str := `SELECT Asset_Id,Asset_Name,Server_Serial,Server_Model,Manufacturer,Owner,Category ,Still_needed,Current_Project,Notes,Previous_Project,BOM,Support_case,COALESCE(Cluster_ID,''),Asset_location,Lab,Row,Rack,RU,DC_status,Cpu_model,Generation,CPU_Sockets,PDU_IP,PDU_User,PDU_Password,BMC_IP, BMC_User, BMC_Password, BMC_FQDN,Operating_System,OS_IP,OS_User,OS_Password,DIMM_Size,DIMM_Capacity,Storage_Vendor,Storage_Controller,Storage_Capacity,Network_Type,Network_speed,Number_Of_Network_Ports,Special_Switching_Needs,Required_Start_Date,Required_Finish_Date,Created_on ,Created_by,COALESCE(Assigned_To, 0),COALESCE(Assigned_from, '0001-01-01'),COALESCE(Assigned_by, ''),COALESCE(Updated_on,'0001-01-01'),COALESCE(Updated_by, ''),Purpose,Delete,Reserved,Asset_Type,Memory_Id ,Rank_Count ,MemoryDeviceType ,Memory_CapacityMiB ,Memory_AllowedSpeedsMHz ,Memory_OperatingSpeedMhz ,Disk_Id ,Media_Type ,Disk_Description ,Network_Id ,PCIeType,Processor_Id ,Instruction_Set ,Processor_Model ,Processor_Architecture ,Total_Cores ,Total_Threads ,Socket ,CPU_Family FROM Asset
		 WHERE (Delete=B'0' AND Reserved='false' OR Reserved is null) and Server_Model ::text ~* $3 and manufacturer ::text ~* $4 and BOM ::text ~* $5 and Cluster_Id ::text ~* $6 and Asset_Location ::text ~* $7 and Lab ::text ~* $8 and DC_status ::text ~* $9 and CPU_model ::text ~* $10 and Generation ::text ~* $11 and CPU_Sockets ::text ~* $12 and BMC_FQDN ::text ~* $13 and Operating_System ::text ~* $14 and DIMM_Size ::text ~* $15 and DIMM_Capacity ::text ~* $16 and Storage_Vendor ::text ~* $17 and Storage_Controller ::text ~* $18 and Storage_Capacity ::text ~* $19 and Network_speed ::text ~* $20 and Number_Of_Network_Ports ::text ~* $21 and Created_by ::text ~* $22 and Updated_by ::text ~* $23 and asset ::text ~* $24 order by Updated_on desc limit $1 offset ($2-1)*$1;`
		rows, err := db.Query(str, pg.Count, pg.Page, pg.Server_Model, pg.Manufacturer, pg.BOM, pg.Cluster_Id, pg.Asset_location, pg.Lab, pg.DC_status, pg.Cpu_model, pg.Generation, pg.CPU_Sockets, pg.BMC_FQDN, pg.Operating_System, pg.DIMM_Size, pg.DIMM_Capacity, pg.Storage_Vendor, pg.Storage_Controller, pg.Storage_Capacity, pg.Network_speed, pg.Number_Of_Network_Ports, pg.Created_by, pg.Updated_by, pg.Search)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 "})
			return
		}
		result := []Asset[string]{} // creating slice
		for rows.Next() {

			var Asset_Id, Assigned_To, Delete, Row, Rack, RU, Rank_Count, Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMhz, Memory_CapacityMiB, Total_Cores, Total_Threads int
			var Asset_Name, Server_Serial, Server_Model, Manufacturer, OS_IP, OS_User, OS_Password,
				BMC_IP, BMC_User, BMC_Password, BMC_FQDN, Asset_Location,
				Assigned_By, Created_by, Updated_by, Cluster_Id, Purpose, Generation,
				Lab, DC_Status, PDU_IP, PDU_User, PDU_Password, Owner, Category,
				Current_Project, Notes, Previous_Project, BOM, Support_Case, Cpu_Model, CPU_Sockets,
				DIMM_Capacity, DIMM_Size, Storage_Vendor, Storage_Controller,
				Storage_Capacity, Network_Speed, Number_Of_Network_Ports, Special_Switching_Needs, Operating_System, Asset_Type,
				Memory_Id, MemoryDeviceType, Disk_Id, Media_Type, Disk_Description, Network_Id, PCIeType, Processor_Id, Instruction_Set, Processor_Model, Processor_Architecture,
				Socket, CPU_Family string
			var Created_on, Updated_on, Assigned_from, Required_Start_Date, Required_Finish_Date time.Time
			var Reserved, Still_Needed, Network_Type bool
			err := rows.Scan(&Asset_Id, &Asset_Name, &Server_Serial, &Server_Model, &Manufacturer, &Owner, &Category, &Still_Needed, &Current_Project, &Notes, &Previous_Project, &BOM, &Support_Case, &Cluster_Id, &Asset_Location, &Lab, &Row, &Rack, &RU, &DC_Status, &Cpu_Model, &Generation, &CPU_Sockets, &PDU_IP, &PDU_User, &PDU_Password, &BMC_IP, &BMC_User, &BMC_Password, &BMC_FQDN, &Operating_System, &OS_IP, &OS_User, &OS_Password, &DIMM_Size, &DIMM_Capacity, &Storage_Vendor, &Storage_Controller, &Storage_Capacity, &Network_Type, &Network_Speed, &Number_Of_Network_Ports, &Special_Switching_Needs, &Required_Start_Date, &Required_Finish_Date, &Created_on, &Created_by, &Assigned_To, &Assigned_from, &Assigned_By, &Updated_on, &Updated_by, &Purpose, &Delete, &Reserved, &Asset_Type, &Memory_Id, &Rank_Count, &MemoryDeviceType, &Memory_CapacityMiB, &Memory_AllowedSpeedsMHz, &Memory_OperatingSpeedMhz, &Disk_Id, &Media_Type, &Disk_Description, &Network_Id, &PCIeType, &Processor_Id, &Instruction_Set, &Processor_Model, &Processor_Architecture, &Total_Cores, &Total_Threads, &Socket, &CPU_Family)

			if err != nil {
				fmt.Println(err)
				log.Printf("Failed to build content from sql rows: %v\n", err)

			}
			marshal, _ := json.Marshal(result)
			var c []Historic_details[string]
			var username []string
			var mail string
			var user string
			_ = json.Unmarshal(marshal, &c)
			err = db.QueryRow(" SELECT Email_ID FROM users where User_ID=$1;", Assigned_To).Scan(&mail)
			if err != nil {
				//fmt.Println(err)
			}
			username = strings.Split(mail, "@")
			user = username[0]
			result = append(result, Asset[string]{Asset_Id: Asset_Id, Asset_Name: Asset_Name, Server_Serial: Server_Serial, Server_Model: Server_Model, Manufacturer: Manufacturer, Owner: Owner, Category: Category, Still_needed: Still_Needed, Current_Project: Current_Project, Notes: Notes, Previous_Project: Previous_Project, BOM: BOM, Support_case: Support_Case, Cluster_Id: Cluster_Id, Asset_location: Asset_Location, Lab: Lab, Row: Row, Rack: Rack, RU: RU, DC_status: DC_Status, Cpu_model: Cpu_Model, Generation: Generation, CPU_Sockets: CPU_Sockets, PDU_IP: PDU_IP, PDU_User: PDU_User, PDU_Password: PDU_Password, BMC_IP: BMC_IP, BMC_User: BMC_User, BMC_Password: BMC_Password, BMC_FQDN: BMC_FQDN, Operating_System: Operating_System, OS_IP: OS_IP, OS_User: OS_User, OS_Password: OS_Password, DIMM_Size: DIMM_Size, DIMM_Capacity: DIMM_Capacity, Storage_Vendor: Storage_Vendor, Storage_Controller: Storage_Controller, Storage_Capacity: Storage_Capacity, Network_Type: Network_Type, Network_speed: Network_Speed, Number_Of_Network_Ports: Number_Of_Network_Ports, Special_Switching_Needs: Special_Switching_Needs, Required_Start_Date: Required_Start_Date, Required_Finish_Date: Required_Finish_Date, Created_on: Created_on, Created_by: Created_by, Assigned_to: user, Assigned_from: Assigned_from, Assigned_by: Assigned_By, Updated_on: Updated_on, Updated_by: Updated_by, Purpose: Purpose, Delete: Delete, Reserved: Reserved, Asset_type: Asset_Type, Memory_Id: Memory_Id, Rank_Count: Rank_Count, MemoryDeviceType: MemoryDeviceType, Memory_CapacityMiB: Memory_CapacityMiB, Memory_AllowedSpeedsMHz: Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMHz: Memory_OperatingSpeedMhz, Disk_Id: Disk_Id, Media_Type: Media_Type, Disk_Description: Disk_Description, Network_Id: Network_Id, PCIeType: PCIeType, Processor_Id: Processor_Id, Instruction_Set: Instruction_Set, Processor_Model: Processor_Model, Processor_Architecture: Processor_Architecture, Total_Cores: Total_Cores, Total_Threads: Total_Threads, Socket: Socket, CPU_Family: CPU_Family})
		} // appending deatils to the result
		// rev_slc := []Asset[string]{}
		// for i := range result {
		// 	// reverse the order
		// 	rev_slc = append(rev_slc, result[len(result)-1-i])
		// }

		totalPage := math.Ceil(float64(total*1.0) / float64(pg.Count*1.0))
		json.NewEncoder(w).Encode(map[string]interface{}{"Count": pg.Count, "Page_no": pg.Page, "Total_entry": total, "Search": pg.Search, "Total_Page": totalPage, "ListAsset": result, "Status Code": "200 OK", "Message": "Listing All Servers"})
	})
	//-------------------------------------filter--------------------------------------------------------------
	mux.HandleFunc("/list_asset/Reserved/filter", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func Reserved(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}

		var pg Page
		err := json.NewDecoder(r.Body).Decode(&pg)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		var total int
		err2 := db.QueryRow("SELECT count(*) from asset where reserved='t' and Server_Model ::text ~* $1 and manufacturer ::text ~* $2 and BOM ::text ~* $3 and Cluster_Id ::text ~* $4 and Asset_Location ::text ~* $5 and Lab ::text ~* $6 and DC_status ::text ~* $7 and CPU_model ::text ~* $8 and Generation ::text ~* $9 and CPU_Sockets ::text ~* $10 and BMC_FQDN ::text ~* $11 and Operating_System ::text ~* $12 and DIMM_Size ::text ~* $13 and DIMM_Capacity ::text ~* $14 and Storage_Vendor ::text ~* $15 and Storage_Controller ::text ~* $16 and Storage_Capacity ::text ~* $17 and Network_speed ::text ~* $18 and Number_Of_Network_Ports ::text ~* $19 and Created_by ::text ~* $20 and Updated_by ::text ~* $21 and asset ::text ~* $22", pg.Server_Model, pg.Manufacturer, pg.BOM, pg.Cluster_Id, pg.Asset_location, pg.Lab, pg.DC_status, pg.Generation, pg.CPU_Sockets, pg.Cpu_model, pg.BMC_FQDN, pg.Operating_System, pg.DIMM_Size, pg.DIMM_Capacity, pg.Storage_Vendor, pg.Storage_Controller, pg.Storage_Capacity, pg.Network_speed, pg.Number_Of_Network_Ports, pg.Created_by, pg.Updated_by, pg.Search).Scan(&total) // exporting table
		if err2 != nil {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
			return
		}
		str := "SELECT Asset_Id,Asset_Name,Server_Serial,Server_Model,Manufacturer,Owner,Category ,Still_needed,Current_Project,Notes,Previous_Project,BOM,Support_case,COALESCE(Cluster_ID,''),Asset_location,Lab,Row,Rack,RU,DC_status,Cpu_model,Generation,CPU_Sockets,PDU_IP,PDU_User,PDU_Password,BMC_IP, BMC_User, BMC_Password, BMC_FQDN,Operating_System,OS_IP,OS_User,OS_Password,DIMM_Size,DIMM_Capacity,Storage_Vendor,Storage_Controller,Storage_Capacity,Network_Type,Network_speed,Number_Of_Network_Ports,Special_Switching_Needs,Required_Start_Date,Required_Finish_Date,Created_on,Created_by,COALESCE(Assigned_to, 0),COALESCE(Assigned_from, '0001-01-01'),COALESCE(Assigned_by, ''),COALESCE(Updated_on,'0001-01-01'),COALESCE(Updated_by, ''),Purpose,Delete,Reserved,Asset_type,COALESCE(Power_Status, 'false'),Memory_Id ,Rank_Count ,MemoryDeviceType ,Memory_CapacityMiB ,Memory_AllowedSpeedsMHz ,Memory_OperatingSpeedMhz ,Disk_Id ,Media_Type ,Disk_Description ,Network_Id ,PCIeType,Processor_Id ,Instruction_Set ,Processor_Model ,Processor_Architecture ,Total_Cores ,Total_Threads ,Socket ,CPU_Family FROM Asset WHERE Reserved='true' and Server_Model ::text ~* $3 and manufacturer ::text ~* $4 and BOM ::text ~* $5 and Cluster_Id ::text ~* $6 and Asset_Location ::text ~* $7 and Lab ::text ~* $8 and DC_status ::text ~* $9 and CPU_model ::text ~* $10 and Generation ::text ~* $11 and CPU_Sockets ::text ~* $12 and BMC_FQDN ::text ~* $13 and Operating_System ::text ~* $14 and DIMM_Size ::text ~* $15 and DIMM_Capacity ::text ~* $16 and Storage_Vendor ::text ~* $17 and Storage_Controller ::text ~* $18 and Storage_Capacity ::text ~* $19 and Network_speed ::text ~* $20 and Number_Of_Network_Ports ::text ~* $21 and Created_by ::text ~* $22 and Updated_by ::text ~* $23 and asset ::text ~* $24 order by Updated_on desc limit $1 offset ($2-1)*$1;"
		rows, err := db.Query(str, pg.Count, pg.Page, pg.Server_Model, pg.Manufacturer, pg.BOM, pg.Cluster_Id, pg.Asset_location, pg.Lab, pg.DC_status, pg.Cpu_model, pg.Generation, pg.CPU_Sockets, pg.BMC_FQDN, pg.Operating_System, pg.DIMM_Size, pg.DIMM_Capacity, pg.Storage_Vendor, pg.Storage_Controller, pg.Storage_Capacity, pg.Network_speed, pg.Number_Of_Network_Ports, pg.Created_by, pg.Updated_by, pg.Search)

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 "})
			return
		}
		result := []Asset[string]{} // creating slice

		for rows.Next() {
			var Asset_Id, Assigned_to, Delete, Row, Rack, RU, Rank_Count, Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMhz, Memory_CapacityMiB, Total_Cores, Total_Threads int
			var Asset_Name, Server_Serial, Server_Model, Manufacturer, OS_IP, OS_User, OS_Password,
				BMC_IP, BMC_User, BMC_Password, BMC_FQDN, Asset_location,
				Assigned_by, Created_by, Updated_by, Cluster_Id, Purpose, Generation,
				Lab, DC_status, PDU_IP, PDU_User, PDU_Password, Owner, Category,
				Current_Project, Notes, Previous_Project, BOM, Support_case, Cpu_model, CPU_Sockets,
				DIMM_Capacity, DIMM_Size, Storage_Vendor, Storage_Controller,
				Storage_Capacity, Network_speed, Number_Of_Network_Ports, Special_Switching_Needs, Operating_System, Asset_type,
				Memory_Id, MemoryDeviceType, Disk_Id, Media_Type, Disk_Description, Network_Id, PCIeType, Processor_Id, Instruction_Set, Processor_Model, Processor_Architecture,
				Socket, CPU_Family string
			var Created_on, Updated_on, Assigned_from, Required_Start_Date, Required_Finish_Date time.Time
			var Reserved, Still_needed, Network_Type, Power_Status bool

			err := rows.Scan(&Asset_Id, &Asset_Name, &Server_Serial, &Server_Model, &Manufacturer, &Owner, &Category, &Still_needed, &Current_Project, &Notes, &Previous_Project, &BOM, &Support_case, &Cluster_Id, &Asset_location, &Lab, &Row, &Rack, &RU, &DC_status, &Cpu_model, &Generation, &CPU_Sockets, &PDU_IP, &PDU_User, &PDU_Password, &BMC_IP, &BMC_User, &BMC_Password, &BMC_FQDN, &Operating_System, &OS_IP, &OS_User, &OS_Password, &DIMM_Size, &DIMM_Capacity, &Storage_Vendor, &Storage_Controller, &Storage_Capacity, &Network_Type, &Network_speed, &Number_Of_Network_Ports, &Special_Switching_Needs, &Required_Start_Date, &Required_Finish_Date, &Created_on, &Created_by, &Assigned_to, &Assigned_from, &Assigned_by, &Updated_on, &Updated_by, &Purpose, &Delete, &Reserved, &Asset_type, &Power_Status, &Memory_Id, &Rank_Count, &MemoryDeviceType, &Memory_CapacityMiB, &Memory_AllowedSpeedsMHz, &Memory_OperatingSpeedMhz, &Disk_Id, &Media_Type, &Disk_Description, &Network_Id, &PCIeType, &Processor_Id, &Instruction_Set, &Processor_Model, &Processor_Architecture, &Total_Cores, &Total_Threads, &Socket, &CPU_Family)

			if err != nil {
				fmt.Println(err)
				// log.Printf("Failed to build content from sql rows: %v\n", err)

			}

			marshal, _ := json.Marshal(result)
			var c []Historic_details[string]
			var username []string
			var mail string
			var user string
			_ = json.Unmarshal(marshal, &c)
			err = db.QueryRow(" SELECT Email_ID FROM users where User_ID=$1;", Assigned_to).Scan(&mail)
			if err != nil {
				fmt.Println(err)
			}
			username = strings.Split(mail, "@")
			user = username[0]

			result = append(result, Asset[string]{Asset_Id: Asset_Id, Asset_Name: Asset_Name, Server_Serial: Server_Serial, Server_Model: Server_Model, Manufacturer: Manufacturer, Owner: Owner, Category: Category, Still_needed: Still_needed, Current_Project: Current_Project, Notes: Notes, Previous_Project: Previous_Project, BOM: BOM, Support_case: Support_case, Cluster_Id: Cluster_Id, Asset_location: Asset_location, Lab: Lab, Row: Row, Rack: Rack, RU: RU, DC_status: DC_status, Cpu_model: Cpu_model, Generation: Generation, CPU_Sockets: CPU_Sockets, PDU_IP: PDU_IP, PDU_User: PDU_User, PDU_Password: PDU_Password, BMC_IP: BMC_IP, BMC_User: BMC_User, BMC_Password: BMC_Password, BMC_FQDN: BMC_FQDN, Operating_System: Operating_System, OS_IP: OS_IP, OS_User: OS_User, OS_Password: OS_Password, DIMM_Size: DIMM_Size, DIMM_Capacity: DIMM_Capacity, Storage_Vendor: Storage_Vendor, Storage_Controller: Storage_Controller, Storage_Capacity: Storage_Capacity, Network_Type: Network_Type, Network_speed: Network_speed, Number_Of_Network_Ports: Number_Of_Network_Ports, Special_Switching_Needs: Special_Switching_Needs, Required_Start_Date: Required_Start_Date, Required_Finish_Date: Required_Finish_Date, Created_on: Created_on, Created_by: Created_by, Assigned_to: user, Assigned_from: Assigned_from, Assigned_by: Assigned_by, Updated_on: Updated_on, Updated_by: Updated_by, Purpose: Purpose, Delete: Delete, Reserved: Reserved, Asset_type: Asset_type, Power_Status: Power_Status, Memory_Id: Memory_Id, Rank_Count: Rank_Count, MemoryDeviceType: MemoryDeviceType, Memory_CapacityMiB: Memory_CapacityMiB, Memory_AllowedSpeedsMHz: Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMHz: Memory_OperatingSpeedMhz, Disk_Id: Disk_Id, Media_Type: Media_Type, Disk_Description: Disk_Description, Network_Id: Network_Id, PCIeType: PCIeType, Processor_Id: Processor_Id, Instruction_Set: Instruction_Set, Processor_Model: Processor_Model, Processor_Architecture: Processor_Architecture, Total_Cores: Total_Cores, Total_Threads: Total_Threads, Socket: Socket, CPU_Family: CPU_Family})

		} // appending deatils to the result
		// rev_slc := []Asset[string]{}
		// for i := range result {
		// 	// reverse the order
		// 	rev_slc = append(rev_slc, result[len(result)-1-i])
		// }
		totalPage := math.Ceil(float64(total*1.0) / float64(pg.Count*1.0))
		json.NewEncoder(w).Encode(map[string]interface{}{"Count": pg.Count, "Page_no": pg.Page, "Total_entry": total, "Search": pg.Search, "Total_Page": totalPage, "ListAsset": result, "Status Code": "200 OK", "Message": "Listing All Servers"})
	})

	//--------------------------------------------------Distinct column--------------------------------------------------------------
	mux.HandleFunc("/select_Column_name", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func Reserved(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}

		type Request struct {
			ColumnName string `json:"column_name"`
		}
		var req Request
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		//db, err := sql.Open("postgres", "user=postgres password=secret dbname=mydb sslmode=disable")
		// if err != nil {
		// 	http.Error(w, err.Error(), http.StatusInternalServerError)
		// 	return
		// }
		// defer db.Close()

		rows, err := db.Query(`SELECT DISTINCT ` + req.ColumnName + ` FROM Asset`)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var result []interface{}
		for rows.Next() {
			var value interface{}
			if err := rows.Scan(&value); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			result = append(result, value)
		}

		if err := json.NewEncoder(w).Encode(result); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	})

	//---------------------------------------------------------------------list request filter-------------------------------------------------------
	mux.HandleFunc("/list_request/filter", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func ListRequest(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}

		a, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		var p Server_Request
		if err := json.Unmarshal(a, &p); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		var pg Page
		if err := json.Unmarshal(a, &pg); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		// err := json.NewDecoder(r.Body).Decode(&pg)
		// if err != nil {
		// 	http.Error(w, err.Error(), http.StatusBadRequest)
		// 	return
		// }

		var total int
		err2 := db.QueryRow("SELECT count(*) from server_request where asset_type ::text ~* $2 and manufacturer ::text ~* $3 and cpu_model ::text ~* $4 and cpu_sockets ::text ~* $5 and operating_system ::text ~* $6 and dimm_size ::text ~* $7 and dimm_capacity ::text ~* $8 and storage_vendor ::text ~* $9 and storage_controller ::text ~* $10 and storage_capacity ::text ~* $11 and network_speed ::text ~* $12 and number_Of_Network_ports ::text ~* $13 and updated_by ::text ~* $14 and server_request ::text ~* $1", pg.Search, p.Asset_type, pg.Manufacturer, pg.Cpu_model, pg.CPU_Sockets, pg.Operating_System, pg.DIMM_Size, pg.DIMM_Capacity, pg.Storage_Vendor, pg.Storage_Controller, pg.Storage_Capacity, pg.Network_speed, pg.Number_Of_Network_Ports, pg.Updated_by).Scan(&total) // exporting table
		if err2 != nil {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
			return
		}

		rows, err := db.Query("SELECT Id,User_No,Requester,COALESCE(Required_Start_Date, '0001-01-01'),COALESCE(Required_End_Date, '0001-01-01'),Manufacturer,COALESCE(Operating_System,''),COALESCE(Cpu_model,''),COALESCE(CPU_Sockets,''),COALESCE(DIMM_Size,''),COALESCE(DIMM_Capacity,''),COALESCE(Storage_Vendor,''),COALESCE(Storage_Controller,''),COALESCE(Storage_Capacity,''),COALESCE(Network_Type,false),COALESCE(Network_speed,''),COALESCE(Number_Of_Network_Ports,''),COALESCE(Special_Switching_Needs,''),COALESCE(Chat, ''),COALESCE(Request, false),COALESCE(Updated_on,'0001-01-01'),COALESCE(Updated_by, ''),Asset_type,COALESCE(Memory_Id,'') ,COALESCE(Rank_Count,0) ,COALESCE(MemoryDeviceType,'') ,COALESCE(Memory_CapacityMiB,0) ,COALESCE(Memory_AllowedSpeedsMHz,0) ,COALESCE(Memory_OperatingSpeedMhz,0) ,COALESCE(Disk_Id,'') ,COALESCE(Media_Type,'') ,COALESCE(Disk_Description,'') ,COALESCE(Network_Id,'') ,COALESCE(PCIeType,''),COALESCE(Processor_Id,'') ,COALESCE(Instruction_Set,'') ,COALESCE(Processor_Model,'') ,COALESCE(Processor_Architecture,'') ,COALESCE(Total_Cores,0) ,COALESCE(Total_Threads,0) ,COALESCE(Socket,'') ,COALESCE(CPU_Family,''),COALESCE(Purpose,'') from Server_Request where asset_type ::text ~* $4 and manufacturer ::text ~* $5 and cpu_model ::text ~* $6 and cpu_sockets ::text ~* $7 and operating_system ::text ~* $8 and dimm_size ::text ~* $9 and dimm_capacity ::text ~* $10 and storage_vendor ::text ~* $11 and storage_controller ::text ~* $12 and storage_capacity ::text ~* $13 and network_speed ::text ~* $14 and number_Of_Network_ports ::text ~* $15 and updated_by ::text ~* $16 and Request='f' AND server_request ::text ~* $3 order by Updated_on desc limit $1 offset ($2-1)*$1;", pg.Count, pg.Page, pg.Search, p.Asset_type, pg.Manufacturer, pg.Cpu_model, pg.CPU_Sockets, pg.Operating_System, pg.DIMM_Size, pg.DIMM_Capacity, pg.Storage_Vendor, pg.Storage_Controller, pg.Storage_Capacity, pg.Network_speed, pg.Number_Of_Network_Ports, pg.Updated_by)

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Status Code": "400", "Message": err})
			return
		}

		users := []Server_Request{}
		for rows.Next() {
			var Id, User_No, Rank_Count, Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMhz, Memory_CapacityMiB, Total_Cores, Total_Threads int
			var Network_Type, Request bool
			var Updated_by, Requester, Manufacturer, Operating_System, Cpu_model, CPU_Sockets, Number_Of_Network_Ports, DIMM_Size, DIMM_Capacity, Storage_Vendor, Storage_Controller, Storage_Capacity, Network_speed, Chat, Special_Switching_Needs, Asset_type, Memory_Id, MemoryDeviceType, Disk_Id, Media_Type, Disk_Description, Network_Id, PCIeType, Processor_Id, Instruction_Set, Processor_Model, Processor_Architecture,
				Socket, CPU_Family, Purpose string
			var Required_Start_Date, Required_End_Date, Updated_on time.Time

			err = rows.Scan(&Id, &User_No, &Requester, &Required_Start_Date, &Required_End_Date, &Manufacturer, &Operating_System, &Cpu_model, &CPU_Sockets, &DIMM_Size, &DIMM_Capacity, &Storage_Vendor, &Storage_Controller, &Storage_Capacity, &Network_Type, &Network_speed, &Number_Of_Network_Ports, &Special_Switching_Needs, &Chat, &Request, &Updated_on, &Updated_by, &Asset_type, &Memory_Id, &Rank_Count, &MemoryDeviceType, &Memory_CapacityMiB, &Memory_AllowedSpeedsMHz, &Memory_OperatingSpeedMhz, &Disk_Id, &Media_Type, &Disk_Description, &Network_Id, &PCIeType, &Processor_Id, &Instruction_Set, &Processor_Model, &Processor_Architecture, &Total_Cores, &Total_Threads, &Socket, &CPU_Family, &Purpose)

			if err != nil {
				w.WriteHeader(http.StatusAccepted)
				fmt.Println(err)
				json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
				return
			}

			users = append(users, Server_Request{Id: Id, User_No: User_No, Requester: Requester, Required_Start_Date: Required_Start_Date, Required_End_Date: Required_End_Date, Manufacturer: Manufacturer, Operating_System: Operating_System, Cpu_model: Cpu_model, CPU_Sockets: CPU_Sockets, DIMM_Size: DIMM_Size, DIMM_Capacity: DIMM_Capacity, Storage_Vendor: Storage_Vendor, Storage_Controller: Storage_Controller, Storage_Capacity: Storage_Capacity, Network_Type: Network_Type, Network_speed: Network_speed, Number_Of_Network_Ports: Number_Of_Network_Ports, Special_Switching_Needs: Special_Switching_Needs, Chat: Chat, Request: Request, Updated_on: Updated_on, Updated_by: Updated_by, Asset_type: Asset_type, Memory_Id: Memory_Id, Rank_Count: Rank_Count, MemoryDeviceType: MemoryDeviceType, Memory_CapacityMiB: Memory_CapacityMiB, Memory_AllowedSpeedsMHz: Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMHz: Memory_OperatingSpeedMhz, Disk_Id: Disk_Id, Media_Type: Media_Type, Disk_Description: Disk_Description, Network_Id: Network_Id, PCIeType: PCIeType, Processor_Id: Processor_Id, Instruction_Set: Instruction_Set, Processor_Model: Processor_Model, Processor_Architecture: Processor_Architecture, Total_Cores: Total_Cores, Total_Threads: Total_Threads, Socket: Socket, CPU_Family: CPU_Family, Purpose: Purpose})

		}
		// rev_slc := []Server_Request{}
		// for i := range users {
		// 	// reverse the order
		// 	rev_slc = append(rev_slc, users[len(users)-1-i])
		// }
		totalPage := math.Ceil(float64(total*1.0) / float64(pg.Count*1.0))
		json.NewEncoder(w).Encode(map[string]interface{}{"Count": pg.Count, "Page_no": pg.Page, "Total_entry": total, "Search": pg.Search, "Total_Page": totalPage, "Listusers": users, "Status Code": "200 OK", "Message": "List of Requests"})
	})

	//------------------------------------------------------------------user filter------------------------------------------------------------------
	mux.HandleFunc("/view_users/filter", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func View_Role(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}

		var pg Page
		err := json.NewDecoder(r.Body).Decode(&pg)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		var total int
		err2 := db.QueryRow("SELECT count(*) from users where users ::text ~* $1 and first_name ::text ~* $2 and last_name ::text ~* $3 and created_by ::text ~* $4 and updated_by ::text ~* $5 and role ::text ~* $6 and teams ::text ~* $7", pg.Search, pg.First_Name, pg.Last_Name, pg.Created_by, pg.Updated_by, pg.Role, pg.Teams).Scan(&total) // exporting table
		if err2 != nil {
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
			return
		}
		//database connection using funcation
		rows, err := db.Query("SELECT User_ID, Email_ID, First_Name, Last_Name, Created_on, Created_by,COALESCE(Updated_on,'0001-01-01'),COALESCE(Updated_by, ''), Role, Teams from USERS where Delete=B'0' AND users ::text ~* $3 and first_name ::text ~* $4 and last_name ::text ~* $5 and created_by ::text ~* $6 and updated_by ::text ~* $7 and role ::text ~* $8 and teams ::text ~* $9 order by Updated_on desc limit $1 offset ($2-1)*$1;", pg.Count, pg.Page, pg.Search, pg.First_Name, pg.Last_Name, pg.Created_by, pg.Updated_by, pg.Role, pg.Teams) // data selecting from user_table

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Status Code": "400", "Message": err})

		}

		users := []userDetails{}
		for rows.Next() {
			var User_Id int
			var Email_Id, First_Name, Last_Name, Created_by, Updated_by, Role, Teams string
			var Created_on, Updated_on time.Time

			err = rows.Scan(&User_Id, &Email_Id, &First_Name, &Last_Name, &Created_on, &Created_by, &Updated_on, &Updated_by, &Role, &Teams)

			if err != nil {
				log.Printf("Failed to build content from sql rows: %v \n", err)
			}
			users = append(users, userDetails{User_Id: User_Id, Email_Id: Email_Id, First_Name: First_Name, Last_Name: Last_Name, Created_on: Created_on, Created_by: Created_by, Updated_on: Updated_on, Updated_by: Updated_by, Role: Role, Teams: Teams})

		}
		// rev_slc := []userDetails{}
		// for i := range users {
		// 	// reverse the order
		// 	rev_slc = append(rev_slc, users[len(users)-1-i])
		// }
		totalPage := math.Ceil(float64(total*1.0) / float64(pg.Count*1.0))
		json.NewEncoder(w).Encode(map[string]interface{}{"Count": pg.Count, "Page_no": pg.Page, "Total_entry": total, "Search": pg.Search, "Total_Page": totalPage, "Listusers": users, "status code": " 200 Ok", "Message": "Record Found"})
	})

	//--------------------------------------------------test column--------------------------------------------------------------
	/*user input
	ColumnName
	TableName
	*/

	mux.HandleFunc("/select_Column_name1", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		//func Reserved(w http.ResponseWriter, r *http.Request) {
		//SetupCORS(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
			return
		}

		type Request struct {
			ColumnName string `json:"ColumnName"`
			TableName  string `json:"TableName"`
		}
		var req Request
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"Message": "Invalid Input Syntax", "Status Code": "400 "})
			return
		}

		rows, err := db.Query(`SELECT DISTINCT ` + req.ColumnName + ` FROM` + req.TableName)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]interface{}{"Status Code": "400", "Message": err})
			return
		}

		var result []interface{}
		for rows.Next() {
			var value interface{}
			if err := rows.Scan(&value); err != nil {
				w.WriteHeader(http.StatusAccepted)
				fmt.Println(err)
				json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
				return
			}
			result = append(result, value)
		}

		if err := json.NewEncoder(w).Encode(map[string]interface{}{"Result": result}); err != nil {
			w.WriteHeader(http.StatusAccepted)
			fmt.Println(err)
			json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
			return
		}
	})

	//--------------------------------------------------------------test filter--------------------------------------------------------------
	// mux.HandleFunc("/test_filter", func(w http.ResponseWriter, r *http.Request) {
	// 	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,application/json ")
	// 	w.Header().Set("Access-Control-Allow-Origin", "*")
	// 	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	// 	//func Pool(w http.ResponseWriter, r *http.Request) {
	// 	//SetupCORS(&w)
	// 	if r.Method != http.MethodPost {
	// 		w.WriteHeader(405) // Return 405 Method Not Allowed.
	// 		json.NewEncoder(w).Encode(map[string]interface{}{"Message": "method not found", "Status Code": "405 "})
	// 		return
	// 	}

	// 	var pg QueryInput
	// 	err := json.NewDecoder(r.Body).Decode(&pg)
	// 	if err != nil {
	// 		http.Error(w, err.Error(), http.StatusBadRequest)
	// 		return
	// 	}
	// 	var total int
	// 	// if pg.Reserved {
	// 	err2 := db.QueryRow("SELECT count(*) from asset where reserved='t' and Server_Model::text IN (  SELECT unnest(COALESCE(CASE WHEN array_length(ARRAY" + pg.Server_Models + " ::text[], 1) > 0    THEN ARRAY" + pg.Server_Models + "::text[] ELSE ARRAY[Server_Model::text] END  ))) and asset ::text ~* ''").Scan(&total) // exporting table

	// 	fmt.Println(total)
	// 	fmt.Println(err2)
	// 	if err2 != nil {
	// 		w.WriteHeader(http.StatusAccepted)
	// 		json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
	// 		return
	// 	}

	// 	str := `SELECT Asset_Id,Asset_Name,Server_Serial,Server_Model,Manufacturer,Owner,Category ,Still_needed,Current_Project,Notes,Previous_Project,BOM,Support_case,COALESCE(Cluster_ID,''),Asset_location,Lab,Row,Rack,RU,DC_status,Cpu_model,Generation,CPU_Sockets,PDU_IP,PDU_User,PDU_Password,BMC_IP, BMC_User, BMC_Password, BMC_FQDN,Operating_System,OS_IP,OS_User,OS_Password,DIMM_Size,DIMM_Capacity,Storage_Vendor,Storage_Controller,Storage_Capacity,Network_Type,Network_speed,Number_Of_Network_Ports,Special_Switching_Needs,Required_Start_Date,Required_Finish_Date,Created_on ,Created_by,COALESCE(Assigned_To, 0),COALESCE(Assigned_from, '0001-01-01'),COALESCE(Assigned_by, ''),COALESCE(Updated_on,'0001-01-01'),COALESCE(Updated_by, ''),Purpose,Delete,Reserved,Asset_Type,Memory_Id ,Rank_Count ,MemoryDeviceType ,Memory_CapacityMiB ,Memory_AllowedSpeedsMHz ,Memory_OperatingSpeedMhz ,Disk_Id ,Media_Type ,Disk_Description ,Network_Id ,PCIeType,Processor_Id ,Instruction_Set ,Processor_Model ,Processor_Architecture ,Total_Cores ,Total_Threads ,Socket ,CPU_Family FROM Asset WHERE Delete=B'0' AND Reserved='true' and
	// 	Server_Model::text IN (  SELECT unnest(COALESCE(CASE WHEN array_length($1 ::text[], 1) > 0    THEN $1::text[] ELSE ARRAY[Server_Model::text] END  ))) and manufacturer::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($2 ::text[], 1) > 0    THEN $2::text[] ELSE ARRAY[manufacturer::text] END  ))) and BOM::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($3 ::text[], 1) > 0    THEN $3::text[] ELSE ARRAY[BOM::text] END  ))) and Cluster_Id::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($4 ::text[], 1) > 0    THEN $4]::text[ ELSE ARRAY[Cluster_Id::text] END  ))) and Asset_Location::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($5] ::text[, 1) > 0    THEN $5]::text[] ELSE ARRAY[Asset_Location::text END  ))) and
	// 	Lab::text IN (  SELECT unnest(COALESCE(CASE WHEN array_length($6 ::text[], 1) > 0    THEN $6::text[]  ELSE ARRAY[Lab::text] END  ))) and DC_status::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($7 ::text[], 1) > 0    THEN $7::text[] ELSE ARRAY[DC_status::text] END  ))) and CPU_model::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($8 ::text[], 1) > 0    THEN $8::text[] ELSE ARRAY[CPU_model::text] END  ))) and Generation::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($9 ::text[], 1) > 0    THEN $9::text[] ELSE ARRAY[Generation::text] END  ))) and CPU_Sockets::text IN (  SELECT unnest(COALESCE(CASE WHEN array_length($10 ::text[], 1) > 0    THEN $10::text[] ELSE ARRAY[CPU_Sockets::text] END  ))) and BMC_FQDN::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($11 ::text[], 1) > 0
	// 	THEN $11::text[] ELSE ARRAY[BMC_FQDN::text] END  ))) and Operating_System::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($12 ::text[], 1) > 0    THEN $12::text[] ELSE ARRAY[Operating_System::text] END  ))) and DIMM_Size::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($13 ::text[], 1) > 0    THEN $13::text[] ELSE ARRAY[DIMM_Size::text] END  ))) and DIMM_Capacity::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($14 ::text[], 1) > 0    THEN $14::text[] ELSE ARRAY[DIMM_Capacity::text] END  ))) and Storage_Vendor::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($15 ::text[], 1) > 0    THEN $15::text[] ELSE ARRAY[Storage_Vendor::text] END  ))) and Storage_Controller::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($16 ::text[], 1) > 0
	// 	THEN $16::text[] ELSE ARRAY[Storage_Controller::text] END  ))) and Storage_Capacity::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($17 ::text[], 1) > 0    THEN $17::text[] ELSE ARRAY[Storage_Capacity::text] END  ))) and Network_speed::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($18 ::text[], 1) > 0    THEN $18::text[] ELSE ARRAY[Network_speed::text] END  ))) and Number_Of_Network_Ports::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($19 ::text[], 1) > 0    THEN $19::text[] ELSE ARRAY[Number_Of_Network_Ports::text] END  ))) and Created_by::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($20 ::text[], 1) > 0    THEN $20::text[] ELSE ARRAY[Created_by::text] END  ))) and Updated_by::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($21 ::text[], 1) > 0
	// 	THEN $21::text[] ELSE ARRAY[Updated_by::text] END  ))) and Still_needed::text IN (  SELECT unnest(COALESCE(  CASE WHEN array_length($22 ::text[], 1) > 0    THEN $22::text[] ELSE ARRAY[Still_needed::text] END  ))) and Network_Type::text IN (  SELECT unnest(COALESCE(  CASE WHEN array_length($23 ::text[], 1) > 0    THEN $23::text[] ELSE ARRAY[Network_Type::text] END  ))) and Row::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($24 ::text[], 1) > 0    THEN $24::text[] ELSE ARRAY[Row::text] END  ))) and Rack::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($25 ::text[], 1) > 0    THEN $25::text[] ELSE ARRAY[Rack::text] END  ))) and RU::text IN (  SELECT unnest(COALESCE(CASE WHEN array_length($26 ::text[], 1) > 0    THEN $26::text[] ELSE ARRAY[RU::text] END  ))) and
	// 	 Assigned_to::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($27 ::text[], 1) > 0 THEN $27::text[] ELSE ARRAY[Assigned_to::text] END  ))) and
	// 	Assigned_by::text IN (  SELECT unnest(COALESCE( CASE WHEN array_length($28 ::text[], 1) > 0    THEN $28::text[] ELSE ARRAY[Assigned_by::text] END  ))) and asset ::text ~* $29 order by Updated_on desc limit $30 offset ($31-1)*$30;`
	// 	rows, err := db.Query(str, []string(pg.Server_Models), []string(pg.Manufacturers), []string(pg.BOMs), []string(pg.Cluster_Ids), []string(pg.Asset_locations), []string(pg.Labs), []string(pg.DC_statuss), []string(pg.Cpu_models), []string(pg.Generations), []string(pg.CPU_Socketss), []string(pg.BMC_FQDNs), []string(pg.Operating_Systems), []string(pg.DIMM_Sizes), []string(pg.DIMM_Capacitys), []string(pg.Storage_Vendors), []string(pg.Storage_Controllers), []string(pg.Storage_Capacitys), []string(pg.Network_speeds), []string(pg.Number_Of_Network_Portss), []string(pg.Created_bys), []string(pg.Updated_bys), []string(pg.Still_Neededs), []string(pg.Network_types), []string(pg.Rows), []string(pg.Racks), []string(pg.RUs), []string(pg.Assigned_tos), []string(pg.Assigned_bys), pg.Search, pg.Count, pg.Page)
	// 	fmt.Println(err)
	// 	if err != nil {
	// 		w.WriteHeader(http.StatusBadRequest)
	// 		json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 "})
	// 		return
	// 	}

	// 	result := []Asset[string]{} // creating slice
	// 	for rows.Next() {

	// 		var Asset_Id, Assigned_To, Delete, Row, Rack, RU, Rank_Count, Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMhz, Memory_CapacityMiB, Total_Cores, Total_Threads int
	// 		var Asset_Name, Server_Serial, Server_Model, Manufacturer, OS_IP, OS_User, OS_Password,
	// 			BMC_IP, BMC_User, BMC_Password, BMC_FQDN, Asset_Location,
	// 			Assigned_By, Created_by, Updated_by, Cluster_Id, Purpose, Generation,
	// 			Lab, DC_Status, PDU_IP, PDU_User, PDU_Password, Owner, Category,
	// 			Current_Project, Notes, Previous_Project, BOM, Support_Case, Cpu_Model, CPU_Sockets,
	// 			DIMM_Capacity, DIMM_Size, Storage_Vendor, Storage_Controller,
	// 			Storage_Capacity, Network_Speed, Number_Of_Network_Ports, Special_Switching_Needs, Operating_System, Asset_Type,
	// 			Memory_Id, MemoryDeviceType, Disk_Id, Media_Type, Disk_Description, Network_Id, PCIeType, Processor_Id, Instruction_Set, Processor_Model, Processor_Architecture,
	// 			Socket, CPU_Family string
	// 		var Created_on, Updated_on, Assigned_from, Required_Start_Date, Required_Finish_Date time.Time
	// 		var Reserved, Still_Needed, Network_Type bool
	// 		err := rows.Scan(&Asset_Id, &Asset_Name, &Server_Serial, &Server_Model, &Manufacturer, &Owner, &Category, &Still_Needed, &Current_Project, &Notes, &Previous_Project, &BOM, &Support_Case, &Cluster_Id, &Asset_Location, &Lab, &Row, &Rack, &RU, &DC_Status, &Cpu_Model, &Generation, &CPU_Sockets, &PDU_IP, &PDU_User, &PDU_Password, &BMC_IP, &BMC_User, &BMC_Password, &BMC_FQDN, &Operating_System, &OS_IP, &OS_User, &OS_Password, &DIMM_Size, &DIMM_Capacity, &Storage_Vendor, &Storage_Controller, &Storage_Capacity, &Network_Type, &Network_Speed, &Number_Of_Network_Ports, &Special_Switching_Needs, &Required_Start_Date, &Required_Finish_Date, &Created_on, &Created_by, &Assigned_To, &Assigned_from, &Assigned_By, &Updated_on, &Updated_by, &Purpose, &Delete, &Reserved, &Asset_Type, &Memory_Id, &Rank_Count, &MemoryDeviceType, &Memory_CapacityMiB, &Memory_AllowedSpeedsMHz, &Memory_OperatingSpeedMhz, &Disk_Id, &Media_Type, &Disk_Description, &Network_Id, &PCIeType, &Processor_Id, &Instruction_Set, &Processor_Model, &Processor_Architecture, &Total_Cores, &Total_Threads, &Socket, &CPU_Family)

	// 		if err != nil {
	// 			fmt.Println(err)
	// 			log.Printf("Failed to build content from sql rows: %v\n", err)

	// 		}
	// 		marshal, _ := json.Marshal(result)
	// 		var c []Historic_details[string]
	// 		var username []string
	// 		var mail string
	// 		var user string
	// 		_ = json.Unmarshal(marshal, &c)
	// 		err = db.QueryRow(" SELECT Email_ID FROM users where User_ID=$1;", Assigned_To).Scan(&mail)
	// 		username = strings.Split(mail, "@")
	// 		user = username[0]
	// 		result = append(result, Asset[string]{Asset_Id: Asset_Id, Asset_Name: Asset_Name, Server_Serial: Server_Serial, Server_Model: Server_Model, Manufacturer: Manufacturer, Owner: Owner, Category: Category, Still_needed: Still_Needed, Current_Project: Current_Project, Notes: Notes, Previous_Project: Previous_Project, BOM: BOM, Support_case: Support_Case, Cluster_Id: Cluster_Id, Asset_location: Asset_Location, Lab: Lab, Row: Row, Rack: Rack, RU: RU, DC_status: DC_Status, Cpu_model: Cpu_Model, Generation: Generation, CPU_Sockets: CPU_Sockets, PDU_IP: PDU_IP, PDU_User: PDU_User, PDU_Password: PDU_Password, BMC_IP: BMC_IP, BMC_User: BMC_User, BMC_Password: BMC_Password, BMC_FQDN: BMC_FQDN, Operating_System: Operating_System, OS_IP: OS_IP, OS_User: OS_User, OS_Password: OS_Password, DIMM_Size: DIMM_Size, DIMM_Capacity: DIMM_Capacity, Storage_Vendor: Storage_Vendor, Storage_Controller: Storage_Controller, Storage_Capacity: Storage_Capacity, Network_Type: Network_Type, Network_speed: Network_Speed, Number_Of_Network_Ports: Number_Of_Network_Ports, Special_Switching_Needs: Special_Switching_Needs, Required_Start_Date: Required_Start_Date, Required_Finish_Date: Required_Finish_Date, Created_on: Created_on, Created_by: Created_by, Assigned_to: user, Assigned_from: Assigned_from, Assigned_by: Assigned_By, Updated_on: Updated_on, Updated_by: Updated_by, Purpose: Purpose, Delete: Delete, Reserved: Reserved, Asset_type: Asset_Type, Memory_Id: Memory_Id, Rank_Count: Rank_Count, MemoryDeviceType: MemoryDeviceType, Memory_CapacityMiB: Memory_CapacityMiB, Memory_AllowedSpeedsMHz: Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMHz: Memory_OperatingSpeedMhz, Disk_Id: Disk_Id, Media_Type: Media_Type, Disk_Description: Disk_Description, Network_Id: Network_Id, PCIeType: PCIeType, Processor_Id: Processor_Id, Instruction_Set: Instruction_Set, Processor_Model: Processor_Model, Processor_Architecture: Processor_Architecture, Total_Cores: Total_Cores, Total_Threads: Total_Threads, Socket: Socket, CPU_Family: CPU_Family})
	// 	}
	// 	fmt.Println(result)
	// 	totalPage := math.Ceil(float64(total*1.0) / float64(pg.Count*1.0))
	// 	json.NewEncoder(w).Encode(map[string]interface{}{"Count": pg.Count, "Page_no": pg.Page, "Total_entry": total, "Search": pg.Search, "Total_Page": totalPage, "ListAsset": result, "Status Code": "200 OK", "Message": "Listing All Servers"})
	// 	// } else {
	// 	err2 := db.QueryRow("SELECT count(*) from asset where reserved='f' and "+Server_Model+" and "+Manufacturer+" and "+BOM+" and "+Cluster_Id+" and "+Asset_Location+" and "+Lab+" and "+DC_status+" and "+CPU_model+" and "+Generation+" and "+CPU_Sockets+" and "+BMC_FQDN+" and "+Operating_System+" and "+DIMM_Size+" and "+DIMM_Capacity+" and "+Storage_Vendor+" and "+Storage_Controller+" and "+Storage_Capacity+" and "+Network_speed+" and "+Number_Of_Network_Ports+" and "+Created_by+" and "+Updated_by+" and "+Still_needed+" and "+Network_Type+" and "+Row+" and "+Rack+" and "+RU+" and "+Required_Start_Date+" and "+Required_Finish_Date+" and "+Created_on+" and "+Updated_on+"and asset ::text ~* $31", pg.Server_Model, pg.Manufacturer, pg.BOM, pg.Cluster_Id, pg.Asset_location, pg.Lab, pg.DC_status, pg.Cpu_model, pg.Generation, pg.CPU_Sockets, pg.BMC_FQDN, pg.Operating_System, pg.DIMM_Size, pg.DIMM_Capacity, pg.Storage_Vendor, pg.Storage_Controller, pg.Storage_Capacity, pg.Network_speed, pg.Number_Of_Network_Ports, pg.Created_by, pg.Updated_by, pg.Still_Needed, pg.Network_type, pg.Row, pg.Rack, pg.RU, pg.Required_Start_Date, pg.Required_Finish_Date, pg.Created_on, pg.Updated_on, pg.Search).Scan(&total) // exporting table
	// 	if err2 != nil {
	// 		w.WriteHeader(http.StatusAccepted)
	// 		json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "202 "})
	// 		return
	// 	}
	// 	str := "SELECT Asset_Id,Asset_Name,Server_Serial,Server_Model,Manufacturer,Owner,Category ,Still_needed,Current_Project,Notes,Previous_Project,BOM,Support_case,COALESCE(Cluster_ID,''),Asset_location,Lab,Row,Rack,RU,DC_status,Cpu_model,Generation,CPU_Sockets,PDU_IP,PDU_User,PDU_Password,BMC_IP, BMC_User, BMC_Password, BMC_FQDN,Operating_System,OS_IP,OS_User,OS_Password,DIMM_Size,DIMM_Capacity,Storage_Vendor,Storage_Controller,Storage_Capacity,Network_Type,Network_speed,Number_Of_Network_Ports,Special_Switching_Needs,Required_Start_Date,Required_Finish_Date,Created_on ,Created_by,COALESCE(Updated_on,'0001-01-01'),COALESCE(Updated_by, ''),Purpose,Delete,Reserved,Asset_Type,Memory_Id ,Rank_Count ,MemoryDeviceType ,Memory_CapacityMiB ,Memory_AllowedSpeedsMHz ,Memory_OperatingSpeedMhz ,Disk_Id ,Media_Type ,Disk_Description ,Network_Id ,PCIeType,Processor_Id ,Instruction_Set ,Processor_Model ,Processor_Architecture ,Total_Cores ,Total_Threads ,Socket ,CPU_Family FROM Asset WHERE (Delete=B'0' AND Reserved='false' OR Reserved is null) and" + Server_Model + " and " + Manufacturer + " and " + BOM + " and " + Cluster_Id + " and " + Asset_Location + " and " + Lab + " and " + DC_status + " and " + CPU_model + " and " + Generation + " and " + CPU_Sockets + " and " + BMC_FQDN + " and " + Operating_System + " and " + DIMM_Size + " and " + DIMM_Capacity + " and " + Storage_Vendor + " and " + Storage_Controller + " and " + Storage_Capacity + " and " + Network_speed + " and " + Number_Of_Network_Ports + " and " + Created_by + " and " + Updated_by + " and " + Still_needed + " and " + Network_Type + " and " + Row + " and " + Rack + " and " + RU + " and " + Required_Start_Date + " and " + Required_Finish_Date + " and " + Created_on + " and " + Updated_on + "and asset ::text ~* $32 order by Updated_on desc limit $33 offset ($34-1)*$33;"
	// 	rows, err := db.Query(str, pg.Server_Model, pg.Manufacturer, pg.BOM, pg.Cluster_Id, pg.Asset_location, pg.Lab, pg.DC_status, pg.Cpu_model, pg.Generation, pg.CPU_Sockets, pg.BMC_FQDN, pg.Operating_System, pg.DIMM_Size, pg.DIMM_Capacity, pg.Storage_Vendor, pg.Storage_Controller, pg.Storage_Capacity, pg.Network_speed, pg.Number_Of_Network_Ports, pg.Created_by, pg.Updated_by, pg.Still_Needed, pg.Network_type, pg.Row, pg.Rack, pg.RU, pg.Required_Start_Date, pg.Required_Finish_Date, pg.Created_on, pg.Updated_on, pg.Search, pg.Count, pg.Page)
	// 	if err != nil {
	// 		w.WriteHeader(http.StatusBadRequest)
	// 		json.NewEncoder(w).Encode(map[string]interface{}{"Message": err, "Status Code": "400 "})
	// 		return
	// 	}
	// 	result := []Asset[string]{} // creating slice
	// 	for rows.Next() {

	// 		var Asset_Id, Delete, Row, Rack, RU, Rank_Count, Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMhz, Memory_CapacityMiB, Total_Cores, Total_Threads int
	// 		var Asset_Name, Server_Serial, Server_Model, Manufacturer, OS_IP, OS_User, OS_Password,
	// 			BMC_IP, BMC_User, BMC_Password, BMC_FQDN, Asset_Location,
	// 			Created_by, Updated_by, Cluster_Id, Purpose, Generation,
	// 			Lab, DC_Status, PDU_IP, PDU_User, PDU_Password, Owner, Category,
	// 			Current_Project, Notes, Previous_Project, BOM, Support_Case, Cpu_Model, CPU_Sockets,
	// 			DIMM_Capacity, DIMM_Size, Storage_Vendor, Storage_Controller,
	// 			Storage_Capacity, Network_Speed, Number_Of_Network_Ports, Special_Switching_Needs, Operating_System, Asset_Type,
	// 			Memory_Id, MemoryDeviceType, Disk_Id, Media_Type, Disk_Description, Network_Id, PCIeType, Processor_Id, Instruction_Set, Processor_Model, Processor_Architecture,
	// 			Socket, CPU_Family string
	// 		var Created_on, Updated_on, Required_Start_Date, Required_Finish_Date time.Time
	// 		var Reserved, Still_Needed, Network_Type bool
	// 		err := rows.Scan(&Asset_Id, &Asset_Name, &Server_Serial, &Server_Model, &Manufacturer, &Owner, &Category, &Still_Needed, &Current_Project, &Notes, &Previous_Project, &BOM, &Support_Case, &Cluster_Id, &Asset_Location, &Lab, &Row, &Rack, &RU, &DC_Status, &Cpu_Model, &Generation, &CPU_Sockets, &PDU_IP, &PDU_User, &PDU_Password, &BMC_IP, &BMC_User, &BMC_Password, &BMC_FQDN, &Operating_System, &OS_IP, &OS_User, &OS_Password, &DIMM_Size, &DIMM_Capacity, &Storage_Vendor, &Storage_Controller, &Storage_Capacity, &Network_Type, &Network_Speed, &Number_Of_Network_Ports, &Special_Switching_Needs, &Required_Start_Date, &Required_Finish_Date, &Created_on, &Created_by, &Updated_on, &Updated_by, &Purpose, &Delete, &Reserved, &Asset_Type, &Memory_Id, &Rank_Count, &MemoryDeviceType, &Memory_CapacityMiB, &Memory_AllowedSpeedsMHz, &Memory_OperatingSpeedMhz, &Disk_Id, &Media_Type, &Disk_Description, &Network_Id, &PCIeType, &Processor_Id, &Instruction_Set, &Processor_Model, &Processor_Architecture, &Total_Cores, &Total_Threads, &Socket, &CPU_Family)

	// 		if err != nil {
	// 			fmt.Println(err)
	// 			log.Printf("Failed to build content from sql rows: %v\n", err)

	// 		}
	// 		result = append(result, Asset[string]{Asset_Id: Asset_Id, Asset_Name: Asset_Name, Server_Serial: Server_Serial, Server_Model: Server_Model, Manufacturer: Manufacturer, Owner: Owner, Category: Category, Still_needed: Still_Needed, Current_Project: Current_Project, Notes: Notes, Previous_Project: Previous_Project, BOM: BOM, Support_case: Support_Case, Cluster_Id: Cluster_Id, Asset_location: Asset_Location, Lab: Lab, Row: Row, Rack: Rack, RU: RU, DC_status: DC_Status, Cpu_model: Cpu_Model, Generation: Generation, CPU_Sockets: CPU_Sockets, PDU_IP: PDU_IP, PDU_User: PDU_User, PDU_Password: PDU_Password, BMC_IP: BMC_IP, BMC_User: BMC_User, BMC_Password: BMC_Password, BMC_FQDN: BMC_FQDN, Operating_System: Operating_System, OS_IP: OS_IP, OS_User: OS_User, OS_Password: OS_Password, DIMM_Size: DIMM_Size, DIMM_Capacity: DIMM_Capacity, Storage_Vendor: Storage_Vendor, Storage_Controller: Storage_Controller, Storage_Capacity: Storage_Capacity, Network_Type: Network_Type, Network_speed: Network_Speed, Number_Of_Network_Ports: Number_Of_Network_Ports, Special_Switching_Needs: Special_Switching_Needs, Required_Start_Date: Required_Start_Date, Required_Finish_Date: Required_Finish_Date, Created_on: Created_on, Created_by: Created_by, Updated_on: Updated_on, Updated_by: Updated_by, Purpose: Purpose, Delete: Delete, Reserved: Reserved, Asset_type: Asset_Type, Memory_Id: Memory_Id, Rank_Count: Rank_Count, MemoryDeviceType: MemoryDeviceType, Memory_CapacityMiB: Memory_CapacityMiB, Memory_AllowedSpeedsMHz: Memory_AllowedSpeedsMHz, Memory_OperatingSpeedMHz: Memory_OperatingSpeedMhz, Disk_Id: Disk_Id, Media_Type: Media_Type, Disk_Description: Disk_Description, Network_Id: Network_Id, PCIeType: PCIeType, Processor_Id: Processor_Id, Instruction_Set: Instruction_Set, Processor_Model: Processor_Model, Processor_Architecture: Processor_Architecture, Total_Cores: Total_Cores, Total_Threads: Total_Threads, Socket: Socket, CPU_Family: CPU_Family})
	// 	}

	// 	totalPage := math.Ceil(float64(total*1.0) / float64(pg.Count*1.0))
	// 	json.NewEncoder(w).Encode(map[string]interface{}{"Count": pg.Count, "Page_no": pg.Page, "Total_entry": total, "Search": pg.Search, "Total_Page": totalPage, "ListAsset": result, "Status Code": "200 OK", "Message": "Listing All Servers"})
	// }

	handler := cors.Default().Handler(mux)
	http.ListenAndServe(":5002", handler)

}
