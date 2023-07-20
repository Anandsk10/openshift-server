export const infraAdminColumn = [
  {
    name: "Sl no",
    label: "Sl.No",
    options: {
      filter: false,
      sort: true,
      download: false,
      customBodyRender: (value, tableMeta, update) => {
        let rowIndex = Number(tableMeta.rowIndex) + 1;
        return <span>{rowIndex}</span>;
      },
    },
  },
  {
    name: "User_Id",
    label: "User ID",
    options: {
      filter: true,
      // sort: true,
      display: false,
    },
  },
  {
    name: "Email_Id",
    label: "Email ID",
    options: {
      filter: true,
      // sort: true,
    },
  },
  {
    name: "First_Name",
    label: "First Name",
    options: {
      filter: true,
    },
  },
  {
    name: "Last_Name",
    label: "Last Name",
    options: {
      filter: true,
    },
  },
  {
    name: "Role",
    label: "Role",
    options: {
      filter: true,
      // sort: false,
    },
  },
  {
    name: "Teams",
    label: "Teams",
    options: {
      filter: true,
    },
  },
  {
    name: "Created_on",
    label: "Created On",
    options: {
      customBodyRender: (value, tableMeta, update) => {
        return <span>{value.slice(0, 10)}</span>;
      },
      filter: true,
    },
  },
  {
    name: "Created_by",
    label: "Created By",
    options: {
      filter: true,
    },
  },
  {
    name: "Updated_on",
    label: "Updated On",
    options: {
      customBodyRender: (value, tableMeta, update) => {
        return <span>{value.slice(0, 10)}</span>;
      },
      filter: true,
    },
  },
  {
    name: "Updated_by",
    label: "Updated By",
    options: {
      filter: true,
    },
  },
];

export const userColumn = [
  {
    name: "Sl no",
    label: "Sl.No",
    options: {
      filter: false,
      sort: true,
      download: false,
      // display: true,
      customBodyRender: (value, tableMeta, update) => {
        let rowIndex = Number(tableMeta.rowIndex) + 1;
        return <span>{rowIndex}</span>;
      },
    },
  },
  {
    name: "User_Id",
    label: "User ID",
    options: {
      filter: true,
      sort: true,
      display: false,
    },
  },
  {
    name: "Email_Id",
    label: "Email ID",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "First_Name",
    label: "First Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Last_Name",
    label: "Last Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Role",
    label: "Role",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Teams",
    label: "Teams",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Created_on",
    label: "Created On",
    options: {
      customBodyRender: (value, tableMeta, update) => {
        return <span>{value.slice(0, 10)}</span>;
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
    name: "Updated_on",
    label: "Updated On",
    options: {
      customBodyRender: (value, tableMeta, update) => {
        return <span>{value.slice(0, 10)}</span>;
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
    name: "Actions",
    label: "Actions",
    options: {
      download: false,
    },
  },
];

export const optionsDetails = {
  expandableRowsOnClick: true,
  textLabels: {
    body: {
      noMatch: " No Records Available",
    },
  },
  filterType: "checkbox",
  selectableRows: false,
  print: false,
  filter: false,
  viewColumns: false,
  search: false,
  rowsPerPage: [5],
  rowsPerPageOptions: [3, 5, 10, 15],
  responsive: true,
  downloadOptions: {
    filename: "user_document.csv",
    filterOptions: {
      useDisplayedColumnsOnly: true,
    },
  },
};
