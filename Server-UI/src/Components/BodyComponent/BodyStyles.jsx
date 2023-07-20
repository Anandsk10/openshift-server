import { makeStyles } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
export const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTableCell-head": {
      color: "white",
      backgroundColor: "blue",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
    minHeight: 5,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  section: {
    margin: theme.spacing(3, 0),
  },
  responsiveImg: {
    width: " 100%",
    height: "auto",
  },
  cardImage: {
    maxHeight: "150px",
    overflowY: "hidden",
  },
  //page
  pageTitle: {
    color: blueGrey[800],
    marginBottom: theme.spacing(2),
    textTransform: "capitalize",
  },
  pageSubTitle: {
    color: blueGrey[500],
    margin: theme.spacing(1, 0),
    textTransform: "uppercase",
  },

  //dashboard
  cardLabel: {
    textTransform: "uppercase",
    color: blueGrey[500],
    textAlign: "center",
    margin: theme.spacing(1, 0),
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
  cardTitle: {
    textTransform: "capitalize",
    color: blueGrey[800],
    textAlign: "center",
    margin: theme.spacing(1, 0),
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.8rem",
    },
  },
  ratioBtn: { fontSize: "1rem", fontWeight: "bold" },
  cardContent: {
    position: "relative",
  },
  //cardGraph
  displayCardGraph: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100% !important",
    height: "45% !important",
  },

  //user trafic graph
  displayUserGraph: {
    width: "100%",
    minHeight: "300px",
    height: "auto",
  },
  footer: {
    background: "#0B0B0B",
    // display: "flex",
    justifyContent: "flexEnd",
    alignContent: "flexEnd",
    alignSelf: "flexEnd",
    alignItems: "flexEnd",
    // marginTop: "220px",
    // padding: theme.spacing(0, 0, 0, 0),
    // [theme.breakpoints.down("sm")]: {
    //   padding: theme.spacing(1, 1),
    //   // marginTop: "45px",
    // },
  },

  serverTitle: {
    color: "#fff"[500],
    margin: theme.spacing(3, 0),
    marginLeft: theme.spacing(50),
    // textTransform: "uppercase",
  },

  dialog: {
    // maxWidth: "800px",
    // width: "900px"
  },

  dialogPaper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // width: "800px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  add: {
    margin: theme.spacing(3, 0, 3, 0),
    // background: "#00e676",
    background: "#1a73e8",
    color: "#fff",
    "&:hover": {
      background: "#135cbc",
    },
  },
  cancel: {
    margin: theme.spacing(3, 0, 3, 3),
    background: "#efefef",
    color: "#000",
    "&:hover": {
      background: "#fff",
      color: "#000",
    },
  },
  dialogContainer: {
    // width: "800px",
  },
  more: {
    // maxWidth: "300px",
  },
  dialogPlateformContainer: {
    // width: "800px",
    // height: "80vh",
    overflow: "auto",
  },
  // popupheading: { padding: "10px" },

  // addServerBtn: {
  //   margin: theme.spacing(3, 0, 1, 125),
  // },
  addServerBtn: {
    // flexDirection: "column",
    display: "flex",
    // alignItems: "center",
    justifyContent: "right",
    // marginLeft: "1020px",
    // marginLeft: "auto",
    // [theme.breakpoints.down("sm")]: {
    // padding: theme.spacing(1, 1),
    // marginLeft: "450px",
    // },
  },
  
  // addUserBtn: {
  //   // flexDirection: "column",
  //   // display: "flex",
  //   // alignItems: "center",
  //   // justifyContent: "right",
  //   // marginLeft: "100px",
  //   marginLeft: "1000px",
  //   [theme.breakpoints.down("sm")]: {
  //     // padding: theme.spacing(1, 1),
  //     marginLeft: "430px",
  //   },
  // },

  // direction="column"
  //     justify="center"
  //     align="center"
  // addAssetDiv: {
  //   [theme.breakpoints.down('sm')]: {
  //     display: "flex",
  //     // flexWrap: "wrap",
  //     justifyContent: "space-around"
  //   }
  // }
  
}));
