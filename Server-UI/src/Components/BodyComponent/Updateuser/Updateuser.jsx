// import MUIDataTable from "mui-datatables";
// import * as React from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";
// import Stack from "@mui/material/Stack";
// import DeleteIcon from "@mui/icons-material/Delete";
// //--------------/Tabs ---------------------
// //--------------/Add User------------------
// import { Avatar, Button } from "@material-ui/core";
// import { useStyles } from "../../Header/HeaderStyles";
// // import image from "../../Header/Navtabs/adduser.png";
// // import image from "../../../img/adduser.png";
// // import image from "../../../img/user.png";
// import image from "../../../img/adduser1.png";
// //--------------/Add user------------------

// //--------------Add user pop-up --------------
// // import Box from '@mui/material/Box';
// // import Button from '@mui/material/Button';
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import MaterialTable from "material-table";
// import { useEffect, useState } from "react";
// import axios from "axios";

// //--------------Add user pop-up --------------

// const columns = [
//   {
//     field: "User_ID",
//     title: "User ID",
//   },
//   {
//     field: "Email_ID",
//     title: "Email ID",
//   },
//   {
//     field: "First_Name",
//     title: "First Name",
//   },
//   {
//     field: "Last_Name",
//     title: "Last Name",
//   },
//   {
//     field: "Created_on",
//     title: "Created on",
//   },
//   {
//     field: "Created_by",
//     title: "Created by",
//   },
//   {
//     field: "Updated_on",
//     title: "Updated on",
//   },
//   {
//     field: "Updated_by",
//     title: "Updated by",
//   },
//   {
//     field: "Role",
//     title: "Role",
//   },
//   {
//     field: "Teams",
//     title: "Teams",
//   },
//   {
//     field: "Delete",
//     title: "Delete",
//   },
// ];
// // const columns = [
// //   {
// //     name: "id",
// //     label: "ID",
// //     options: {
// //       filter: true,
// //       sort: true,
// //     },
// //   },
// //   {
// //     name: "name",
// //     label: "Name",
// //     options: {
// //       filter: true,
// //       sort: true,
// //     },
// //   },
// //   {
// //     name: "role",
// //     label: "Role",
// //     options: {
// //       filter: true,
// //       sort: false,
// //     },
// //   },
// //   {
// //     name: "email",
// //     label: "Email",
// //     options: {
// //       filter: true,
// //       sort: false,
// //     },
// //   },
// //   {
// //     name: "Team_Code",
// //     label: "Team ID",
// //     options: {
// //       filter: true,
// //       sort: false,
// //     },
// //   },
// // ];

// // const data = [
// //   {
// //     id: "01",
// //     name: "Joe James",
// //     role: "User",
// //     email: "skarun@gmail.com",
// //     Team_Code: "NY",
// //   },
// //   {
// //     id: "02",
// //     name: "Joe",
// //     role: "User",
// //     email: "skarun@gmail.com",
// //     Team_Code: "NY",
// //   },
// //   {
// //     id: "03",
// //     name: "Joe James",
// //     role: "User",
// //     email: "skarun@gmail.com",
// //     Team_Code: "NY",
// //   },
// //   {
// //     id: "04",
// //     name: "Joe James",
// //     role: "User",
// //     email: "skarun@gmail.com",
// //     Team_Code: "NY",
// //   },
// //   {
// //     id: "05",
// //     name: "Joe James",
// //     role: "User",
// //     email: "skarun@gmail.com",
// //     Team_Code: "NY",
// //   },
// //   {
// //     id: "06",
// //     name: "Sridhar",
// //     role: "User",
// //     email: "skarun@gmail.com",
// //     Team_Code: "NY",
// //   },

// //   {
// //     id: "07",
// //     name: "Joe James",
// //     role: "User",
// //     email: "skarun@gmail.com",
// //     Team_Code: "NY",
// //   },
// //   {
// //     id: "08",
// //     name: "Joe James",
// //     role: "Infra User",
// //     email: "skarun@gmail.com",
// //     Team_Code: "NY",
// //   },
// //   {
// //     id: "09",
// //     name: "Joe James",
// //     role: "Infra User",
// //     email: "skarun@gmail.com",
// //     Team_Code: "NY",
// //   },
// // ];

// // const infra = [
// //   {
// //     id: "08",
// //     name: "Joe James",
// //     role: "Infra User",
// //     email: "skarun@gmail.com",
// //     Team_Code: "NY",
// //   },
// //   {
// //     id: "09",
// //     name: "Joe James",
// //     role: "Infra User",
// //     email: "skarun@gmail.com",
// //     Team_Code: "NY",
// //   },
// // ];

// // const user = [
// //   {
// //     id: "01",
// //     name: "Joe James",
// //     role: "User",
// //     email: "skarun@gmail.com",
// //     Team_Code: "NY",
// //   },
// //   {
// //     id: "02",
// //     name: "Joe",
// //     role: "User",
// //     email: "skarun@gmail.com",
// //     Team_Code: "NY",
// //   },
// //   {
// //     id: "03",
// //     name: "Joe James",
// //     role: "User",
// //     email: "skarun@gmail.com",
// //     Team_Code: "NY",
// //   },
// //   {
// //     id: "04",
// //     name: "Joe James",
// //     role: "User",
// //     email: "skarun@gmail.com",
// //     Team_Code: "NY",
// //   },
// //   {
// //     id: "05",
// //     name: "Joe James",
// //     role: "User",
// //     email: "skarun@gmail.com",
// //     Team_Code: "NY",
// //   },
// //   {
// //     id: "06",
// //     name: "Joe James",
// //     role: "User",
// //     email: "skarun@gmail.com",
// //     Team_Code: "NY",
// //   },

// //   {
// //     id: "07",
// //     name: "Joe James",
// //     role: "User",
// //     email: "skarun@gmail.com",
// //     Team_Code: "NY",
// //   },
// // ];

// const Updateuser = () => {
//   const classes = useStyles();

//   //----------------------- /Add User-----------------
//   const role = [
//     {
//       value: "infra admin",
//       label: "Infra Admin",
//     },
//     {
//       value: "user",
//       label: "User",
//     },
//   ];

//   const [currency, setCurrency] = React.useState("EUR");

//   const handleChange = (event) => {
//     setCurrency(event.target.value);
//   };
//   //------------------------ Add User Pop-up ---------
//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 500,
//     bgcolor: "background.paper",
//     boxShadow: 24,
//     p: 4,
//   };

//   const [usersData, setUsersData] = React.useState([]);
//   const [updatedUsers, setUpdatedUsers] = React.useState([]);
//   const [user, setUser] = React.useState([]);
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const [update, updateUser] = React.useState(false);
//   const handleUpdate = () => updateUser(true); //onClick={() => { handleOpen(); handleChange() }}
//   // const handleUpdate ={() => { updateUser(true); handleRowClick(); }};
//   const handleCloseUpdate = () => updateUser(false);

//   const handleRowClick = (rowData, rowMeta) => {
//     handleUpdate();
//     console.log(rowData);
//   };
//   //------------------------ Add User Pop-up ---------

//   const options = {
//     filterType: "checkbox",
//     onRowClick: handleRowClick,
//   };

//   // const handleUserUpdate = (updatedRows) => {
//   //   setUpdatedUsers(updatedRows);
//   //   console.log(updatedUsers);
//   // };

//   const handleAddUser = () => {
//     handleClose();
//     setUser();
//     console.log();
//   };

//   const [date, setDate] = useState();
//   const [data, setData] = useState({
//     User_ID: "",
//     Email_ID: "",
//     Password: "",
//     First_name: "",
//     Last_name: "",
//     Created_on: "",
//     Created_by: "ADMIN",
//     Role: "",
//     Teams: "",
//   });

//   function handle(e) {
//     const newdata = { ...data };
//     newdata[e.target.id] = e.target.value;
//     setData(newdata);
//     console.log(newdata);
//   }

//   const [userid, setUserid] = useState("");
//   const submit = (userchange) => {
//     setUserid(userchange);
//     console.log(userid);
//   };

//   //--------------------
//   const submituser = (userid) => {
//     // setUserid(userid.target.value);

//     console.log("userid", userid.target.value);
//     var userchange = userid.target.value;
//     submit(userchange);
//     // console.log(userid);
//   };
//   //--------

//   // const getUsersUrl = "http://127.0.0.1:5002/list_users";
//   const getUsersUrl = "http://3.110.222.142:5002/view_users";
//   useEffect(() => {
//     axios.get(getUsersUrl).then((res) => {
//       setUsersData(res.data.Listusers);
//     });
//   }, []);
//   return (
//     <div>
//       <Box sx={{ width: "100%", typography: "body1" }}>
//         <div style={{ paddingLeft: "93%" }}>
//           <Button
//             onClick={handleOpen}
//             // aria-controls="simple-menu"
//             // aria-haspopup="true"
//             startIcon={
//               <Avatar src={image} className={classes.addUser}></Avatar>
//             }
//           ></Button>
//           {/* <div> */}
//           {/* <Button onClick={handleOpen}>Open modal</Button> */}
//           <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//           >
//             <Box sx={style}>
//               <Typography>Add User</Typography>
//               <Box
//                 component="form"
//                 sx={{
//                   "& .MuiTextField-root": { m: 1, width: "20ch" },
//                 }}
//                 noValidate
//                 autoComplete="off"
//               >
//                 {/* <div> */}
//                 <form
//                   // className={classes.form}
//                   noValidate
//                   // onSubmit={(e) => Sub(e)}
//                 >
//                   <TextField
//                     name="User_ID"
//                     variant="standard"
//                     required
//                     id="userid"
//                     label="User ID"
//                     type="text"
//                     focused
//                     // value={userid}
//                     onChange={(e) => submituser(e)}
//                     // onChange={(event) => submituser(event)}
//                   />
//                   <TextField
//                     id="standard-basic firstname"
//                     label="First Name"
//                     type="text"
//                     value={data.First_name}
//                     onChange={(e) => handle(e)}
//                     // defaultValue="Arun S K"
//                   />
//                   <TextField
//                     id="standard-basic lastname"
//                     label="Last Name"
//                     type="text"
//                     value={data.Last_name}
//                     onChange={(e) => handle(e)}
//                   />
//                   <TextField
//                     id="outlined-select-currency role"
//                     select
//                     label="Role"
//                     // value={currency}
//                     // onChange={handleChange}
//                     value={data.Role}
//                     onChange={(e) => handle(e)}
//                     // helperText="Select Role"
//                   >
//                     {role.map((option) => (
//                       <MenuItem key={option.value} value={option.value}>
//                         {option.label}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                   <TextField
//                     id="standard-basic teams"
//                     label="Team"
//                     type="text"
//                     value={data.Teams}
//                     onChange={(e) => handle(e)}
//                   />
//                   <TextField
//                     // error
//                     id="standard-basic email"
//                     label="email"
//                     type="text"
//                     value={data.Email_ID}
//                     onChange={(e) => handle(e)}
//                   />
//                   <TextField
//                     // error
//                     id="standard-password-input password"
//                     label="Password"
//                     type="password"
//                     value={data.Password}
//                     onChange={(e) => handle(e)}
//                   />
//                 </form>
//                 {/* </div> */}
//                 <br />
//                 <div>
//                   <Stack direction="row" spacing={2} paddingLeft="60%">
//                     <Button variant="contained" color="primary">
//                       ADD
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       // onClick={handleClose}
//                       onClick={handleAddUser}
//                     >
//                       Cancel
//                     </Button>
//                   </Stack>
//                 </div>
//               </Box>
//             </Box>
//           </Modal>
//           {/* Update User */}
//           {/* <div> */}
//           {/* <Button onClick={handleOpen}>Open modal</Button> */}
//           {/* <Modal
//                 open={update}
//                 onClose={handleCloseUpdate}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//               >
//                 <Box sx={style}>
//                   <Typography>Update User</Typography>
//                   <Box
//                     component="form"
//                     sx={{
//                       "& .MuiTextField-root": { m: 1, width: "20ch" },
//                     }}
//                     noValidate
//                     autoComplete="off"
//                   >
//                     <div>
//                       <TextField
//                         id="standard-basic"
//                         label="User Name"
//                         // defaultValue="Arun S K"
//                       />
//                       <TextField
//                         id="outlined-select-currency"
//                         select
//                         label="Role"
//                         value={currency}
//                         onChange={handleChange}
//                         // helperText="Select Role"
//                       >
//                         {role.map((option) => (
//                           <MenuItem key={option.value} value={option.value}>
//                             {option.label}
//                           </MenuItem>
//                         ))}
//                       </TextField>
//                     </div>
//                     <div>
//                       <TextField
//                         // error
//                         id="standard-basic"
//                         label="email"
//                         // defaultValue="skarun@gmail.com"
//                       />
//                     </div>
//                     <div>
//                       <TextField
//                         // error
//                         id="standard-password-input"
//                         label="Password"
//                         type="password"
//                       />
//                       <TextField
//                         // error
//                         id="standard-password-input"
//                         label="Confirm Password"
//                         type="password"
//                       />
//                     </div>
//                     <br />
//                     <div>
//                       <Stack direction="row" spacing={2} paddingLeft="40%">
//                         <Button variant="contained" color="primary">
//                           Update
//                         </Button>
//                         <Button
//                           variant="contained"
//                           color="secondary"
//                           onClick={handleCloseUpdate}
//                         >
//                           Cancel
//                         </Button>
//                         <Button
//                           variant="contained"
//                           color="secondary"
//                           startIcon={<DeleteIcon />}
//                         >
//                           User
//                         </Button>
//                       </Stack>
//                     </div>
//                   </Box>
//                 </Box>
//               </Modal> */}
//           {/* </div> */}
//           {/* Update User */}
//           {/* </div> */}
//         </div>
//         <Box sx={{ width: "100%", typography: "body2" }}>
//           <div>
//             {/* <MUIDataTable
//               title={"User's"}
//               data={data}
//               columns={columns}
//               options={options}
//             /> */}
//             <MaterialTable
//               title={"Users"}
//               columns={columns}
//               data={usersData}
//               // editable={{
//               //   onRowUpdate: (updatedRow, oldRow) =>
//               //     new Promise((resolve, reject) => {
//               //       const dataIndex = oldRow.tableData.id;
//               //       const updatedRows = [...usersData];
//               //       console.log(updatedRows, "updatedRows initial");
//               //       updatedRows[dataIndex] = updatedRow;
//               //       console.log(updatedRows, "updatedRows 2");
//               //       console.log(typeof updatedRows, "updatedRows 2");

//               //       let arrData = updatedRows.forEach((data, index) => {
//               //         console.log(data);
//               //         console.log(index);
//               //         if (dataIndex === index) {
//               //           console.log(data);
//               //         } else {
//               //           return "not successfull";
//               //         }
//               //       });
//               //       console.log(arrData, "arrData");

//               //       setTimeout(() => {
//               //         // setData(updatedRows);
//               //         handleUserUpdate(updatedRows);
//               //         resolve();
//               //       }, 2000);
//               //       console.log("updated row", updatedRow);
//               //       console.log("old row", oldRow);
//               //       console.log("dataIndex", dataIndex);
//               //     }),
//               // }}
//             />
//           </div>
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default Updateuser;
