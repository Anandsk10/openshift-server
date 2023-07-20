import React from "react";
import { useState, useEffect } from "react";
// import "./App.css";
import { useNavigate } from "react-router-dom";
import { Grid, Box, CssBaseline, Button, Container, Card, CardContent, Typography } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import moment from "moment";
import useAuth from "../../auth";
import { useStyles } from "../BodyStyles";

import axios from "axios";
import api from "../../../utils/api";

import swal from "sweetalert";
import { Dialog } from "@mui/material";
import { display } from "@mui/system";

// console.log("check history", history);
const filter = createFilterOptions();

const manufacturer = [
  { title: "DELL" },
  { title: "HP" },
  { title: "LENOVO" },
  { title: "ASUS" },
];
const CPU_Sockets = [{ label: "1" }, { label: "2" }, { label: "3" }];
const Cpu_model = [
  { label: "Naples" },
  { label: "Rome" },
  { label: "Milan" },
  { label: "Genoa" },
  { label: "Milan X" },
  { label: "Burgamo " },
];

const Storage_Vendor = [
  { label: "Samsung" },
  { label: "Seagate" },
  { label: "Western Digital" },
];

const Storage_Controller = [
  { label: "SATA" },
  { label: "SAS" },
  { label: "Nvme" },
  { label: "Mixed" },
];

const Number_Of_Network_Ports = [
  { label: "1" },
  { label: "2" },
  { label: "3" },
  { label: "4" },
];

const Network_speed = [
  { label: "1 GB " },
  { label: "10 GB" },
  { label: "25 GB" },
  { label: "100 GB" },
];

function ServerRequest() {

  const margin = { margin: "0 5px" };
  const navigate = useNavigate();
  console.log("first", navigate);

  const [value, setValue] = React.useState(null);
  console.log("ggggg", value);
  const [network_Type, setNetwork_Type] = useState(false);
  console.log("checking  network type", network_Type);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState(fullWidth);
  // const url = "http://localhost:5002/create_request";
  const user = useAuth();
  const classes = useStyles();
  const [data, setData] = useState({
    Requester: user.Username,
    
    Updated_by: user.Username,
    Request: false,
    Infraadmin_Comments: null,
    User_Comments: null,
    Required_Start_Date: "",
    Required_End_Date: "",
    Manufacturer: "",
    Number_Of_Servers: "",
    Operating_System: "",
    Cpu_model: "",
    CPU_Sockets,
    DIMM_Size: "",
    DIMM_Capacity: "",
    Storage_Vendor: "",
    Storage_Controller: "",
    Storage_Capacity: "",
    Network_Type: false,
    Network_speed: "",
    Number_Of_Network_Ports: "",
    Special_Switching_Needs: "",
  });
  console.log("c", data);
  // useEffect(() => {
  //   Submit();
  // }, []);
  // const newdate(dateStr){
  //   const date = new Date(dateStr);
  //   const iso = date.toISOString();
  //   console.log(iso);
  //   return iso
  // }
  // const newdate = (dateStr) => {
  //   const date = new Date(dateStr);
  //   const iso = date.toISOString();
  //   console.log(iso);
  //   return iso;
  // }
  const reset = () => {
    setData("");
  };
  function Submit(e) {
    e.preventDefault();
    const user = localStorage.getItem("loggedInUserDetails");
    let loggedPerson = JSON.parse(user);
    let a = {
      User_No: parseInt(loggedPerson.User_Id),
      Request: false,
      Updated_by: data.Updated_by,
      Infraadmin_Comments: "",
      User_Comments: "",
      Requester: data.Requester,
      Required_Start_Date: moment(data.Required_Start_Date).toISOString(),
      Required_End_Date: moment(data.Required_End_Date).toISOString(), //moment(data.End_Date).format("yyyy-MM-ddThh:mm:ss")
      Manufacturer: value.title,
      Number_Of_Servers: data.Number_Of_Servers,
      Operating_System: data.Operating_System,
      Network_Type: Boolean(network_Type),
      Cpu_model: data.Cpu_model,
      CPU_Sockets: data.CPU_Sockets,
      DIMM_Size: data.DIMM_Size,
      Storage_Vendor: data.Storage_Vendor,

      DIMM_Capacity: data.DIMM_Capacity,

      Storage_Controller: data.Storage_Controller,
      Storage_Capacity: data.Storage_Capacity,

      Network_speed: data.Network_speed,
      Number_Of_Network_Ports: data.Number_Of_Network_Ports,
      Special_Switching_Needs: data.Special_Switching_Needs,
    };
    console.log("typw", typeof data.End_Date);

    console.log(a, "checking");
    api
      .post("create_request", a)
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data);
          //   reset();
          // alert(res.data.Message);
          console.log("verify", res.data);
          // setData(res.data);
          // alert(" Sever requested succesfully ");
          // render("/listrequest");
          swal(res.data.Message, {
            buttons: false,
            timer: 3000,
          });
          navigate("/listrequestuser");
          // swal(res.data.Message, {
          //   buttons: false,
          //   timer: 3000,
          // });
          // setOpen(false);
          // reservedAssetApi();
          // setValue("2");

          // poolAssetApi();

          // handleClose();

          // alert("We got your information. We will call you back soon.");
        } else if (res.status === 202) {
          // alert(res.data.Message);
          // swal(res.data.Message);
          console.log("urgent ", res.config.data);
          // console.log(res.data.Message);
        } else {
          alert("Something went wrong...Server Error!!");
        }
      })
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
    // .catch((error) => {
    //   // if (error.res) {
    //   //   console.log(error.res);
    //   //   console.log("server responded");
    //   // } else if (error.request) {
    //   //   console.log("network error");
    //   // } else {
    //   //   console.log(error);
    //   // }
    // });
  }

  // asdfghj
  console.log("loged user ", user.Username);
  console.log("loged user ", user.Username);

  function handlechange(e) {
    console.log("kkk", e);
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    // setValue(manufacturer['']);
    console.log(newdata);
    console.log("nn", e.target.value);
  }
  function handleClick() {
    navigate("/listrequestuser");
  }
  return (
    <div className="App" style={{ justifyContent: "center", marginTop: "60px" }}>



      <Card fullWidth={fullWidth}
        maxWidth={"xl"} open="true" >
        <Container component="main" maxWidth={"xl"}>
          <CssBaseline />
          <div className={classes.paper}>
            <div className="addassetheaderline">
              <Box m={0}>
                <Typography component="h1" variant="h6" className="addasseth6">
                  Create Server Request
                </Typography>
                <Typography component="h1" variant="body2"></Typography>
              </Box>
            </div>
            <form className={classes.form} onSubmit={Submit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="Creator"
                    onChange={(e) => handlechange(e)}
                    value={user.Username}
                    type={"text"}
                    placeholder="Requester"
                    label="Requester"
                    variant="outlined"
                    fullWidth="true"
                    required="true"
                    xs={12}
                    ms={6}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="Required_Start_Date"
                    type={"date"}
                    onChange={(e) => handlechange(e)}
                    value={data.Required_Start_Date}
                    placeholder="Required Start Date"
                    label="Required Start Date "
                    variant="outlined"
                    fullWidth
                    required
                    focused
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="Required_End_Date"
                    type={"date"}
                    onChange={(e) => handlechange(e)}
                    value={data.Required_End_Date} //{moment(dateToBeFormate).format('DD/MM/YYYY')} data.End_Date //new Date(dateStr)
                    placeholder="Required End Date"
                    label="Required End Date"
                    variant="outlined"
                    fullWidth="true"
                    required="true"
                    xs={12}
                    ms={6}
                    focused
                  />
                </Grid>
                <Grid item xs={12} sm={3}>

                  <Autocomplete

                    value={value}
                    onInputChange={(event, newValue) => {
                      if (typeof newValue === "string") {
                        setValue({
                          title: newValue,
                        });
                      } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        setValue({
                          title: newValue.inputValue,
                        });
                      } else {
                        setValue(newValue);
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);

                      const { inputValue } = params;
                      // Suggest the creation of a new value
                      const isExisting = options.some(
                        (option) => inputValue === option.title
                      );
                      if (inputValue !== "" && !isExisting) {
                        filtered.push({
                          inputValue,
                          title: `Add "${inputValue}"`,
                        });
                      }

                      return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="Manufacturer1"
                    onSelect={(e) => handlechange(e)}
                    options={manufacturer}
                    getOptionLabel={(option) => {
                      // Value selected with enter, right from the input
                      if (typeof option === "string") {
                        return option;
                      }
                      // Add "xxx" option created dynamically
                      if (option.inputValue) {
                        return option.inputValue;
                      }
                      // Regular option
                      return option.title;
                    }}
                    renderOption={(props, option) => (
                      <li {...props}>{option.title}</li>
                    )}
                    xs={12} sm={3}
                    freeSolo
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onChange={(e) => handlechange(e)}
                        label="Manufacturer"
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="Operating_System"
                    type={"text"}
                    onChange={(e) => handlechange(e)}
                    value={data.Operating_System}
                    placeholder="Operating System"
                    label="Operating System"
                    variant="outlined"
                    fullWidth="true"
                    required="true"
                    xs={12}
                    ms={6}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Autocomplete
                    disablePortal
                    id="Cpu_model"
                    onSelect={(e) => handlechange(e)}
                    options={Cpu_model}
                    xs={12} sm={3}
                    renderInput={(params) => (
                      <TextField {...params} label="CPU Model" required />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Autocomplete
                    disablePortal
                    id="CPU_Sockets"
                    onSelect={(e) => handlechange(e)}
                    options={CPU_Sockets}
                    xs={12} sm={3}
                    renderInput={(params) => (
                      <TextField
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
                    id="DIMM_Size"
                    onChange={(e) => handlechange(e)}
                    value={data.DIMM_Size}
                    type={"text"}
                    placeholder="DIMM Size"
                    label="DIMM Size"
                    variant="outlined"
                    fullWidth="true"
                    required="true"
                    xs={12}
                    ms={6}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    type={"text"}
                    id="DIMM_Capacity"
                    onChange={(e) => handlechange(e)}
                    value={data.DIMM_Capacity}
                    placeholder="DIMM Capacity"
                    label="DIMM Capacity"
                    variant="outlined"
                    fullWidth="true"
                    required="true"
                    xs={12}
                    ms={6}
                    gutterBottom
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Autocomplete
                    disablePortal
                    id="Storage_Vendor"
                    onSelect={(e) => handlechange(e)}
                    options={Storage_Vendor}
                    xs={12} sm={3}
                    renderInput={(params) => (
                      <TextField
                      id="Storage_Vendor1"
                        {...params}
                        label="Storage Vendor"
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Autocomplete
                    disablePortal
                    id="Storage_Controller"
                    onSelect={(e) => handlechange(e)}
                    options={Storage_Controller}
                    xs={12} sm={3}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="Storage_Controller1"
                        label="Storage Controller"
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="Storage_Capacity"
                    onChange={(e) => handlechange(e)}
                    value={data.Storage_Capacity}
                    placeholder="MB/GB"
                    label=" Storage Capacity"
                    variant="outlined"
                    fullWidth="true"
                    required="true"
                    xs={12}
                    ms={6}
                    gutterBottom
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Autocomplete
                    disablePortal
                    id="Number_Of_Network_Ports"
                    onSelect={(e) => handlechange(e)}
                    options={Number_Of_Network_Ports}
                    xs={12} sm={3}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="Number_Of_Network_Ports1"
                        label="Network Ports"
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Autocomplete
                    disablePortal
                    id="Network_speed"
                    onSelect={(e) => handlechange(e)}
                    options={Network_speed}
                    xs={12} sm={3}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="Network_speed1"
                        label="Network Speed"
                        required
                      />
                    )}
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
                      id="private"
                        value={false}
                        onChange={(e) => setNetwork_Type(e.target.value)}
                        control={<Radio />}
                        label="Private"
                      />
                      <FormControlLabel
                      id="public"
                        value={true}
                        onChange={(e) => setNetwork_Type(e.target.value)}
                        control={<Radio />}
                        label="Public"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Special Switching Needs"
                    id="Special_Switching_Needs"
                    type={"text"}
                    onChange={(e) => handlechange(e)}
                    value={data.Special_Switching_Needs}
                    multiline
                    rows={4}
                    placeholder="Type  here"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                {/* <Grid style={{marginBottom:"10px"}}
                item xs={12} align="right"> */}
                {/* <Button
                      style={margin}
                      type="reset"
                      onClick={reset}
                      variant="outlined"
                      color="primary"
                    >
                      Reset
                    </Button> */}

                <Grid item xs={12} align="right">
                  <div  >
                    <Button
                    
                      //   type="submit"
                      // fullWidth
                      type="submit"
                      value="SUBMIT"

                      variant="contained"
                      // color="info"
                      id="addAssetBtn"
                      className={classes.add}
                    >Submit  </Button>
                    <Button
                      //   type="submit"
                      // fullWidth
                      sx={{ width: "25ch" }}
                      variant="contained"
                      // color="primary"
                      id="addAssetClose"
                      className={classes.cancel}
                      onClick={handleClick}
                    >
                      Cancel
                    </Button>
                  </div>
                </Grid>

                {/* </Grid> */}

              </Grid>
            </form>
          </div>

        </Container>

      </Card>

    </div>
  );
}

export default ServerRequest;
