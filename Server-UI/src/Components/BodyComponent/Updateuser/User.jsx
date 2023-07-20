import MUIDataTable from "mui-datatables";
import Datatable from "../../BodyComponent/datatable/Datatable";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Dialog,
  Grid,
  InputLabel,
  Select,
} from "@material-ui/core";
import DnsIcon from "@mui/icons-material/Dns";

import { useStyles } from "../../Header/HeaderStyles";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import image from "../../../img/adduser2.jpg";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import api from "../../../utils/api";
import useAuth from "../../auth";
import swal from "sweetalert";
import "../../../css/users.css";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { Paper, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { EditUserComponent } from "./EditUser";
import { infraAdminColumn, userColumn } from "./Columns";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

const UserComponent = () => {
  // checking user role.
  const user = useAuth();
  const classes = useStyles();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  let columns;
  if (user.Role === "infra_admin") {
    columns = infraAdminColumn;
  } else {
    columns = userColumn;
    let index = columns.findIndex((data) => data.name == "Actions");
    columns[index].options["customBodyRender"] = (
      value,
      tableMeta,
      updateValue
    ) => {
      return (
        <div className="reserverflexicons">
          <Tooltip id="edituserTool" title="Edit User">
            <a
              className="editicon"
              onClick={() => editableUsersData(tableMeta.rowData)}
              color="primary"
            >
              <EditIcon id="edituser_btn" />
            </a>
          </Tooltip>

          <Tooltip id="deleteTool" title="Delete">
            <a
              className="deleteicon"
              onClick={() => deleteUserApiFn(tableMeta.rowData[1])}
              // onClick={() => console.log(tableMeta, "tableMeta")}
              // startIcon={}
              color="primary"
            >
              <DeleteIcon id="deleteuser_btn" />
            </a>
          </Tooltip>
        </div>
      );
    };
  }

  const [userRole, setUserRole] = useState("");
  const [editData, setEditData] = useState({});
  const editableUsersData = (rowDataArr) => {
    handleEditUserOpen();
    if (rowDataArr !== [] || rowDataArr !== null) {
      setEditData({
        User_Id: rowDataArr[1],
        First_Name: rowDataArr[3],
        Last_Name: rowDataArr[4],
        Updated_by: user.Username,
        Role: rowDataArr[5],
        Teams: rowDataArr[6],
      });
    }
  };

  const [usersData, setUsersData] = React.useState([]);
  const [updatedUsers, setUpdatedUsers] = React.useState([]);
  // const [user, setUser] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editUserOpen, setEditUserOpen] = React.useState(false);

  const handleEditUserOpen = () => {
    setEditUserOpen(true);
  };
  const handleEditUserClose = () => {
    setEditUserOpen(false);
  };

  const fullServersideData = ["EMAIL ID"];

  const CustomUserToolbar = ({ displayData }) => {
    return (
      <>
        {showUserAddBtn && (
          <Tooltip id="adduser_tool" title="Add User">
            <Button
              className="addUserStyle"
              id="addUserBtnStyleId"
              onClick={handleOpen}
              startIcon={<PersonAddAltRoundedIcon />}
              // color="primary"
            ></Button>
          </Tooltip>
          // </div>
        )}
      </>
    );
  };
  const [newpage, setnewpage] = useState(1);
  const [totalpages, settotalpages] = useState(1);
  const options = {
    expandableRowsOnClick: true,
    count: totalpages,
    onChangePage: (e) => {
      console.log(e, "<------qwqw-");
      setnewpage(e + 1);
    },
    onChangeRowsPerPage: (e) => {
      console.log(e, "<--------ee");
      setcounting(e);
    },
    textLabels: {
      body: {
        noMatch: " No Records Available",
        // toolTip: "Sort",
        // columnHeaderTooltip: column => `Sort for ${column.label}`
      },
    },
    filterType: "checkbox",
    selectableRows: false,
    // selectableRows:'multiple',
    print: false,
    filter: false,
    viewColumns: false,
    // searchOpen: true,
    search: false,
    rowsPerPage: [5],
    rowsPerPageOptions: [3, 5, 10, 15],
    responsive: true,
    downloadOptions: {
      filename: "user_document.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
      },
      // customCSVdata: Role,
    },
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

  // validation of form
  const validationSchema = Yup.object().shape({
    First_Name: Yup.string().required("Firstname is required"),
    Last_Name: Yup.string().required("Lastname is required"),
    Role: Yup.string().required("Role is required"),
    Teams: Yup.string().required("Teams is required"),
    Email_Id: Yup.string()
      .required("Email is required")
      .email("Email is invalid"),
    Password: Yup.string().required("Password is required"),
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const resetFn = () => {
    reset();
    setUserRole("");
  };
  const onSubmitFn = async (data) => {
    console.log(JSON.stringify(data, null, 2));
    console.log(data);
    let postData = {
      Email_Id: data.Email_Id,
      Password: data.Password,
      First_Name: data.First_Name,
      Last_Name: data.Last_Name,
      Created_by: user.Username,
      Role: data.Role,
      Teams: data.Teams,
      Updated_by: user.Username,
    };
    console.log(postData, "valid data");
    await api
      .post("create_user", postData)
      .then((res) => {
        if (res.status === 200) {
          swal(res.data.Message, {
            buttons: false,
            timer: 3000,
          });
          setOpen(false);
          // console.log("created");
          getUsersApi();
          reset();
          setUserRole("");
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

  const [date, setDate] = useState();
  const [emailData, setEmailData] = useState("");
  const [data, setData] = useState({
    User_Id: "",
    Updated_by: user.Username,
    // Email_Id: emailData,
    Password: "",
    First_Name: "",
    Last_Name: "",
    // Created_on: "",
    Created_by: user.Username,
    Role: "",
    Teams: "",
  });

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  const [isValid, setIsValid] = useState(false);

  const emailRegex = /\S+@\S+\.\S+/;

  let helper;
  let error;
  const validateEmail = (event) => {
    const email = event.target.value;
    if (emailRegex.test(email)) {
      console.log(email, "valid fn");
      setIsValid(true);
      setEmailData(email);
    } else {
      console.log(email, "valid fn false");
      setIsValid(false);
      setEmailData(email);
      helper = !isValid ? "Invalid Email" : "";
      error = !isValid;
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    // let dateTime = new Date(date).toISOString();
    if (isValid) {
      console.log(emailData, "valid");
      let postData = {
        Updated_by: data.Updated_by,

        Email_Id: emailData,
        Password: data.Password,
        First_Name: data.First_Name,
        Last_Name: data.Last_Name,

        Created_by: data.Created_by,
        Role: userRole,
        Teams: data.Teams,
      };

      // axios.post(url, postData).then(
      await api.post("create_user", postData).then(
        (res) => {
          if (res.status === 200) {
            swal(res.data.Message, {
              buttons: false,
              timer: 3000,
            });
            setOpen(false);
            // console.log("created");
            getUsersApi();
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
      );
    } else {
      console.log(emailData, "invalid");
      console.log("Invalid email..");
    }
  };

  const deleteUserApiFn = async (UserId) => {
    swal({
      // title: "Are you sure you want to delete the user ?  ",
      text: "Are you sure you want to delete the user ? \n Once deleted, you will not be able to recover deleted user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (data) => {
      if (data) {
        let isuserid = parseInt(user.User_Id);
        if (isuserid !== UserId) {
          let postData = {
            User_Id: parseInt(UserId),
          };

          await api
            .post("delete_user", postData)
            .then((res) => {
              if (res.status === 200) {
                swal(res.data.Message, {
                  buttons: false,
                  timer: 3000,
                });
                // setOpen(false);
                getUsersApi();
                // reservedAssetApi();
              } else if (res.status === 202) {
                // alert(res.data.Message);
                swal(res.data.Message, {
                  buttons: false,
                  timer: 3000,
                });
                // console.log(res.data.Message, "202 response");
                getUsersApi();
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
        } else {
          swal("LoggedIn user can't be deleted !!");
        }
      } else {
      }
    });
  };

  const getUsersApi = async () => {
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
        if (res.status === 200) {
          console.log(res.data.Listusers, "getListusers", a);
          // SetCount(res?.data?.Count)
          settotalpages(res?.data?.Total_entry);

          setUsersData([...allServersData, ...res.data.Listusers]);
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
  const [showUserAddBtn, setShowUserAddBtn] = useState(true);
  const userAddBtn = () => {
    if (user.Role === "infra_admin") {
      setShowUserAddBtn(false);
    } else {
      setShowUserAddBtn(true);
    }
  };

  const isEmail = (email) => {
    if (/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) {
      return true;
    } else {
      return false;
    }
  };
  const [row, SetRow] = useState();
  const [count, SetCount] = useState(10);
  const [counting, setcounting] = useState(5);
  const [page, SetPage] = useState("");
  const [allServersData, setAllServersData] = useState([]);

  useEffect(() => {
    userAddBtn();

    getUsersApi();
  }, [counting, newpage]);
  return (
    <>
      {/* user edit form */}
      {editUserOpen && (
        <EditUserComponent
          data={editData}
          handleEditUserClose={handleEditUserClose}
          getUsersApi={getUsersApi}
        />
      )}
      <Dialog id="adduser dlg" open={open} className={classes.dialog}>
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <div className={classes.paper}>
            <div className="adduserheaderline">
              <Box m={0}>
                <Typography
                  id="adduser typo"
                  component="h1"
                  variant="h6"
                  className="addasseth6"
                >
                  Add User
                </Typography>
                <Typography component="h1" variant="body2"></Typography>
              </Box>
            </div>
            <form className={classes.form}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="standard"
                    required
                    id="First_Name"
                    label="First Name"
                    name="First_Name"
                    //focused
                    fullWidth
                    {...register("First_Name")}
                    error={errors.First_Name ? true : false}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.First_Name?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="Last_Name"
                    variant="standard"
                    required
                    id="Last_Name"
                    label="Last Name"
                    fullWidth
                    {...register("Last_Name")}
                    error={errors.Last_Name ? true : false}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.Last_Name?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>Role *</InputLabel>
                  <Select
                    id="Role"
                    label="Role"
                    name="Role"
                    variant="standard"
                    placeholder="Role"
                    required
                    fullWidth
                    value={userRole}
                    {...register("Role")}
                    error={errors.Role ? true : false}
                    onChange={(e) => setUserRole(e.target.value)}
                  >
                    <MenuItem value={"infra_admin"}>Infra Admin</MenuItem>
                    <MenuItem value={"user"}>User</MenuItem>
                  </Select>
                  {userRole === "" && (
                    <div className="">
                      <Typography
                        id="role"
                        variant="inherit"
                        color="textSecondary"
                      >
                        Role can't be empty
                      </Typography>
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="standard"
                    required
                    id="Teams"
                    label="Teams"
                    name="Teams"
                    fullWidth
                    // type="text"
                    {...register("Teams")}
                    error={errors.Teams ? true : false}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.Teams?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="standard"
                    required
                    //size="small"
                    id="Email_Id"
                    label="Email ID"
                    name="Email_Id"
                    //focused
                    fullWidth
                    {...register("Email_Id")}
                    error={errors.Email_Id ? true : false}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.Email_Id?.message}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="standard"
                    required
                    //size="small"
                    id="Password"
                    label="Password"
                    name="Password"
                    //focused
                    fullWidth
                    type="password"
                    {...register("Password")}
                    error={errors.Password ? true : false}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.Password?.message}
                  </Typography>
                </Grid>
              </Grid>
              <div className="usersubcanbtn">
                <Button
                  type="submit"
                  value="SUBMIT"
                  sx={{ width: "25ch" }}
                  variant="contained"
                  id="saveAdd"
                  className={classes.addUserBtn}
                  onClick={handleSubmit(onSubmitFn)}
                >
                  Add
                </Button>
                <Button
                  sx={{ width: "25ch" }}
                  variant="contained"
                  id="addCancel"
                  className={classes.cancelUserBtn}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </Dialog>

      <CacheProvider value={muiCache}>
        <Stack style={{ marginTop: 65 }}>
          <MUIDataTable
            title={"Users"}
            data={usersData}
            columns={columns}
            options={options}
            className="themeOverideUser"
          />
        </Stack>
      </CacheProvider>
    </>
  );
};

export default UserComponent;
