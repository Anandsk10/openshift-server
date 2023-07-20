 import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Dialog,
  Container,
  CssBaseline,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// authentication purpose
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import axios from "../../../utils/request";
import "js-cookie";
import Cookies from "js-cookie";
import api from "../../../utils/api";
import swal from "sweetalert";
import { useStyles } from "../BodyStyles";
import { Snackbar } from "@mui/material";

const Login = () => {
  // login authentication
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [resetOpen, setResetOpen] = useState(false);
  const [User_Id, setUser_Id] = useState("");
  const [Password, setPassword] = useState("");

  const loginButtonFn = (e) => {
    e.preventDefault();
    // const loginUrl = " http://localhost:5002/login";
    let postData = {
      Email_Id: email,
      Password: pwd,
    };
    api
      .post("login", postData)
      .then(
        (res) => {
          if (res.status === 200) {
            // console.log(res.data.Message);
            // alert(res.data.Message);
            let Token = res.data.Token;
            let Role = res.data.Role;
            let User_Id = res.data.User_Id;
            let Username = res.data.Username;
            localStorage.setItem(
              "loggedInUserDetails",
              JSON.stringify({
                Token: Token,
                // Role: "admin",
                // Role: "infra_admin",
                Role: Role,
                email: email,
                User_Id: User_Id,
                Username: Username,
              })
            );

            storage();
            // alert(res.data.Data);
          } else if (res.status === 202) {
            // alert(res.data.Message);
            swal(res.data.Message, {
              icon: "warning",
              buttons: false,
              timer: 3000,
            });
            // console.log(res.data.Message);
          } else {
            console.log("something wrong");
          }
        }
        // (error) => {
        //   if (error.status === 401) {
        //     console.log(error);
        //   }
        // console.log(Message);
        // swal(error.message, {
        //   icon: "warning",
        //   buttons: false,
        //   timer: 3000,
        // });
        // alert("Refused Connection...Try again later", error);
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
  // localStorage.setItem("user", JSON.stringify({ role: "ADMIN" }));
  // navigate("/");
  // // localStorage.setItem("user", JSON.stringify({ role: "Common User" }));
  // let loggedPerson;
  // const user = localStorage.getItem("user");
  // loggedPerson = JSON.parse(user);
  // if (loggedPerson.role === "Common User") {
  //   navigate("/user");
  // } else {
  //   navigate("/");
  // }

  const storage = () => {
    let loggedPerson;
    const user = localStorage.getItem("loggedInUserDetails");
    console.log(user, "user");
    loggedPerson = JSON.parse(user);
    console.log(loggedPerson.Role, "loggedPerson");
    if (loggedPerson.Role === "user") {
      console.log("user logged in!!");
      navigate("/servers");
      window.location.reload();
      // swal("Login Successfull !!", {
      //   buttons: false,
      //   timer: 3000,
      // });
    } else {
      navigate("/dashboard");
      window.location.reload();
      // swal("Login Successfull !!", {
      //   buttons: false,
      //   timer: 3000,
      // });
    }
  };

  const submitResetPasswordFn = (e) => {
    e.preventDefault();
    let postData = {
      Email_Id: User_Id,
      Password: Password,
    };
    console.log(postData, "postData reset password");
    api.put("ResetPassword", postData).then(
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
      },
      (error) => {
        // console.log(error);
        swal(error.message, {
          icon: "warning",
          buttons: false,
          timer: 3000,
        });
        // alert("Refused Connection...Try again later", error);
      }
    );
  };

  const handleResetOpen = () => {
    setResetOpen(true);
  };
  const handleResetClose = () => {
    setResetOpen(false);
  };

  // const Sub = (e) => {
  //   const loginUrl = " http:///3.110.135.26:5002/login";
  //   e.preventDefault();
  //   console.log("console");
  //   console.log(email, "email");
  //   console.log(pwd, "pwd");
  //   let loginObj = {
  //     emailId: email,
  //     password: pwd,
  //   };
  //   console.log(loginObj, "loginObj");
  //   console.log(typeof loginObj, "loginObj");

  //   let obj = JSON.stringify(loginObj);
  //   console.log(obj, "loginObj");
  //   console.log(typeof obj, "json obj type");

  //   axios.post(loginUrl, obj).then(
  //     (res) => {
  //       if (res.status === 200) {
  //         console.log(res.data.Role);
  //         Cookies.set(res.data.UserId);
  //         console.log(res.data.User_Id);
  //         // localStorage.setItem("user", JSON.stringify({ role: "ADMIN" }));
  //         // navigate("/dashboard");

  //         console.log(res);
  //         //   reset();
  //         alert("We got your information. We will call you back soon.");
  //       } else {
  //         alert("Something went wrong...Server Error!!");
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //       alert("Refused Connection...Try again later", error);
  //     }
  //   );
  // };

  // styles
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "15px 0" };
  const inputstyle = { margin: "8px 0" };

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const forgotbutton = (
    <React.Fragment>
      <Button
      id="forgot btn"
        className="forgotCss"
        onClick={handleClick({
          vertical: "bottom",
          horizontal: "center",
        })}
      >
        Forgot Password ?
      </Button>
    </React.Fragment>
  );

  return (
    <Grid id="gid1" >
      <Paper elevation={10} style={paperStyle}>
        {/* <form onSubmit={(e) => Sub(e)}> */}
        <form id="login form" onSubmit={(e) => loginButtonFn(e)}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <br />
            <h3 id="head">Server Management</h3>
          </Grid>
          <br />
          <TextField
          id="email"
            label="Email ID"
            placeholder="Enter Email ID"
            variant="standard"
            fullWidth
            required
            size="small"
            style={inputstyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
          id="passwd"
            label="Password"
            placeholder="Enter Password"
            type="password"
            variant="standard"
            fullWidth
            required
            size="small"
            style={inputstyle}
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          /> */}
          <Button
          id="sub btn"
            type="submit"
            value="SUBMIT"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          // onClick={loginButtonFn}
          >
            Login
          </Button>
          {/* <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography> */}
        </form>
        {/* <Typography>
          Do you have an account ?<Link href="#">Sign Up</Link>
        </Typography> */}

        {/* <Typography component="h1" variant="h6"> */}
        {/* <Button onClick={handleResetOpen} className="forgotCss">Forgot password ?</Button> */}
        {/* </Typography> */}
        <Dialog id="dialog" open={resetOpen} className={classes.dialog}>
          <Container component="main" className={classes.dialogContainer}>
            <CssBaseline />
            <div className={classes.dialogPaper}>
              <Typography id="reset head " component="h1" variant="h6">
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
                id="sub_reset"
                  type="submit"
                  value="SUBMIT"
                  sx={{ width: "25ch" }}
                  variant="contained"
                  className={classes.add}
                >
                  Reset Password
                </Button>
                <Button
                id="cancel"
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

        <div>
          {forgotbutton}
          <Snackbar
          id="pls contacty admin"
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message="Please Contact Admin !!"
            key={vertical + horizontal}
          />
        </div>
        {/* <Typography>
          Do you have an account ?<Link href="#">Sign Up</Link>
        </Typography> */}
      </Paper>
    </Grid>
  );
};

export default Login;
