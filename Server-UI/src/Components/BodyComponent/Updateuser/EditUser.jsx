import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {
  Button,
  Container,
  CssBaseline,
  Dialog,
  Grid,
  InputLabel,
  Select,
} from "@material-ui/core";
import { useStyles } from "../../Header/HeaderStyles";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import api from "../../../utils/api";
import swal from "sweetalert";
import "../../../css/users.css";

export const EditUserComponent = (props) => {
  const classes = useStyles();
  const [userRole, setUserRole] = useState("");
  const [User_Id, setUser_Id] = useState(props.data.User_Id);
  const [Email_Id, setEmail_Id] = useState("");
  const [First_Name, setFirst_Name] = useState(props.data.First_Name);
  const [Last_Name, setLast_Name] = useState(props.data.Last_Name);
  const [Updated_by, setUpdated_by] = useState(props.data.Updated_by);
  const [Role, setRole] = useState(props.data.Role);
  const [Teams, setTeams] = useState(props.data.Teams);
  const submitEditedUserDetails = async (e) => {
    e.preventDefault();
    let postData = {
      User_Id: parseInt(User_Id),
      First_Name: First_Name,
      Last_Name: Last_Name,
      Updated_by: Updated_by,
      Role: Role,
      Teams: Teams,
    };
    let jsonAssign = JSON.stringify(postData);
    await api
      .post("update_users", postData)
      .then((res) => {
        if (res.status === 200) {
          swal(res.data.Message, {
            buttons: false,
            timer: 3000,
          });
          props.handleEditUserClose();
          props.getUsersApi();
        } else if (res.status === 202) {
          swal(res.data.Message, {
            timer: 3000,
          });
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
  
  return (
    <>
      <Dialog id="edit user dlg" open={true} className={classes.dialog}>
        <Box className={classes.dialogPaper}>
          <Container component="main" maxWidth="xl">
            <CssBaseline />
            <div className={classes.paper}>
              <div className="edituserheaderline">
                <Box m={2}>
                  <Typography
                    id="edit user typo"
                    component="h1"
                    variant="h6"
                    className="addasseth6"
                  >
                    Edit User
                  </Typography>
                  <Typography component="h1" variant="body2"></Typography>
                </Box>
              </div>
              <form
                className={classes.form}
                onSubmit={(e) => submitEditedUserDetails(e)}
              >
                <Grid container spacing={(0, 0, 0, 4)}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      required
                      id="editFirst_Name"
                      label="First Name"
                      name="editFirst_Name"
                      //focused
                      fullWidth
                      type="text"
                      value={First_Name}
                      onChange={(e) => setFirst_Name(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="editLast_Name"
                      variant="standard"
                      required
                      //size="small"
                      id="editLast_Name"
                      label="Last Name"
                      //focused
                      fullWidth
                      type="text"
                      value={Last_Name}
                      onChange={(e) => setLast_Name(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputLabel>Role *</InputLabel>
                    <Select
                      id="editRole"
                      label="Role"
                      name="editRole"
                      variant="standard"
                      required
                      fullWidth
                      type="text"
                      value={Role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <MenuItem value={"infra_admin"}>Infra Admin</MenuItem>
                      <MenuItem value={"user"}>User</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      required
                      id="editTeams"
                      label="Teams"
                      fullWidth
                      name="editTeams"
                      //focused
                      type="text"
                      value={Teams}
                      onChange={(e) => setTeams(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <div className="usersubcanbtn">
                  <Button
                    type="submit"
                    value="SUBMIT"
                    sx={{ width: "25ch" }}
                    variant="contained"
                    // color="secondary"
                    id="editSave"
                    className={classes.addUserBtn}
                  >
                    Save
                  </Button>
                  <Button
                    sx={{ width: "25ch" }}
                    variant="contained"
                    id="editCancel"
                    className={classes.cancelUserBtn}
                    onClick={() => props.handleEditUserClose()}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </Container>
        </Box>
      </Dialog>
    </>
  );
};
