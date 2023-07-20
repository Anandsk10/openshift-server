import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import image from "./unnamed.jpg";
// import image from "./unnamed.jpg";
// import { useStyles } from "../HeaderStyles";
import { useStyles } from "../../BodyComponent/BodyStyles";

import { useNavigate } from "react-router-dom";
import useAuth from "../../auth";
import Login from "../../BodyComponent/Login/Login";
import swal from "sweetalert";
import useraddlogo from "../../../img/useraddlogo.png";
// import { Container,Grid,
//   Paper,
//   Avatar,
//   TextField,
//   Button,
//   Typography,
//   Link,
//   Dialog, CssBaseline, Dialog, TextField } from "@mui/material";
import {
  Grid,
  Paper,
  // Avatar,
  TextField,
  // Button,
  Typography,
  Link,
  Dialog,
  Container,
  CssBaseline,
} from "@material-ui/core";
import api from "../../../utils/api";
import { Tooltip } from "@mui/material";

export default function Profile() {
  const user = useAuth();
  const classes = useStyles();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [resetOpen, setResetOpen] = useState(false);
  const [User_Id, setUser_Id] = useState("");
  const [Password, setPassword] = useState("");

  const [changeOpen, setChangeOpen] = useState(false);
  const [changeUser_Id, setChangeUser_Id] = useState(user?.email);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleResetOpen = () => {
    setResetOpen(true);
  };
  const handleResetClose = () => {
    setResetOpen(false);
  };
  const handleChangeOpen = () => {
    setChangeOpen(true);
  };
  const handleChangeClose = () => {
    setChangeOpen(false);
  };

  const submitResetPasswordFn = (e) => {
    e.preventDefault();
    let postData = {
      Email_Id: User_Id,
      Password: Password,
    };
    console.log(postData, "postData reset password");
    api
      .post("ResetPassword", postData)
      .then(
        (res) => {
          if (res.status === 200) {
            // console.log(res.data.Message);
            // alert(res.data.Message);
            swal(res.data.Message, {
              // icon: "warning",
              buttons: false,
              timer: 3000,
            });
            setResetOpen(false);
            setUser_Id("");
            setPassword("");

            // alert(res.data.Data);
          } else if (res.status === 202) {
            // alert(res.data.Message);
            swal(res.data.Message, {
              icon: "warning",
              buttons: false,
              timer: 3000,
            });
            // setResetOpen(false)

            // console.log(res.data.Message);
          } else {
            console.log("something wrong");
          }
        }
        // (error) => {
        //   // console.log(error);
        //   swal(error.message, {
        //     icon: "warning",
        //     buttons: false,
        //     timer: 3000,
        //   });
        //   // alert("Refused Connection...Try again later", error);
        // }
      )
      .catch(function (error) {
        // console.log(error.response.status) // 401
        // console.log(error.response.data) //Please Authenticate or whatever returned from server
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

  const submitChangePasswordFn = (e) => {
    e.preventDefault();
    let postData = {
      Email_Id: changeUser_Id,
      Old_Password: oldPassword,
      New_Password: newPassword,
    };
    console.log(postData, "postData change password");
    api
      .post("ChangePassword", postData)
      .then(
        (res) => {
          if (res.status === 200) {
            // console.log(res.data.Message);
            // alert(res.data.Message);
            swal(res.data.Message, {
              // icon: "warning",
              buttons: false,
              timer: 3000,
            });
            setChangeOpen(false);
            setChangeUser_Id("");
            setNewPassword("");
            setOldPassword("");

            // alert(res.data.Data);
          } else if (res.status === 202) {
            // alert(res.data.Message);
            swal(res.data.Message, {
              icon: "warning",
              buttons: false,
              timer: 3000,
            });
            // setResetOpen(false)

            // console.log(res.data.Message);
          } else {
            console.log("something wrong");
          }
        }
        // (error) => {
        //   // console.log(error);
        //   swal(error.message, {
        //     icon: "warning",
        //     buttons: false,
        //     timer: 3000,
        //   });
        //   // alert("Refused Connection...Try again later", error);
        // }
      )
      .catch(function (error) {
        // console.log(error.response.status) // 401
        // console.log(error.response.data) //Please Authenticate or whatever returned from server
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

  const handleLogout = () => {
    swal({
      // title: "Are you sure you want to logout ?  ",
      text: "Are you sure you want to logout ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (data) => {
      if (data) {
        localStorage.removeItem("loggedInUserDetails");
        // navigate("/");
        if (!user) return <Login />;
        navigate("/login");
        window.location.reload();
        swal("Logging Out !!", {
          buttons: false,
          timer: 3000,
        });
      } else {
      }
    });
  };

  const dropDownData = [{ label: "Change Password" }, { label: "Logout" }];

  return (
    <>
      <Dialog open={resetOpen} className={classes.dialog}>
        <Container component="main" className={classes.dialogContainer}>
          <CssBaseline />
          <div className={classes.dialogPaper}>
            <Typography component="h1" variant="h6">
              Reset Password
            </Typography>
            <form
              className={classes.form}
              onSubmit={(e) => submitResetPasswordFn(e)}
            >
              <Grid container spacing={(0, 0, 0, 2)}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    size="small"
                    id="Email_Id"
                    label="Email ID"
                    name="Email_Id"
                    focused
                    type="text"
                    value={User_Id}
                    onChange={(e) => setUser_Id(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    size="small"
                    id="Password"
                    label="Password"
                    name="Password"
                    focused
                    type="text"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                value="SUBMIT"
                sx={{ width: "25ch" }}
                variant="contained"
                className={classes.add}
              >
                Reset Password
              </Button>
              <Button
                sx={{ width: "25ch" }}
                variant="contained"
                color="primary"
                className={classes.cancel}
                onClick={handleResetClose}
              >
                Cancel
              </Button>
            </form>
          </div>
        </Container>
      </Dialog>
      <Dialog open={changeOpen} className={classes.dialog}>
        <Container component="main" className={classes.dialogContainer}>
          <CssBaseline />
          <div className={classes.dialogPaper}>
            <Typography component="h1" variant="h6">
              Change Password
            </Typography>
            <form
              className={classes.form}
              onSubmit={(e) => submitChangePasswordFn(e)}
            >
              <Grid container spacing={(0, 0, 0, 2)}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    // required
                    size="small"
                    id="ChangeEmail_Id"
                    label="Email ID"
                    name="ChangeEmail_Id"
                    // focused
                    disabled={user?.Role === "user" ? true : false}
                    type="text"
                    value={changeUser_Id}
                    onChange={(e) => setChangeUser_Id(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    size="small"
                    id="oldPassword"
                    label="Old Password"
                    name="oldPassword"
                    focused
                    type="text"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    size="small"
                    id="newPassword"
                    label="New Password"
                    name="newPassword"
                    focused
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                value="SUBMIT"
                sx={{ width: "25ch" }}
                variant="contained"
                className={classes.add}
              >
                Change Password
              </Button>
              <Button
                sx={{ width: "25ch" }}
                variant="contained"
                color="primary"
                className={classes.cancel}
                onClick={handleChangeClose}
              >
                Cancel
              </Button>
            </form>
          </div>
        </Container>
      </Dialog>
      <Tooltip title={user.Username}>
        <Box>
          <Button
            style={{ width: "70%", height: "70%", marginTop: 5 }}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            startIcon={
              <Avatar
                // src="https://logodix.com/logo/649370.png"
                // src="https://nanoversity-rundgang.tugraz.at/"
                src={useraddlogo}
                className={classes.navAvatar}
              ></Avatar>
            }
          ></Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
            {/* {dropDownData.map((item, i) => (
          <MenuItem key={i} component={ListItem} onClick={handleClose}>
            <ListItemText onClick={handleLogout}>{item.label}</ListItemText>
          </MenuItem>
        ))} */}

            {/* <MenuItem component={ListItem} onClick={handleClose}> */}
            {/* <ListItemIcon>{item.icon}</ListItemIcon> */}

            {user.Role === "admin" ? (
              <>
                <MenuItem onClick={handleResetOpen}>Reset Password</MenuItem>
                <MenuItem onClick={handleChangeOpen}>Change Password</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleChangeOpen}>Change Password</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            )}
            {/* </MenuItem> */}
          </Menu>
        </Box>
      </Tooltip>
    </>
  );
}
