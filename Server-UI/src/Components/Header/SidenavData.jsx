import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BookIcon from "@material-ui/icons/Book";
import PostAddIcon from "@material-ui/icons/PostAdd";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ManageHistoryRoundedIcon from "@mui/icons-material/ManageHistoryRounded";
import StorageIcon from "@material-ui/icons/Storage";
import People from "@material-ui/icons/People";
import MoreTimeOutlinedIcon from "@mui/icons-material/MoreTimeOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import Settings from "@material-ui/icons/Settings";
import { NavLink } from "react-router-dom";
import { useStyles } from "./HeaderStyles";
import useAuth from "../auth";
// import StorageIcon from "@mui/icons-material/Storage";
import Home from "../BodyComponent/home/Home";
import ListRequest from "../BodyComponent/ListRequest/ListRequestForAdmin/ListRequest";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import { Tooltip } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import DnsIcon from "@mui/icons-material/Dns";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
import Report from "../BodyComponent/Reports/Report";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
export default function SidenavData({ handleDrawerClose }) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (e, index) => {
    setSelectedIndex(index);
    console.log(index, "indexxx");
  };

  let listItemData;
  const user = useAuth();
  const ListItem = withStyles({
    root: {
      "&$selected": {
        backgroundColor: "#d1d1d1",
        // color: "black",
        "& .MuiListItemIcon-root": {
          color: "black",
        },
      },
    },
    selected: {},
  })(MuiListItem);

  listItemData = [
    // { label: "Dashobard", link: "/dashboard", icon: <DashboardIcon /> },
    { label: "Servers", link: "/servers", icon: <StorageIcon />, number: 1 },

  ];

  if (user.Role === "admin" || user.Role === "infra_admin") {
    listItemData.unshift(
      {
        id: "dashboard icon",
        label: "Dashboard",
        link: "/dashboard",
        icon: <DashboardIcon />,
        number: 0,
      }

   
    );
  }
  if (user.Role === "admin" || user.Role === "infra_admin") {
    listItemData.push(
      { label: "Users", link: "/user", icon: <People />, number: 2 },
      {
        id: "listrequest icon",
        label: "Server Request",
        link: "/listrequest",
        icon: <RateReviewOutlinedIcon />,
        number: 3,
      },
      // {
      //   label: "History",
      //   link: "/historic",
      //   icon: <ManageHistoryRoundedIcon />,
      //   number: 4
      // },
      {
        id: "Reports icon",
        label: "Reports ",
        link: "/report",
        icon: <AssessmentOutlinedIcon />,
        number: 7,
      }
      // {
      //   label: "ListRequest",
      //   link: "/listrequest",
      //   icon: <SummarizeOutlinedIcon />,
      // }
    );
  }
  // if (user.Role === "infra_admin") {
  //   listItemData.push(
  //     { label: "Users", link: "/user", icon: <People /> },
  //     {
  //       label: "List Request",
  //       link: "/listrequest",
  //       icon: <SummarizeOutlinedIcon />,
  //     },
  //     {
  //       label: "History",
  //       link: "/historic",
  //       icon: <ManageHistoryRoundedIcon />,
  //     },
  //     // {
  //     //   label: "ListRequest",
  //     //   link: "/listrequest",
  //     //   icon: <SummarizeOutlinedIcon />,
  //     // }
  //   );
  // }
  // if (user.Role === "infra_admin") {
  //   listItemData.unshift(
  //     {
  //       label: "Dashboard",
  //       link: "/dashboard",
  //       icon: <DashboardIcon />,
  //     },
  //     {
  //       label: "History",
  //       link: "/historic",
  //       icon: <ManageHistoryRoundedIcon />,
  //     },
  //     { label: "Users", link: "/user", icon: <People /> },
  //     {
  //       label: "ListRequest",
  //       link: "/listrequest",
  //       icon: <SummarizeOutlinedIcon />,
  //     }
  //   );
  // }
  //
  if (user.Role === "user") {
    listItemData.push(
      // {
      //   label: "Server Request",
      //   link: "/serverrequest",
      //   icon: <DnsIcon />,
      //   number: 4,
      // },
      {
        id: "listrequestuser icon",
        label: "List Request",
        link: "/listrequestuser",
        icon: <RateReviewOutlinedIcon />,
        number: 5,
      }
    );
  }
  // else (user.role === "User") {

  // }
  return (
    // <div className={classes.root}>
    <List>
      {listItemData.map((item, i) => (
        <Button
        id="nav btn "
          size="small"
          className={classes.navButton}
          // onClick={() => handleDrawerClose()}

          key={i}
        >
          <Tooltip id="title" title={item.label}>
            <ListItem

            id="list items"
              exact
              component={NavLink}
              to={item.link}
              className={classes.navlinks}
              selected={selectedIndex === item.number}
              onClick={(e) => handleListItemClick(e, item.number)}
            // activeclassname={classes.activeNavlinks}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {/* <ListItemText>{item.label}</ListItemText> */}
            </ListItem>
          </Tooltip>
        </Button>
      ))}
    </List>
    // </div>
  );
}
