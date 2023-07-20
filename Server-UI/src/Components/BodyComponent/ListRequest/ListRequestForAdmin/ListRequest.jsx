import MUIDataTable from "mui-datatables";
import * as React from "react";
import Box from "@mui/material/Box";
import MarkUnreadChatAltRoundedIcon from "@mui/icons-material/MarkUnreadChatAltRounded";
import swal from "sweetalert";
import moment from "moment/moment";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import api from "../../../../utils/api";
import useAuth from "../../../auth";
import PulseLoader from "react-spinners/PulseLoader";
import createCache from "@emotion/cache";
import { Visibility } from "@mui/icons-material";
import { Button,Container,CssBaseline,Dialog } from "@material-ui/core";
import { Tooltip } from "@mui/material";
import { useStyles } from "../../BodyStyles";
import { useEffect, useState } from "react";
import { CacheProvider } from "@emotion/react";
import { columnsDetails } from "../ListRequestServices/Columns";
import { UserCommentsComponent } from "../ListRequestServices/UserComments";
import { AddServerComponent } from "./AddServer";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

const ListRequest = () => {
  const users = useAuth();
  const [openUserCommentsModel, setOpenUserCommentsModel] = React.useState(false);
  const [openAddServerModel, setOpenAddServerModel] = React.useState(false);
  const [openMore, setOpenMore] = React.useState(false);
  const [AddServerProps,setAddServerProps] = useState()
  const classes = useStyles();
  const [serverMoreDetails, setServerMoreDetails] = useState([])

  const handleAddServerModelOpen = (s) => {
    setOpenAddServerModel(true);
  };

  const handleAddServerModelCLose = () => {
    setOpenAddServerModel(false);
  };

  const handleUserCommentsModelOpen = (s) => {
    setOpenUserCommentsModel(true);
  };

  const handleUserCommentsModelClose = () => {
    setOpenUserCommentsModel(false);
  };

  const platformFn = (s,chatId,index) => {
    setchatindex(index);
    setChatID(chatId);
    handleUserCommentsModelOpen(s);
  };

  const handleModelMoreOpen = () => {
    setOpenMore(true);
  };

  const handleModelMoreClose = () => {
    setOpenMore(false);
  };

  const add = (id, userNo, rowData) => {
    setAddServerProps({
      ID : id,
      Userno : userNo,
      rowDataArr : rowData,
      users : users
    })
    handleAddServerModelOpen(userNo);
  };

  const moreData = (rowDataArray) => {
    handleModelMoreOpen();
    setServerMoreDetails([
      {
        labelName : "Requester:",
         value : rowDataArray[3] // Requester
      },
      {
        labelName : "Required Start Date:",
        value : moment(rowDataArray[4]).format("MMMM Do YYYY"), //Required_Start_Date
      },
      {
        labelName : "Required End Date:",
        value : moment(rowDataArray[5]).format("MMMM Do YYYY"), //Required_End_Date
      },
      {
        labelName : "Manufacturer:",
        value :  rowDataArray[6], //Manufacturer
      },
      {
        labelName : "Operating System:",
        value :  rowDataArray[8], //Operating_System
      },
      {
        labelName : "CPU Model:",
        value : rowDataArray[9], //Cpu_model
      },
      {
        labelName : "CPU Sockets:",
        value : rowDataArray[10], //CPU_Sockets
      },
      {
        labelName : "DIMM Capacity:",
        value : rowDataArray[12], //DIMM_Capacity
      },
      {
        labelName : "DIMM Size:",
        value : rowDataArray[11], //DIMM_Size
      },
      {
        labelName : "Network Type:",
        value : (rowDataArray[18]? "Yes" : "No"), //Network_Type
      },
      {
        labelName : "Network Speed:",
        value : rowDataArray[17], // Network_speed
      },
      {
        labelName : "Number Of Network Ports:",
        value : rowDataArray[16], //Number_Of_Network_Ports
      },
      {
        labelName : "Storage Capacity(In GB):",
        value : rowDataArray[15], //Storage_Capacity
      },
      {
        labelName : "Storage Controller:",
        value : rowDataArray[14], //Storage_Controller
      },
      {
        labelName : "Storage Vendor:",
        value : rowDataArray[13], //Storage_Vendor
      },
      {
        labelName : "Special Switching Needs:",
        value : rowDataArray[19], //Special_Switching_Needs
      },
      {
        labelName : "Updated On:",
        value : moment(rowDataArray[20]).format("MMMM Do YYYY, h:mm:ss a") //Updated_on
      },
      {
        labelName : "Updated By:",
        value : rowDataArray[21], //Updated_by
      },
    ])
  };

  const columns = columnsDetails
  let index = columns.findIndex(data=>data.name=='Actions')
  columns[index].options['customBodyRender'] = (value, tableMeta, updateValue) => {
      return (
        <div className="reserverflexicons">
          <Tooltip id="chat tool" title="Chat">
            <a
              onClick={() => {
                console.log(tableMeta, "<----vrev");
                platformFn(tableMeta.rowData[19],tableMeta.rowIndex + 1, tableMeta?.rowIndex + 1);
              }}
            >
              <MarkUnreadChatAltRoundedIcon id="chat btn " />
            </a>
          </Tooltip>
          <Tooltip id="add server tool" title="Add Server">
            <a
              onClick={() =>
                add(
                  tableMeta.rowData[1],
                  tableMeta.rowData[0],
                  tableMeta.rowData
                )
              }
            >
              <AddIcon id="add server btn " />
            </a>
          </Tooltip>
          <Tooltip id="more tool"title="more">
            <a
              className="moreicon"
              onClick={() => moreData(tableMeta.rowData)}
              color="primary"
            >
              <Visibility id="more btn " />
            </a>
          </Tooltip>
        </div>
      );
    }
  const [usersData, setUsersData] = React.useState([]);
  const options = {
    textLabels: {
      body: {
        noMatch: " No Records Available",
        // toolTip: "Sort",
        // columnHeaderTooltip: column => `Sort for ${column.label}`
      },
    },
    filterType: "checkbox",
    print: false,
    selectableRows: false,
    rowsPerPage: [5],
    download: false,
    search: false,
    rowsPerPageOptions: [3, 5, 10, 15],
    viewColumns: false,
    responsive: true,
    filter: false,
    onChangePage(currentPage) {
      console.log(currentPage, "<-nbvhjvj");
    },
    onChangeRowsPerPage(numberOfRows) {
      console.log(numberOfRows, "<--hbbjbh");
    },
    // downloadOptions: {
    //   filename: "List request.csv",
    //   filterOptions: {
    //     useDisplayedColumnsOnly: true,
    //   },
    // },
  };

  const [loading, setloading] = useState(false);
  const [count, SetCount] = useState(10);
  const [page, SetPage] = useState("");

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 1000);
    getUsersUrl();
  }, [count, page]);

  const getUsersUrl = async () => {
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
      .post("list_request", a)
      .then((res) => {
        setloading(true);
        if (res.status === 200) {
          console.log("data now ", res);
          SetCount(res?.data?.Total_entry);
          setUsersData(res.data?.Listusers);
          console.log("user comment", res);

          // setHistoryData(res.data.Historic_Details);
        } else if (res.status === 202) {
          swal(res.data.Message);
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
          console.log(error); //Please Authenticate or whatever returned from server
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

  const [chatID, setChatID] = useState(0);
  const [chatindex, setchatindex] = useState();
  const [output, setOutput] = useState({User_No:users.User_Id,Requester:users.Username});

  return (
    <>
      {openUserCommentsModel && <UserCommentsComponent title='User Comments' output={output} chatID={chatID} chatindex={chatindex} handleUserCommentsModelClose={handleUserCommentsModelClose} />}
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
          <hr />
          <div className="">
            <table className="tablee customTable">
              {
                serverMoreDetails.map(moreDetails=>(
                  <tr>
                    <td>{moreDetails.labelName}</td>
                    <td>{moreDetails.value}</td>
                  </tr>
                ))
              }
            </table>
          </div>
          <div className="subcanbtn">
            <Button
            
              sx={{ width: "25ch" }}
              variant="contained"
              id="moreClose"
              className={classes.cancel}
              onClick={handleModelMoreClose}
            >
              Close
            </Button>
          </div>
        </Container>
      </Dialog>
      {openAddServerModel && <AddServerComponent AddServerProps={AddServerProps} handleAddServerModelCLose={handleAddServerModelCLose} />}

      <Box sx={{ width: "100%", typography: "body1" }}>
        <Box sx={{ width: "100%", typography: "body2" }}>
          <CacheProvider value={muiCache}>
            {/* <ThemeProvider theme={theme}> */}
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
                    // color={color}
                    loading={loading}
                    // cssOverride={override}
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
                  data={usersData}
                  columns={columns}
                  options={options}
                  className="themeOver"
                />
              )}
            </div>
          </CacheProvider>
        </Box>
      </Box>
    </>
  );
};

export default ListRequest;
