import React, { useState } from "react";
import { Box, Grid } from "@material-ui/core";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";
import { Route } from "react-router-dom";
import Dashboard from "../BodyComponent/Dashboard/Dashboard";
import Notification from "../BodyComponent/Notification";
import Logout from "../BodyComponent/Logout";
import { useStyles } from "./HeaderStyles";
import User from "../BodyComponent/Updateuser/Updateuser";
import { Routes } from "react-router-dom";
import ServersComponent from "../BodyComponent/ServersComponent";
import Login from "../BodyComponent/Login/Login";
// import PublicRoutes from "../PublicRoutes";
import useAuth from "../auth";
import Home from "../BodyComponent/home/Home";
import UserComponent from "../BodyComponent/Updateuser/User";
import Historic from "../BodyComponent/History/Historic";
import ServerRequest from "../BodyComponent/ServerRequest/ServerRequest";
import ListRequest from "../BodyComponent/ListRequest/ListRequestForAdmin/ListRequest";
import ListRequestforuser from "../BodyComponent/ListRequest/ListRequestforuser";
import Report from "../BodyComponent/Reports/Report";
import FooterComponent from "../FooterComponent";
import { height } from "@mui/system";
export default function HeaderComponent() {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerOpen = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  // let loggedPerson;
  // const useAuth = () => {
  //   const user = localStorage.getItem("user");
  //   if (user) {
  //     loggedPerson = JSON.parse(user);
  //     console.log(loggedPerson.role, "user.role");

  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  const user = useAuth();

  // let Decider = user ? (
  //   <Routes>
  //     {/* <Router history={history1}> */}
  //     {/* <Dashboard /> */}
  //     <Route path="/dashboard" element={<Dashboard />} />

  //     {/* </Router> */}
  //   </Routes>
  // ) : (
  //   <Routes>
  //     {/* <Router history={history1}> */}
  //     <Route path="/" element={<Login />} />

  //     {/* </Router> */}
  //   </Routes>
  // );
  // const location = useLocation();
  // const navigate = useNavigate();
  // if (!user) return <Login />;
  if (!user) return <Login />;
  console.log(user.Role, "user.role");
  // if (user.role)
  function PageNotFound() {
    return (
      <div>
        <h2>404 Page not found</h2>
      </div>
    );
  }

  return (
    <>
      {/* <div className="App">{Decider}</div> */}

      {/* {Decider} */}
      {/* {!user && (
        <Link
          to="/"
          // className={location.pathname === "/" ? "sidebar_active" : ""}
          className={location.pathname === "/"}
        >
          Login
        </Link>
      )} */}
      {/* <Routes>
        <Route path="login" element={<PublicRoutes />}>
          <Route path="/" element={<Login />} />
        </Route>
      </Routes> */}

      {/* // registerian our routes  */}
      {/* <Routes>
        {!user ? (
          <Route path="/" element={<PublicRoutes />}>
            <Route path="/" element={<Login />} />
          </Route>
        ) : ( */}
      {/* <> */}
      <Grid style={{ height: "100vh", flex: 1 }}>
        <Navbar handleDrawerOpen={handleDrawerOpen} />
        <Sidenav
          mobileOpen={mobileOpen}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
        {/* <Box className={classes.wrapper}> */}
        <div className={classes.wrapper}>
          <Routes>
            {(user.Role === "admin" || "infra_admin") && (
              <Route path="/dashboard" element={<Home />} />
            )}
            <Route path="/servers" element={<ServersComponent />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/logout" element={<Logout />} />
            {/* <Route path="/user" element={<User />} /> */}
            <Route path="/user" element={<UserComponent />} />
            <Route path="/historic" element={<Historic />} />
            <Route path="/serverrequest" element={<ServerRequest />} />
            <Route path="/listrequest" element={<ListRequest />} />
            <Route path="/listrequestuser" element={<ListRequestforuser />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </div>
        <FooterComponent />
      </Grid>

      {/* <div style={{
        justifyContent: "flex-end",
        alignContent: 'flex-end',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
      }}>
        <FooterComponent />
      </div> */}
      {/* </Box> */}
    </>
  );
}
