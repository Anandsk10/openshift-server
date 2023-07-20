import React from "react";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../BodyStyles";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Stack from "@mui/material/Stack";

import MarkUnreadChatAltRoundedIcon from "@mui/icons-material/MarkUnreadChatAltRounded";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { ExpandCircleDownRounded, Visibility } from "@mui/icons-material";

import AddIcon from "@mui/icons-material/Add";

import PulseLoader from "react-spinners/PulseLoader";
import "../../../css/servers.css";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  CssBaseline,
  Dialog,
  Grid,
  InputLabel,
  Select,
  Tooltip,
} from "@material-ui/core";

import DnsIcon from "@mui/icons-material/Dns";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import image from "../../../img/adduser2.jpg";
//--------------/Add user------------------
import swal from "sweetalert";

//--------------Add user pop-up --------------

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import axios from "axios";
import { Autocomplete, DatePicker, LocalizationProvider } from "@mui/lab";
import { id } from "date-fns/locale";
import api from "../../../utils/api";
import useAuth from "../../auth";
import ClipLoader from "react-spinners/ClipLoader";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import moment from "moment/moment";
import { columnsDetails } from "./ListRequestServices/Columns";
import { UserCommentsComponent } from "./ListRequestServices/UserComments";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

export const ListRequestforuser = () => {
  const navigate = useNavigate();

  const classes = useStyles();
  const [openModel4, setOpenModel4] = React.useState(false);
  const [openModel3, setOpenModel3] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [uservalue, setUservalue] = React.useState({});
  const [infChat, setInfChat] = useState([]);
  const [userid, setuserid] = useState([]);
  const [name, setName] = useState([]);
  const [chatID, setChatID] = useState(0);
  const [chatindex, setchatindex] = useState();
  const [sendmesssage, setsendmessage] = useState("");
  const [openMore, setOpenMore] = React.useState(false);
  const getuserid = (idd) => {
    console.log(idd);
  };
  const handleModel4Open = (s) => {
    setOpenModel4(true);
    console.log(s, "Required Value");
  };
  const handleModel4Close = () => {
    setOpenModel4(false);
  };
  const handleUserCommentsModelClose = () => {
    setOpenModel3(false);
  };
  const handleModel3Open = (s) => {
    setOpenModel3(true);
    let cmd = s;
    let spl = cmd.split(/[,{}""&"]/).filter((o) => o);
    let spl2 = cmd.split(/",","{" /);
    console.log("third", spl2);
    let [f, y] = cmd.split(/","/);
    console.log("first", f);
    console.log("second", y);

    console.log("spl data", spl);
    console.log("s data", s);
    setUservalue(spl);
  };
  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const handleModelMoreOpen = () => {
    setOpenMore(true);
  };
  const handleModelMoreClose = () => {
    setOpenMore(false);
  };
  const infcmt = (s) => {
    // handleModel3Open();
    setID(s);
    // submitcomment(e);
    console.log(s);
    handleModel4Open(s);
  };
  const platformFn = (s, i) => {
    // usercomment();
    setID(s);
    // infraChat(s, i);
    setchatindex(i);
    setChatID(s);
    handleModel3Open(s);
    console.log(s, "row server id");
  };

  ///more
  //more data
  const [Requester2, setRequester2] = useState("");
  const [Required_Start_Date2, setRequired_Start_Date2] = useState("");
  const [Required_End_Date2, setRequired_End_Date2] = useState("");
  const [Manufacturer2, setManufacturer2] = useState("");
  const [Operating_System2, setOperating_System2] = useState("");
  const [Cpu_model2, setCpu_model2] = useState("");
  const [CPU_Sockets2, setCPU_Sockets2] = useState("");
  const [DIMM_Size2, setDIMM_Size2] = useState("");
  const [DIMM_Capacity2, setDIMM_Capacity2] = useState("");
  const [Storage_Vendor2, setStorage_Vendor2] = useState("");
  const [Storage_Controller2, setStorage_Controller2] = useState("");
  const [Storage_Capacity2, setStorage_Capacity2] = useState("");
  const [Number_Of_Network_Ports2, setNumber_Of_Network_Ports2] = useState("");
  const [Network_speed2, setNetwork_speed2] = useState("");
  const [Network_Type2, setNetwork_Type2] = useState("");
  const [Special_Switching_Needs2, setSpecial_Switching_Needs2] = useState("");
  const [Updated_by2, setUpdated_by2] = useState("");
  const [Updated_on2, setUpdated_on2] = useState("");
  const moreData = (rowDataArray) => {
    handleModelMoreOpen();
    console.log(rowDataArray, "rowMoreDataArray------");
    setRequester2(rowDataArray[2]);
    setRequired_Start_Date2(rowDataArray[3]);
    setRequired_End_Date2(rowDataArray[4]);
    setManufacturer2(rowDataArray[5]);
    setOperating_System2(rowDataArray[7]);
    setCpu_model2(rowDataArray[8]);
    setCPU_Sockets2(rowDataArray[9]);
    setDIMM_Size2(rowDataArray[10]);
    setDIMM_Capacity2(rowDataArray[11]);
    setStorage_Vendor2(rowDataArray[12]);
    setStorage_Controller2(rowDataArray[13]);
    setStorage_Capacity2(rowDataArray[14]);
    setNumber_Of_Network_Ports2(rowDataArray[15]);
    setNetwork_speed2(rowDataArray[16]);
    setNetwork_Type2(rowDataArray[17]);
    setSpecial_Switching_Needs2(rowDataArray[18]);
    setUpdated_by2(rowDataArray[19]);
    setUpdated_on2(rowDataArray[20]);
  };
  const columns = columnsDetails
  let index = columns.findIndex(data=>data.name=='Actions')
  columns[index].options['customBodyRender'] = (value, tableMeta, updateValue) => {
    return (
      <div className="reserverflexicons">
        <Tooltip id="chat tool" title="Chat">
          <a
          id="more btn"
            onChange={() => console.log(value, tableMeta.rowData[0])}
            onClick={() =>
              platformFn(tableMeta.rowData[0], tableMeta?.rowIndex)
            }
          >
            <MarkUnreadChatAltRoundedIcon id="chat btn " />
          </a>
        </Tooltip>
        <Tooltip id="edit tool" title="Edit">
          <a
            onClick={() => editableData(tableMeta.rowData)}
            color="primary"
          >
            <EditIcon id="edit btn" />
          </a>
        </Tooltip>
        <Tooltip id="more tool" title="more">
          <a
            className="moreicon"
            onClick={() => moreData(tableMeta.rowData)}
            color="primary"
          >
            <Visibility  />
          </a>
        </Tooltip>
      </div>
    );
    }
  columns.push(
    {
      name: "User_Comments",
      label: "User Comments",
      options: {
        display: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button
              onChange={() => console.log(value, tableMeta.rowData[0])}
              onClick={() => infcmt(tableMeta.rowData[0])}
            >
              <MarkUnreadChatAltRoundedIcon />
            </button>
          );
        },
      },
    })
  const user = useAuth();
  const [output, setOutput] = useState([]);
  const [loading, setloading] = useState(false);
  const [count, SetCount] = useState(10);

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    // setloading(true);
    // setTimeout(() => {
    //   setloading(false);
    // }, 1000);
    myRequest();
  }, []);
  const myRequest = async () => {
    const user = localStorage.getItem("loggedInUserDetails");
    let loggedPerson = JSON.parse(user);

    if (user.Role === "user") {
      const user = localStorage.getItem("loggedInUserDetails");
    }
    let a = {
      User_No: parseInt(loggedPerson.User_Id),
      // User_No: 4,
      Count: count,
      Page: 1,
      Search: page,
      // User_No: 7,
    };

    await api
      .post("my_request", a)
      .then((res) => {
        console.log(res.data, "data4544", res.data?.ListMyRequests);
        setloading(false);
        if (res.status === 200) {
          // console.log(res.data);
          //   reset();
          SetCount(res?.data?.Count);
          setOutput(res.data?.ListMyRequests);

          // setOpen(false);
          // reservedAssetApi();
          // setValue("2");

          // poolAssetApi();

          // handleClose();
        } else if (res.status === 202) {
          console.log("urgent ", res.config.data);
          // console.log(res.data.Message);
        } else {
          alert("Something went wrong...Server Error!!");
        }
      })
      .catch(function (error) {
        console.log(error, "<--referf");

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

  const [User_Comments, setUser_Comments] = useState(" ");

  function submitcomment(e) {
    e.preventDefault();
    let a = {
      User_Comments: User_Comments,
    };
    console.log("loged user list ", a);
    // console.log(a, "a");
    api
      .post("update_request", a)
      .then((res) => {
        if (User_Comments === " ") {
          swal(res.data.Message, {
            buttons: false,
            timer: 3000,
          });
        }
        console.log("doooo", User_Comments);
        // setData(res.data);
        console.log("res", res);

        swal(res.data.Message, {
          buttons: false,
          timer: 3000,
        });
        handleModel4Close();
      })
      .catch((err) => {
        console.log(err);

        alert("error added");
      })
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
  }

  const [Requester, setRequester] = useState("");
  const [Manufacturer, setManufacturer] = useState("");
  const [Required_Start_Date, setRequired_Start_Date] = useState("");

  const [Infraadmin_Comments, setInfraadmin_Comments] = useState("");

  const [Number_Of_Servers, setNumber_Of_Servers] = useState("");
  const [Operating_System, setOperating_System] = useState("");
  const [Id, setId] = useState("");
  const [Cpu_model, setCpu_model] = useState("");
  const [CPU_Sockets, setCPU_Sockets] = useState("");
  const [DIMM_Size, setDIMM_Size] = useState("");
  const [DIMM_Capacity, setDIMM_Capacity] = useState("");
  const [Storage_Vendor, setStorage_Vendor] = useState("");
  const [Storage_Controller, setStorage_Controller] = useState("");
  const [Storage_Capacity, setStorage_Capacity] = useState("");

  const [Network_Type, setNetwork_Type] = useState(false);
  const [Network_speed, setNetwork_speed] = useState("");
  const [Number_OF_Network_ports, setNumber_OF_Network_ports] = useState("");
  const [Special_Switching_Needs, setSpecial_Switching_Needs] = useState("");
  const [Updated_by, setUpdated_by] = useState("");
  const [ID, setID] = React.useState();
  console.log(ID, "<-Ayush7");
  console.log(Id, "<--jagat");
  //////-----eit auto complete option----
  const Cpu_model1 = [
    { label: "Naples" },
    { label: "Rome" },
    { label: "Milan" },
    { label: "Genoa" },
    { label: "Milan X" },
    { label: "Burgamo " },
  ];
  const CPU_Sockets1 = [{ label: "1" }, { label: "2" }, { label: "3" }];
  const Storage_Vendor1 = [
    { label: "Samsung" },
    { label: "Seagate" },
    { label: "Western Digital" },
  ];
  const Storage_Controller1 = [
    { label: "SATA" },
    { label: "SAS" },
    { label: "Nvme" },
    { label: "Mixed" },
  ];

  const Number_Of_Network_Ports1 = [
    { label: "1" },
    { label: "2" },
    { label: "3" },
    { label: "4" },
  ];
  const Network_speed1 = [
    { label: "1 Gb " },
    { label: "10 Gb" },
    { label: "25 Gb" },
    { label: "100 Gb" },
  ];
  const network_Type1 = [
    { label: "public ", value: true },
    { label: "Private", value: false },
  ];
  const editableData = (rowDataArr) => {
    handleEditOpen();
    console.log("rowDataArr  need", rowDataArr);
    if (rowDataArr !== [] || rowDataArr !== null) {
      setId(rowDataArr[0]);

      setRequester(rowDataArr[2]);
      setInfraadmin_Comments(rowDataArr[19]);
      setManufacturer(rowDataArr[5]);
      setRequired_Start_Date(rowDataArr[3]);
      setNumber_Of_Servers(rowDataArr[6]);
      setOperating_System(rowDataArr[7]);
      setCpu_model(rowDataArr[8]);
      setCPU_Sockets(rowDataArr[9]);
      setDIMM_Size(rowDataArr[10]);
      setDIMM_Capacity(rowDataArr[11]);
      setStorage_Vendor(rowDataArr[12]);
      setStorage_Controller(rowDataArr[13]);
      setStorage_Capacity(rowDataArr[14]);
      setNumber_OF_Network_ports(rowDataArr[15]);
      setNetwork_speed(rowDataArr[16]);

      setNetwork_Type(rowDataArr[17]);

      setSpecial_Switching_Needs(rowDataArr[18]);
      setUpdated_by(rowDataArr[19]);
    }
  };

  //----- onsubmit edit funtion-----
  const submitEditedFn = async (e) => {
    e.preventDefault();
    console.log("edited data");
    if (Boolean(Network_Type)) {
      console.log("Network_Type", Network_Type);
    }
    let postData = {
      Id: ID,
      User_No: parseInt(user.User_Id),
      Request: false,
      Updated_by: user.Username,

      Required_Start_Date: Required_Start_Date,
      Requester: Requester,
      Manufacturer: Manufacturer,
      // Number_Of_Servers: Number_Of_Servers,
      Operating_System: Operating_System,
      Cpu_model: Cpu_model,
      CPU_Sockets: CPU_Sockets,
      DIMM_Size: DIMM_Size,
      DIMM_Capacity: DIMM_Capacity,
      Storage_Vendor: Storage_Vendor,
      Storage_Controller: Storage_Controller,
      Storage_Capacity: Storage_Capacity,
      Network_Type: Boolean(Network_Type),
      Network_speed: Network_speed,
      Number_OF_Network_ports: Number_OF_Network_ports,
      Special_Switching_Needs: Special_Switching_Needs,
      Updated_by: user.Username,
    };
    console.log(postData, "postData of update asset");
    let jsonAssign = JSON.stringify(postData);
    console.log(jsonAssign, "jsonAssign update");
    // console.log(a, "a");
    api
      .post("update_request", postData)
      .then((res) => {
        if (res.status === 200) {
          swal(res.data.Message, {
            buttons: false,
            timer: 3000,
          });
          myRequest();
          handleEditClose();

          navigate("/listrequestuser");
        } else if (res.status === 202) {
          console.log("urgent ", res.config.data);
        } else {
          alert("Something went wrong...Server Error!!");
        }
      })
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

  function handleClick() {
    navigate("/serverrequest");
  }
  const CustomUserToolbar = ({ displayData }) => {
    return (
      <>
        {
          // <div  className="">
          <Tooltip title="Create Server Request ">
            <Button
              className="addUserStyle"
              id="addserverrequestBtn"
              onClick={handleClick}
              startIcon={<AddIcon />}
            ></Button>
          </Tooltip>
          // </div>
        }
      </>
    );
  };
  const CustomsearchToolbar = ({ displayData }) => {
    return (
      <>
        {
          // <div  className="">
          <Tooltip title="">
            <Button
              // variant="standard"
              className="addUserStyle"
              id="addUserBtnStyleId"
              onClick={handleClick}
              startIcon={<AddIcon />}
            ></Button>

            <div style={{ marginLeft: 100 }}>
              <div class="searchBox">
                <input
                  className="searchInput"
                  type="text"
                  name=""
                  placeholder="Search"
                />
                <button 
                id="seach option" className="searchButton" href="#">
                  <i class="material-icons">search</i>
                </button>
              </div>
            </div>
          </Tooltip>
          // </div>
        }
      </>
    );
  };

  const headerElement = ({ displayData }) => {
    return (
      <>
        <CustomsearchToolbar />
        <CustomUserToolbar />
      </>
    );
  };

  const options = {
    textLabels: {
      body: {
        noMatch: " No Records Available",
      },
    },
    filterType: "checkbox",
    print: false,
    search: false,
    selectableRows: false,
    rowStyle: { height: 10 },
    rowsPerPage: [5],
    download: false,
    rowsPerPageOptions: [3, 5, 10, 15],
    viewColumns: false,
    responsive: true,
    filter: false,
    customToolbar: CustomUserToolbar,
  };

  const theme = createTheme({
    overrides: {
      MUIDataTableSelectCell: {
        expandDisabled: {
          // Soft hide the button.
          visibility: "hidden",
        },
      },
    },
  });

  useEffect(() => {
    submitEditedFn();
  }, []);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState(fullWidth);
  return (
    <>
      {openModel3 && <UserCommentsComponent title='Infra Admin Comments' output={output[chatindex]} chatID={chatID} chatindex={chatindex} handleUserCommentsModelClose={handleUserCommentsModelClose} />}

      <Dialog id="user comment dlg" open={openModel4} className={classes.dialog}>
        <Container
          component="main"
          className={classes.dialogContainer}
          sx={{ minWidth: 300 }}
        >
          <CssBaseline />
          <div className={classes.dialogPaper} sx={{ minWidth: 300 }}>
            <Typography component="h1" variant="h6">
              User Comments
            </Typography>

            <form
              className={classes.form}
              onSubmit={(e) => submitcomment(e)}
              // initialValues={}
              sx={{ minWidth: 300 }}
            >
              <Grid item xs={12} sx={{ minWidth: 300 }}>
                <Grid
                  item
                  xs={15}
                  sx={{ minWidth: 300 }}
                  sm={{ minWidth: 300 }}
                >
                  <TextField
                    variant="outlined"
                    required
                    sx={{ minWidth: 300 }}
                    xs={{ minWidth: 300 }}
                    size="medium"
                    fullWidth="true"
                    id="setUser_Comments"
                    label="User Comments"
                    name="setUser_Comments"
                    placeholder="User Comments"
                    focused
                    type="text"
                    onChange={(e) => setUser_Comments(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
              id="save btn"
                type="submit"
                // value="Submit"
                sx={{ width: "25ch" }}
                variant="contained"
                // color="success"
                className={classes.add}
              >
                Save
              </Button>
              <Button
              id="close chat btn"
                // type="submit"
                // fullWidth
                sx={{ width: "25ch" }}
                variant="contained"
                color="primary"
                className={classes.cancel}
                onClick={handleModel4Close}
              >
                Cancel
              </Button>
            </form>
          </div>
        </Container>
      </Dialog>
      <Dialog id="edit request dlg" open={editOpen} fullWidth={fullWidth} maxWidth={"xl"}>
        <Container component="main" maxWidth={"xl"}>
          <CssBaseline />
          <div className={classes.paper}>
            <div className="editassetheaderline">
              <Box m={0}>
                <Typography component="h1" variant="h6">
                  Edit Request
                </Typography>
                <Typography component="h1" variant="body2"></Typography>
              </Box>
            </div>

            <form className={classes.form} onSubmit={(e) => submitEditedFn(e)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    required
                    //size="small"
                    fullWidth
                    id="Manufacturer"
                    label="Manufacturer"
                    name="Manufacturer"
                    focused
                    type="text"
                    value={Manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    required
                    //size="small"
                    fullWidth
                    id="Operating_System"
                    label="Operating System"
                    name="Operating_System"
                    // focused
                    type="text"
                    // value={Asset_Location}
                    value={Operating_System}
                    onChange={(e) => setOperating_System(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    disablePortal
                    id="Cpu_model"
                    value={Cpu_model}
                    onSelect={(e) => setCpu_model(e.target.value)}
                    options={Cpu_model1}
                    // sx={{ width: 280 }}
                    renderInput={(params) => (
                      <TextField {...params} required label="CPU Model" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    disablePortal
                    id="CPU_Sockets"
                    value={CPU_Sockets}
                    onSelect={(e) => setCPU_Sockets(e.target.value)}
                    options={CPU_Sockets1}
                    // sx={{ width: 280 }}
                    renderInput={(params) => (
                      <TextField
                        type={"integer"}
                        required
                        {...params}
                        label="CPU Sockets"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    required
                    //size="small"
                    id="DIMM_Size"
                    label="DIMM Size"
                    name="DIMM_Size"
                    // focused
                    fullWidth
                    type="text"
                    value={DIMM_Size}
                    onChange={(e) => setDIMM_Size(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    required
                    //size="small"
                    fullWidth
                    id="DIMM_Capacity"
                    label="DIMM Capacity"
                    name="DIMM_Capacity"
                    // focused
                    type="text"
                    value={DIMM_Capacity}
                    onChange={(e) => setDIMM_Capacity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    disablePortal
                    id="Storage_Vendor"
                    value={Storage_Vendor}
                    onSelect={(e) => setStorage_Vendor(e.target.value)}
                    options={Storage_Vendor1}
                    // sx={{ width: 280 }}
                    renderInput={(params) => (
                      <TextField {...params} required label="Storage Vendor" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    disablePortal
                    id="Storage_Controller"
                    value={Storage_Controller}
                    onSelect={(e) => setStorage_Controller(e.target.value)}
                    // onSelect={(e) => handlechange(e)}
                    options={Storage_Controller1}
                    // sx={{ width: 280 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label="Storage_Controller"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    required
                    //size="small"
                    id="Storage_Capacity"
                    label="Storage Capacity"
                    name="Storage_Capacity"
                    // focused
                    fullWidth
                    type="text"
                    value={Storage_Capacity}
                    onSelect={(e) => setStorage_Capacity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttonslabel-group-">
                      Network Type
                    </FormLabel>
                    <RadioGroup
                      value={Network_Type}
                      id="Network_Type"
                      onChange={(e) =>
                        console.log(e.target.value, "main value")
                      }
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value={false}
                        typeof="radio"
                        onClick={(e) => setNetwork_Type(e.target.value)}
                        control={<Radio />}
                        label="Private"
                      />
                      <FormControlLabel
                        value={true}
                        typeof="radio"
                        onClick={(e) => setNetwork_Type(e.target.value)}
                        control={<Radio />}
                        label="Public"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    disablePortal
                    id="Network_speed"
                    value={Network_speed}
                    onSelect={(e) => setNetwork_speed(e.target.value)}
                    // onSelect={(e) => handlechange(e)}
                    options={Network_speed1}
                    // sx={{ width: 280 }}
                    renderInput={(params) => (
                      <TextField {...params} required label="Network speed" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    disablePortal
                    id="Number_OF_Network_ports"
                    value={Number_OF_Network_ports}
                    // onSelect={(e) => handlechange(e)}
                    onSelect={(e) => setNumber_OF_Network_ports(e.target.value)}
                    options={Number_Of_Network_Ports1}
                    // sx={{ width: 280 }}
                    renderInput={(params) => (
                      <TextField id="Number_OF_Network_ports" {...params} required label="Network Ports" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    id="Special_Switching_Needs"
                    label="Special_Switching_Needs"
                    name="Special Switching Needs"
                    fullWidth
                    type="text"
                    value={Special_Switching_Needs}
                    onChange={(e) => setSpecial_Switching_Needs(e.target.value)}
                  />
                </Grid>
              </Grid>
              <div className="subcanbtn">
                <Button
                id="save btn1"
                  type="submit"
                  value="SUBMIT"
                  sx={{ width: "25ch" }}
                  variant="contained"
                  // color="success"
                  className={classes.add}
                >
                  Save
                </Button>
                <Button
                id="close btn1"
                  sx={{ width: "25ch" }}
                  variant="contained"
                  // color="primary"
                  className={classes.cancel}
                  onClick={handleEditClose}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </Dialog>
      <Dialog id="server details dlg" open={openMore} className={classes.dialog}>
        <Container component="main" maxWidth="xl">
          <CssBaseline />

          <Typography
            component="h3"
            style={{ padding: "10px", margintop: "20px" }}
            variant="h5"
          >
            Server Details
          </Typography>

          {/* </div> */}
          <hr />
          <div className="">
            <table className="tablee customTable">
              <tr>
                <td>Requester:</td>
                <td>{Requester2}</td>
              </tr>
              <tr>
                <td> Required Start Date:</td>
                <td>{moment(Required_Start_Date2).format("MMMM Do YYYY")}</td>
              </tr>
              <tr>
                <td>Required End Date:</td>
                <td>{moment(Required_End_Date2).format("MMMM Do YYYY")}</td>
              </tr>
              <tr>
                <td>Manufacturer:</td>
                <td> {Manufacturer2}</td>
              </tr>
              <tr>
                <td>Operating System:</td>
                <td>{Operating_System2}</td>
              </tr>
              <tr>
                <td>CPU Model:</td>
                <td>{Cpu_model2}</td>
              </tr>
              <tr>
                <td>CPU Sockets:</td>
                <td>{CPU_Sockets2}</td>
              </tr>

              <tr>
                <td>DIMM Capacity:</td>
                <td>{DIMM_Capacity2}</td>
              </tr>
              <tr>
                <td>DIMM Size:</td>
                <td>{DIMM_Size2}</td>
              </tr>
              <tr>
                <td>Network Type:</td>
                <td>{!Network_Type2 ? "Private" : "Public"}</td>
              </tr>
              {console.log(Network_Type2, "<----qwertyy")}
              <tr>
                <td>Network Speed:</td>
                <td>{Network_speed2}</td>
              </tr>
              <tr>
                <td>Number Of Network Ports:</td>
                <td>{Number_Of_Network_Ports2}</td>
              </tr>
              <tr>
                <td>Storage Capacity(In GB):</td>
                <td>{Storage_Capacity2}</td>
              </tr>
              <tr>
                <td>Storage Controller:</td>
                <td>{Storage_Controller2}</td>
              </tr>
              <tr>
                <td>Storage Vendor:</td>
                <td>{Storage_Vendor2}</td>
              </tr>
              <tr>
                <td>Special Switching Needs:</td>
                <td>{Special_Switching_Needs2}</td>
              </tr>
              <tr>
                <td>Updated On:</td>
                <td>{moment(Updated_on2).format("MMMM Do YYYY, h:mm:ss a")}</td>
              </tr>
              <tr>
                <td>Updated By:</td>
                <td>{Updated_by2}</td>
              </tr>
            </table>
          </div>
          <div className="subcanbtn">
            <Button
            id="close server details  btn"
              sx={{ width: "25ch" }}
              variant="contained"
              // color="primary"
              
              className={classes.cancel}
              onClick={handleModelMoreClose}
            >
              Close
            </Button>
          </div>
        </Container>
      </Dialog>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <Box sx={{ width: "100%", typography: "body2" }}>
          <CacheProvider value={muiCache}>
            <div style={{ marginTop: 50 }}>
              {loading ? (
                <div
                  style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <PulseLoader
                    loading={loading}
                    size={25}
                    display="flex"
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    alignItems="center"
                  />
                </div>
              ) : (
                <MUIDataTable
                  title={"List Server Request"}
                  data={output}
                  columns={columns}
                  options={options}
                  className="themeOver"
                />
              )}
            </div>
            {/* </ThemeProvider> */}
          </CacheProvider>
        </Box>
      </Box>
    </>
  );             
};
export default ListRequestforuser;
