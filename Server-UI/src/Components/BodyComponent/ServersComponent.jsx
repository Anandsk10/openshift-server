import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import ReactJson from "react-json-view";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AccordionSummary from "@mui/material/AccordionSummary";
import Datatable from "../BodyComponent/datatable/Datatable";
import AccordionDetails from "@mui/material/AccordionDetails";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import moment from "moment";
import { purple, red, green } from "@mui/material/colors";
import axios from "axios";
import { getUiDate } from "../../Components/Common/utils";
import Historic from "../../Components/BodyComponent/History/Historic";
import AddIcon from "@mui/icons-material/Add";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import PulseLoader from "react-spinners/PulseLoader";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import CloseIcon from "@mui/icons-material/Close";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
// import SwitchComponent from "./switch/Switch";

import {
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogTitle,
  FormControlLabel,
  Grid,
  InputLabel,
  ListItemAvatar,
  MenuItem,
  Modal,
  Paper,
  Select,
  Switch,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import DnsIcon from "@mui/icons-material/Dns";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useStyles } from "./BodyStyles";
import "../../css/servers.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import api from "../../utils/api";
import {
  createMuiTheme,
  MuiThemeProvider,
  styled,
} from "@material-ui/core/styles";
// import { createTheme } from "@material-ui/core/styles";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
import { minWidth } from "@mui/system";
import useAuth from "../auth";
import swal from "sweetalert";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

//--------------/Tabs ---------------------


import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ExpandCircleDownRounded, Visibility } from "@mui/icons-material";
import { Accordion, ListItemButton, Tooltip } from "@mui/material";

import reserveserver from "../../img/save.png";
import removeserver from "../../img/remove.png";
import MoreSharpIcon from "@mui/icons-material/MoreSharp";
import { id } from "date-fns/locale";
// import Onserveruser from "./onofServer/Onserveruser";
import {  useNavigate } from "react-router-dom";
import { Avatar } from "react-chat-engine";


const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// const muiCache = createCache({
//   key: "mui",
//   prepend: true,
// });
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#42a5f5",
//     },
//     secondary: {
//       main: "#ab47bc",
//     },
//     error: {
//       main: "#d32f2f",
//     },
//     success: {
//       main: '#388e3c',
//     },

//   },
// });

const ServersComponent = (get) => {
  const classes = useStyles();
  const navigate = useNavigate();
  // here I set the them
  // const getMuiTheme = () =>
  //   createTheme({
  //     overrides: {
  //       MUIDataTableSelectCell: {
  //         headerCell: {
  //           backgroundColor: "blue",
  //         },
  //         MUIDataTableBodyCell: {
  //           root: {
  //             backgroundColor: "#FFF",
  //             width: "200px",
  //           },
  //         },
  //       },
  //     },
  //   });


  // const getMuiTheme = () => createTheme({
  //   components: {
  //     MuiTableCell: {
  //       head: {
  //           backgroundColor: "red !important"
  //       }
  //   }
  //   }
  // })


  
  const  Cpu_model = [
    { label: "Naples" ,id:"Naples" },
    { label: "Rome", id:"Rome" },
    { label: "Milan", id:"Milan" },
    { label: "Genoa", id:"Genoa" },
    { label: "Milan X" , id:"Milan"},
    { label: "Burgamo " ,id:"Burgamo"},
  ];
  const CPU_Socket = [{ label: "1" }, { label: "2" }, { label: "3" }];
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
    { label: "1 GB " },
    { label: "10 GB" },
    { label: "25 GB" },
    { label: "100 GB" },
  ];

  const user = useAuth();

  let userDetailsArr = [];
  const label = userDetailsArr.label;
 //console.log(label, "label");
  let historicDetailsArr = [];
  // let userObj;

  let columns;
  let poolColumns;

  if (user.Role == "user") {
    columns = [
      {
        
        name: "Sl no",
        label: "Sl.No",
        options: {
          filter: false,
          sort: true,
          download: false,
          customBodyRender: (value, tableMeta, update) => {
            let rowIndex = Number(tableMeta.rowIndex) + 1;
            return <span>{rowIndex}</span>;
          },
        },

      },

      {
        name: "Asset_Id",
        label: "Asset ID",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Asset_Name",
        label: "Server Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Server_Serial",
        label: "Server Serial",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Server_Model",
        label: "Server Model",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Manufacturer",
        label: "Manufacturer",
        options: {
          display: false,
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Owner",
        label: "Owner",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Category",
        label: "Category",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Still_needed",
        label: "Still Needed",
        options: {
          filter: true,
          sort: true,
          display: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log(value);
            if (value === true) {
              return (
                <>
                  <div className="activeClass">
                    <span>True</span>
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div className="inactiveClass">
                    <span>False</span>
                  </div>
                </>
              );
            }
          },
        },
      },
      {
        name: "Current_Project",
        label: "Current Project",
        options: {
          filter: true,
          display: false,
          sort: true,
        },
      },
      {
        name: "Notes",
        label: "Notes",
        options: {
          display: false,
          filter: true,
          sort: true,
        },
      },
      {
        name: "Previous_Project",
        label: "Previous Project",

        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "BOM",
        label: "BOM",

        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Support_case",
        label: "Support Case",
        options: {
          filter: true,
          display: false,
          sort: true,
        },
      },
      {
        name: "Cluster_Id",
        label: "Cluster ID",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Asset_location",
        label: "Location",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, "tableMeta asset location");");");
            return (
              <>
                <Tooltip 
                  title={
                    <div >
                      <p>Lab: {tableMeta.rowData[16]}</p>
                      <hr />
                      <p>Row: {tableMeta.rowData[17]}</p>
                      <hr />
                      <p>Rack: {tableMeta.rowData[18]}</p>
                      <hr />
                      <p>RU: {tableMeta.rowData[19]}</p>
                      <hr />
                      <p>DC Status: {tableMeta.rowData[20]}</p>
                    </div>
                  }
                  className="tootltipHover"
                  arrow
                >
                  <span className="infoHover">{value}</span>
                </Tooltip>
              </>
            );
          },
        },
      },
      {
        name: "Lab",
        label: "Lab",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Row",
        label: "Row",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Rack",
        label: "Rack",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "RU",
        label: "RU",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "DC_status",
        label: "DC Status",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Cpu_model",
        label: "CPU Model",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, "tableMeta asset location");");");
            return (
              <>
                <Tooltip
                  title={
                    <div>
                      <p>PDU IP: {tableMeta.rowData[24]}</p>
                      <hr />
                      <p>PDU User: {tableMeta.rowData[25]}</p>
                      <hr />
                      <p>BMC IP: {tableMeta.rowData[26]}</p>
                      <hr />
                      <p>BMC User: {tableMeta.rowData[27]}</p>
                      <hr />
                      <p>BMC FQDN: {tableMeta.rowData[28]}</p>
                      <hr />
                      <p>Operating System: {tableMeta.rowData[29]}</p>
                      <hr />
                      <p>OS IP: {tableMeta.rowData[30]}</p>
                      <hr />
                      <p>OS User: {tableMeta.rowData[31]}</p>
                    </div>
                  }
                  className="tootltipHover"
                  arrow
                >
                  <span className="infoHover">{value}</span>
                </Tooltip>
              </>
            );
          },
        },
      },
      {
        name: "Generation",
        label: "Generation",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },

      {
        name: "CPU_Sockets",
        label: "CPU Sockets",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "PDU_IP",
        label: "PDU IP",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "PDU_User",
        label: "PDU User",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "BMC_IP",
        label: "BMC IP",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "BMC_User",
        label: "BMC User",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "BMC_FQDN",
        label: "BMC FQDN",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },

      {
        name: "Operating_System",
        label: "Operating System",
        options: {
          filter: true,
          sort: true,
          display: false,
        },

      },
      {
        name: "OS_IP",
        label: "OS IP",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "OS_User",
        label: "OS User",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },


      {
        name: "DIMM_Size",
        label: "DIMM Size",
        options: {
          filter: true,
          sort: true,
          display: false,
        },

      },
      {
        name: "DIMM_Capacity",
        label: "DIMM Capacity",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Storage_Vendor",
        label: "Storage Vendor",
        options: {
          filter: true,
          display: false,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, "tableMeta asset location");");");
            return (
              <>
                <Tooltip
                  title={
                    <div>
                      <p>DIMM Size: {tableMeta.rowData[32]}</p>
                      <hr />
                      <p>DIMM Capacity: {tableMeta.rowData[33]}</p>
                      <hr />
                      <p>Storage Controller: {tableMeta.rowData[35]}</p>
                      <hr />
                      <p>Storage Capacity: {tableMeta.rowData[36]}</p>
                    </div>
                  }
                  className="tootltipHover"
                  arrow
                >
                  <span className="infoHover">{value}</span>
                </Tooltip>
              </>
            );
          },
        },
      },
      {
        name: "Storage_Controller",
        label: "Storage Controller",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Storage_Capacity",
        label: "Storage Capacity",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Network_Type",
        label: "Network Type",
        options: {
          filter: true,
          display: false,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, "tableMeta asset location");");");
            if (value === true) {
              return (
                <>
                  <Tooltip
                    title={
                      <div>
                        <p>Network Speed: {tableMeta.rowData[38]}</p>
                        <hr />
                        <p>No. Of Network Ports: {tableMeta.rowData[39]}</p>
                        <hr />
                        <p>Special Switching Needs: {tableMeta.rowData[40]}</p>
                      </div>
                    }
                    className="tootltipHover"
                    arrow
                  >
                    <div className="activeClass">
                      <span className="infoHover">Public</span>
                    </div>
                  </Tooltip>
                </>
              );
            } else {
              return (
                <>
                  <Tooltip
                    title={
                      <div>
                        <p>Network Speed: {tableMeta.rowData[38]}</p>
                        <hr />
                        <p>No. Of Network Ports: {tableMeta.rowData[39]}</p>
                        <hr />
                        <p>Special Switching Needs: {tableMeta.rowData[40]}</p>
                      </div>
                    }
                    className="tootltipHover"
                    arrow
                  >
                    <div className="inactiveClass">
                      <span className="infoHover">Private</span>
                    </div>
                  </Tooltip>
                </>
              );
            }
          },
        },
      },
      {
        name: "Network_speed",
        label: "Network Speed",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Number_Of_Network_Ports",
        label: "No. Of Network Ports",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Special_Switching_Needs",
        label: "Special Switching Needs",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Required_Start_Date",
        label: "Required Start Date",
        options: {
          filter: true,
          display: false,
          sort: true,
        },
      },
      {
        name: "Required_Finish_Date",
        label: "Required End Date",
        options: {
          filter: true,
          display: false,
          sort: true,
        },
      },
      {
        name: "Purpose",
        label: "Purpose",
        options: {
          filter: true,
          display: false,
          sort: true,
        },
      },
      {
        name: "Assigned_by",
        label: "Assigned By",
        options: {
          filter: true,
          display: false,
          sort: true,
        },
      },
      {
        name: "Assigned_to",
        label: "Assigned To",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Assigned_from",
        label: "Assigned On",
        display: false,
        options: {
          customBodyRender: (value, tableMeta, update) => {
            return <span>{value.slice(0, 10)}</span>;
          },
          filter: true,
          sort: true,
        },
      },
      {
        name: "Updated_on",
        label: "Updated On",
        options: {
          display: false,
          customBodyRender: (value, tableMeta, update) => {
            return <span>{value.slice(0, 10)}</span>;
          },
          filter: true,
          sort: true,
        },
      },
      {
        name: "Updated_by",
        label: "Updated By",
        options: {
          display: false,
          filter: true,
          sort: true,
        },
      },
      {
        name: "Created_on",
        label: "Created On",
        options: {
          display: false,
          customBodyRender: (value, tableMeta, update) => {
            return <span>{value.slice(0, 10)}</span>;
          },
          filter: true,
          sort: true,
        },
      },
      {
        name: "Created_by",
        label: "Created By",
        options: {
          display: false,
          filter: true,
          sort: true,
        },
      },

      {
        name: "Actions",
        label: "Actions",
        options: {
          customBodyRender: (value, tableMeta,rowData, updateValue) => {
            
            return (
              <>
                <div className="reserverflexicons">
                <Tooltip ><Button  variant="contained"
                 onClick={() =>handlePowerStatus(tableMeta.rowData[52],tableMeta.rowData[1])}
                >{tableMeta.rowData[52] ? "ON" : "OFF" }
                </Button></Tooltip>
                
                  {/* <Tooltip >
                  <Switch
                
            checked={tableMeta.rowData[52]}
            onClick={() => onFuntion(tableMeta.rowData[1],tableMeta?.rowData[52])}


          />
                  </Tooltip> */}
                  {/* <Tooltip title="switch" slot:item={ item }>
                  <Switch
            checked={item.Power_Status}
            // onChange={handleChange(tableMeta.rowData)}
          />
          </Tooltip> */}
                  <Tooltip id="release" title="Release Server">
                    <a
                    id="reservericon"
                      className="reservericon"
                      onClick={() => releaseBtnDiv(tableMeta.rowData[1])}
                      color="primary"
                    >
                      <ArrowBackOutlinedIcon id="release_btn" />
                    </a>
                  </Tooltip>


                  <Tooltip id="platform" title="Platform Profiler">
                    <a
                    id="platformicon"
                      onClick={() => platformFn(tableMeta.rowData[0])}
                      color="primary"
                      className="platformicon"
                    >
                      <RoomPreferencesIcon id="platform_btn" />
                    </a>
                  </Tooltip>
                  <Tooltip id="history" title="Historic Details">
                    <a
                    id="historicicon"
                      onClick={() => historic(tableMeta.rowData[1])}
                      // onClick={() => console.log("first", tableMeta.rowData[1])}
                      color="primary"
                      className="platformicon"
                    >
                      <HistoryOutlinedIcon id="history_btn" />
                    </a>
                  </Tooltip>
                  <Tooltip id="more" title="more">
                    <a
                    id="more_option"
                      className="moreicon"
                      onClick={() => moreData(tableMeta.rowData)}
                      color="primary"
                    >
                      <Visibility id="more_btn" />
                    </a>
                  </Tooltip>

                  {/* <Tooltip title={
                  <div>
                    <p>Server Serial: {tableMeta.rowData[3]}</p>
                    <hr />
                    <p>Manufacturer: {tableMeta.rowData[5]}</p>
                    <hr />
                    <p>Still Needed: {tableMeta.rowData[8]}</p>
                    <hr />
                    <p>Notes: {tableMeta.rowData[10]}</p>
                    <hr />
                    <p>Previous Project: {tableMeta.rowData[11]}</p>
                    <hr />
                    <p>BOM: {tableMeta.rowData[12]}</p>
                    <hr />
                    <p>Support Case: {tableMeta.rowData[13]}</p> 
                    <hr />
                    <p>Cluster Id: {tableMeta.rowData[14]}</p>
                    <hr />
                    <p>Generation: {tableMeta.rowData[22]}</p>
                    <hr />
                    <p>CPU Sockets: {tableMeta.rowData[23]}</p>
                    
                  </div>
                  
                  }
                  className="tootltipHover"
                  arrow
                  >
                    <span 
                  className="moreicon"
                  ><MoreVertSharpIcon /></span>
                  </Tooltip> */}
                </div>
              </>
            );
          },
          sort: true,
          download: false,
        },
      },
      {
        name: "Power_Status",
        label: "Power Status",
        options: {
          display: false,
          filter: true,
          sort: true,
        },
      },
    ];

    poolColumns = [
      {
        name: "Sl no",
        label: "Sl.No",
        options: {
          filter: false,
          sort: true,
          download: false,
          customBodyRender: (value, tableMeta, update) => {
            let rowIndex = Number(tableMeta.rowIndex) + 1;
            return <span>{rowIndex}</span>;
          },
        },
      },

      {
        name: "Asset_Id",
        label: "Asset ID",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Asset_Name",
        label: "Server Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Server_Serial",
        label: "Server Serial",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Server_Model",
        label: "Server Model",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Manufacturer",
        label: "Manufacturer",
        options: {
          filter: true,

          sort: true,
          display: false,
        },
      },
      {
        name: "Owner",
        label: "Owner",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Category",
        label: "Category",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Still_needed",
        label: "Still Needed",
        options: {
          filter: true,
          sort: true,
          display: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log(value);
            if (value === true) {
              return (
                <>
                  <div className="activeClass">
                    <span>True</span>
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div className="inactiveClass">
                    <span>False</span>
                  </div>
                </>
              );
            }
          },
        },
      },
      {
        name: "Current_Project",
        label: "Current Project",
        options: {
          filter: true,
          display: false,
          sort: true,
        },
      },
      {
        name: "Notes",
        label: "Notes",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Previous_Project",
        label: "Previous Project",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "BOM",
        label: "BOM",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Support_case",
        label: "Support Case",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Cluster_Id",
        label: "Cluster ID",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Asset_location",
        label: "Location",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, "tableMeta asset location");");");
            return (
              <>
                <Tooltip
                  title={
                    <div>
                      <p>Lab: {tableMeta.rowData[16]}</p>
                      <hr />
                      <p>Row: {tableMeta.rowData[17]}</p>
                      <hr />
                      <p>Rack: {tableMeta.rowData[18]}</p>
                      <hr />
                      <p>RU: {tableMeta.rowData[19]}</p>
                      <hr />
                      <p>DC Status: {tableMeta.rowData[20]}</p>
                    </div>
                  }
                  className="tootltipHover"
                  arrow
                >
                  <span className="infoHover">{value}</span>
                </Tooltip>
              </>
            );
          },
        },
      },
      {
        name: "Lab",
        label: "Lab",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Row",
        label: "Row",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Rack",
        label: "Rack",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "RU",
        label: "RU",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "DC_status",
        label: "DC Status",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Cpu_model",
        label: "CPU Model",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, "tableMeta asset location");");");
            return (
              <>
                <Tooltip
                  title={
                    <div>
                      <p>PDU IP: {tableMeta.rowData[24]}</p>
                      <hr />
                      <p>PDU User: {tableMeta.rowData[25]}</p>
                      <hr />
                      <p>BMC IP: {tableMeta.rowData[26]}</p>
                      <hr />
                      <p>BMC User: {tableMeta.rowData[27]}</p>
                      <hr />
                      <p>BMC FQDN: {tableMeta.rowData[28]}</p>
                      <hr />
                      <p>Operating System: {tableMeta.rowData[29]}</p>
                      <hr />
                      <p>OS IP: {tableMeta.rowData[30]}</p>
                      <hr />
                      <p>OS User: {tableMeta.rowData[31]}</p>
                    </div>
                  }
                  className="tootltipHover"
                  arrow
                >
                  <span className="infoHover">{value}</span>
                </Tooltip>
              </>
            );
          },
        },
      },
      {
        name: "Generation",
        label: "Generation",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },

      {
        name: "CPU_Sockets",
        label: "CPU Sockets",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "PDU_IP",
        label: "PDU IP",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "PDU_User",
        label: "PDU User",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "BMC_IP",
        label: "BMC IP",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "BMC_User",
        label: "BMC User",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "BMC_FQDN",
        label: "BMC FQDN",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Operating_System",
        label: "Operating System",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "OS_IP",
        label: "OS IP",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "OS_User",
        label: "OS User",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },

      {
        name: "DIMM_Size",
        label: "DIMM Size",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "DIMM_Capacity",
        label: "DIMM Capacity",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Storage_Vendor",
        label: "Storage Vendor",
        options: {
          display: false,
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, "tableMeta asset location");");");
            return (
              <>
                <Tooltip
                  title={
                    <div>
                      <p>DIMM Size: {tableMeta.rowData[32]}</p>
                      <hr />
                      <p>DIMM Capacity: {tableMeta.rowData[33]}</p>
                      <hr />
                      <p>Storage Controller: {tableMeta.rowData[35]}</p>
                      <hr />
                      <p>Storage Capacity: {tableMeta.rowData[36]}</p>
                    </div>
                  }
                  className="tootltipHover"
                  arrow
                >
                  <span className="infoHover">{value}</span>
                </Tooltip>
              </>
            );
          },
        },
      },
      {
        name: "Storage_Controller",
        label: "Storage Controller",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Storage_Capacity",
        label: "Storage Capacity",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Network_Type",
        label: "Network Type",
        options: {
          filter: true,
          display: false,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, "tableMeta asset location");");");
            if (value === true) {
              return (
                <>
                  <Tooltip
                    title={
                      <div>
                        <p>Network Speed: {tableMeta.rowData[38]}</p>
                        <hr />
                        <p>No. Of Network Ports: {tableMeta.rowData[39]}</p>
                        <hr />
                        <p>Special Switching Needs: {tableMeta.rowData[40]}</p>
                      </div>
                    }
                    className="tootltipHover"
                    arrow
                  >
                    <div className="activeClass">
                      <span className="infoHover">Public</span>
                    </div>
                  </Tooltip>
                </>
              );
            } else {
              return (
                <>
                  <Tooltip
                    title={
                      <div>
                        <p>Network Speed: {tableMeta.rowData[38]}</p>
                        <hr />
                        <p>No. Of Network Ports: {tableMeta.rowData[39]}</p>
                        <hr />
                        <p>Special Switching Needs: {tableMeta.rowData[40]}</p>
                      </div>
                    }
                    className="tootltipHover"
                    arrow
                  >
                    <div className="inactiveClass">
                      <span className="infoHover">Private</span>
                    </div>
                  </Tooltip>
                </>
              );
            }
          },
        },
      },
      {
        name: "Network_speed",
        label: "Network Speed",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Number_Of_Network_Ports",
        label: "No. Of Network Ports",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Special_Switching_Needs",
        label: "Special Switching Needs",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Required_Start_Date",
        label: "Required Start Date",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Required_Finish_Date",
        label: "Required End Date",
        options: {
          filter: true,
          display: false,
          sort: true,
        },
      },
      {
        name: "Purpose",
        label: "Purpose",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Created_on",
        label: "Created On",
        options: {
          display: false,
          customBodyRender: (value, tableMeta, update) => {
            return <span>{value.slice(0, 10)}</span>;
          },
          filter: true,
          sort: true,
        },
      },
      {
        name: "Created_by",
        label: "Created By",
        options: {
          display: false,
          filter: true,
          sort: true,
        },
      },
      {
        name: "Actions",
        label: "Actions",
        options: {
          download: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
                <div className="reserverflexicons">
                  <Tooltip id="reserve1" title="Reserve Server">
                    <a
                    id="reserveicon"
                      className="reservericon"
                      onClick={() => userServerAssign(tableMeta.rowData[1])}
                      color="primary"
                    >
                      <DnsIcon id="reserve_btn1" />
                    </a>
                  </Tooltip>


                  <Tooltip id="platform Profiler1" title="Platform Profiler">
                    <a
                    id="platform_icon"
                      onClick={() => platformFn(tableMeta.rowData[0])}
                      color="primary"
                      className="platformicon1"
                    >
                      <RoomPreferencesIcon id="platform_btn" />
                    </a>
                  </Tooltip>


                  <Tooltip id="more1" title="more">
                    <a
                    id="more_icon"
                      className="moreicon"
                      onClick={() => moreData(tableMeta.rowData)}
                      color="primary"
                    >
                      <Visibility id="more_btn1" />
                    </a>
                  </Tooltip>
                  {/* <Tooltip title={
                  <div>
                    <p>Server Serial: {tableMeta.rowData[3]}</p>
                    <hr />
                    <p>Manufacturer: {tableMeta.rowData[5]}</p>
                    <hr />
                    <p>Still Needed: {tableMeta.rowData[8]}</p>
                    <hr />
                    <p>Notes: {tableMeta.rowData[10]}</p>
                    <hr />
                    <p>Previous Project: {tableMeta.rowData[11]}</p>
                    <hr />
                    <p>BOM: {tableMeta.rowData[12]}</p>
                    <hr />
                    <p>Support Case: {tableMeta.rowData[13]}</p>
                    <hr />
                    <p>Cluster Id: {tableMeta.rowData[14]}</p>
                    <hr />
                    <p>Generation: {tableMeta.rowData[22]}</p>
                    <hr />
                    <p>CPU Sockets: {tableMeta.rowData[23]}</p>
                    
                  </div>
                  
                  }
                  className="tootltipHover"
                  arrow
                  >
                    <span 
                  className="moreicon"
                  ><MoreVertSharpIcon /></span>
                  </Tooltip> */}
                </div>
              </>
            );
          },
        },
      },
    ];
  } else {
    columns = [
      {
        name: "Sl no",
        label: "Sl.No",
        options: {
          filter: false,
          sort: true,
          download: false,
          customBodyRender: (value, tableMeta, update) => {
            let rowIndex = Number(tableMeta.rowIndex) + 1;
            return <span>{rowIndex}</span>;
          },
        },
      },

      {
        name: "Asset_Id",
        label: "Asset ID",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Asset_Name",
        label: "Server Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Server_Serial",
        label: "Server Serial",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Server_Model",
        label: "Server Model",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Manufacturer",
        label: "Manufacturer",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Owner",
        label: "Owner",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Category",
        label: "Category",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Still_needed",
        label: "Still Needed",
        options: {
          filter: true,
          sort: true,
          display: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            if (value === true) {
              return (
                <>
                  <div className="activeClass">
                    <span>True</span>
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div className="inactiveClass">
                    <span>False</span>
                  </div>
                </>
              );
            }
          },
        },
      },
      {
        name: "Current_Project",
        label: "Current Project",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Notes",
        label: "Notes",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Previous_Project",
        label: "Previous Project",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "BOM",
        label: "BOM",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Support_case",
        label: "Support Case",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Cluster_Id",
        label: "Cluster ID",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Asset_location",
        label: "Location",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, "tableMeta asset location");");");
            return (
              <>
                <Tooltip
                  title={
                    <div>
                      <p>Lab: {tableMeta.rowData[16]}</p>
                      <hr />
                      <p>Row: {tableMeta.rowData[17]}</p>
                      <hr />
                      <p>Rack: {tableMeta.rowData[18]}</p>
                      <hr />
                      <p>RU: {tableMeta.rowData[19]}</p>
                      <hr />
                      <p>DC Status: {tableMeta.rowData[20]}</p>
                    </div>
                  }
                  className="tootltipHover"
                  arrow
                >
                  <span className="infoHover">{value}</span>
                </Tooltip>
              </>
            );
          },
        },
      },
      {
        name: "Lab",
        label: "Lab",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Row",
        label: "Row",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Rack",
        label: "Rack",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "RU",
        label: "RU",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "DC_status",
        label: "DC Status",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Cpu_model",
        label: "CPU Model",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, "tableMeta asset location");");");
            return (
              <>
                <Tooltip
                  title={
                    <div>
                      <p>PDU IP: {tableMeta.rowData[24]}</p>
                      <hr />
                      <p>PDU User: {tableMeta.rowData[25]}</p>
                      <hr />
                      <p>BMC IP: {tableMeta.rowData[26]}</p>
                      <hr />
                      <p>BMC User: {tableMeta.rowData[27]}</p>
                      <hr />
                      <p>BMC FQDN: {tableMeta.rowData[28]}</p>
                      <hr />
                      <p>Operating System: {tableMeta.rowData[29]}</p>
                      <hr />
                      <p>OS IP: {tableMeta.rowData[30]}</p>
                      <hr />
                      <p>OS User: {tableMeta.rowData[31]}</p>
                    </div>
                  }
                  className="tootltipHover"
                  arrow
                >
                  <span className="infoHover">{value}</span>
                </Tooltip>
              </>
            );
          },
        },
      },
      {
        name: "Generation",
        label: "Generation",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },

      {
        name: "CPU_Sockets",
        label: "CPU Sockets",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "PDU_IP",
        label: "PDU IP",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "PDU_User",
        label: "PDU User",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "BMC_IP",
        label: "BMC IP",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "BMC_User",
        label: "BMC User",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "BMC_FQDN",
        label: "BMC FQDN",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Operating_System",
        label: "Operating System",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "OS_IP",
        label: "OS IP",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "OS_User",
        label: "OS User",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },

      {
        name: "DIMM_Size",
        label: "DIMM Size",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "DIMM_Capacity",
        label: "DIMM Capacity",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Storage_Vendor",
        label: "Storage Vendor",
        options: {
          filter: true,
          sort: true,
          display: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, "tableMeta asset location");");");
            return (
              <>
                <Tooltip
                  title={
                    <div>
                      <p>DIMM Size: {tableMeta.rowData[32]}</p>
                      <hr />
                      <p>DIMM Capacity: {tableMeta.rowData[33]}</p>
                      <hr />
                      <p>Storage Controller: {tableMeta.rowData[35]}</p>
                      <hr />
                      <p>Storage Capacity: {tableMeta.rowData[36]}</p>
                    </div>
                  }
                  className="tootltipHover"
                  arrow
                >
                  <span className="infoHover">{value}</span>
                </Tooltip>
              </>
            );
          },
        },
      },
      {
        name: "Storage_Controller",
        label: "Storage Controller",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Storage_Capacity",
        label: "Storage Capacity",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Network_Type",
        label: "Network Type",
        options: {
          filter: true,
          sort: true,
          display: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, "tableMeta asset location");");");
            if (value === true) {
              return (
                <>
                  <Tooltip
                    title={
                      <div>
                        <p>Network Speed: {tableMeta.rowData[38]}</p>
                        <hr />
                        <p>No. Of Network Ports: {tableMeta.rowData[39]}</p>
                        <hr />
                        <p>Special Switching Needs: {tableMeta.rowData[40]}</p>
                      </div>
                    }F
                    className="tootltipHover"
                    arrow
                  >
                    <div className="activeClass">
                      <span className="infoHover">Public</span>
                    </div>
                  </Tooltip>
                </>
              );
            } else {
              return (
                <>
                  <Tooltip
                    title={
                      <div>
                        <p>Network Speed: {tableMeta.rowData[38]}</p>
                        <hr />
                        <p>No. Of Network Ports: {tableMeta.rowData[39]}</p>
                        <hr />
                        <p>Special Switching Needs: {tableMeta.rowData[40]}</p>
                      </div>
                    }
                    className="tootltipHover"
                    arrow
                  >
                    <div className="inactiveClass">
                      <span className="infoHover">Private</span>
                    </div>
                  </Tooltip>
                </>
              );
            }
          },
        },
      },
      {
        name: "Network_speed",
        label: "Network Speed",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Number_Of_Network_Ports",
        label: "No. Of Network Ports",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Special_Switching_Needs",
        label: "Special Switching Needs",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Required_Start_Date",
        label: "Required Start Date",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Required_Finish_Date",
        label: "Required End Date",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Purpose",
        label: "Purpose",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Created_on",
        label: "Created On",
        options: {
          customBodyRender: (value, tableMeta, update) => {
            return <span>{value.slice(0, 10)}</span>;
          },
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Created_by",
        label: "Created By",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Assigned_by",
        label: "Assigned By",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Assigned_to",
        label: "Assigned To",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Assigned_from",
        label: "Assigned On",
        options: {
          customBodyRender: (value, tableMeta, update) => {
            return <span>{value.slice(0, 10)}</span>;
          },
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Updated_on",
        label: "Updated On",
        options: {
          customBodyRender: (value, tableMeta, update) => {
            return <span>{value.slice(0, 10)}</span>;
          },
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Updated_by",
        label: "Updated By",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Actions",
        label: "Actions",
        options: {
          customBodyRender: (value, tableMeta,rowData, updateValue) => {
            return (
              <>
                <div className="reserverflexicons">
                <Tooltip ><Button  variant="contained"
                 onClick={() =>handlePowerStatus(tableMeta.rowData[55],tableMeta.rowData[1])}
                >{tableMeta.rowData[55] ? "ON" : "OFF" }
                </Button></Tooltip>
                {/* <Tooltip title="switch"> 
                  
                  <Switch
                  checked={tableMeta.rowData[55]}
                  onClick={() => onFuntion(tableMeta.rowData[1],tableMeta?.rowData[55])}  
            // onChange={handleChange(tableMeta.rowData)}
            // onClick={()=>lightoff(tableMeta.rowData)}
          />
          
          </Tooltip> */}
                  <Tooltip id="release2" title="Release Server">
                    <a
                    id="reserveicon2"
                      className="reservericon"
                      onClick={() => releaseBtnDiv(tableMeta.rowData[1])}
                      color="primary"
                    >
                      <ArrowBackOutlinedIcon id="release_btn" />
                    </a>
                  </Tooltip>

                  <Tooltip id="edit2" title="Edit">
                    <a
                    id="editicon2"
                      className="editicon"
                      onClick={() => editableData(tableMeta.rowData)}
                      color="primary"
                    >
                      <EditIcon id="edit_btn2" />
                    </a>
                  </Tooltip>

                  <Tooltip id="delete2" title="Delete">
                    <a
                    id="deleteicon2"
                      className="deleteicon"
                      onClick={() => deleteApiFn(tableMeta.rowData[1])}
                      // onClick={() => console.log(tableMeta, "tableMeta")}
                      color="primary"
                    >
                      <DeleteIcon id="delete_btn2" />
                    </a>
                  </Tooltip>

                  <Tooltip id="platform2 " title="Platform Profiler">
                    <a
                    i="platformicon2"
                      className="platformicon"
                      onClick={() => platformFn(tableMeta.rowData[0])}
                      color="primary"
                    >
                      <RoomPreferencesIcon id="pltprobtn2" />
                    </a>
                  </Tooltip>
                  <Tooltip id="historic" title="Historic Details">
                    <a
                    id="historicicon2"
                      onClick={() => historic(tableMeta.rowData[1])}
                      // onClick={() => console.log("first", tableMeta.rowData[1])}
                      color="primary"
                      className="platformicon"
                    >
                      <HistoryOutlinedIcon id="hystbtn" />
                    </a>
                  </Tooltip>

                  <Tooltip id="more2" title="more">

                    <a

                    id="moreicon2"
                      className="moreicon"
                      onClick={() => moreData(tableMeta.rowData)}
                      color="primary"
                    >
                      <Visibility id="morebtn2" />
                    </a>
                  </Tooltip>
                  {/* <Tooltip title={
                  <div>
                    <p>Server Serial: {tableMeta.rowData[3]}</p>
                    <hr />
                    <p>Manufacturer: {tableMeta.rowData[5]}</p>
                    <hr />
                    <p>Still Needed: {tableMeta.rowData[8]}</p>
                    <hr />
                    <p>Notes: {tableMeta.rowData[10]}</p>
                    <hr />
                    <p>Previous Project: {tableMeta.rowData[11]}</p>
                    <hr />
                    <p>BOM: {tableMeta.rowData[12]}</p>
                    <hr />
                    <p>Support Case: {tableMeta.rowData[13]}</p>
                    <hr />
                    <p>Cluster Id: {tableMeta.rowData[14]}</p>
                    <hr />
                    <p>Generation: {tableMeta.rowData[22]}</p>
                    <hr />
                    <p>CPU Sockets: {tableMeta.rowData[23]}</p>
                    
                  </div>
                  
                  }
                  className="tootltipHover"
                  arrow
                  >
                    <span 
                  className="moreicon"
                  ><MoreVertSharpIcon /></span>
                  </Tooltip> */}
                </div>
              </>
            );
          },
          sort: true,
          download: false,
        },
      },
      {
        name: "BMC_Password",
        label: "BMC Password",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "OS_Password",
        label: "OS Password",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "PDU_Password",
        label: "PDU Password",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Power_Status",
        label: "Power Status",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
    ];

    poolColumns = [
      {
        name: "Sl no",
        label: "Sl.No",
        options: {
          filter: false,
          sort: true,
          download: false,
          customBodyRender: (value, tableMeta, update) => {
            let rowIndex = Number(tableMeta.rowIndex) + 1;
            return <span>{rowIndex}</span>;
          },
        },
      },

      {
        name: "Asset_Id",
        label: "Asset ID",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Asset_Name",
        label: "Server Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Server_Serial",
        label: "Server Serial",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Server_Model",
        label: "Server Model",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Manufacturer",
        label: "Manufacturer",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Owner",
        label: "Owner",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Category",
        label: "Category",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Still_needed",
        label: "Still Needed",
        options: {
          filter: true,
          sort: true,
          display: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log(value);
            if (value === true) {
              return (
                <>
                  <div className="activeClass">
                    <span>True</span>
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div className="inactiveClass">
                    <span>False</span>
                  </div>
                </>
              );
            }
          },
        },
      },
      {
        name: "Current_Project",
        label: "Current Project",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Notes",
        label: "Notes",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Previous_Project",
        label: "Previous Project",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "BOM",
        label: "BOM",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Support_case",
        label: "Support Case",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Cluster_Id",
        label: "Cluster ID",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Asset_location",
        label: "Location",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
                <Tooltip
                  title={
                    <div>
                      <p>Lab: {tableMeta.rowData[16]}</p>
                      <hr />
                      <p>Row: {tableMeta.rowData[17]}</p>
                      <hr />
                      <p>Rack: {tableMeta.rowData[18]}</p>
                      <hr />
                      <p>RU: {tableMeta.rowData[19]}</p>
                      <hr />
                      <p>DC Status: {tableMeta.rowData[20]}</p>
                    </div>
                  }
                  className="tootltipHover"
                  arrow
                >
                  <span className="infoHover">{value}</span>
                </Tooltip>
              </>
            );
          },
        },
      },
      {
        name: "Lab",
        label: "Lab",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Row",
        label: "Row",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Rack",
        label: "Rack",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "RU",
        label: "RU",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "DC_status",
        label: "DC Status",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Cpu_model",
        label: "CPU Model",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, "tableMeta asset location");");");
            return (
              <>
                <Tooltip
                  title={
                    <div>
                      <p>PDU IP: {tableMeta.rowData[24]}</p>
                      <hr />
                      <p>PDU User: {tableMeta.rowData[25]}</p>
                      <hr />
                      <p>BMC IP: {tableMeta.rowData[26]}</p>
                      <hr />
                      <p>BMC User: {tableMeta.rowData[27]}</p>
                      <hr />
                      <p>BMC FQDN: {tableMeta.rowData[28]}</p>
                      <hr />
                      <p>Operating System: {tableMeta.rowData[29]}</p>
                      <hr />
                      <p>OS IP: {tableMeta.rowData[30]}</p>
                      <hr />
                      <p>OS User: {tableMeta.rowData[31]}</p>
                    </div>
                  }
                  className="tootltipHover"
                  arrow
                >
                  <span className="infoHover">{value}</span>
                </Tooltip>
              </>
            );
          },
        },
      },
      {
        name: "Generation",
        label: "Generation",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },

      {
        name: "CPU_Sockets",
        label: "CPU Sockets",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "PDU_IP",
        label: "PDU IP",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "PDU_User",
        label: "PDU User",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "BMC_IP",
        label: "BMC IP",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "BMC_User",
        label: "BMC User",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "BMC_FQDN",
        label: "BMC FQDN",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Operating_System",
        label: "Operating System",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "OS_IP",
        label: "OS IP",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "OS_User",
        label: "OS User",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },

      {
        name: "DIMM_Size",
        label: "DIMM Size",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "DIMM_Capacity",
        label: "DIMM Capacity",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Storage_Vendor",
        label: "Storage Vendor",
        options: {
          filter: true,
          sort: true,
          display: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, "tableMeta asset location");");");
            return (
              <>
                <Tooltip
                  title={
                    <div>
                      <p>DIMM Size: {tableMeta.rowData[32]}</p>
                      <hr />
                      <p>DIMM Capacity: {tableMeta.rowData[33]}</p>
                      <hr />
                      <p>Storage Controller: {tableMeta.rowData[35]}</p>
                      <hr />
                      <p>Storage Capacity: {tableMeta.rowData[36]}</p>
                    </div>
                  }
                  className="tootltipHover"
                  arrow
                >
                  <span className="infoHover">
                    {value}
                    {/* <InfoSharpIcon
                  // fontSize="small"
                  // color="primary"
                  />  */}
                  </span>
                </Tooltip>
              </>
            );
          },
        },
      },
      {
        name: "Storage_Controller",
        label: "Storage Controller",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Storage_Capacity",
        label: "Storage Capacity",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Network_Type",
        label: "Network Type",
        options: {
          filter: true,
          sort: true,
          display: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, " //console.log(tableMeta.rowData, "tableMeta asset location");");")
            if (value === true) {
              return (
                <>
                  <Tooltip
                    title={
                      <div>
                        <p>Network Speed: {tableMeta.rowData[38]}</p>
                        <hr />
                        <p>No. Of Network Ports: {tableMeta.rowData[39]}</p>
                        <hr />
                        <p>Special Switching Needs: {tableMeta.rowData[40]}</p>
                      </div>
                    }
                    className="tootltipHover"
                    arrow
                  >
                    <div className="activeClass">
                      <span className="infoHover">Public</span>
                    </div>
                  </Tooltip>
                </>
              );
            } else {
              return (
                <>
                  <Tooltip 
                    title={
                      <div>
                        <p>Network Speed: {tableMeta.rowData[38]}</p>
                        <hr />
                        <p>No. Of Network Ports: {tableMeta.rowData[39]}</p>
                        <hr />
                        <p>Special Switching Needs: {tableMeta.rowData[40]}</p>
                      </div>
                    }
                    className="tootltipHover"
                    arrow
                  >
                    <div className="inactiveClass">
                      <span className="infoHover">Private</span>
                    </div>
                  </Tooltip>
                </>
              );
            }
          },
        },
      },
      {
        name: "Network_speed",
        label: "Network Speed",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Number_Of_Network_Ports",
        label: "No. Of Network Ports",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Special_Switching_Needs",
        label: "Special Switching Needs",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Required_Start_Date",
        label: "Required Start Date",
        options: {
          filter: false,
          sort: true,
          display: false,
        },
      },
      {
        name: "Required_Finish_Date",
        label: "Required End Date",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Purpose",
        label: "Purpose",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Created_on",
        label: "Created On",
        options: {
          customBodyRender: (value, tableMeta, update) => {
            return <span>{value.slice(0, 10)}</span>;
          },
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Created_by",
        label: "Created By",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "Actions",
        label: "Actions",
        options: {
          download: false,
          customBodyRender: (value, tableMeta,rowData, updateValue) => {
            return (
              <>
                <div className="reserverflexicons">
                <Tooltip ><Button  variant="contained"
                 onClick={() =>handlePowerStatus(tableMeta.rowData[50],tableMeta.rowData[1])}
                >{tableMeta.rowData[50] ? "ON" : "OFF" }
                </Button></Tooltip>
                {/* <Tooltip title="switch">
                  <Switch
            checked={tableMeta.rowData[50]}
            onClick={()=> onFuntion(tableMeta.rowData[1],tableMeta?.rowData[50])}
            // onClick={() => onFuntion(tableMeta.rowData[1],tableMeta?.rowData[52])}
            
            // onChange={handleChange(tableMeta.rowData)}
          />
          </Tooltip> */}
                  <Tooltip id="reserv3" title="Reserve Server">
                    <a
                    id="reservericon3"
                      className="reservericon"
                      onClick={() => openModelDiv(tableMeta.rowData[1])}
                      color="primary"
                    >
                      <DnsIcon id="rsrvbtn3"/>
                    </a>
                    {/* <Button
                  className="reservericon"
                    onClick={() => openModelDiv(tableMeta.rowData[1])}
                    startIcon={<DnsIcon />}
                    color="primary"
                  ></Button> */}
                  </Tooltip>

                  <Tooltip title="Edit3">
                    <a
                    id="editicon3"
                      className="editicon"
                      onClick={() => editableData(tableMeta.rowData)}
                      color="primary"
                    >
                      <EditIcon id="edit_btn3"/>
                    </a>
                  </Tooltip>

                  <Tooltip id="delete3" title="Delete">
                    <a
                    id="deleteicon3"
                      className="deleteicon"
                      onClick={() => deleteApiFn(tableMeta.rowData[1])}
                      // onClick={() => console.log(tableMeta, "tableMeta")}
                      color="primary"
                    >
                      <DeleteIcon id="deletebtn3" />
                    </a>
                  </Tooltip>

                  <Tooltip id="pltprofiler3" title="Platform Profiler">
                    <a
                    id="platformicon3"
                      className="platformicon"
                      onClick={() => platformFn(tableMeta.rowData[0])}
                      color="primary"
                    >
                      <RoomPreferencesIcon id="pltprobtn3" />
                    </a>
                  </Tooltip>
                  <Tooltip id="Historic Details3" title="Historic Details">
                    <a
                    id="historicicon3"
                      onClick={() => historic(tableMeta.rowData[1])}
                      // onClick={() => console.log("first", tableMeta.rowData[1])}
                      color="primary"
                      className="platformicon"
                    >
                      <HistoryOutlinedIcon  id="historybtn3" />
                    </a>
                  </Tooltip >
                  <Tooltip id="more3" title="more">
                    <a
                    id="moreicon3"
                      className="moreicon"
                      onClick={() => moreData(tableMeta.rowData)}
                      color="primary"
                    >
                      <Visibility id="morebtn3"/>
                    </a>
                  </Tooltip >
                  {/* <SwitchComponent/> */}
                  

                  {/* <Tooltip title={
                  <div>
                    <p>Server Serial: {tableMeta.rowData[3]}</p>
                    <hr />
                    <p>Manufacturer: {tableMeta.rowData[5]}</p>
                    <hr />
                    <p>Still Needed: {tableMeta.rowData[8]}</p>
                    <hr />
                    <p>Notes: {tableMeta.rowData[10]}</p>
                    <hr />
                    <p>Previous Project: {tableMeta.rowData[11]}</p>
                    <hr />
                    <p>BOM: {tableMeta.rowData[12]}</p>
                    <hr />
                    <p>Support Case: {tableMeta.rowData[13]}</p>
                    <hr />
                    <p>Cluster Id: {tableMeta.rowData[14]}</p>
                    <hr />
                    <p>Generation: {tableMeta.rowData[22]}</p>
                    <hr />
                    <p>CPU Sockets: {tableMeta.rowData[23]}</p>
                    
                  </div>
                  
                  }
                  className="tootltipHover"
                  arrow
                  >
                    <span 
                  className="moreicon"
                  ><MoreVertSharpIcon /></span>
                  </Tooltip> */}
                </div>
              </>
            );
          },
        },
      },
      {
        name: "BMC_Password",
        label: "BMC Password",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "OS_Password",
        label: "OS Password",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "PDU_Password",
        label: "PDU Password",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
    
      {
        name: "Power_Status",
        label: "Power Status",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },  ];
  }


  const [openPowerStatus,setOpenPowerStatus] = useState(false);
  const [powerStatus,setPowerStatus] = useState();
  const [powerStatusId,setPowerStatusId] = useState();
  const [powerOnOptions,setPowerOnOptions] = useState([
    {
      icon:<PowerSettingsNewIcon/>,
      label:"ForceOff"
    },
    {
      icon: <RestartAltIcon/>,
      label:"ForceRestart"
    },
    {
      icon: <SettingsPowerIcon/>,
      label:"GracefulShutdown"
    },
    {
      icon: <PowerSettingsNewIcon/>,
      label:"PushPowerButton"
    },
    {
      icon: <PowerSettingsNewIcon/>,
      label:"Nmi"
    }
  ]);
  const [powerOffOptions,setPowerOffOptions] = useState([
    {
      icon: <PowerSettingsNewIcon/>,
      label:"On"
    },
    {
      icon: <PowerSettingsNewIcon/>,
      label:"PushPowerButton"
    }
  ])
  const handlePowerStatus = (status,Id)=>{
    setPowerStatus(status);
    setPowerStatusId(Id);
    setOpenPowerStatus(true);
  }

  const CustomToolbar = ({ displayData }) => {
    return (
      <>
        {showServerAddBtn && (
          // <div className="addserverbtnCls">
          <Tooltip id="tooltip" title="Create Server">
            <Button
            id="btn"
              // variant="outlined"
              // className={classes.addServerBtn}
              className="addServerStyle"
              // id="addAsset"
              onClick={handleOpen}
              startIcon={<AddIcon />}
              // color="primary"
            >
              {/* Create Asset */}
            </Button>
          </Tooltip>

          // </div>
        )}
      </>
    );
  };
  const [loading, setloading] = useState(true);
  const [newpage, setnewpage] = useState(1);
  const [totalpages, settotalpages] = useState(1);
 //console.log(totalpages, "<-----wert");
  const options = {
    expandableRowsOnClick: true,
    count: totalpages,

    onChangePage: (e) => {
     //console.log(e, "<------qwqw-");
      setnewpage(e + 1);
    },
    onChangeRowsPerPage: (e) => {
     //console.log(e, "<--------ee");
      setcounting(e);
    },
    textLabels: {
      body: {
        // noMatch: " No Matching Records",
        // toolTip: "Sort",
        // columnHeaderTooltip: column => `Sort for ${column.label}`
        noMatch: loading ? (
          <PulseLoader
            // color={color}
            loading={loading}
            // cssOverride={override}
            size={25}
            // style={{
            //   position: "fixed",
            //   top: "50%",
            //   left: "50%",
            //   transform: "translate(-50%, -50%)",
            // }}
            display="flex"
            aria-label="Loading Spinner"
            data-testid="loader"
            alignItems="center"
          />
        ) : (
          "No Matching Records"
        ),
      },
    },
    filterType: "checkbox",
    print: false,
    // searchOpen: true,\
    // search: false,
    // searchAlwaysOpen: true,
    selectableRows: false,
    // pagination: true,
    rowsPerPage: [5],
    filter: false,
    // jumpToPage: true,
    // pagination: {
    //   next: "Next Page",
    //   previous: "Previous Page",
    //   rowsPerPage: "Rows per page:",
    //   displayRows: "of",
    // },
    rowHover: true,
    rowsPerPageOptions: [3, 5, 10, 15],
    rowsPerPageStyle: true,
    viewColumns: false,
    responsive: true,
    downloadOptions: {
     
      filename: "server_management_document.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
      },
    },
    // customToolbar: () => {<CustomToolbar/>},
    customToolbar: CustomToolbar,

    //   onDownload: (buildHead, buildBody, columns, data) => {
    //     return "\uFEFF" + buildHead(columns) + buildBody("Sl no");
    // }
    // onDownload: (buildHead, buildBody, columns, data) => {
    // buildHead=()=>{
    // return ["col-1", "col-2"]

    // }
    // buildBody=()=>{
    //   return [["A", "B"], ["C","D"]]
    // }
    // return "\uFEFF" + buildHead() + buildBody();

    // component.pdfReportAutoTable(
    //   columns,
    //   data
    //   );
    //   return false;
    // return buildHead("SL.NO") + buildBody(data);
    // let desiredColumns = [columns[0].label,columns[1].label,columns[2].label]
    // console.log(buildHead, "columns");
    // console.log(buildBody, "columns");
    // console.log(columns, "columns");
    // console.log(desiredColumns, "desiredColumns");
    // console.log(data, "data");
    // return "\uFEFF" + buildHead(columns) + buildBody(data);

    // }
    // resizableColumns: true,
    // setCellHeaderProps: () => ({ style: { maxHeight: "30px" } }),
    // setCellProps: () => ({ style: { minWidth: "200px" } }),
    // setCellProps: () => ({ style: { minWidth: "200px", maxWidth: "800px" } }),
    // customBodyRender: (data, type, row) => {
    //   return <pre>{data}</pre>;
    // },
    // setCellProps: () => {
    //   return { align: "right" };
    // },
    // setCellHeaderProps: () => ({ align: "center" }),
    // setCellHeaderProps: () => ({
    //   style: {
    //     display: "flex",
    //     justifyContent: "right",
    //     flexDirection: "row-reverse",
    //     borderBottom: "none",
    //   },
    // }),
  };


// const lightoff = (e) => {
//   e.preventDefault();
//   postdata={
  
//       Asset_Id:"",
//       ActionUI: !values,

//   }
  

// }
 

  const [data, setData] = useState({
    // Asset_Id: "",
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
    Cpu_model: "",
    Generation: "",
    CPU_Sockets: "",
    PDU_IP: "",
    PDU_User: "",
    PDU_Password: "",
    BMC_IP: "",
    BMC_User: "",
    BMC_Password: "",
    BMC_FQDN: "",
    Operating_System: "",
    OS_IP: "",
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
    Created_on: "",
    Created_by: user.Username,
  });

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
   //console.log(newdata);
  }


  const Onserveruser = async(serverid,i) => {
 
    
    let x_str = i 
    let postData={
      Asset_Id: parseInt(serverid),
      Updated_by: user.Username,
        ActionUI:x_str,
    
    }
    //console.log(postData,"ForceOff")
    await api.post("lightsOffOn",postData)
    
    .then(
      (res) => {
        if (res.status === 200) {
          // console.log(res.data);
          //   reset();
          // alert(res.data.Message);
          swal(res.data.Message, {
            buttons: false,
            timer: 3000,
          });
          currentTab == 'poolSevers'?poolAssetApi():reservedOrMyassetApi();
          setOpenPowerStatus(false)
          // window.Reload();
          // window.location.reload();
          // navigate("/istrequestuser")
          // reservedAssetApi();
          // reservedOrMyassetApi();
          //poolAssetApi();
        } else if (res.status === 202) {
          // alert(res.data.Message);
          swal(res.data.Message, {
            // buttons: false,
            timer: 3000,
          });
          // console.log(res.data.Message);
        } else {
          alert("Something went wrong...Server Error!!");
        }
      }
      // (error) => {
      //   // console.log(error);
      //   swal(error.message, {
      //     // buttons: false,
      //     timer: 3000,
      //   });
      //   // alert("Refused Connection...Try again later", error);
      // }
    )
    .catch(function (error) {
      // console.log(error.response.status) // 401
      // console.log(error.response.data) //Please Authenticate or whatever returned from server
      if (error.response.status === 401) {
       //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
        swal(error.response.data.Message, {
    
          icon: "warning",
          buttons: false,
          timer: 3000,
        });
        //redirect to login
      } else if (error.response.status === 400) {
       //console.log(error); //Please Authenticate or whatever returned from server
        swal(error.response.data.Message, {
          icon: "warning",
          buttons: false,
          timer: 3000,
        });
      } else {
       //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
        swal(error.response.data.Message, {
          icon: "warning",
          buttons: false,
          timer: 3000,
        });
      }
    });
    //   return (
    //     <div>Onserveruser</div>
    //   )
    }
    const Onserveruser1 = async(serverid,i) => {
 
    
      let x_str = i ? "ForceOff" : "On";
      let postData={
        Asset_Id: parseInt(serverid),
        Updated_by: user.Username,
          ActionUI:x_str,
      
      }
      //console.log(postData,"ForceOff")
      await api.post("lightsOffOn",postData)
      
      .then(
        (res) => {
          if (res.status === 200) {
            // console.log(res.data);
            //   reset();
            // alert(res.data.Message);
            swal(res.data.Message, {
              buttons: false,
              timer: 3000,
            });
            poolAssetApi();
            // reservedOrMyassetApi();
            // window.Reload();
            // window.location.reload();
            // navigate("/istrequestuser")
            // reservedAssetApi();
            // reservedOrMyassetApi();
            //poolAssetApi();
          } else if (res.status === 202) {
            // alert(res.data.Message);
            swal(res.data.Message, {
              // buttons: false,
              timer: 3000,
            });
            // console.log(res.data.Message);
          } else {
            alert("Something went wrong...Server Error!!");
          }
        }
        // (error) => {
        //   // console.log(error);
        //   swal(error.message, {
        //     // buttons: false,
        //     timer: 3000,
        //   });
        //   // alert("Refused Connection...Try again later", error);
        // }
      )
      .catch(function (error) {
        // console.log(error.response.status) // 401
        // console.log(error.response.data) //Please Authenticate or whatever returned from server
        if (error.response.status === 401) {
         //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
      
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
          //redirect to login
        } else if (error.response.status === 400) {
         //console.log(error); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        } else {
         //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        }
      });
      //   return (
      //     <div>Onserveruser</div>
      //   )
      }

  // editable data
  const [Asset_Id, setAsset_Id] = useState();
  const [Asset_Name, setAsset_Name] = useState();
  const [Current_Project, setCurrent_Project] = useState();
  const [Manufacturer, setManufacturer] = useState();
  const [Cluster_Id, setCluster_Id] = useState();
  const [CPU_model, setCPU_model] = useState();
  const [BMC_IP, setBMC_IP] = useState();
  const [BMC_User, setBMC_User] = useState();
  const [BMC_Password, setBMC_Password] = useState();
  const [BMC_FQDN, setBMC_FQDN] = useState();
  const [Operating_System, setOperating_System] = useState();
  const [OS_IP, setOS_IP] = useState();
  const [OS_User, setOS_User] = useState();
  const [OS_Password, setOS_Password] = useState();
  const [DIMM_Size, setDIMM_Size] = useState();
  const [DIMM_Capacity, setDIMM_Capacity] = useState();
  const [Storage_Vendor, setStorage_Vendor] = useState();
  const [Storage_Controller, setStorage_Controller] = useState();
  const [Storage_Capacity, setStorage_Capacity] = useState();
  const [Network_speed, setNetwork_speed] = useState();
  const [Number_Of_Network_Ports, setNumber_Of_Network_Ports] = useState();
  const [Special_Switching_Needs, setSpecial_Switching_Needs] = useState();
  const [Required_Start_Date, setRequired_Start_Date] = useState();
  const [Required_Finish_Date, setRequired_Finish_Date] = useState();
  const [Updated_by, setUpdated_by] = useState();
  const [Created_by, setCreated_by] = useState();
  const [Created_on, setCreated_on] = useState();
  const [Assigned_from, setAssigned_from] = useState();
  const [Assigned_by, setAssigned_by] = useState();

  const [PDU_Password, setPDU_Password] = useState("");

  // const [Assigned_to, setAssigned_to] = useState();
  // const [Assigned_to, setAssigned_to] = useState();
  const [PDU_IP, setPDU_IP] = useState("");
  const [PDU_User, setPDU_User] = useState("");
  const [CurrentProject, setCurrentProject] = useState("");
  const [Notes, setNotes] = useState("");
  const [Previous_Project, setPrevious_Project] = useState();
  const [BOM, setBOM] = useState("");
  const [Support_case, setSupport_case] = useState("");
  const [Generation, setGeneration] = useState("");
  const [Server_Model, setServer_Model] = useState("");
  const [CPU_Sockets, setForm_factor] = useState("");
  const [Server_Serial, setServer_Serial] = useState("");
  const [Lab, setLab] = useState("");
  const [Row, setRow] = useState();
  const [Rack, setRack] = useState();
  const [RU, setRU] = useState();
  const [Processor, setProcessor] = useState("");
  const [DC_status, setDC_status] = useState("");
  const [Owner, setOwner] = useState("");
  const [Category, setCategory] = useState("");
  const [stillNeeded, setStillNeeded] = useState(false);
  const [NetworkType, setNetworkType] = useState(false);
  const [network_Type, setNetwork_Type] = useState(false);

  const [Asset_location, setAsset_location] = useState("");
  const [Purpose, setPurpose] = useState("");

  // let rowDataArray=[];
  // const moreData = (rowDataArray) => {
  //   handleModel4Open();
  //  //console.log(rowDataArray, "rowMoreDataArray------");
  //   setServer_Serial(rowDataArray[3]);
  //   setManufacturer(rowDataArray[5]);
  //   setStillNeeded(rowDataArray[8]);
  //   setNotes(rowDataArray[10]);
  //   setPrevious_Project(rowDataArray[11]);
  //   setBOM(rowDataArray[12]);
  //   setSupport_case(rowDataArray[13]);
  //   setCluster_Id(rowDataArray[14]);
  //   setGeneration(rowDataArray[22]);
  //   setForm_factor(rowDataArray[23]);
  //   // rowDataArray.push(rowMoreDataArray);
  //   // console.log(rowDataArray, "rowDataArray------");

  //   // if (rowDataArray !== [] || rowDataArray !== null) {

  //   // }
  // };
  const moreData = (rowDataArray) => {
    handleModel4Open();
   //console.log(rowDataArray, "rowMoreDataArray------");

    // setAsset_Id(rowDataArray[1]);
    setAsset_Name(rowDataArray[2]);
    setAsset_location(rowDataArray[15]);
    setPurpose(rowDataArray[9]);
    setGeneration(rowDataArray[22]);
    setServer_Model(rowDataArray[12]);
    setForm_factor(rowDataArray[23]);
    // setServer_Serial(rowDataArray[14]);
    setLab(rowDataArray[16]);
    setRow(rowDataArray[17]);
    setRack(rowDataArray[18]);
    setRU(rowDataArray[19]);
    // setProcessor(rowDataArray[19]);
    setDC_status(rowDataArray[20]);
    setPDU_IP(rowDataArray[24]);
    setPDU_User(rowDataArray[25]);
    // setPDU_Password(rowDataArray[]);
    setOwner(rowDataArray[6]);
    setCategory(rowDataArray[7]);
    setStillNeeded(rowDataArray[8]);
    setCurrent_Project(rowDataArray[9]);
    setNotes(rowDataArray[10]);
    setPrevious_Project(rowDataArray[11]);
    setBOM(rowDataArray[12]);
    setSupport_case(rowDataArray[13]);
    // setAsset_Name(rowDataArray[2]);
    // setCurrent_Project(rowDataArray[9]);
    // setManufacturer(rowDataArray[5]);
    // setCluster_Id(rowDataArray[14]);
    setCPU_model(rowDataArray[21]);
    setBMC_IP(rowDataArray[26]);
    setBMC_User(rowDataArray[27]);
    setBMC_Password(rowDataArray[47]);
    setBMC_FQDN(rowDataArray[28]);
    setOperating_System(rowDataArray[29]);
    setOS_IP(rowDataArray[30]);
    setOS_User(rowDataArray[31]);
    setOS_Password(rowDataArray[48]);
    setDIMM_Size(rowDataArray[32]);
    setDIMM_Capacity(rowDataArray[33]);
    setStorage_Vendor(rowDataArray[34]);
    setStorage_Controller(rowDataArray[35]);
    setStorage_Capacity(rowDataArray[36]);
    setNetwork_speed(rowDataArray[38]);
    setNumber_Of_Network_Ports(rowDataArray[39]);
    setSpecial_Switching_Needs(rowDataArray[40]);
    setRequired_Start_Date(rowDataArray[41]);
    setRequired_Finish_Date(rowDataArray[42]);
    setNetworkType(rowDataArray[37]);
    // setPDU_Password  (rowDataArray[49]);

    setServer_Serial(rowDataArray[3]);
    setManufacturer(rowDataArray[5]);
    setStillNeeded(rowDataArray[8]);
    setNotes(rowDataArray[10]);
    setPrevious_Project(rowDataArray[11]);
    setBOM(rowDataArray[12]);
    setSupport_case(rowDataArray[13]);
    setCluster_Id(rowDataArray[14]);
    setGeneration(rowDataArray[22]);
    setForm_factor(rowDataArray[23]);
    
    // rowDataArray.push(rowMoreDataArray);
    // console.log(rowDataArray, "rowDataArray------");

    // if (rowDataArray !== [] || rowDataArray !== null) {

    // }
  };

  const editableData = (rowDataArr) => {
    handleEditOpen();
   //console.log(rowDataArr, "rowDataArr need");
    if (rowDataArr !== [] || rowDataArr !== null) {
      setAsset_Id(rowDataArr[1]);
      setAsset_location(rowDataArr[15]);
      setPurpose(rowDataArr[43]);
      setGeneration(rowDataArr[22]);
      setServer_Model(rowDataArr[4]);
      setForm_factor(rowDataArr[23]);
      setServer_Serial(rowDataArr[3]);
      setLab(rowDataArr[16]);
      setRow(rowDataArr[17]);
      setRack(rowDataArr[18]);
      setRU(rowDataArr[19]);
      // setProcessor(rowDataArr[19]);
      setDC_status(rowDataArr[20]);
      setPDU_IP(rowDataArr[24]);
      setPDU_User(rowDataArr[25]);
      // setPDU_Password(rowDataArr[]);
      setOwner(rowDataArr[6]);
      setCategory(rowDataArr[7]);
      setStillNeeded(rowDataArr[8]);
      setCurrent_Project(rowDataArr[9]);
      setNotes(rowDataArr[10]);
      setPrevious_Project(rowDataArr[11]);
      setBOM(rowDataArr[12]);
      setSupport_case(rowDataArr[13]);
      setAsset_Name(rowDataArr[2]);
      // setCurrent_Project(rowDataArr[9]);
      setManufacturer(rowDataArr[5]);
      setCluster_Id(rowDataArr[14]);
      setCPU_model(rowDataArr[21]);
      setBMC_IP(rowDataArr[26]);
      setBMC_User(rowDataArr[27]);
      setBMC_Password(rowDataArr[52]);
      setBMC_FQDN(rowDataArr[28]);
      setOperating_System(rowDataArr[29]);
      setOS_IP(rowDataArr[30]);
      setOS_User(rowDataArr[31]);
      setOS_Password(rowDataArr[53]);
      setDIMM_Size(rowDataArr[32]);
      setDIMM_Capacity(rowDataArr[33]);
      setStorage_Vendor(rowDataArr[34]);
      setStorage_Controller(rowDataArr[35]);
      setStorage_Capacity(rowDataArr[36]);
      setNetwork_speed(rowDataArr[38]);
      setNumber_Of_Network_Ports(rowDataArr[39]);
      setSpecial_Switching_Needs(rowDataArr[40]);
      setRequired_Start_Date(getUiDate(rowDataArr[41]));
      setRequired_Finish_Date(getUiDate(rowDataArr[42]));
     //console.log("req", setRequired_Finish_Date);
      setNetworkType(rowDataArr[37]);
      setPDU_Password(rowDataArr[54]);
      // setUpdated_by (rowDataArr[42]);
    }
  };

  const editablePoolData = (rowDataArr) => {
    handleEditPoolOpen();
   //console.log(rowDataArr, "rowDataArr need");
    if (rowDataArr !== [] || rowDataArr !== null) {
      setAsset_Id(rowDataArr[1]);
      setAsset_location(rowDataArr[4]);
      // setPurpose(rowDataArr[9]);
      setGeneration(rowDataArr[11]);
      setServer_Model(rowDataArr[12]);
      setForm_factor(rowDataArr[13]);
      setServer_Serial(rowDataArr[14]);
      setLab(rowDataArr[15]);
      setRow(rowDataArr[16]);
      setRack(rowDataArr[17]);
      setRU(rowDataArr[18]);
      setProcessor(rowDataArr[19]);
      setDC_status(rowDataArr[20]);
      setPDU_IP(rowDataArr[21]);
      setPDU_User(rowDataArr[22]);
      // setPDU_Password(rowDataArr[]);
      setOwner(rowDataArr[23]);
      setCategory(rowDataArr[24]);
      setStillNeeded(rowDataArr[25]);

      setCurrentProject(rowDataArr[27]);
      setNotes(rowDataArr[28]);
      setPrevious_Project(rowDataArr[29]);
      setBOM(rowDataArr[30]);
      setSupport_case(rowDataArr[31]);
    }
  };


  const Sub = async (e) => {
    e.preventDefault();
   
    let postData = {
      // Asset_Id: parseInt(data.Asset_Id),
      Asset_Name: data.Asset_Name,
      PDU_IP: data.PDU_IP,
      PDU_User: data.PDU_User,
      PDU_Password: data.PDU_Password,
      Manufacturer: data.Manufacturer,
      BMC_IP: data.BMC_IP,
      BMC_User: data.BMC_User,
      BMC_Password: data.BMC_Password,
      BMC_FQDN: data.BMC_FQDN,
      Asset_location: data.Asset_location,
      // Created_on: createdDate,
      // Created_on: dateTime,
      Created_by: data.Created_by,
      Operating_System: data.Operating_System,
      OS_IP: data.OS_IP,
      OS_User: data.OS_User,
      OS_Password: data.OS_Password,
      Purpose: data.Purpose,
      Cluster_Id: data.Cluster_Id,

      Generation: data.Generation,
      Cpu_model: data.Cpu_model,
      Server_Model: data.Server_Model,
      CPU_Sockets: data.CPU_Sockets,
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
      DIMM_Size: data.DIMM_Size,
      DIMM_Capacity: data.DIMM_Capacity,
      Storage_Vendor: data.Storage_Vendor,
      Storage_Controller: data.Storage_Controller,
      Storage_Capacity: data.Storage_Capacity,
      // Network_Type: data.Network_Type,
      Network_Type: Boolean(NetworkType),

      Network_speed: data.Network_speed,
      Number_Of_Network_Ports: data.Number_Of_Network_Ports,
      Special_Switching_Needs: data.Special_Switching_Needs,
      Required_Start_Date: moment(data.Required_Start_Date).toISOString(),
      Required_Finish_Date: moment(data.Required_Finish_Date).toISOString(),

      // Delete: 1,
    };
   //console.log(postData, "postData");

    // axios.post(url, postData).then(
    await api
      .post("add_asset", postData)
      .then(
        (res) => {
          if (res.status === 200) {
          
            swal(res.data.Message, {
              buttons: false,
              timer: 3000,
            });
            setOpen(false);
            // reservedAssetApi();
            setValue("2");

            // poolAssetApi();

            // handleClose();

            // alert("We got your information. We will call you back soon.");
          } else if (res.status === 202) {
            // alert(res.data.Message);
            swal(res.data.Message);
            // console.log(res.data.Message);
          } else {
            alert("Something went wrong...Server Error!!");
          }
        }
        // (error) => {
        //   // console.log(error);
        //   swal(error.message, {
        //     // buttons: false,
        //     timer: 3000,
        //   });
        //   // alert("Refused Connection...Try again later", error);
        // }
      )
      .catch(function (error) {
        // console.log(error.response.status) // 401
        // console.log(error.response.data) //Please Authenticate or whatever returned from server
        if (error.response.status === 401) {
         //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
          //redirect to login
        } else if (error.response.status === 400) {
         //console.log(error); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        } else {
         //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        }
      });
  };

  // reserving asset api call
  // const assignAssetUrl = "http://3.110.222.142:5002/assign_asset";
  // const assignAssetUrl = "http://localhost:5002/assign_asset";
  const assignApiFn = async () => {
    // e.preventDefault();
    // if (window.confirm("Are you sure do you want to assign server ? ")) {
    //   // console.log("assign");
    //   let postData = {
    //     Asset_Id: parseInt(serverId),
    //     Assigned_to: parseInt(userID),
    //     Assigned_by: user.Username,
    //     Updated_by: user.Username,
    //   };
    //   // console.log(postData, "postData of assign asset");
    //   // let jsonAssign = JSON.stringify(postData);
    //   // console.log(jsonAssign, "jsonAssign");

    //   // axios.post(assignAssetUrl, postData).then(
    //   await api.post("assign_asset", postData).then(
    //     (res) => {
    //       if (res.status === 200) {
    //         // console.log(res);
    //         //   reset();
    //         // alert(res.data.Message);
    //         swal(res.data.Message, {
    //           buttons: false,
    //           timer: 3000,
    //         });
    //         poolAssetApi();
    //         // reservedAssetApi();
    //         reservedOrMyassetApi();
    //       }else if(res.status === 202) {
    //         // alert(res.data.Message);reservedAssetAp
    //         swal(res.data.Message, {
    //           // buttons: false,
    //           timer: 3000,
    //         });
    //         // console.log(res.data.Message);
    //       }  else {
    //         alert("Something went wrong...Server Error!!");
    //       }
    //     },
    //     (error) => {
    //       // console.log(error);
    //       swal(error.message, {
    //         // buttons: false,
    //         timer: 3000,
    //       });
    //       // alert("Refused Connection...Try again later", error);
    //     }
    //   );
    // }

    swal({
      // title: "Are you sure you want to assign the server ?  ",
      text: "Are you sure you want to assign the server ? ",
      // text: "Are you sure you want to delete the server ? ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (data) => {
      if (data) {
        let postData = {
          Asset_Id: parseInt(serverId),
          Assigned_to: parseInt(userID),
          Assigned_by: user.Username,
          Updated_by: user.Username,
        };

       //console.log(postData, "postData of assign asset");
        // let jsonAssign = JSON.stringify(postData);
        // console.log(jsonAssign, "jsonAssign");

        // axios.post(assignAssetUrl, postData).then(
        await api
          .post("assign_asset", postData)
          .then(
            (res) => {
              if (res.status === 200) {
                // console.log(res);
                //   reset();
               //console.log(res.data, "vineeeee 200");

                // alert(res.data.message);
                swal(res.data.Message, {
                  buttons: false,
                  timer: 3000,
                });
                // poolAssetApi();
                // reservedAssetApi();
                reservedOrMyassetApi();
              } else if (res.status === 202) {
               //console.log(res.data, "vineeeee");
                // alert(res.data);
                swal(res.data.Message, {
                  // buttons: false,
                  timer: 3000,
                });
                // console.log(res.data.Message);
              } else {
                alert("Something went wrong...Server Error!!");
              }
            }
            // (error) => {
            //   // console.log(error);
            //   swal(error.message, {
            //     // buttons: false,
            //     timer: 3000,
            //   });
            //   // alert("Refused Connection...Try again later", error);
            // }
          )
          .catch(function (error) {
            // console.log(error.response.status) // 401
            // console.log(error.response.data) //Please Authenticate or whatever returned from server
            if (error.response.status === 401) {
             //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
              swal(error.response.data.Message, {
                icon: "warning",
                buttons: false,
                timer: 3000,
              });
              //redirect to login
            } else if (error.response.status === 400) {
             //console.log(error); //Please Authenticate or whatever returned from server
              swal(error.response.data.Message, {
                icon: "warning",
                buttons: false,
                timer: 3000,
              });
            } else {
             //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
              swal(error.response.data.Message, {
                icon: "warning",
                buttons: false,
          
                timer: 3000,
              });
            }
          });
      } else {
      }
    });
  };

  const userServerAssignApiFn = async (assetID) => {
    // e.preventDefault();
    // if (window.confirm("Are you sure do you want to assign server ? ")) {
    //   // console.log("assign");
    //   let postData = {
    //     Asset_Id: parseInt(serverId),
    //     Assigned_to: parseInt(userID),
    //     Assigned_by: user.Username,
    //     Updated_by: user.Username,
    //   };
    //   // console.log(postData, "postData of assign asset");
    //   // let jsonAssign = JSON.stringify(postData);
    //   // console.log(jsonAssign, "jsonAssign");

    //   // axios.post(assignAssetUrl, postData).then(
    //   await api.post("assign_asset", postData).then(
    //     (res) => {
    //       if (res.status === 200) {
    //         // console.log(res);
    //         //   reset();
    //         // alert(res.data.Message);
    //         swal(res.data.Message, {
    //           buttons: false,
    //           timer: 3000,
    //         });
    //         poolAssetApi();
    //         // reservedAssetApi();
    //         reservedOrMyassetApi();
    //       }else if(res.status === 202) {
    //         // alert(res.data.Message);
    //         swal(res.data.Message, {
    //           // buttons: false,
    //           timer: 3000,
    //         });
    //         // console.log(res.data.Message);
    //       }  else {
    //         alert("Something went wrong...Server Error!!");
    //       }
    //     },
    //     (error) => {
    //       // console.log(error);
    //       swal(error.message, {
    //         // buttons: false,
    //         timer: 3000,
    //       });
    //       // alert("Refused Connection...Try again later", error);
    //     }
    //   );
    // }

    swal({
      // title: "Are you sure you want to assign the server ?  ",
      text: "Are you sure you want to assign the server ? ",
      // text: "Are you sure you want to delete the server ? ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (data) => {
      if (data) {
        setValue("1");
        // console.log(assetID, "kioik")
        let postData = {
          Asset_Id: parseInt(assetID),
          Assigned_to: parseInt(user.User_Id),
          Assigned_by: user.Username,
          Updated_by: user.Username,
        };
       //console.log(postData, "postData of assign asset");
        // let jsonAssign = JSON.stringify(postData);
        // console.log(jsonAssign, "jsonAssign");

        // axios.post(assignAssetUrl, postData).then(
        await api
          .post("assign_asset", postData)
          .then(
            (res) => {
              if (res.status === 200) {
                // console.log(res);
                //   reset();
                // console.log(res.data, "vineeeee 200")

                // alert(res.data.message);
                swal(res.data.Message, {
                  buttons: false,
                  timer: 3000,
                });
                //poolAssetApi();
                // reservedAssetApi();
                reservedOrMyassetApi();
              } else if (res.status === 202) {
                // console.log(res.data, "vineeeee")
                // alert(res.data);
                swal(res.data.Message, {
                  // buttons: false,
                  timer: 3000,
                });
                // console.log(res.data.Message);
              } else {
                alert("Something went wrong...Server Error!!");
              }
            }
            // (error) => {
            //   // console.log(error);
            //   swal(error.message, {
            //     // buttons: false,
            //     timer: 3000,
            //   });
            //   // alert("Refused Connection...Try again later", error);
            // }
          )
          .catch(function (error) {
            // console.log(error.response.status) // 401
            // console.log(error.response.data) //Please Authenticate or whatever returned from server
            if (error.response.status === 401) {
             //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
              swal(error.response.data.Message, {
                icon: "warning",
                buttons: false,
                timer: 3000,
              });
              //redirect to login
            } else if (error.response.status === 400) {
             //console.log(error); //Please Authenticate or whatever returned from server
              swal(error.response.data.Message, {
                icon: "warning",
                buttons: false,
                timer: 3000,
              });
            } else {
             //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
              swal(error.response.data.Message, {
                icon: "warning",
                buttons: false,
                timer: 3000,
              });
            }
          });
      } else {
      }
    });
  };
  // editing asset api call
  // const editAssetUrl = "http://3.110.222.142:5002/update_asset_details";
  // const editAssetUrl = "http://localhost:5002/update_asset_details";
  const submitEditedFn = async (e) => {
    e.preventDefault();
   //console.log("edited data");
    let postData = {
      Asset_Id: Asset_Id,
      Asset_Name: Asset_Name,
      Manufacturer: Manufacturer,
      Cluster_Id: Cluster_Id,
      Asset_location: Asset_location,
      Purpose: Purpose,
      Generation: Generation,
      Server_Model: Server_Model,
      CPU_Sockets: CPU_Sockets,
      CPU_model: CPU_model,
      Server_Serial: Server_Serial,
      Lab: Lab,
      Row: Row,
      Rack: Rack,
      RU: RU,
      Processor: Processor,
      DC_status: DC_status,
      Owner: Owner,
      Category: Category,
      stillNeeded: stillNeeded,
      PDU_IP: PDU_IP,
      PDU_User: PDU_User,
      PDU_Password: PDU_Password,
      Current_Project: Current_Project,
      Notes: Notes,
      Previous_Project: Previous_Project,
      BOM: BOM,
      BMC_IP: BMC_IP,
      BMC_User: BMC_User,
      BMC_Password: BMC_Password,
      BMC_FQDN: BMC_FQDN,
      Support_case: Support_case,
      Updated_by: user.Username,
      Operating_System: Operating_System,
      OS_IP: OS_IP,
      OS_User: OS_User,
      OS_Password: OS_Password,
      DIMM_Size: DIMM_Size,
      DIMM_Capacity: DIMM_Capacity,
      Storage_Vendor: Storage_Vendor,
      Storage_Controller: Storage_Controller,
      Storage_Capacity: Storage_Capacity,
      Network_Type: network_Type,
      Network_speed: Network_speed,
      Number_Of_Network_Ports: Number_Of_Network_Ports,
      Special_Switching_Needs: Special_Switching_Needs,
      Required_Start_Date: moment(Required_Start_Date).toISOString(),
      Required_Finish_Date: moment(Required_Finish_Date).toISOString(),
      // Status: true,
    };
   //console.log(postData, "postData of update asset");
    let jsonAssign = JSON.stringify(postData);
   //console.log(jsonAssign, "jsonAssign update");

    // axios.post(editAssetUrl, jsonAssign).then(
    await api
      .post("update_asset_details", postData)
      .then(
        (res) => {
          if (res.status === 200) {
            // console.log(res);
            //   reset();
            // alert(res.data.Message);
            swal(res.data.Message, {
              buttons: false,
              timer: 3000,
            });
            // reservedAssetApi();
            reservedOrMyassetApi();
            //poolAssetApi();

            handleEditClose();
            handleEditPoolClose();
          } else if (res.status === 202) {
            // alert(res.data.Message);
            swal(res.data.Message, {
              // buttons: false,
              timer: 3000,
            });
            // console.log(res.data.Message);
          } else {
            alert("Something went wrong...Server Error!!");
          }
        }
        // (error) => {
        //   // console.log(error);
        //   swal(error.message, {
        //     // buttons: false,
        //     timer: 3000,
        //   });
        //   // alert("Refused Connection...Try again later", error);
        // }
      )
      .catch(function (error) {
        // console.log(error.response.status) // 401
        // console.log(error.response.data) //Please Authenticate or whatever returned from server
        if (error.response.status === 401) {
         //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
          //redirect to login
        } else if (error.response.status === 400) {
         //console.log(error); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        } else {
         //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        }
      });
  };
  //--------------------- Tabs ------------------------
  const [allServersData, setAllServersData] = useState([]);
  const [reservedServersData, setReservedServersData] = useState([]);
  const [values,setValues]=useState([reservedServersData.Power_Status])
 //console.log(`The value is: ${values}`)
  
 
  const [valuespool,setValuespool]=useState([allServersData.Power_Status])
 //console.log(reservedServersData,"reserved switch")
 //console.log(allServersData,"pool switch")
  const [usersData, setUsersData] = useState([]);
 //console.log("userrrrrrr", usersData);

  //   const [poolServersData, setPoolServersData] = useState([]);
  const [value, setValue] = React.useState("1");
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [editPoolOpen, setEditPoolOpen] = React.useState(false);

  const [openModel2, setOpenModel2] = React.useState(false);
  const [openModel3, setOpenModel3] = React.useState(false);
  const [openModel4, setOpenModel4] = React.useState(false);
  const [openmodelHistoric, setOpenmodelHistoric] = React.useState(false);

  const [userID, setUserID] = useState("");
  const [serverId, setServerId] = useState("");
  const [platformInfo, setPlatformInfo] = useState({});
  const [platformId, setPlatformId] = useState("");
  const [platformManufacturer, setPlatformManufacturer] = useState("");
  const [platformIdModel, setPlatformIdModel] = useState("");
  const [platformIdPowerState, setPlatformIdPowerState] = useState("");
  const [platformIdHealth, setPlatformIdHealth] = useState("");
  const [platformSystems, setPlatformSystems] = useState("");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState(fullWidth);
  // Accordian
  const [counting, setcounting] = useState(5);
  const [expanded, setExpanded] = React.useState(false);
  const [row, SetRow] = useState();
  const [count, SetCount] = useState(10);

  const [page, SetPage] = useState();
  const handleAccordianChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // releasing asset api call
  // const releaseAssetUrl = "http://3.110.222.142:5002/release_asset";
  // const releaseAssetUrl = "http://localhost:5002/release_asset";
  const releaseApiFn = async (serverid) => {
 
 
    swal({
      // title: "Are you sure you want to release the server ?  ",
      // text: "Once deleted, you will not be able to recover deleted asset!",
      text: "Are you sure you want to release the server ? ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (data) => {
      if (data) {
        let postData = {
          Asset_Id: parseInt(serverid),
          Updated_by: user.Username,
        };
      
        await api
          .post("release_asset", postData)
          .then(
            (res) => {
              if (res.status === 200) {
                // console.log(res.data);
                //   reset();
                // alert(res.data.Message);
                swal(res.data.Message, {
                  buttons: false,
                  timer: 3000,
                });
                // reservedAssetApi();
                reservedOrMyassetApi();
                //poolAssetApi();
              } else if (res.status === 202) {
                // alert(res.data.Message);
                swal(res.data.Message, {
                  // buttons: false,
                  timer: 3000,
                });
                // console.log(res.data.Message);
              } else {
                alert("Something went wrong...Server Error!!");
              }
            }
            
          )
          .catch(function (error) {
            // console.log(error.response.status) // 401
            // console.log(error.response.data) //Please Authenticate or whatever returned from server
            if (error.response.status === 401) {
             //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
              swal(error.response.data.Message, {
                icon: "warning",
                buttons: false,
                timer: 3000,
              });
              //redirect to login
            } else if (error.response.status === 400) {
             //console.log(error); //Please Authenticate or whatever returned from server
              swal(error.response.data.Message, {
                icon: "warning",
                buttons: false,
                timer: 3000,
              });
            } else {
             //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
              swal(error.response.data.Message, {
                icon: "warning",
                buttons: false,
                timer: 3000,
              });
            }
          });
      } else {
      }
    });
  };

  //delete asset api call
  const deleteApiFn = async (serverid) => {


    swal({
      // title: "Are you sure you want to delete the server ?  ",
      text: "Are you sure you want to delete the server ? \n Once deleted, you will not be able to recover deleted server!",
      // text: "Are you sure you want to delete the server ? ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (data) => {
      if (data) {
        let postData = {
          Asset_Id: parseInt(serverid),
          Updated_by: user.Username,
        };
        // console.log(postData, "postData of deleting asset");
        // let jsonAssign = JSON.stringify(postData);
        // console.log(jsonAssign, "jsonAssign");

        // axios.post(releaseAssetUrl, postData).then(
        await api
          .post("delete_asset", postData)
          .then(
            (res) => {
              if (res.status === 200) {
                // console.log(res.data);
                // console.log(typeof res);
                //   reset();
                // alert(res.data.Message);
                swal(res.data.Message, {
                  buttons: false,
                  timer: 3000,
                });
                // reservedAssetApi();
                reservedOrMyassetApi();
                //  poolAssetApi();
              } else if (res.status === 202) {
                // alert(res.data.Message);
                swal(res.data.Message, {
                  // buttons: false,
                  timer: 3000,
                });
                // console.log(res.data.Message);
              } else {
                alert("Something went wrong...Server Error!!");
              }
            }
            // (error) => {
            //   // console.log(error);
            //   swal(error.message, {
            //     // buttons: false,
            //     timer: 3000,
            //   });
            //   // alert("Refused Connection...Try again later", error);
            // }
          )
          .catch(function (error) {
            // console.log(error.response.status) // 401
            // console.log(error.response.data) //Please Authenticate or whatever returned from server
            if (error.response.status === 401) {
             //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
              swal(error.response.data.Message, {
                icon: "warning",
                buttons: false,
                timer: 3000,
              });
              //redirect to login
            } else if (error.response.status === 400) {
             //console.log(error); //Please Authenticate or whatever returned from server
              swal(error.response.data.Message, {
                icon: "warning",
                buttons: false,
                timer: 3000,
              });
            } else {
             //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
              swal(error.response.data.Message, {
                icon: "warning",
                buttons: false,
                timer: 3000,
              });
            }
          });
      } else {
      }
    });
  };

  const handleOpen = () => {
    setOpen(true);
    // setOpenModel2(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const handleEditPoolOpen = () => {
    setEditPoolOpen(true);
  };
  const handleEditPoolClose = () => {
    setEditPoolOpen(false);
  };

  const handleModel2Open = () => {
    setOpenModel2(true);
  };
  const handleModel2Close = () => {
    setOpenModel2(false);
  };
  const handleModel3Open = () => {
    setOpenModel3(true);
  };
  const handleModel3Close = () => {
    setOpenModel3(false);
  };
  const handleModelHistiricOpen = () => {
    setOpenmodelHistoric(true);
  };
  const handleModelHistiricClose = () => {
    setOpenmodelHistoric(false);
  };

  const handleModel4Open = () => {
    setOpenModel4(true);
  };
  const handleModel4Close = () => {
    setOpenModel4(false);
  };

  const handleModel2CloseAndApiInput = (e) => {
    e.preventDefault();
    setOpenModel2(false);
    setValue("1");
   //console.log(userID, "on add selected user");
   //console.log(serverId, "on add selected server");
    assignApiFn();
  };



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // console.log(postData, "postData of user");

  // User_No: 7,

  // user details
  const userDetails = async () => {
    const user = localStorage.getItem("loggedInUserDetails");
    let loggedPerson = JSON.parse(user);
    let a = {
      User_No: parseInt(loggedPerson.User_Id),
      Count: count,
      Page: 1,
      Search: page,
      // User_No: 7,
    };
    await api
      .post("view_users", a)
      .then((res) => {
        // setloading(true);
        if (res.status === 200) {
         //console.log("data now ", res);
          // SetCount(res?.data?.Total_entry)
          // settotalpages(res?.data?.Total_entry)
          // setUsersData(res.data.Listusers);
          // setUsersData(res.data.Listusers);
          settotalpages(res?.data?.Total_entry);
          setUsersData(res.data.Listusers);
          // setUsersData([...reservedServersData, ...res.data?.Listusers]);
         //console.log("<---sushji", res);

          // setHistoryData(res.data.Historic_Details);
        } else if (res.status === 202) {
          swal(res.data.Message);
        } else {
          alert("Something went wrong...Server Error!!");
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
         //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
          //redirect to login
        } else if (error.response.status === 400) {
         //console.log(error); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        } else {
         //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        }
      });
  };
  //historic data
  const [history1, setHistory1] = useState([]);
  const history = (get) => {
    get.setHistory1 = historyoutput;
  };
 //console.log("now", setHistory1);
  const [histircData, sethistircData] = useState("");
  // const [historyoutput, setHistoryoutput] = useState({});
  const [historyoutput, setHistoryoutput] = useState([]);
 //console.log("historic details", historyoutput);
  const parentToChild = (props) => {
    sethistircData(historyoutput);
  };
  const callHistory = () => {
    historyoutput.forEach((HistoryDataObj) => {
      historicDetailsArr.push({
        historicdetails: HistoryDataObj.Asset_Id,
        // value: usersDataObj.User_Id,
      });
    });

   //console.log(Asset_Id, "historicDetailsArr");
  };
  const historicapi = async (s) => {
    // e.preventDefault();
   //console.log("finfing asset id", assetid);
   //console.log("finding s", s);

    // User_No: 7,
    const a = {
      Asset_Id: s,
      Count: counting,
      Page: newpage,
      Search: page,
    };
    await api.post("historic_details_id", a).then((res) => {
     //console.log("first", res);
      // settotalpages(res?.data?.Total_entry)
      settotalpages(res?.data?.Total_entry);

      setHistoryoutput([...res.data?.Historic_Details]);
      // console.log("typeof", [...allServersData, ...res.data?.ListAsset]);
    });
  };
  // platform perform api
  const platformapi = async () => {
    
    await api
      .get("platformProfile")
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data.PlatformProfile, "getPlatformProfile");

          setPlatformInfo(res.data.PlatformProfile);
        } else if (res.status === 202) {
          swal(res.data.Message);
        } else {
          alert("Something went wrong...Server Error!!");
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
         //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
          //redirect to login
        } else if (error.response.status === 400) {
         //console.log(error); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        } else {
         //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        }
      });

  };

  // console.log(usersData, "usersData");
  // console.log(Assigned_to, "Assigned_to");

  const callUsers = () => {
    usersData.forEach((usersDataObj) => {
      userDetailsArr.push({
        label: usersDataObj.Email_Id,
        value: usersDataObj.User_Id,
      });
    });
  };
 
  const [output, setOutput] = useState([]);
  usersData.forEach((usersDataObj) => {
    if (usersDataObj.Role !== "admin" && usersDataObj.Role !== "infra_admin") {
      userDetailsArr.push({
        label: usersDataObj.Email_Id,
        value: usersDataObj.User_Id,
      });
     //console.log(usersDataObj);
    }
  });

  // const option = userDetailsArr.title.map((p)=>{
  //   return{label:p.label}
  // })
  // setOutput(option)
 //console.log(output, "userDetailsArr");
  const [assetid, setAssetId] = useState();
  const openModelDiv = (s) => {
    userDetails();
    // callUsers();
    handleModel2Open();
   //console.log(s, "row server id");
    setServerId(s);
  };

  const userServerAssign = (s) => {
    //setValue('1');
   //console.log(s, "row server id user");
    setServerId(s);
    userServerAssignApiFn(s);
  };

  const releaseBtnDiv = (s) => {
   //console.log(s, "row server id");
    // setServerId(s);
    releaseApiFn(s);
  };
  const onFuntion = (s,i) => {
    // setOpenPowerStatus(true)
    
    // setPowerstatus(1)
    
   //console.log(s, "row server id");
   //console.log(i, "rowDataArray");
    // setServerId(s);
    Onserveruser(s,i);
    // navigate("/istrequestuser");
    
  };
  // const onFuntion1 = (s,i) => {
  //   // setPowerstatus(1)
    
  //  //console.log(s, "row server id");
  //  //console.log(i, "rowDataArray");
  //   // setServerId(s);
  //   Onserveruser1(s,i);
  //   // navigate("/istrequestuser");
    
  // };
  const platformFn = (s) => {
    platformapi();
    setValue("1");
    handleModel3Open();
   //console.log(s, "row server id");
    // setServerId(s);
  };
 
  const historic = (s) => {
   //console.log(s, "row asset id");
    // setServerId(s);
    // releaseApiFn(s);
    setAssetId(s);
    historicapi(s);
    handleModelHistiricOpen();
  };
 //console.log("booo", assetid);
  const deleteBtnDiv = () => {};

  const myAssetApi = async () => {
    if (user.Role === "user") {
      const user = localStorage.getItem("loggedInUserDetails");
      let loggedPerson = JSON.parse(user);
      let postData = {
        Assigned_to: parseInt(loggedPerson.User_Id),
        Count: counting,
        Page: newpage,
        Search: page,
      };
      // console.log(postData, "postData of user");

      // User_No: 7,

      await api
        .post("my_asset", postData)
        .then(
          (res) => {
           console.log(res.data, "9999", res.data?.ListAsset,"hello");

            if (res.status === 200) {
             //console.log(res.data);
              res.data.ListAsset = res.data?.ListAsset
              settotalpages(res?.data?.Total_entry);
              setReservedServersData([
                // ...reservedServersData,
                ...res.data?.ListAsset,
              ]);
            } else if (res.status === 202) {
              // alert(res.data.Message);
              swal(res.data.Message, {
                // buttons: false,
                timer: 3000,
              });
              // console.log(res.data.Message);
            } else {
              alert("Something went wrong...Server Error!!");
            }
          }
     
        )
        .catch(function (error) {
          // console.log(error.response.status) // 401
          // console.log(error.response.data) //Please Authenticate or whatever returned from server
          if (error.response.status === 401) {
           //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
            swal(error.response.data.Message, {
              icon: "warning",
              buttons: false,
              timer: 3000,
            });
            //redirect to login
          } else if (error.response.status === 400) {
           //console.log(error); //Please Authenticate or whatever returned from server
            swal(error.response.data.Message, {
              icon: "warning",
              buttons: false,
              timer: 3000,
            });
          } else {
           //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
            swal(error.response.data.Message, {
              icon: "warning",
              buttons: false,
              timer: 3000,
            });
          }
        });
    } else {
    }
  };

  const reservedAssetApi = async () => {
    const user = localStorage.getItem("loggedInUserDetails");
    let loggedPerson = JSON.parse(user);
    let a = {
      User_No: parseInt(loggedPerson.User_Id),
      // User_No: 4,
      Count: counting,
      Page: newpage,
      Search: page,
      // User_No: 7,
    };
    await api
      .post("list_asset/Reserved", a)
      .then((res) => {
        //  setloading(true);
        if (res.status === 200) {
         //console.log("data now ", res.data?.ListAsset);
          res.data.ListAsset = res.data?.ListAsset
          // SetCount(res?.data?.Total_entry)
          settotalpages(res?.data?.Total_entry);
          setReservedServersData([
            // ...reservedServersData,
            ...res.data?.ListAsset,
          ]);
        // setValues([reservedServersData.Power_Status])
         //console.log("333comment", res);

          // setHistoryData(res.data.Historic_Details);
        } else if (res.status === 202) {
          swal(res.data.Message);
        } else {
          alert("Something went wrong...Server Error!!");
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
         //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
          //redirect to login
        } else if (error.response.status === 400) {
         //console.log(error); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        } else {
         //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        }
      });
  };
  const [currentTab,setCurrentTab] = useState();
  const reservedOrMyassetApi = () => {
    setCurrentTab("reservedServers")
    if (user.Role === "user") {
      myAssetApi();
    } else {
      reservedAssetApi();
    }
  };
  const [showServerAddBtn, setShowServerAddBtn] = useState(true);
  const serverAddBtn = () => {
    if (user.Role === "user") {
      setShowServerAddBtn(false);
    } else {
      setShowServerAddBtn(true);
    }
  };

  let servertitle;
  if (user.Role === "admin" ||  user.Role === "infra_admin") {
    servertitle = "Reserved Servers";
  } else {
    servertitle = "My Servers";
  }

  useEffect(() => {
    // Onserveruser();
    setTimeout(() => {
      setloading(false);
    }, 3000);
  }, []);
  useEffect(() => {
    userDetails();
   //console.log(user, "<----------userssss");
    //setloading(true);
    if (value == "1") {
      reservedOrMyassetApi();
    } else {
      poolAssetApi();
    }

    serverAddBtn();
    
  }, [counting, newpage]);

  const role = [
    {
      value: "infra admin",
      label: "Infra Admin",
    },
    {
      value: "user",
      label: "User",
    },
  ];

  const poolAssetApi = async () => {
    setCurrentTab("poolServers")
    const user = localStorage.getItem("loggedInUserDetails");
    let loggedPerson = JSON.parse(user);
    let a = {
      User_No: parseInt(loggedPerson.User_Id),
      Count: counting,
      Page: newpage,
      Search: page,
      // User_No: 7,
    };
    await api
      .post("list_asset/pool", a)
      .then((res) => {
        // setloading(false);
        if (res.status === 200) {
         //console.log(res?.data, "getPoolServersUrl", a);
          res.data.ListAsset =res.data?.ListAsset
          settotalpages(res?.data?.Total_entry);
          //setcounting(res?.data?.Total_entry)
          //SetCount(res?.data?.Total_entry)
          setAllServersData([
            // ...allServersData,
             ...res.data?.ListAsset]);
         //console.log(res.data?.ListAsset,"data pool ")
        } else if (res.status === 202) {
          swal(res.data.Message);
        } else {
          alert("Something went wrong...Server Error!!");
        }
      })

      .catch(function (error) {
        if (error.response.status === 401) {
         //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        } else if (error.response.status === 400) {
         //console.log(error); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        } else {
         //console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        }
      });
    //setloading(false);
  };



  //---------------------- /Tabs ----------------------
  // const [fullWidth, setFullWidth] = React.useState(true);
  // const [maxWidth, setMaxWidth] = React.useState(fullWidth);

  return (
    <>
      {/* select user dialog */}
      <Dialog id="selectuser dlg" open={openModel2} className={classes.dialog}>
        <Container  component="main" maxWidth="xl">
          <CssBaseline />
          <div className="selectuserheaderline">
            <Typography id="typography" component="h1" variant="h6">
              Select User
            </Typography>
          </div>
          <form
            className={classes.form}
            onSubmit={(e) => handleModel2CloseAndApiInput(e)}
          >
            {/* <Grid spacing={0}> */}
            <Grid item xs={12} sm={12}>
              <TextField
                id="selectUser"
                select
                label="Select user"
                required
                fullWidth
                variant="outlined"
                value={userID}
                onChange={(event) => setUserID(event.target.value)}
              >
                {userDetailsArr.map((option) => (
                  <MenuItem
                    overflow="false"
                    scrolling="true"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={userDetailsArr.label}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                  id="user_id"
                    {...params}
                    value={userID}
                    onChange={(event) => setUserID(event.target.value)}
                    label="Movie"
                  />
                )}
              />
            </Grid>

            {/* </Grid> */}

            <div className="subcanbtn">
              <Button
                variant="contained"
                // color="primary"
                type="submit"
                value="SUBMIT"
                id="selectAdd"
                className={classes.add}
                // onClick={handleModel2CloseAndApiInput}
              >
                SELECT
              </Button>
              <Button
                sx={{ width: "25ch" }}
                variant="contained"
                // color="primary"
                id="selectCancel"
                className={classes.cancel}
                onClick={handleModel2Close}
              >
                Close
              </Button>
            </div>
          </form>
        </Container>
      </Dialog>

      {/* platform performance dialog */}
      <Dialog id="plt dlg" open={openModel3} className={classes.dialog}>
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          {/* <div className={classes.dialogPaper}> */}
          {/* <div className="platformheaderline"> */}
          <Typography id="typ pltprofiler" component="h1" variant="h6">
            Platform Profiler
          </Typography>
          {/* </div> */}

          <hr />
          <div class="platformData">
            <ReactJson src={platformInfo} />
          </div>
          <div className="subcanbtn">
            <Button
              sx={{ width: "25ch" }}
              variant="contained"
              // color="primary"
              id="platformClose"
              className={classes.cancel}
              onClick={handleModel3Close}
            >
              Close
            </Button>
          </div>

        

          {/* </div> */}
        </Container>
      </Dialog>

      <Dialog id="more dlg" open={openModel4} className={classes.dialog}>
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          {/* <br /> */}
          {/* <div className="platformheaderline"> */}
          <Typography
            id="typ srverdetail"
            component="h3"
            variant="h5"
            style={{ padding: "10px", margintop: "20px" }}
          >
            Server Details
          </Typography>

          {/* </div> */}
          <hr />
          <div className="">
            {/* <div> */}
            {/* <h5 className="text-left">Server Serial: </h5><h6 className="text-right"> {Server_Serial}</h6> */}
            <table className="tablee customTable">
              {/* <th>More</th> */}
              <tr>
                <td>Server Name:</td>
                <td>{Asset_Name}</td>
              </tr>
              <tr>
                <td>Server Model:</td>
                <td> {Server_Model}</td>
              </tr>
              <tr>
                <td>Owner:</td>
                <td>{Owner}</td>
              </tr>
              <tr>
                <td>Category:</td>
                <td> {Category}</td>
              </tr>
              <tr>
                <td>Current Project:</td>
                <td>{Current_Project}</td>
              </tr>
              <tr>
                <td>Location:</td>
                <td> {Asset_location}</td>
              </tr>
              <tr>
                <td>Lab:</td>
                <td> {Lab}</td>
              </tr>
              <tr>
                <td>Row:</td>
                <td> {Row}</td>
              </tr>
              <tr>
                <td>Rack:</td>
                <td> {Rack}</td>
              </tr>
              <tr>
                <td>RU:</td>
                <td> {RU}</td>
              </tr>
              <tr>
                <td>DC Status:</td>
                <td> {DC_status}</td>
              </tr>
              <tr>
                <td>PDU IP:</td>
                <td> {PDU_IP}</td>
              </tr>
              <tr>
                <td>PDU User:</td>
                <td> {PDU_User}</td>
              </tr>
              <tr>
                <td>BMC IP:</td>
                <td> {BMC_IP}</td>
              </tr>
              <tr>
                <td>BMC User:</td>
                <td>{BMC_User}</td>
              </tr>
              <tr>
                <td>BMC FQDN:</td>
                <td> {BMC_FQDN}</td>
              </tr>
              <tr>
                <td>Operating System:</td>
                <td> {Operating_System}</td>
              </tr>
              <tr>
                <td>OS IP:</td>
                <td>{OS_IP}</td>
              </tr>
              <tr>
                <td>OS User:</td>
                <td> {OS_User}</td>
              </tr>
              <tr>
                <td>DIMM Size:</td>
                <td> {DIMM_Size}</td>
              </tr>
              <tr>
                <td>DIMM Capacity:</td>
                <td> {DIMM_Capacity}</td>
              </tr>
              <tr>
                <td>Storage Vendor:</td>
                <td> {Storage_Vendor}</td>
              </tr>
              <tr>
                <td>Storage Controller:</td>
                <td> {Storage_Controller}</td>
              </tr>
              <tr>
                <td>Storage Capacity:</td>
                <td> {Storage_Capacity}</td>
              </tr>
              <tr>
                <td>Network Type:</td>
                <td> {NetworkType ? "Public" : "Private"}</td>
              </tr>
              <tr>
                <td>Network Speed:</td>
                <td> {Network_speed}</td>
              </tr>
              <tr>
                <td>Number of Network Ports:</td>
                <td> {Number_Of_Network_Ports}</td>
              </tr>
              <tr>
                <td>Special Switching Needs:</td>
                <td> {Special_Switching_Needs}</td>
              </tr>
              <tr>
                <td>Required Start Date:</td>
                <td> {moment(Required_Start_Date).format("MMMM Do YYYY")}</td>
              </tr>
              <tr>
                <td>Required End Date:</td>
                <td> {moment(Required_Finish_Date).format("MMMM Do YYYY")}</td>
              </tr>
              <tr>
                <td>Purpose:</td>
                <td> {Purpose}</td>
              </tr>
              {/* <tr>
                <td>Created On:</td>
                <td> {Created_on}</td>
              </tr>
              <tr>
                <td>Assigned By:</td>
                <td> {Assigned_by}</td>
              </tr>
              <tr>
                <td>Assigned To:</td>
                <td> {Assigned_to}</td>
              </tr>
              <tr>
                <td>Assigned On:</td>
                <td> {Assigned_from}</td>
              </tr>
              <tr>
                <td>Updated On:</td>
                <td> {Updated_on}</td>
              </tr>
              <tr>
                <td>Updated By:</td>
                <td> {Updated_by}</td>
              </tr> */}
              {/* <tr>
                <td>OS User:</td>
                <td> {OS_User}</td>
              </tr> */}

              <tr>
                <td>Server Serial:</td>
                <td>{Server_Serial}</td>
              </tr>
              <tr>
                <td>Manufacturer:</td>
                <td> {Manufacturer}</td>
              </tr>
              <tr>
                <td>Still Needed:</td>
                <td>{stillNeeded ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td>Notes:</td>
                <td>{Notes}</td>
              </tr>
              <tr>
                <td>Previous Project:</td>
                <td>{Previous_Project}</td>
              </tr>
              <tr>
                <td>BOM:</td>
                <td>{BOM}</td>
              </tr>
              <tr>
                <td>Support Case:</td>
                <td>{Support_case}</td>
              </tr>
              <tr>
                <td>Cluster Id:</td>
                <td>{Cluster_Id}</td>
              </tr>
              <tr>
                <td>Generation:</td>
                <td>{Generation}</td>
              </tr>
              <tr>
                <td>CPU Sockets:</td>
                <td>{CPU_Sockets}</td>
              </tr>
            </table>
            {/* <hr /> */}
            {/* <p>Manufacturer: {Manufacturer}</p>
                    <hr />
                    <p>Still Needed: {stillNeeded}</p>
                    <hr />
                    <p>Notes: {Notes}</p>
                    <hr />
                    <p>Previous Project: {Previous_Project}</p>
                    <hr />
                    <p>BOM: {BOM}</p>
                    <hr />
                    <p>Support Case: {Support_case}</p>
                    <hr />
                    <p>Cluster Id: {Cluster_Id}</p>
                    <hr />
                    <p>Generation: {Generation}</p>
                    <hr />
                    <p>CPU Sockets: {CPU_Sockets}</p> */}
            {/* </div> */}
          </div>
          <div className="subcanbtn">
            <Button
              sx={{ width: "25ch" }}
              variant="contained"
              // color="primary"
              id="platformClose"
              className={classes.cancel}
              onClick={handleModel4Close}
            >
              Close
            </Button>
          </div>
        </Container>
      </Dialog>

      <Dialog onClose={handleClose} open={openPowerStatus}>
      <DialogTitle>select Action</DialogTitle>
      <List sx={{ pt: 0 }}>
        {powerStatus && powerOnOptions.map((optionValue) => (
          <ListItem disableGutters>
            <ListItemButton onClick={() => onFuntion(powerStatusId,optionValue.label)} key={optionValue.label}>
              <ListItemAvatar>
              {/* <PowerSettingsNewIcon/> */}
              {optionValue?.icon}
              </ListItemAvatar>
              <ListItemText primary={optionValue.label} />
            </ListItemButton>
          </ListItem>
        ))}
        {!powerStatus && powerOffOptions.map((optionValue) => (
          <ListItem disableGutters>
            <ListItemButton onClick={() => onFuntion(powerStatusId,optionValue.label)} key={optionValue.label}>
              <ListItemAvatar>
              {optionValue?.icon}
              </ListItemAvatar>
              <ListItemText primary={optionValue.label} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem> */}
      </List>
      <Button 
      sx={{ width: "25ch" }}
      variant="contained"
      className="subcanbtn" onClick={() => setOpenPowerStatus(false)}>close</Button>

    </Dialog>

      <Dialog
      id="historic dlg"
        fullScreen
        // open={handleModelHistiricOpen}
        open={openmodelHistoric}
        onClose={handleModelHistiricClose}
        // TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }} style={{ background: "black" }}>
          <Toolbar style={{ background: "black" }}>
            <IconButton
            id="close_historic"
              edge="start"
              color="inherit"
              onClick={handleModelHistiricClose}
              aria-label="close"
            >
              <CloseIcon  />
            </IconButton>
            <Typography  sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Historic Details
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleModelHistiricClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <Historic
          data={historyoutput}
          options={options}
          // columns={poolColumns}
        />
      </Dialog>

      <Dialog id="edit server dlg" open={editOpen} fullWidth={fullWidth} maxWidth={maxWidth}>
        {/* <Box className={classes.dialogPaper}> */}
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <div className={classes.paper}>
            {/* <Avatar className={classes.avatar}></Avatar> */}
            <div className="addassetheaderline">
              <Box m={0}>
                <Typography component="h1" variant="h6" className="addasseth6">
                  Edit Server
                </Typography>
                <Typography component="h1" variant="body2"></Typography>
              </Box>
            </div>
            {/* <hr /> */}
            <form className={classes.form} onSubmit={(e) => submitEditedFn(e)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    // autoComplete="fname"
                    name="Asset_Name"
                    variant="outlined"
                    required
                    //   defaultValue="Small"
                    //size="small"
                    fullWidth
                    id="Asset_Name"
                    label="Server Name"
                    // placeholder="Asset Name"
                    // autoFocus
                    type="text"
                    value={Asset_Name}
                    onChange={(e) => setAsset_Name(e.target.value)}
                    // autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                    // required
                    //   defaultValue="Small"
                    //size="small"
                    fullWidth
                    id="Server_Serial"
                    label="Server Serial"
                    name="Server_Serial"
                    // autoFocus
                    type="text"
                    value={Server_Serial}
                    onChange={(e) => setServer_Serial(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                    // required
                    //   defaultValue="Small"
                    //size="small"
                    fullWidth
                    id="Server_Model"
                    label="Server Model"
                    name="Server_Model"
                    // autoFocus
                    type="text"
                    value={Server_Model}
                    onChange={(e) => setServer_Model(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                    required
                    //   defaultValue="Small"
                    //size="small"
                    fullWidth
                    id="Manufacturer"
                    label="Manufacturer"
                    name="Manufacturer"
                    // autoFocus
                    type="text"
                    value={Manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                    // required
                    //   defaultValue="Small"
                    //size="small"
                    fullWidth
                    id="Owner"
                    label="Owner"
                    name="Owner"
                    // autoFocus
                    type="text"
                    value={Owner}
                    onChange={(e) => setOwner(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                    // required
                    //   defaultValue="Small"
                    //size="small"
                    fullWidth
                    id="Category"
                    label="Category"
                    name="Category"
                    // autoFocus
                    type="text"
                    value={Category}
                    onChange={(e) => setOwner(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttonslabel-group-">
                      Still Needed
                    </FormLabel>
                    <RadioGroup
                      value={stillNeeded}
                      id="Still_Needed"
                      onChange={(e) => setStillNeeded(e.target.value)}
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value={false}
                        onChange={(e) => setStillNeeded(e.target.value)}
                        control={<Radio />}
                        label="No"
                      />
                      <FormControlLabel
                        value={true}
                        onChange={(e) => setStillNeeded(e.target.value)}
                        control={<Radio />}
                        label="Yes"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                    // required
                    //   defaultValue="Small"
                    //size="small"
                    fullWidth
                    id="Current_Project"
                    label="Current Project"
                    name="Current_Project"
                    // autoFocus
                    type="text"
                    value={Current_Project}
                    onChange={(e) => setCurrent_Project(e.target.value)}
                    // autoComplete="lname" setCurrent_Project
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                    // required
                    //   defaultValue="Small"
                    //size="small"
                    fullWidth
                    id="Notes"
                    label="Notes"
                    name="Notes"
                    // autoFocus
                    type="text"
                    value={Notes}
                    onChange={(e) => setNotes(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                    // required
                    //   defaultValue="Small"
                    //size="small"
                    fullWidth
                    id="Previous_Project"
                    label="Previous Project"
                    name="Previous_Project"
                    // autoFocus
                    type="text"
                    value={Previous_Project}
                    onChange={(e) => setPrevious_Project(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                    // required
                    //   defaultValue="Small"
                    //size="small"
                    fullWidth
                    id="BOM"
                    label="BOM"
                    name="BOM"
                    // autoFocus
                    type="text"
                    value={BOM}
                    onChange={(e) => setBOM(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                    // required
                    //   defaultValue="Small"
                    //size="small"
                    fullWidth
                    id="Support_case"
                    label="Support case"
                    name="Support_case"
                    // autoFocus
                    type="text"
                    value={Support_case}
                    onChange={(e) => setSupport_case(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    variant="outlined"
                    required
                    //   defaultValue="Small"
                    //size="small"
                    //   fullWidth
                    id="Cluster_Id"
                    label="Cluster ID"
                    fullWidth
                    name="Cluster_Id"
                    // autoFocus
                    type="text"
                    value={Cluster_Id}
                    onChange={(e) => setCluster_Id(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                
                    variant="outlined"
                    required
                
                    id="Asset_location"
                    label="Asset Location"
                    name="Asset_location"
                    // autoFocus
                    fullWidth
                    type="text"
                    value={Asset_location}
                    onChange={(e) => setAsset_location(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
             
                <Grid item xs={12} sm={3}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
               
                    fullWidth
                    id="Lab"
                    label="Lab"
                    name="Lab"
                    // autoFocus
                    type="text"
                    value={Lab}
                    onChange={(e) => setLab(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                 
                    fullWidth
                    id="Row"
                    label="Row"
                    name="Row"
                    // autoFocus
                    type="number"
                    value={Row}
                    onChange={(e) => setRow(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
                  
                    variant="outlined"
                 
                    fullWidth
                    id="Rack"
                    label="Rack"
                    name="Rack"
                    // autoFocus
                    type="number"
                    value={Rack}
                    onChange={(e) => setRack(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <br />

                <Grid item xs={12} sm={3}>
                  <TextField
                 
                    variant="outlined"
                
                    fullWidth
                    id="RU"
                    label="RU"
                    name="RU"
                    // autoFocus
                    type="number"
                    value={RU}
                    onChange={(e) => setRU(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
                
                    variant="outlined"
                  
                    fullWidth
                    id="DC_status"
                    label="DC status"
                    name="DC_status"
                    // autoFocus
                    type="text"
                    value={DC_status}
                    onChange={(e) => setDC_status(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
      

                <Grid item xs={12} sm={3}>
                 
                  <Autocomplete
                  
                    disablePortal
                    id="Cpu_model"
                    value={CPU_model}
                    onSelect={(e) => setCPU_model(e.target.value)}
                    options={Cpu_model }
                    xs={12}
                    sm={3}
                  
                    size="small"
                    renderInput={(params) => (
                      <TextField
                      id="Cpu_model"
                        variant="outlined"
                        {...params}
                        label="CPU Model"
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                  
                    variant="outlined"
                 
                    fullWidth
                    id="Generation"
                    label="Generation"
                    name="Generation"
                    // autoFocus
                    type="text"
                    value={Generation}
                    onChange={(e) => setGeneration(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                 
                  <Autocomplete
                    disablePortal
                    id="CPU_Sockets"
                    value={CPU_Sockets}
                    onSelect={(e) => setForm_factor(e.target.value)}
                    options={CPU_Socket}
                    xs={12}
                    sm={3}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        id="CPU_Sockets"
                        type={"integer"}
                        {...params}
                        label="CPU Sockets"
                        required
                      />
                    )}
                  />
                </Grid>

               
                <Grid item xs={12} sm={3}>
                  <TextField
                    // autoComplete="fname"
                    name="PDU_IP"
                    variant="outlined"
                  
                    fullWidth
                    id="PDU_IP"
                    label="PDU IP"
                   
                    type="text"
                    value={PDU_IP}
                    onChange={(e) => setPDU_IP(e.target.value)}
                    // autoFocus
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
                  
                    name="PDU_User"
                    variant="outlined"
                  
                    fullWidth
                    id="PDU_User"
                    label="PDU User"
                 
                    type="text"
                    value={PDU_User}
                    onChange={(e) => setPDU_User(e.target.value)}
                    // autoFocus
                  />
                </Grid>
                <br />
           
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
                    // autoComplete="fname"
                    name="Operating_System"
                    variant="outlined"
                  
                    fullWidth
                    id="Operating_System"
                    label="Operating System"
                   
                    type="text"
                    value={Operating_System}
                    onChange={(e) => setOperating_System(e.target.value)}
                    // autoFocus
                  />
                </Grid>

                <br />
              
              
                <Grid item xs={12} sm={3}>
                  <TextField
                    // autoComplete="fname"
                    name="BMC_IP"
                    //   variant="outlined-size-small"
                    variant="outlined"
                    required
                    //size="small"
                    id="BMC_IP"
                    label="BMC IP"
                    fullWidth
                    placeholder="Ex: 127.0.0.0"
                    // autoFocus
                    type="text"
                    value={BMC_IP}
                    onChange={(e) => setBMC_IP(e.target.value)}
                  />
                </Grid>
                <br />

                <Grid item xs={12} sm={3}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                    required
                
                    id="BMC_User"
                    label="BMC User"
                    name="BMC_User"
                    fullWidth
                    // autoFocus
                    type="text"
                    value={BMC_User}
                    onChange={(e) => setBMC_User(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <br />

       
                <br />

                <Grid item xs={12} sm={3}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                 
                    id="BMC_FQDN"
                    label="BMC FQDN"
                    name="BMC_FQDN"
                    fullWidth
                    // autoFocus
                    type="text"
                    // type="text"
                    value={BMC_FQDN}
                    onChange={(e) => setBMC_FQDN(e.target.value)}

                   
                  />
                </Grid>
            

                <br />
           
                <Grid item xs={12} sm={3}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                   
                    id="OS_IP"
                    label="OS IP"
                    name="OS_IP"
                    // autoFocus
                    fullWidth
                    type="text"
                    value={OS_IP}
                    onChange={(e) => setOS_IP(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                 
                    id="OS_User"
                    label="OS User"
                    name="OS_User"
                    fullWidth
                    // autoFocus
                    type="text"
                    value={OS_User}
                    onChange={(e) => setOS_User(e.target.value)}

             
                  />
                </Grid>
                <br />
              
                <Grid item xs={12} sm={3}>
                  <TextField
                   
                    variant="outlined"
                   
                    fullWidth
                    id="DIMM_Size"
                    label="DIMM Size"
                    name="DIMM_Size"
                    // autoFocus
                    type="text"
                    value={DIMM_Size}
                    onChange={(e) => setDIMM_Size(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                  
                    fullWidth
                    id="DIMM_Capacity"
                    label="DIMM Capacity"
                    name="DIMM_Capacity"
                    // autoFocus
                    type="text"
                    value={DIMM_Capacity}
                    onChange={(e) => setDIMM_Capacity(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
               
                  <Autocomplete
                    disablePortal
                    id="Storage_Vendor"
                    value={Storage_Vendor}
                    onSelect={(e) => setStorage_Vendor(e.target.value)}
                    options={Storage_Vendor1}
                    xs={12}
                    sm={3}
                    renderInput={(params) => (
                      <TextField
                      id="Storage_Vendor"
                        variant="outlined"
                        {...params}
                        label="Storage Vendor"
                        required
                      />
                    )}
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                
                  <Autocomplete
                    disablePortal
                    id="Storage_Controller"
                    value={Storage_Controller}
                    onSelect={(e) => setStorage_Controller(e.target.value)}
                    options={Storage_Controller1}
                    xs={12}
                    sm={3}
                    renderInput={(params) => (
                      <TextField
                      id="Storage_Controller"
                        sx={{ width: 155 }}
                        variant="outlined"
                        {...params}
                        label="Storage Controller"
                        required
                      />
                    )}
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
                   
                    variant="outlined"
                 
                    fullWidth
                    id="Storage_Capacity"
                    label="Storage Capacity"
                    name="Storage_Capacity"
                    // autoFocus
                    type="text"
                    value={Storage_Capacity}
                    onChange={(e) => setStorage_Capacity(e.target.value)}

                
                  />
                </Grid>
             
                <Grid item xs={12} sm={3}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttonslabel-group-">
                      Network Type
                    </FormLabel>
                    <RadioGroup
                      value={network_Type}
                      id="Network_Type"
                      onChange={(e) => setNetwork_Type(e.target.value)}
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value={false}
                        onChange={(e) => setNetwork_Type(e.target.value)}
                        control={<Radio />}
                        label="Private"
                      />
                      <FormControlLabel
                        value={true}
                        onChange={(e) => setNetwork_Type(e.target.value)}
                        control={<Radio />}
                        label="Public"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                
                  <Autocomplete
                    disablePortal
                    id="Network_speed"
                    value={Network_speed}
                    onSelect={(e) => setNetwork_speed(e.target.value)}
                    options={Network_speed1}
                    xs={12}
                    sm={3}
                    renderInput={(params) => (
                      <TextField
                      id="Network_speed"
                        variant="outlined"
                        {...params}
                        label="Network Speed"
                        required
                      />
                    )}
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                
                  <Autocomplete
                    disablePortal
                    value={Number_Of_Network_Ports}
                    id="Number_Of_Network_Ports"
                    onSelect={(e) => setNumber_Of_Network_Ports(e.target.value)}
                    options={Number_Of_Network_Ports1}
                    xs={12}
                    sm={3}
                    renderInput={(params) => (
                      <TextField
                      id="Number_Of_Network_Ports"
                        sx={{ width: 220 }}
                        variant="outlined"
                        {...params}
                        label="No.Of Network Ports"
                        style={{ alignContent: "center" }}
                        required
                      />
                    )}
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
                  
                    variant="outlined"
                 
                    fullWidth
                    id="Special_Switching_Needs"
                    label="Special Switching Needs"
                    name="Special_Switching_Needs"
                    // autoFocus
                    type="text"
                    value={Special_Switching_Needs}
                    onChange={(e) => setSpecial_Switching_Needs(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
           
                <Grid item xs={12} sm={3}>
                  <TextField
                   
                    variant="outlined"
                    required
                 
                    id="Purpose"
                    label="Purpose"
                    fullWidth
                    name="Purpose"
                    value={Purpose}
                    // autoFocus
                    type="text"
                    onChange={(e) => setPurpose(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="Required_Start_Date"
                    type={"date"}
                    value={Required_Start_Date}
                    onChange={(e) => setRequired_Start_Date(e.target.value)}
                    placeholder="Required_Start_Date"
                    label="Required Start Date"
                    variant="outlined"
                    fullWidth
                    // required
                    focused
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="Required_Finish_Date"
                    type={"date"}
                    autoComplete
                    value={Required_Finish_Date}
                    onChange={(e) => setRequired_Finish_Date(e.target.value)}
                    placeholder="Required_Finish_Date"
                    label="Required End Date"
                    variant="outlined"
                    fullWidth
                    // required
                    focused
                  />
                </Grid>

              </Grid>
              <div className="subcanbtn">
                <Button
            
                  type="submit"
                  value="SUBMIT"
                  sx={{ width: "25ch" }}
                  variant="contained"
                  // color="info"
                  id="addAssetBtn"
                  className={classes.add}
                >
                  Save
                </Button>
                <Button
            
                  sx={{ width: "25ch" }}
                  variant="contained"
                  // color="primary"
                  id="addAssetClose"
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

     
      <Dialog id="editpool dlg" open={editPoolOpen} className={classes.dialog}>
       
        <Container
          component="main"
          className={classes.dialogplatformContainer}
          style={{ alignContent: "center" }}
        >
          <CssBaseline />
          <div className={classes.paper}>
            <div className="editassetheaderline">
              <Box m={2}>
                <Typography component="h1" variant="h6">
                  Edit Asset
                </Typography>
                <Typography component="h1" variant="body2"></Typography>
              </Box>
            </div>

         

            <form className={classes.form} onSubmit={(e) => submitEditedFn(e)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    //size="small"
                    fullWidth
                    id="editAsset_Location"
                    label="Asset Location"
                    name="editAsset_Location"
                    // focused
                    type="text"
                    value={Asset_location}
                    onChange={(e) => setAsset_location(e.target.value)}
                  
                  />
                </Grid>
               

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="editPDU_IP"
                    variant="outlined"
                    fullWidth
                    id="editPDU_IP"
                    label="PDU IP"
                    type="text"
                    value={PDU_IP}
                    onChange={(e) => setPDU_IP(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="editPDU_User"
                    variant="outlined"
                    fullWidth
                    id="editPDU_User"
                    label="PDU User"
                    type="text"
                    value={PDU_User}
                    onChange={(e) => setPDU_User(e.target.value)}
                  />
                </Grid>
              

                <Grid item xs={12} sm={6}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                  
                    fullWidth
                    id="editCurrent_Project"
                    label="Current Project"
                    name="editCurrent_Project"
                    // autoFocus
                    type="text"
                    value={CurrentProject}
                    onChange={(e) => setCurrentProject(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                   
                    variant="outlined"
                   
                    fullWidth
                    id="editNotes"
                    label="Notes"
                    name="editNotes"
                    // autoFocus
                    type="text"
                    value={Notes}
                    onChange={(e) => setNotes(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                   
                    fullWidth
                    id="editPrevious_Project"
                    label="Previous Project"
                    name="editPrevious_Project"
                    // autoFocus
                    type="text"
                    value={Previous_Project}
                    onChange={(e) => setPrevious_Project(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                   
                    fullWidth
                    id="editBOM"
                    label="BOM"
                    name="editBOM"
                    // autoFocus
                    type="text"
                    value={BOM}
                    onChange={(e) => setBOM(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                     
                    fullWidth
                    id="editSupport_case"
                    label="Support case"
                    name="editSupport_case"
                    // autoFocus
                    type="text"
                    value={Support_case}
                    onChange={(e) => setSupport_case(e.target.value)}

                    
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                  
                    fullWidth
                    id="editGeneration"
                    label="Generation"
                    name="editGeneration"
                    // autoFocus
                    type="text"
                    value={Generation}
                    onChange={(e) => setGeneration(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                
                    fullWidth
                    id="editModel"
                    label="Server Model"
                    name="editModel"
                    // autoFocus
                    type="text"
                    value={Server_Model}
                    onChange={(e) => setServer_Model(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                  
                    fullWidth
                    id="editForm_factor"
                    label="CPU Sockets"
                    name="editForm_factor"
                    // autoFocus
                    type="text"
                    value={CPU_Sockets}
                    onChange={(e) => setForm_factor(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                  
                    fullWidth
                    id="editSerial"
                    label="Server Serial"
                    name="editSerial"
                    // autoFocus
                    type="text"
                    value={Server_Serial}
                    onChange={(e) => setServer_Serial(e.target.value)}
                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                 
                    fullWidth
                    id="editLab"
                    label="Lab"
                    name="editLab"
                    // autoFocus
                    type="text"
                    value={Lab}
                    onChange={(e) => setLab(e.target.value)}

                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
               
                    fullWidth
                    id="editRow"
                    label="Row"
                    name="editRow"
                    // autoFocus
                    type="number"
                    value={Row}
                    onChange={(e) => setRow(e.target.value)}

                 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  
                    variant="outlined"
                   
                    fullWidth
                    id="editRack"
                    label="Rack"
                    name="editRack"
                
                    type="number"
                    value={Rack}
                    onChange={(e) => setRack(e.target.value)}

                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  
                    variant="outlined"
                  
                    fullWidth
                    id="editRU"
                    label="RU"
                    name="editRU"
                 
                    type="number"
                    value={RU}
                    onChange={(e) => setRU(e.target.value)}

                  
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                   
                    variant="outlined"
                  
                    fullWidth
                    id="editProcessor"
                    label="Processor"
                    name="editProcessor"
                    // autoFocus
                    type="text"
                    value={Processor}
                    onChange={(e) => setProcessor(e.target.value)}

                    
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                   
                    variant="outlined"
                 
                    fullWidth
                    id="editDC_status"
                    label="DC status"
                    name="editDC_status"
                    // autoFocus
                    type="text"
                    value={DC_status}
                    onChange={(e) => setDC_status(e.target.value)}
                   
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                   
                    variant="outlined"
                   
                    fullWidth
                    id="editOwner"
                    label="Owner"
                    name="editOwner"
                    // autoFocus
                    type="text"
                    value={Owner}
                    onChange={(e) => setOwner(e.target.value)}

                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                  
                    variant="outlined"
                  
                    fullWidth
                    id="editCategory"
                    label="Category"
                    name="editCategory"
                   
                    type="text"
                    value={Category}
                    onChange={(e) => setCategory(e.target.value)}

                  
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttonslabel-group-">
                      Still Needed
                    </FormLabel>
                    <RadioGroup
                      value={stillNeeded}
                      id="editStill_Needed"
                      onChange={(e) => setStillNeeded(e.target.value)}
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value={false}
                        onChange={(e) => setStillNeeded(e.target.value)}
                        control={<Radio />}
                        label="No"
                      />
                      <FormControlLabel
                        value={true}
                        onChange={(e) => setStillNeeded(e.target.value)}
                        control={<Radio />}
                        label="Yes"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <div className="subcanbtn">
                <Button
              
                  type="submit"
                  value="SUBMIT"
                  sx={{ width: "25ch" }}
                  variant="contained"
             
                  id="editAssetBtn"
                  className={classes.add}
                >
                  Save
                </Button>
                <Button
              
                  sx={{ width: "25ch" }}
                  variant="contained"
               
                  id="editAssetClose"
                  className={classes.cancel}
                  onClick={handleEditPoolClose}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Container>
     
      </Dialog>
  

    
      <Dialog id="createserver dailog" open={open} fullWidth={fullWidth} maxWidth={"xl"}>
       
        <Container component="main" maxWidth="xl">
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
                <Grid item xs={12} sm={3}>
                  <TextField
                 
                    name="Asset_Name"
                    variant="outlined"
                    required
                 
                    fullWidth
                    id="Asset_Name"
                    label="Server Name"
                  
                    type="text"
                    value={data.Asset_Name}
                    onChange={(e) => handle(e)}
                  
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                   
                    variant="outlined"
                   
                    fullWidth
                    id="Server_Serial"
                    label="Server Serial"
                    name="Server_Serial"
                 
                    type="text"
                    value={data.Server_Serial}
                    onChange={(e) => handle(e)}

                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    
                    variant="outlined"
                   
                    fullWidth
                    id="Server_Model"
                    label="Server Model"
                    name="Server_Model"
                    
                    type="text"
                    value={data.Server_Model}
                    onChange={(e) => handle(e)}

                  
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                  
                    variant="outlined"
                    required
                
                    fullWidth
                    id="Manufacturer"
                    label="Manufacturer"
                    name="Manufacturer"
                    // autoFocus
                    type="text"
                    value={data.Manufacturer}
                    onChange={(e) => handle(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                 
                    variant="outlined"
                 
                    fullWidth
                    id="Owner"
                    label="Owner"
                    name="Owner"
                    // autoFocus
                    type="text"
                    value={data.Owner}
                    onChange={(e) => handle(e)}

                  
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                   
                    variant="outlined"
                   
                    fullWidth
                    id="Category"
                    label="Category"
                    name="Category"
                    // autoFocus
                    type="text"
                    value={data.Category}
                    onChange={(e) => handle(e)}

                  
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttonslabel-group-">
                      Still Needed
                    </FormLabel>
                    <RadioGroup
                      value={stillNeeded}
                      id="Still_Needed"
                      onChange={(e) => setStillNeeded(e.target.value)}
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value={false}
                        onChange={(e) => setStillNeeded(e.target.value)}
                        control={<Radio />}
                        label="No"
                      />
                      <FormControlLabel
                        value={true}
                        onChange={(e) => setStillNeeded(e.target.value)}
                        control={<Radio />}
                        label="Yes"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                   
                    variant="outlined"
                  
                    fullWidth
                    id="Current_Project"
                    label="Current Project"
                    name="Current_Project"
                 
                    type="text"
                    value={data.Current_Project}
                    onChange={(e) => handle(e)}

                
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                  
                    variant="outlined"
                  
                    fullWidth
                    id="Notes"
                    label="Notes"
                    name="Notes"
                    // autoFocus
                    type="text"
                    value={data.Notes}
                    onChange={(e) => handle(e)}

                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    
                    variant="outlined"
                    fullWidth
                    id="Previous_Project"
                    label="Previous Project"
                    name="Previous_Project"
                    // autoFocus
                    type="text"
                    value={data.Previous_Project}
                    onChange={(e) => handle(e)}

                 
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                   
                    variant="outlined"
                   
                    fullWidth
                    id="BOM"
                    label="BOM"
                    name="BOM"
                    // autoFocus
                    type="text"
                    value={data.BOM}
                    onChange={(e) => handle(e)}

                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                   
                    variant="outlined"
                  
                    fullWidth
                    id="Support_case"
                    label="Support case"
                    name="Support_case"
                    // autoFocus
                    type="text"
                    value={data.Support_case}
                    onChange={(e) => handle(e)}

                    // autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    variant="outlined"
                    required
                
                    id="Cluster_Id"
                    label="Cluster ID"
                    fullWidth
                    name="Cluster_Id"
                    // autoFocus
                    type="text"
                    onChange={(e) => handle(e)}

                
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                   
                    variant="outlined"
                    required
                   
                    id="Asset_location"
                    label="Asset Location"
                    name="Asset_location"
                    
                    fullWidth
                    type="text"
                    value={data.Asset_location}
                    onChange={(e) => handle(e)}

                
                  />
                </Grid>
               
                <Grid item xs={12} sm={3}>
                  <TextField
                    
                    variant="outlined"
                  
                    fullWidth
                    id="Lab"
                    label="Lab"
                    name="Lab"
                
                    type="text"
                    value={data.Lab}
                    onChange={(e) => handle(e)}

                                                                      
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
                                   
                    variant="outlined"
                 
                    fullWidth
                    id="Row"
                    label="Row"
                    name="Row"
                  
                    type="number"
                    value={data.Row}
                    onChange={(e) => handle(e)}

                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
                   
                    variant="outlined"
                    
                    fullWidth
                    id="Rack"
                    label="Rack"
                    name="Rack"
                  
                    type="number"
                    value={data.Rack}
                    onChange={(e) => handle(e)}

               
                  />
                </Grid>
                <br />

                <Grid item xs={12} sm={3}>
                  <TextField
                    
                    variant="outlined"
                 
                    fullWidth
                    id="RU"
                    label="RU"
                    name="RU"
                 
                    type="number"
                    value={data.RU}
                    onChange={(e) => handle(e)}

                    
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
                    
                    variant="outlined"
                
                    fullWidth
                    id="DC_status"
                    label="DC status"
                    name="DC_status"
                 
                    type="text"
                    value={data.DC_status}
                    onChange={(e) => handle(e)}

                 
                  />
                </Grid>
            

                <Grid item xs={12} sm={3}>
              
                  <Autocomplete
                 
                    disablePortal
                    id="Cpu_model"
                    onSelect={(e) => handle(e)}
                    options={Cpu_model}
                    xs={12}
                    sm={3}
          
                    size="small"
                    renderInput={(params) => (
                      <TextField
                      id="Cpu_model"
                        variant="outlined"
                        {...params}
                        label="CPU Model"
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
               
                    variant="outlined"
                 
                    fullWidth
                    id="Generation"
                    label="Generation"
                    name="Generation"
            
                    type="text"
                    value={data.Generation}
                    onChange={(e) => handle(e)}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                
                  <Autocomplete
                    disablePortal
                    id="CPU_Sockets"
                    onSelect={(e) => handle(e)}
                    options={CPU_Socket}
                    xs={12}
                    sm={3}
                    renderInput={(params) => (
                      <TextField
                      id="CPU_Sockets"
                        variant="outlined"
                        type={"integer"}
                        {...params}
                      
                        label="CPU Sockets"
                        required
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                
                    name="PDU_IP"
                    variant="outlined"
                
                    fullWidth
                    id="PDU_IP"
                    label="PDU IP"
               
                    type="text"
                    value={data.PDU_IP}
                    onChange={(e) => handle(e)}
                
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
                  
                    name="PDU_User"
                    variant="outlined"
              
                    fullWidth
                    id="PDU_User"
                    label="PDU User"
                  
                    type="text"
                    value={data.PDU_User}
                    onChange={(e) => handle(e)}
              
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
                
                    name="PDU_Password"
                    variant="outlined"
               
                    fullWidth
                    id="PDU_Password"
                    label="PDU Password"
               
                    type="password"
                    value={data.PDU_Password}
                    onChange={(e) => handle(e)}
                  
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
                    
                    name="Operating_System"
                    variant="outlined"
                  
                    fullWidth
                    id="Operating_System"
                    label="Operating System"
                
                    type="text"
                    value={data.Operating_System}
                    onChange={(e) => handle(e)}
                  
                  />
                </Grid>

                <br />
               
                <Grid item xs={12} sm={3}>
                  <TextField
             
                    name="BMC_IP"
                   
                    variant="outlined"
                    required
                
                    id="BMC_IP"
                    label="BMC IP"
                    fullWidth
                    placeholder="Ex: 127.0.0.0"
             
                    type="text"
                    value={data.BMC_IP}
                    onChange={(e) => handle(e)}
                  />
                </Grid>
                <br />

                <Grid item xs={12} sm={3}>
                  <TextField
             
                    variant="outlined"
                    required
              
                    id="BMC_User"
                    label="BMC User"
                    name="BMC_User"
                    fullWidth
                  
                    type="text"
                    value={data.BMC_User}
                    onChange={(e) => handle(e)}

                   
                  />
                </Grid>
                <br />

                <Grid item xs={12} sm={3}>
                  <TextField
                  
                    variant="outlined"
                    required
                  
                    id="BMC_Password"
                    label="BMC Password"
                    name="BMC_Password"
                    fullWidth
                
                    type="password"
                
                    value={data.BMC_Password}
                    onChange={(e) => handle(e)}

                 
                  />
                </Grid>
                <br />

                <Grid item xs={12} sm={3}>
                  <TextField
                   
                    variant="outlined"
                 
                    id="BMC_FQDN"
                    label="BMC FQDN"
                    name="BMC_FQDN"
                    fullWidth
                 
                    type="text"
                  
                    value={data.BMC_FQDN}
                    onChange={(e) => handle(e)}

                  />
                </Grid>
              

                <br />
                
                <Grid item xs={12} sm={3}>
                  <TextField
              
                    variant="outlined"
                  
                    id="OS_IP"
                    label="OS IP"
                    name="OS_IP"
                 
                    fullWidth
                    type="text"
                    value={data.OS_IP}
                    onChange={(e) => handle(e)}

                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
                   
                    variant="outlined"
                  
                    id="OS_User"
                    label="OS User"
                    name="OS_User"
                    fullWidth
                  
                    type="text"
                    value={data.OS_User}
                    onChange={(e) => handle(e)}

                  
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
                  
                    variant="outlined"
                   
                    id="OS_Password"
                    label="OS Password"
                    name="OS_Password"
                  
                    fullWidth
                    type="password"
                    value={data.OS_Password}
                    onChange={(e) => handle(e)}

                   
                  />
                </Grid>
               
                <Grid item xs={12} sm={3}>
                  <TextField
              
                    variant="outlined"
                 
                    fullWidth
                    id="DIMM_Size"
                    label="DIMM Size"
                    name="DIMM_Size"
                    // autoFocus
                    type="text"
                    value={data.DIMM_Size}
                    onChange={(e) => handle(e)}

               
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
                   
                    variant="outlined"
               
                    fullWidth
                    id="DIMM_Capacity"
                    label="DIMM Capacity"
                    name="DIMM_Capacity"
                  
                    type="text"
                    value={data.DIMM_Capacity}
                    onChange={(e) => handle(e)}

                 
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
              
                  <Autocomplete
                    disablePortal
                    id="Storage_Vendor"
                    onSelect={(e) => handle(e)}
                    options={Storage_Vendor1}
                    xs={12}
                    sm={3}
                    renderInput={(params) => (
                      <TextField
                      id="Storage_Vendor"
                        variant="outlined"
                        {...params}
                        label="Storage Vendor"
                        required
                      />
                    )}
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
              
                  <Autocomplete
                    disablePortal
                    id="Storage_Controller"
                    onSelect={(e) => handle(e)}
                    options={Storage_Controller1}
                    xs={12}
                    sm={3}
                    renderInput={(params) => (
                      <TextField
                      id="Storage_Controller"
                        sx={{ width: 155 }}
                        variant="outlined"
                        {...params}
                        label="Storage Controller"
                        required
                      />
                    )}
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
           
                    variant="outlined"
           
                    fullWidth
                    id="Storage_Capacity"
                    label="Storage Capacity"
                    name="Storage_Capacity"
                    // autoFocus
                    type="text"
                    value={data.Storage_Capacity}
                    onChange={(e) => handle(e)}

               
                  />
                </Grid>
               
                <Grid item xs={12} sm={3}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttonslabel-group-">
                      Network Type
                    </FormLabel>
                    <RadioGroup
                      value={network_Type}
                      id="Network_Type"
                      onChange={(e) => setNetwork_Type(e.target.value)}
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value={false}
                        onChange={(e) => setNetwork_Type(e.target.value)}
                        control={<Radio />}
                        label="Private"
                      />
                      <FormControlLabel
                        value={true}
                        onChange={(e) => setNetwork_Type(e.target.value)}
                        control={<Radio />}
                        label="Public"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
              
                  <Autocomplete
                    disablePortal
                    id="Network_speed"
                    onSelect={(e) => handle(e)}
                    options={Network_speed1}
                    xs={12}
                    sm={3}
                    renderInput={(params) => (
                      <TextField
                      id="Network_speed"
                        variant="outlined"
                        {...params}
                        label="Network Speed"
                        required
                      />
                    )}
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                 
                  <Autocomplete
                    disablePortal
                    id="Number_Of_Network_Ports"
                    onSelect={(e) => handle(e)}
                    options={Number_Of_Network_Ports1}
                    item
                    xs={12}
                    sm={3}
                    renderInput={(params) => (
                      <TextField
                      id="Number_Of_Network_Ports"
                        sx={{ width: 155 }}
                        variant="outlined"
                        {...params}
                        label="No.Of Network Ports"
                        style={{ alignContent: "center" }}
                        required
                      />
                    )}
                  />
                </Grid>
                <br />
                <Grid item xs={12} sm={3}>
                  <TextField
              
                    variant="outlined"
                 
                    fullWidth
                    id="Special_Switching_Needs"
                    label="Special Switching Needs"
                    name="Special_Switching_Needs"
                    // autoFocus
                    type="text"
                    value={data.Special_Switching_Needs}
                    onChange={(e) => handle(e)}

                  
                  />
                </Grid>
             
                <Grid item xs={12} sm={3}>
                  <TextField
                    //   variant="outlined-size-small"
                    variant="outlined"
                    required
               
                    id="Purpose"
                    label="Purpose"
                    fullWidth
                    name="Purpose"
                    // autoFocus
                    type="text"
                    onChange={(e) => handle(e)}

                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="Required_Start_Date"
                    type={"date"}
                    onChange={(e) => handle(e)}
                    value={data.Required_Start_Date}
                    placeholder="Required_Start_Date"
                    label="Required Start Date"
                    variant="outlined"
                    fullWidth
                    // required
                    focused
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="Required_Finish_Date"
                    type={"date"}
                    onChange={(e) => handle(e)}
                    value={data.Required_Finish_Date}
                    placeholder="Required_Finish_Date"
                    label="Required End Date"
                    variant="outlined"
                    fullWidth
                    // required
                    focused
                  />
                </Grid>

              
              </Grid>
              <div className="subcanbtn">
                <Button
                 
                  type="submit"
                  value="SUBMIT"
                  sx={{ width: "25ch" }}
                  variant="contained"
               
                 id="add server bt"
                  className={classes.add}
                >
                  Add
                </Button>
                <Button
              
                  sx={{ width: "25ch" }}
                  variant="contained"
                  // color="primary"
                  id="addAssetClose"
                  className={classes.cancel}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
      
        </Container>
   
      </Dialog>

      <div>
        
      

        <Stack style={{ marginTop: 65 }}>
          <Item>
  
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange} aria-label="Asset API tabs">
                  <Tab id="resrve tab"
                    label={servertitle}
                    // label="My Servers"
                    value="1"
                    // onClick={reservedAssetApi}
                    // onClick={myAssetApi}
                    onClick={reservedOrMyassetApi}
                  />
                 
                  <Tab id="pooltab" label="Server Pool" value="2" onClick={poolAssetApi} />
                </TabList >
              </Box>
              <TabPanel value="1">
                <CacheProvider value={muiCache}>
                 
                  <MUIDataTable
                  id="reserv table "
                    // title={servertitle}
                    data={reservedServersData}
                    // page={totalpages}
                    columns={columns}
                    options={options}
                    className="themeOver"
                  />
               
                </CacheProvider>
              </TabPanel>
   
              <TabPanel value="2">
                <CacheProvider value={muiCache}>
           
                  <div>
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
                   

                      <Datatable
                      id="pooldata"
                        className="table"
                        data={allServersData}
                        columns={poolColumns}
                        options={options}
                      />
                    )}

                  </div>
               
                </CacheProvider>
              </TabPanel>
            </TabContext>
         
          </Item>
        </Stack>
      </div>
   
    </>
  );
};

export default ServersComponent;
