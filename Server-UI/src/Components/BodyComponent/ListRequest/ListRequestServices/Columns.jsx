export const columnsDetails = [
    {
      name: "Id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
        // show: false,
        display: false,
      },
    },
    {
      name: "User_No",
      label: "User No",
      options: {
        filter: true,
        sort: true,
        // show: false,
        display: false,
      },
    },
    {
      name: "Sl no",
      label: "Sl.No",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, update) => {
          let rowIndex = Number(tableMeta.rowIndex) + 1;
          return <span>{rowIndex}</span>;
        },
      },
    },

    {
      name: "Requester",
      label: "Requester",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Required_Start_Date",
      label: "Required Start Date",
      options: {
        customBodyRender: (value, tableMeta, update) => {
          return <span>{value.slice(0, 10)}</span>;
        },
        filter: true,
        sort: true,
      },
    },
    {
      name: "Required_End_Date",
      label: "Required End  Date",
      options: {
        customBodyRender: (value, tableMeta, update) => {
          return <span>{value.slice(0, 10)}</span>;
        },
        filter: true,
        sort: true,
      },
    },
    {
      name: "Manufacturer",
      label: "Manufacturer",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Number_Of_Servers",
      label: "Number Of Servers",
      options: {
        filter: true,
        display: false,
        sort: true,
      },
    },
    {
      name: "Operating_System",
      label: "Operating System",
      options: {
        filter: true,
        sort: true,
        // setCellProps: () => ({
        //   style: {
        //     minWidth: "100px",
        //     maxHeight: "30px",
        //     textAlign: "center",
        //     // maxWidth: "150px",
        //   },
        // }),
      },
    },
    {
      name: "Cpu_model",
      label: "CPU Model",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "CPU_Sockets",
      label: "CPU Sockets",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "DIMM_Size",
      label: "DIMM Size (In GB)",
      options: {
        filter: true,
        display: false,
        sort: true,
      },
    },
    {
      name: "DIMM_Capacity",
      label: "DIMM Capacity (In GB)",
      options: {
        filter: true,
        display: false,
        sort: true,
      },
    },
    {
      name: "Storage_Vendor",
      label: "Storage Vendor",
      options: {
        filter: true,
        display: false,
        sort: true,
      },
    },
    {
      name: "Storage_Controller",
      label: "Storage Controller",
      options: {
        filter: true,
        display: false,
        sort: true,
      },
    },
    {
      name: "Storage_Capacity",
      label: "Storage Capacity (In GB)",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Number_Of_Network_Ports",
      label: "Number Of Network Ports",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "Network_speed",
      label: "Network Speed",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "Network_Type",
      label: "Network Type",
      options: {
        filter: true,
        display: false,
        sort: true,

        customBodyRender: (value, tableMeta, updateValue) => {
          // console.log(value);
          if (value === false) {
            return (
              <>
                <div className="activeClass">
                  <span>Private</span>
                </div>
              </>
            );
          } else {
            return (
              <>
                <div className="inactiveClass">
                  <span>Public</span>
                </div>
              </>
            );
          }
        },
      },
    },
    {
      name: "Special_Switching_Needs",
      label: "Special Switching Needs",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "Updated_by",
      label: "Updated By",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "Updated_on",
      label: "Updated On",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },

    {
      name: "Actions",
      label: "Actions",
      options:{}
    },
  ];

// export const columnsListRequesterUser = [
//     {
//       name: "Id",
//       label: "ID",
//       options: {
//         filter: true,
//         sort: true,
//         // show: false,
//         display: false,
//       },
//     },
//     {
//       name: "Sl no",
//       label: "Sl.No",
//       options: {
//         filter: false,
//         sort: true,
//         customBodyRender: (value, tableMeta, update) => {
//           let rowIndex = Number(tableMeta.rowIndex) + 1;
//           return <span>{rowIndex}</span>;
//         },
//       },
//     },

//     {
//       name: "Requester",
//       label: " Requester",
//       options: {
//         filter: true,
//         sort: true,
//       },
//     },

//     {
//       name: "Required_Start_Date",
//       label: "Required Start Date",
//       options: {
//         customBodyRender: (value, tableMeta, update) => {
//           return <span>{value.slice(0, 10)}</span>;
//         },
//         filter: true,
//         sort: true,
//       },
//     },
//     {
//       name: "Required_End_Date",
//       label: "Required End Date",
//       options: {
//         customBodyRender: (value, tableMeta, update) => {
//           return <span>{value.slice(0, 10)}</span>;
//         },
//         filter: true,
//         sort: true,
//       },
//     },
//     {
//       name: "Manufacturer",
//       label: " Manufacturer",
//       options: {
//         filter: true,
//         sort: true,
//       },
//     },
//     {
//       name: "Number_Of_Servers",
//       label: "Number Of Servers",
//       options: {
//         display: false,
//         filter: true,
//         sort: true,
//       },
//     },
//     {
//       name: "Operating_System",
//       label: "Operating System",
//       options: {
//         filter: true,
//         sort: true,
//       },
//     },
//     {
//       name: "Cpu_model",
//       label: "CPU Model",
//       options: {
//         filter: true,
//         sort: true,
//       },
//     },
//     {
//       name: "CPU_Sockets",
//       label: "CPU Sockets",
//       options: {
//         filter: true,
//         sort: true,
//       },
//     },
//     {
//       name: "DIMM_Size",
//       label: "DIMM Size",
//       options: {
//         display: false,
//         filter: true,
//         sort: true,
//       },
//     },
//     {
//       name: "DIMM_Capacity",
//       label: "DIMM Capacity ",
//       options: {
//         filter: true,
//         display: false,
//         sort: true,
//       },
//     },
//     {
//       name: "Storage_Vendor",
//       label: "Storage Vendor",
//       options: {
//         filter: true,
//         display: false,
//         sort: true,
//       },
//     },
//     {
//       name: "Storage_Controller",
//       label: "Storage Controller",

//       options: {
//         display: false,
//         filter: true,
//         sort: true,
//       },
//     },
//     {
//       name: "Storage_Capacity",
//       label: "Storage Capacity (In GB) ",
//       options: {
//         filter: true,
//         sort: true,
//       },
//     },
//     {
//       name: "Number_Of_Network_Ports",
//       label: "Number Of Network Ports",
//       options: {
//         display: false,
//         filter: true,
//         sort: true,
//       },
//     },
//     {
//       name: "Network_speed",
//       label: "Network Speed",
//       options: {
//         display: false,
//         filter: true,
//         sort: true,
//       },
//     },
//     {
//       name: "Network_Type",
//       label: "Network Type",
//       options: {
//         filter: true,
//         display: false,
//         sort: true,

//         customBodyRender: (value, tableMeta, updateValue) => {
//           // console.log(value);
//           if (value === false) {
//             return (
//               <>
//                 <div className="activeClass">
//                   <span>Private</span>
//                 </div>
//               </>
//             );
//           } else {
//             return (
//               <>
//                 <div className="inactiveClass">
//                   <span>Public</span>
//                 </div>
//               </>
//             );
//           }
//         },
//       },
//     },
//     {
//       name: "Special_Switching_Needs",
//       label: "Special Switching Needs",
//       options: {
//         filter: true,
//         display: false,
//         sort: true,
//       },
//     },
//     {
//       name: "Updated_by",
//       label: "Updated By",
//       options: {
//         filter: true,
//         display: false,
//         sort: true,
//       },
//     },
//     {
//       name: "Updated_on",
//       label: "Updated On",
//       options: {
//         filter: true,
//         display: false,
//         sort: true,
//       },
//     },
//     {
//       name: "Actions",
//       label: "Actions",
//       options: {
//         customBodyRender: (value, tableMeta, updateValue) => {
//           return (
//             <div className="reserverflexicons">
//               <Tooltip id="chat tool" title="Chat">
//                 <a
//                 id="more btn"
//                   //   className="ppBtnClass"
//                   onChange={() => console.log(value, tableMeta.rowData[0])}
//                   onClick={() =>
//                     // platformFn(tableMeta?.rowIndex + 1, tableMeta?.rowIndex + 1)
//                     platformFn(tableMeta.rowData[0], tableMeta?.rowIndex)
//                   }
//                 >
//                   {/* {console.log(value, "<---vale", tableMeta?.rowIndex)} */}
//                   <MarkUnreadChatAltRoundedIcon id="chat btn " />
//                 </a>
//               </Tooltip>
//               <Tooltip id="edit tool" title="Edit">
//                 <a
//                   onClick={() => editableData(tableMeta.rowData)}
//                   // onClick={() => console.log(tableMeta.rowData, "tableMeta")}
//                   color="primary"
//                 >
//                   <EditIcon id="edit btn" />
//                 </a>
//               </Tooltip>
//               <Tooltip id="more tool" title="more">
//                 <a
//                   className="moreicon"
//                   onClick={() => moreData(tableMeta.rowData)}
//                   color="primary"
//                 >
//                   <Visibility  />
//                 </a>
//               </Tooltip>
//             </div>
//           );
//         },
//       },
//     },

//     {
//       name: "User_Comments",
//       label: "User Comments",
//       options: {
//         display: false,
//         customBodyRender: (value, tableMeta, updateValue) => {
//           return (
//             <button
//               //   className="ppBtnClass"
//               onChange={() => console.log(value, tableMeta.rowData[0])}
//               onClick={() => infcmt(tableMeta.rowData[0])}
//             >
//               <MarkUnreadChatAltRoundedIcon />
//             </button>
//           );
//         },
//       },
//     },
// ];