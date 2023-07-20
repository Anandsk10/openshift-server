import MUIDataTable from "mui-datatables";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Dialog,
  Grid,
  InputLabel,
  Select,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { useStyles } from "../../Header/HeaderStyles";
import moment from "moment/moment";


//--------------/Add user------------------

//--------------Add user pop-up --------------

import { useEffect, useState } from "react";

import api from "../../../utils/api";
import swal from "sweetalert";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { Paper, Stack } from "@mui/material";
import Datatable from "../datatable/Datatable";
import history from "../ServersComponent";
import ServersComponent from "../ServersComponent";
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

const Historic = (props, get) => {
  const classes = useStyles();
  const columns = [
    {
      name: "Sl no",
      label: "Sl.No",
      options: {
        filter: false,
        sort: true,
        download: false,
        display: true,
        customBodyRender: (value, tableMeta, update) => {
          let rowIndex = tableMeta.rowIndex + 1;
          return <span>{rowIndex}</span>;
        },
      },
    },
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
      name: "Asset_Id",
      label: "Server ID ",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Asset_Name",
      label: " Server Name",
      options: {
        customBodyRender: (value, tableMeta, update) => {
          return <span>{value.slice(0, 10)}</span>;
        },
        filter: true,
        sort: true,
      },
    },
    {
      name: "Created_on",
      label: " Created On",
      options: {
        customBodyRender: (value, tableMeta, update) => {
          return <span>{moment(value).format("MMMM Do YYYY, h:mm:ss a")}</span>;
        },
        filter: true,
        sort: true,
      },
    },
    {
      name: "Created_by",

      label: "Created By",

      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "BMC_IP",
      label: "BMC IP",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Assigned_to",

      label: "Assigned To",

      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Assigned_from",

      label: "Assigned From",

      options: {
        customBodyRender: (value, tableMeta, update) => {
          return <span>{moment(value).format("MMMM Do YYYY, h:mm:ss a")}</span>;
        },
        filter: true,
        sort: true,
      },
    },
    {
      name: "Updated_on",

      label: "Updated On",

      options: {
        customBodyRender: (value, tableMeta, update) => {
          return <span>{moment(value).format("MMMM Do YYYY, h:mm:ss a")}</span>;
        },
        filter: true,
        sort: true,
      },
    },
    {
      name: "Updated_by",

      label: "Updated By",

      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Remarks",

      label: "Remarks",

      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  //----------------------- /Add User-----------------

  const [historyData, setHistoryData] = React.useState([]);
  // const [updatedUsers, setUpdatedUsers] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  //------------------------ Add User Pop-up ---------

  const options = {
    filterType: "checkbox",
    // onRowClick: handleRowClick,
    selectableRows: false,
    search: false,
    print: false,
    filter: false,
    viewColumns: false,
    rowsPerPage: [5],
    searchAlwaysOpen: false,
    rowsPerPageOptions: [3, 5, 10, 15],
    responsive: "stacked",
    downloadOptions: {
      filename: "historic_document.csv",
      filterOptions: {
        useDisplayedColumnsOnly: true,
      },
    },
  };

  const theme = createTheme({
    overrides: {
      MUIDataTableSelectCell: {
        expandDisabled: {
          // Soft hide the button.
          visibility: "hidden",
        },
      },
    },
  });

  const handleAddUser = () => {
    handleClose();
    setUser();
    console.log();
  };

  useEffect(() => {}, []);

  return (
    <>
      <CacheProvider value={muiCache}>
        <div>
          <MUIDataTable
            title={"History Table"}
            data={props.data}
            columns={columns}
            options={options}
            className="themeOver"
          />
        </div>
      </CacheProvider>
    </>
  );
};

export default Historic;
