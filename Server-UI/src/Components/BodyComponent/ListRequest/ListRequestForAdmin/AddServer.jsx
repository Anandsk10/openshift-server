import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import { useNavigate } from "react-router-dom";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import swal from "sweetalert";
import moment from "moment/moment";
import Typography from "@mui/material/Typography";
import {Button,Container,CssBaseline,FormControlLabel,Dialog,Grid} from "@material-ui/core";
import { getUiDate } from "../../../Common/utils";
import { useStyles } from "../../BodyStyles";
import { useState } from "react";
import api from "../../../../utils/api";

export const AddServerComponent = (props)=>{
  const navigate = useNavigate();
    const classes = useStyles();
    const [data, setData] = useState({
        Asset_Name: "",
        Server_Serial: "",
        Server_Model: "",
        Manufacturer: "",
        Owner: "",
        Category: "",
        Still_needed: false,
        Current_Project: "",
        Notes: "",
        Previous_Project: "",
        BOM: "",
        Support_case: "",
        Cluster_Id: "",
        Asset_location: "",
        Lab: "",
        Row: "",
        Rack: "",
        RU: "",
        DC_status: "",
        CPU_model: "",
        Generation: "",
        CPU_Sockets: "",
        PDU_IP: "0.0.0.0",
        PDU_User: "",
        PDU_Password: "",
        BMC_IP: "",
        BMC_User: "",
        BMC_Password: "",
        BMC_FQDN: "",
        Operating_System: "",
        OS_IP: "0.0.0.0",
        OS_User: "",
        OS_Password: "",
        DIMM_Size: "",
        DIMM_Capacity: "",
        Storage_Vendor: "",
        Storage_Controller: "",
        Storage_Capacity: "",
        Network_Type: false,
        Network_speed: "",
        Number_Of_Network_Ports: "",
        Special_Switching_Needs: "",
        Required_Start_Date: "",
        Required_Finish_Date: "",
        Purpose: "",
        Created_by: props.AddServerProps.users.Username,
        Assigned_by: props.AddServerProps.users.Username,
        Assigned_to: props.AddServerProps.Userno,
        Updated_by: props.AddServerProps.users.Username,
      });
    const [network_Type, setNetwork_Type] = useState(false);
    const [stillNeeded, setStillNeeded] = useState(false);
    const [ServerRequestData,setServerRequestData]=useState({
        Required_Start_Date : getUiDate(props.AddServerProps.rowDataArr[4]),
        Required_End_Date : getUiDate(props.AddServerProps.rowDataArr[5]),
        Manufacturer : props.AddServerProps.rowDataArr[6],
        Operating_System : props.AddServerProps.rowDataArr[8],
        Cpu_model : props.AddServerProps.rowDataArr[9],
        CPU_Sockets : props.AddServerProps.rowDataArr[10],
        DIMM_Size : props.AddServerProps.rowDataArr[11],
        DIMM_Capacity : props.AddServerProps.rowDataArr[12],
        Storage_Vendor : props.AddServerProps.rowDataArr[13],
        Storage_Controller : props.AddServerProps.rowDataArr[14],
        Storage_Capacity : props.AddServerProps.rowDataArr[15],
        Number_Of_Network_Ports : props.AddServerProps.rowDataArr[16],
        Network_speed : props.AddServerProps.rowDataArr[17],
        Network_Type2 : props.AddServerProps.rowDataArr[18],
        Special_Switching_Needs : props.AddServerProps.rowDataArr[19]
      });
      function handle(e) {
        const newdata = { ...data };
        newdata[e.target.id] = e.target.value;
        setData(newdata);
        console.log(newdata);
      }

      const approve_request = async (identity) => {
        const postdata = {
          Id: identity,
        };
        await api
          .post("approve_request", postdata)
          .then(
            (res) => {
              if (res.status === 200) {
                console.log("aDD ASSET", res.data);
                swal(res.data.Message, {
                  buttons: false,
                  timer: 3000,
                });
                navigate("/servers");
            } else if (res.status === 202) {
                swal(res.data.Message);
              } else {
                alert("Something went wrong...Server Error!!");
              }
            },
            (error) => {
              swal(error.message, {
                timer: 3000,
              });
            }
          )
          .catch(function (error) {
            if (error.response.status === 401) {
              console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
              swal(error.response.data.Message, {
                icon: "warning",
                buttons: false,
                timer: 3000,
              });
            } else if (error.response.status === 400) {
              console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
              swal(error.response.data.Message, {
                icon: "warning",
                buttons: false,
                timer: 3000,
              });
            } else {
              console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
              swal(error.response.data.Message, {
                icon: "warning",
                buttons: false,
                timer: 3000,
              });
            }
          });
      };
      
      const Sub = async (e) => {
        e.preventDefault();
        let postData = {
          // Asset_Id: parseInt(data.Asset_Id),
          Asset_Name: data.Asset_Name,
          PDU_IP: data.PDU_IP,
          PDU_User: data.PDU_User,
          PDU_Password: data.PDU_Password,
          Manufacturer: ServerRequestData.Manufacturer,
          BMC_IP: data.BMC_IP,
          BMC_User: data.BMC_User,
          BMC_Password: data.BMC_Password,
          BMC_FQDN: data.BMC_FQDN,
          Asset_location: data.Asset_location,
    
          Created_by: data.Created_by,
          Assigned_by: data.Assigned_by,
          Assigned_to: props.AddServerProps.Userno,
          Updated_by: data.Updated_by,
    
          Operating_System: ServerRequestData.Operating_System,
          OS_IP: data.OS_IP,
          OS_User: data.OS_User,
          OS_Password: data.OS_Password,
          Purpose: data.Purpose,
          Cluster_Id: data.Cluster_Id,
    
          Generation: data.Generation,
          CPU_model: ServerRequestData.Cpu_model,
          Server_Model: data.Server_Model,
          CPU_Sockets: ServerRequestData.CPU_Sockets,
          Server_Serial: data.Server_Serial,
          Lab: data.Lab,
          Row: parseInt(data.Row),
          Rack: parseInt(data.Rack),
          RU: parseInt(data.RU),
          // Processor: data.Processor,
          DC_status: data.DC_status,
          Owner: data.Owner,
          Category: data.Category,
          // Still_Needed: data.Still_Needed,
          Still_needed: Boolean(stillNeeded),
          // Required_Start_Date: data.Required_Start_Date,
          Current_Project: data.Current_Project,
          Notes: data.Notes,
          Previous_Project: data.Previous_Project,
          BOM: data.BOM,
          Support_case: data.Support_case,
          DIMM_Size: ServerRequestData.DIMM_Size,
          DIMM_Capacity: ServerRequestData.DIMM_Capacity,
          Storage_Vendor: ServerRequestData.Storage_Vendor,
          Storage_Controller: ServerRequestData.Storage_Controller,
          Storage_Capacity: ServerRequestData.Storage_Capacity,
          Network_Type: ServerRequestData.Network_Type2,
          Network_speed: ServerRequestData.Network_speed,
          Number_Of_Network_Ports: ServerRequestData.Number_Of_Network_Ports,
          Special_Switching_Needs: ServerRequestData.Special_Switching_Needs,
          Required_Start_Date: moment(ServerRequestData.Required_Start_Date).toISOString(),
          Required_Finish_Date: moment(ServerRequestData.Required_End_Date).toISOString(),
          // Delete: 1,
        };
        await api
          .post("add_asset_request", postData)
          .then(
            (res) => {
              if (res.status === 200) {
                approve_request(props.AddServerProps.ID);
                swal(res.data.Message, {
                  buttons: false,
                  timer: 3000,
                });
                navigate("/servers");
                props.handleAddServerModelCLose();
              } else if (res.status === 202) {
                swal(res.data.Message);
              } else {
                alert("Something went wrong...Server Error!!");
              }
            },
            (error) => {
              swal(error.message, {
                // buttons: false,
                timer: 3000,
              });
            }
          )
          .catch(function (error) {
            if (error.response.status === 401) {
              console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
              swal(error.response.data.Message, {
                icon: "warning",
                buttons: false,
                timer: 3000,
              });
              //redirect to login
            } else if (error.response.status === 400) {
              console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
              swal(error.response.data.Message, {
                icon: "warning",
                buttons: false,
                timer: 3000,
              });
            } else {
              console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
              swal(error.response.data.Message, {
                icon: "warning",
                buttons: false,
                timer: 3000,
              });
            }
          });
      };
    
      const serverFields = [
        {
            inputType : 'textFeild',
            name:"Asset_Name",
            variant:"outlined",
            id:"Asset_Name",
            placeholder:"",
            label:"Asset Name",
            required:"required",
            type:"text",
            value:data.Asset_Name
        },
        {
            inputType : 'textFeild',
            variant:"outlined",
            id:"Server_Serial",
            placeholder:"",
            label:"Server Serial",
            required:"",
            name:"Server_Serial",
            type:"text",
            value:data.Server_Serial
        },
        {
            inputType : 'textFeild',
            name:"Server_Model",
            variant:"outlined",
            id:"Server_Model",
            placeholder:"",
            label:"Server Model",
            required:"",
            type:"text",
            value:data.Server_Model
        },
        {
            inputType : 'textFeild',
            variant:"outlined",
            name:"Manufacturer",
            id:"Manufacturer",
            placeholder:"",
            label:"Manufacturer",
            required:"required",
            type:"text",
            value:ServerRequestData.Manufacturer
        },
        {
            inputType : 'textFeild',
            name:"Owner",
            variant:"outlined",
            id:"Owner",
            placeholder:"",
            label:"Owner",
            required:"",
            type:"text",
            value:data.Owner
        },
        {
            inputType : 'textFeild',
            name:"Category",
            variant:"outlined",
            id:"Category",
            placeholder:"",
            label:"Category",
            required:"",
            type:"text",
            value:data.Category
        },
        {
            inputType : 'radioGroup',
            radioGroupTitle:"Still Needed",
            value:stillNeeded,
            onChange : (e)=>setStillNeeded(e),
            id:"Still_Needed",
            labels :[
                {
                    id:'No',
                    value:false,
                    label:'No'
                },
                {
                    id:'yes',
                    value:true,
                    label:'Yes'
                }
            ]
        },
        {
            inputType : 'textFeild',
            name:"Current_Project",
            variant:"outlined",
            id:"Current_Project",
            placeholder:"",
            label:"Current Project",
            required:"",
            type:"text",
            value:data.Current_Project
        },
        {
            inputType : 'textFeild',
            name:"Notes",
            variant:"outlined",
            id:"Notes",
            placeholder:"",
            label:"Notes",
            required:"",
            type:"text",
            value:data.Notes
        },
        {
            inputType : 'textFeild',
            name:"Previous_Project",
            variant:"outlined",
            id:"Previous_Project",
            placeholder:"",
            label:"Previous Project",
            required:"",
            type:"text",
            value:data.Previous_Project
        },
        {
            inputType : 'textFeild',
            name:"BOM",
            variant:"outlined",
            id:"BOM",
            placeholder:"",
            label:"BOM",
            required:"",
            type:"text",
            value:data.BOM
        },
        {
            inputType : 'textFeild',
            name:"Support_case",
            variant:"outlined",
            id:"Support_case",
            placeholder:"",
            label:"Support case",
            required:"",
            type:"text",
            value:data.Support_case
        },
        {
            inputType : 'textFeild',
            name:"Cluster_Id",
            variant:"outlined",
            id:"Cluster_Id",
            placeholder:"",
            label:"Cluster Id",
            required:"required",
            type:"text",
            // value:data.Cluster_Id
        },
        {
            inputType : 'textFeild',
            name:"Asset_location",
            variant:"outlined",
            id:"Asset_location",
            placeholder:"",
            label:"Asset Location",
            required:"required",
            type:"text",
            value:data.Asset_location
        },
        {
            inputType : 'textFeild',
            name:"Lab",
            variant:"outlined",
            id:"Lab",
            placeholder:"",
            label:"Lab",
            required:"",
            type:"text",
            value:data.Lab
        },
        {
            inputType : 'textFeild',
            name:"Row",
            variant:"outlined",
            id:"Row",
            placeholder:"",
            label:"Row",
            required:"",
            type:"number",
            value:data.Row
        },
        {
            inputType : 'textFeild',
            name:"Rack",
            variant:"outlined",
            id:"Rack",
            placeholder:"",
            label:"Rack",
            required:"",
            type:"number",
            value:data.Rack
        },
        {
            inputType : 'textFeild',
            name:"RU",
            variant:"outlined",
            id:"RU",
            placeholder:"",
            label:"RU",
            required:"",
            type:"number",
            value:data.RU
        },
        {
            inputType : 'textFeild',
            name:"DC_status",
            variant:"outlined",
            id:"DC_status",
            placeholder:"",
            label:"DC_status",
            required:"",
            type:"text",
            value:data.DC_status
        },
        {
            inputType : 'textFeild',
            name:"CPU_model",
            variant:"outlined",
            id:"CPU_model",
            placeholder:"",
            label:"CPU Model",
            required:"",
            type:"text",
            value:ServerRequestData.CPU_model
        },
        {
            inputType : 'textFeild',
            name:"Generation",
            variant:"outlined",
            id:"Generation",
            placeholder:"",
            label:"Generation",
            required:"",
            type:"text",
            value:data.Generation
        },
        {
            inputType : 'textFeild',
            name:"CPU_Sockets",
            variant:"outlined",
            id:"CPU_Sockets",
            placeholder:"",
            label:"CPU Sockets",
            required:"",
            type:"text",
            value:ServerRequestData.CPU_Sockets
        },
        {
            inputType : 'textFeild',
            name:"PDU_IP",
            variant:"outlined",
            id:"PDU_IP",
            placeholder:"",
            label:"PDU IP",
            required:"",
            type:"password",
            value:data.PDU_IP
        },
        {
            inputType : 'textFeild',
            name:"PDU_User",
            variant:"outlined",
            id:"PDU_User",
            placeholder:"",
            label:"PDU User",
            required:"",
            type:"text",
            value:data.PDU_User
        },
        {
            inputType : 'textFeild',
            name:"PDU_Password",
            variant:"outlined",
            id:"PDU_Password",
            placeholder:"",
            label:"PDU Password",
            required:"",
            type:"password",
            value:data.PDU_Password
        },
        {
            inputType : 'textFeild',
            name:"Operating_System",
            variant:"outlined",
            id:"Operating_System",
            placeholder:"",
            label:"PDU Password",
            required:"",
            type:"text",
            value:ServerRequestData.Operating_System
        },
        {
            inputType : 'textFeild',
            name:"BMC_IP",
            variant:"outlined",
            id:"BMC_IP",
            label:"BMC IP",
            placeholder:"Ex: 127.0.0.0",
            required:"required",
            type:"text",
            value:data.BMC_IP
        },
        {
            inputType : 'textFeild',
            name:"BMC_User",
            variant:"outlined",
            id:"BMC_User",
            label:"BMC User",
            placeholder:"",
            required:"required",
            type:"text",
            value:data.BMC_User
        },
        {
            inputType : 'textFeild',
            name:"BMC_Password",
            variant:"outlined",
            id:"BMC_Password",
            label:"BMC Password",
            placeholder:"",
            required:"required",
            type:"password",
            value:data.BMC_Password
        },
        {
            inputType : 'textFeild',
            name:"BMC_FQDN",
            variant:"outlined",
            id:"BMC_FQDN",
            label:"BMC FQDN",
            placeholder:"",
            required:"",
            type:"text",
            value:data.BMC_FQDN
        },
        {
            inputType : 'textFeild',
            name:"OS_IP",
            variant:"outlined",
            id:"OS_IP",
            label:"OS IP",
            placeholder:"",
            required:"",
            type:"text",
            value:data.OS_IP
        },
        {
            inputType : 'textFeild',
            name:"OS_User",
            variant:"outlined",
            id:"OS_User",
            label:"OS User",
            placeholder:"",
            required:"",
            type:"text",
            value:data.OS_User
        },
        {
            inputType : 'textFeild',
            name:"OS_Password",
            variant:"outlined",
            id:"OS_Password",
            label:"OS Password",
            placeholder:"",
            required:"",
            type:"password",
            value:data.OS_Password
        },
        {
            inputType : 'textFeild',
            name:"DIMM_Size",
            variant:"outlined",
            id:"DIMM_Size",
            label:"DIMM Size",
            placeholder:"",
            required:"",
            type:"text",
            value:ServerRequestData.DIMM_Size
        },
        {
            inputType : 'textFeild',
            name:"DIMM_Capacity",
            variant:"outlined",
            id:"DIMM_Capacity",
            label:"DIMM_Capacity",
            placeholder:"",
            required:"",
            type:"text",
            value:ServerRequestData.DIMM_Capacity
        },
        {
            inputType : 'textFeild',
            name:"Storage_Vendor",
            variant:"outlined",
            id:"Storage_Vendor",
            label:"Storage Vendor",
            placeholder:"",
            required:"",
            type:"text",
            value:ServerRequestData.Storage_Vendor
        },
        {
            inputType : 'textFeild',
            name:"Storage_Controller",
            variant:"outlined",
            id:"Storage_Controller",
            label:"Storage Controller",
            placeholder:"",
            required:"",
            type:"text",
            value:ServerRequestData.Storage_Controller
        },
        {
            inputType : 'textFeild',
            name:"Storage_Capacity",
            variant:"outlined",
            id:"Storage_Capacity",
            label:"Storage Capacity",
            placeholder:"",
            required:"",
            type:"text",
            value:ServerRequestData.Storage_Capacity
        },
        {
            inputType : 'radioGroup',
            radioGroupTitle:"Network Type",
            value:network_Type,
            onChange : (e) => setNetwork_Type(e.target.value),
            id:"Network_Type",
            labels :[
                {
                    id:'private',
                    value:false,
                    label:'Private'
                },
                {
                    id:'yes',
                    value:true,
                    label:'Public'
                }
            ]
        },
        {
            inputType : 'textFeild',
            name:"Network_speed",
            variant:"outlined",
            id:"Network_speed",
            label:"Network speed",
            placeholder:"",
            required:"",
            type:"text",
            value:ServerRequestData.Network_speed
        },
        {
            inputType : 'textFeild',
            name:"Number_Of_Network_Ports",
            variant:"outlined",
            id:"Number_Of_Network_Ports",
            label:"No Of Network Ports",
            placeholder:"",
            required:"",
            type:"text",
            value:ServerRequestData.Number_Of_Network_Ports
        },
        {
            inputType : 'textFeild',
            name:"Special_Switching_Needs",
            variant:"outlined",
            id:"Special_Switching_Needs",
            label:"Special Switching Needs",
            placeholder:"",
            required:"",
            type:"text",
            value:ServerRequestData.Special_Switching_Needs
        },
        {
            inputType : 'textFeild',
            name:"Purpose",
            variant:"outlined",
            id:"Purpose",
            label:"Purpose",
            placeholder:"",
            required:"required",
            type:"text",
            value:ServerRequestData.Purpose
        },
        {
            inputType : 'textFeild',
            name:"Required_Start_Date",
            variant:"outlined",
            id:"Required_Start_Date",
            label:"Required Start Date",
            placeholder:"Required_Start_Date",
            required:"",
            type:"date",
            value:ServerRequestData.Required_Start_Date
        },
        {
            inputType : 'textFeild',
            name:"Required_Finish_Date",
            variant:"outlined",
            id:"Required_Finish_Date",
            label:"Required Start Date",
            placeholder:"Required_Finish_Date",
            InputLabelProps:{shrink : true},
            required:"",
            type:"date",
            value:ServerRequestData.Required_End_Date
        }
      ]

    return (
        <>
          <Dialog id="create server dlg" open={true} fullWidth={true} maxWidth={"xl"}>
            <Container component="main" maxWidth={"xl"}>
              <CssBaseline />
              <div className={classes.paper}>
                <div className="addassetheaderline">
                  <Box m={0}>
                    <Typography component="h1" variant="h6" className="addasseth6">
                      Create Server
                    </Typography>
                    <Typography component="h1" variant="body2"></Typography>
                  </Box>
                </div>
                <form className={classes.form} onSubmit={(e) => Sub(e)}>
                <Grid container spacing={2}>
                 {serverFields.map(inputFeildDetails=>(
                    <Grid item xs={12} sm={3}>
                     {inputFeildDetails.inputType == 'textFeild' &&
                      <TextField
                      name={inputFeildDetails.name}
                      variant={inputFeildDetails.variant}
                      required={inputFeildDetails.required}
                      fullWidth
                      id={inputFeildDetails.id}
                      InputLabelProps={inputFeildDetails.InputLabelProps}
                      label={inputFeildDetails.label}
                      type={inputFeildDetails.type}
                      defaultValue={inputFeildDetails.value}
                      placeholder={inputFeildDetails.placeholder}
                      onChange={(e) => handle(e)}
                      />}
                     {inputFeildDetails.inputType == 'radioGroup' &&
                        <FormControl>
                          <FormLabel id="demo-row-radio-buttonslabel-group-">
                            {inputFeildDetails.radioGroupTitle}
                          </FormLabel>
                          <RadioGroup
                            value={inputFeildDetails.value}
                            id={inputFeildDetails.id}
                            onChange={inputFeildDetails.onChange}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            {inputFeildDetails.labels.map(labels=>
                            <FormControlLabel
                              id={labels.id}
                              value={labels.value}
                              onChange={inputFeildDetails.onChange}
                              control={<Radio />}
                              label={labels.label}
                            />
                            )}
                          </RadioGroup>
                        </FormControl>
                     }
                    </Grid>
                     )
                   )}
                  </Grid>
                  <div className="subcanbtn">
                    <Button
                      type="submit"
                      value="SUBMIT"
                      sx={{ width: "25ch" }}
                      variant="contained"
                      id="addAssetBtn"
                      className={classes.add}
                    >
                      Add
                    </Button>
                    <Button
                      sx={{ width: "25ch" }}
                      variant="contained"
                      id="addAssetClose"
                      className={classes.cancel}
                      onClick={()=>props.handleAddServerModelCLose()}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </Container>
          </Dialog>
        </>
    )
}
