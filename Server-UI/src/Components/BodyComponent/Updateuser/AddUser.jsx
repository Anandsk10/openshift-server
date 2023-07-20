import * as React from "react";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStyles } from "../../Header/HeaderStyles";
import { useState } from "react";
import {Button,Container,CssBaseline,Dialog,Grid,InputLabel,Select} from "@material-ui/core";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import api from "../../../utils/api";
import swal from "sweetalert";
import "../../../css/users.css";

export const AddUserComponent = (props)=>{
  const classes = useStyles();
  const [userRole, setUserRole] = useState("");
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
  const {register,handleSubmit,reset,formState: { errors }
    } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmitFn = async (data) => {
    let postData = {
      Email_Id: data.Email_Id,
      Password: data.Password,
      First_Name: data.First_Name,
      Last_Name: data.Last_Name,
      Created_by: props.userName,
      Role: data.Role,
      Teams: data.Teams,
      Updated_by: props.userName,
    };
    await api
      .post("create_user", postData)
      .then((res) => {
        if (res.status === 200) {
          swal(res.data.Message, {
            buttons: false,
            timer: 3000,
          });
          props.setOpen(false);
          props.getUsersApi();
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
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        } else if (error.response.status === 400) {
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        } else {
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
        }
      });
  };

  return(
    <>
      <Dialog id="adduser dlg" open={true} className={classes.dialog}>
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <div className={classes.paper}>
            <div className="adduserheaderline">
              <Box m={0}>
                <Typography id="adduser typo" component="h1" variant="h6" className="addasseth6">
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
                      <Typography id="role" variant="inherit" color="textSecondary">
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
                  onClick={()=>props.handleClose()}
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
