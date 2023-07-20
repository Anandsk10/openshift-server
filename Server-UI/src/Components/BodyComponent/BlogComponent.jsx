import React, { useEffect, useState } from "react";
import {
  Box,
  // Card,
  // Grid,
  // CardHeader,
  // CardContent,
  // Avatar,
  // Button,
  // CircularProgress,
  Tab,
  Tabs,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  FormControl,
  Select,
  // MenuItem,
  InputLabel,
  // TextField,
} from "@material-ui/core";
import { useStyles } from "./BodyStyles";
// import { PageHeader } from "../Common/CommonComponent";
// import { GetPost } from "../../utils/blogRequest";
import { Typography } from "@material-ui/core";
// import FavoriteIcon from "@material-ui/icons/Favorite";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import { styled, alpha } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
// import { TheatersRounded } from "@material-ui/icons";

import axios from "axios";
// import "../../css/servers.css";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const columns = [
  { id: "server_id", label: "ID", minWidth: 80 },
  { id: "vendor", label: "Vendor", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "bmc_ip", label: "BMC IP", minWidth: 100 },
  {
    id: "team_id",
    label: "Team Id",
    minWidth: 100,
    // align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "bmc_user",
    label: "BMC User",
    minWidth: 100,
    // align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "bmc_password",
    label: "BMC Password",
    minWidth: 100,
    // align: "right",
    // format: (value) => value.toFixed(2),
  },
  { id: "server_location", label: "Location", minWidth: 100 },
  { id: "cpu_generation", label: "CPU Generation", minWidth: 100 },
  { id: "reserved", label: "Reserved", minWidth: 100 },
  { id: "assignee", label: "Assignee", minWidth: 100 },
  { id: "Assigned on", label: "Assigned on", minWidth: 100 },
  { id: "os_ip", label: "OS IP", minWidth: 100 },
  { id: "os_user", label: "OS User", minWidth: 100 },
  { id: "os_password", label: "OS Password", minWidth: 100 },
  { id: "purpose", label: "Purpose", minWidth: 100 },
  // { id: "Team ID", label: "Team ID", minWidth: 100 },
  { id: "cluster_id", label: "Cluster ID", minWidth: 100 },
];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData(
//     "India",
//     "IN",
//     1324171354,
//     3287263,
//     3287263,
//     3287263,
//     3287263,
//     3287263,
//     3287263,
//     3287263,
//     3287263,
//     3287263,
//     3287263,
//     3287263,
//     3287263,
//     3287263
//   ),
//   createData("China", "CN", 1403500365, 9596961),
//   createData("Italy", "IT", 60483973, 301340),
//   createData("United States", "US", 327167434, 9833520),
//   createData("Canada", "CA", 37602103, 9984670),
//   createData("Australia", "AU", 25475400, 7692024),
//   createData("Germany", "DE", 83019200, 357578),
//   createData("Ireland", "IE", 4857000, 70273),
//   createData("Mexico", "MX", 126577691, 1972550),
//   createData("Japan", "JP", 126317000, 377973),
//   createData("France", "FR", 67022000, 640679),
//   createData("United Kingdom", "GB", 67545757, 242495),
//   createData("Russia", "RU", 146793744, 17098246),
//   createData("Nigeria", "NG", 200962417, 923768),
//   createData("Brazil", "BR", 210147125, 8515767),
// ];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.65),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.95),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(86),
    marginRight: theme.spacing(17),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  // padding: theme.spacing(0, 2),
  paddingLeft: theme.spacing(19),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SelectDiv = styled("div")(({ theme }) => ({
  position: "relative",
  marginTop: theme.spacing(7),
  // padding: theme.spacing(3),
  marginBottom: theme.spacing(0),

  // borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.65),
  // "&:hover": {
  // backgroundColor: alpha(theme.palette.common.white, 0.95),
  // },
  // marginRight: theme.spacing(1),
  // marginLeft: theme.spacing(1),

  width: "100%",
  // [theme.breakpoints.up("sm")]: {
  //   marginLeft: theme.spacing(1),
  //   marginRight: theme.spacing(17),
  //   width: "auto",
  // },
}));

const SelectIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  // paddingLeft: theme.spacing(2),
  height: "100%",
  position: "absolute",
  // pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 2),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function BlogComponent() {
  const [allServersData, setAllServersData] = useState([]);
  const [reservedServersData, setReservedServersData] = useState([]);
  // const [allServersData, setAllServersData] = useState([]);

  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // const [fetched, setfetched] = useState(false);
  // const [posts, setPosts] = useState([]);

  // const [ToggleState, setToggleState] = useState(1);

  // const toggleTab = (index) => {
  //   setToggleState(index);
  // };

  // const getActiveClass = (index, className) =>
  //   ToggleState === index ? className : "";
  //calling getpost api
  // useEffect(() => {
  //   if (!fetched) {
  //     GetPost({ limit: 24 }).then(({ data: { data } }) => {
  //       setPosts(data);
  //     });
  //     setfetched(true);
  //   }
  // }, [fetched]);
  const getAllServersUrl = "http://127.0.0.1:5002/servers/all";
  useEffect(() => {
    axios.get(getAllServersUrl).then((res) => {
      console.log(res.data, "response1");
      setAllServersData(res.data);
    });
    // fetch(`http://127.0.0.1:5002/servers/all`).then((response) =>
    //   console.log(response)
    // );
  }, []);

  const reservedServData = () => {
    const getReservedServersUrl = "http://127.0.0.1:5002/view/server/reserved/";
    axios.get(getReservedServersUrl).then((res) => {
      console.log(res.data, "response1");
      setReservedServersData(res.data);
      console.log(res.data, "reserved results");
    });
  };

  console.log(allServersData, "allServersData");

  return (
    <>
      {/* <br /> */}
      {/* <br /> */}
      {/* <Box sx={{ minWidth: 120 }}> */}
      {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> */}
      {/* </Box> */}
      {/* <SelectIconWrapper>
        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel id="demo-select-small">Role</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            // value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </SelectIconWrapper> */}

      {/* <Box fullWidth>
        <TextField label="Select Role" select>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </TextField>
      </Box> */}

      <SelectDiv>
        <SelectIconWrapper>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="filled-age-native-simple">Age</InputLabel>
            <Select
              native
              //   value={state.age}
              //   onChange={handleChange}
              inputProps={{
                name: "age",
                id: "filled-age-native-simple",
              }}
            >
              <option aria-label="None" value="" />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </Select>
          </FormControl>
        </SelectIconWrapper>
      </SelectDiv>

      {/* search */}
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Reserved" {...a11yProps(1)} onClick={reservedServData} />
          <Tab label="Pool" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      // align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {allServersData
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((allServers) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={allServers.server_id}
                      >
                        {columns.map((column) => {
                          const value = allServers[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              // align={column.align}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={allServersData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      // align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {reservedServersData
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((reservedServers) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={reservedServers.server_id}
                      >
                        {columns.map((column) => {
                          const value = reservedServers[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              // align={column.align}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={reservedServersData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Pool Servers
      </TabPanel>
    </>
  );
}
