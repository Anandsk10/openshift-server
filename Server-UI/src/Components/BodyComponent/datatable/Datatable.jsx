import React from 'react'
import "../../../css/servers.css"
import MUIDataTable from "mui-datatables"; 
import history from "../ServersComponent"
const Datatable = (props) => {
    const history = (props.historyoutput)
  return (
    <div> <MUIDataTable
    title={props.title}
    data={props.data}
    columns={props.columns}
    options={props.options}
    className="themeOver"
  /></div>
  )
}

export default Datatable