import "./bar.scss";
import React, { Fragment } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "../../../utils/api";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import api from "../../../utils/api";
import swal from "sweetalert";

export default function App() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  // const [fdata, setFdata] = useState([]);

  // const filterd = fdata.filter(function (element) {
  //   return (element = data.Location);
  // });
  // console.log("filter", filterd);

  function handleChange(e) {
    const words = e.split("-");
    console.log("e", e);
    console.log("words", words);
    var ind = parseInt(words[2]);
    console.log("ind", typeof ind);
    let value = data1[ind - 1];
    if (ind === 0) {
      console.log("value", ind);
      console.log("Data V", data1);
      setData(data1);
    } else {
      let arr = [];
      arr.push(value);
      setData(arr);
      console.log(arr, "data for now use");
    }
    // setData1(value);
  }
  useEffect(() => {
    fetchDetails();
  }, []);
  const fetchDetails = async () => {
    // const { data } = await api.get("dashboard3");

    const res = await api
      .get("dashboard3")
      .then((res) => {
        if (res.status === 200) {
          console.log("bargraph res value ", res.data.Dashboard);
          setData(res.data.Dashboard);
          setData1(res.data.Dashboard);
          console.log("setdata1", data1);
          var location = [];
          location.push("ALL");
          for (var x in res.data.Dashboard) {
            location.push(res.data.Dashboard[x].Location);
          }
          console.log("Locatio nghgh", location);
          setData2(location);
          console.log("data2", data2);
        } else if (res.status === 202) {
          swal(res.data.Message);
        } else {
          alert("Something went wrong...Server Error!!");
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          console.log(error.response.data.Message); //Please Authenticate or whatever returned from server
          swal(error.response.data.Message, {
            icon: "warning",
            buttons: false,
            timer: 3000,
          });
          //redirect to login
        } else if (error.response.status === 400) {
          console.log(error); //Please Authenticate or whatever returned from server
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
  };
  var bardata = "";
  if (data1 != null) {
    bardata = data1;
  } else {
    bardata = data;
  }

  // var bardata = "";
  // if (data1 == null) {
  //   bardata = {
  //     Location: data1?.Location,
  //     Reserved: data1?.Reserved,
  //     Vacant: data1?.Vacant,
  //   };
  // } else {
  //   bardata = data?.Dashboard;
  // }
  console.log("dta for get ");

  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;

    if (height < 20) {
      return null;
    }

    return (
      <g>
        <text
          x={x + width / 2}
          y={y + height / 2}
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {/* {value.split(" ")[1]} */}
          {value}
        </text>
      </g>
    );
  };

  return (
    <Fragment>
      <div className="bar">
        <div className="">
          <p
            className="h1"
            id="heading3"
            style={{
              textAlign: "center",
              color: "black",
              fontSize: 20,
              fontWeight: 400,
            }}
          >
            Server Details By Location{" "}
          </p>
          {/* <MoreVertIcon fontSize="small" /> */}
        </div>
        <div>
          <Autocomplete
            id="countryselect"
            sx={{ width: 150 }}
            options={data2}
            autoHighlight
            onChange={(e) => handleChange(e.target.id)}
            getOptionLabel={(options) => options}
            renderOption={(props, Option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {Option}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label=" Location"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </div>
        <ResponsiveContainer width="100%" height={300} if>
          <BarChart
            width="100%"
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              opacity={0.1}
              vertical={false}
              strokeDasharray="3 3"
            />
            <XAxis
              padding={{ left: 30, right: 30 }}
              dataKey="Location"
              axisLine={false}
              tickLine={false}
            />
            <YAxis axisLine={false} tickLine={false} />
            {/* <Tooltip followPointer={false} /> */}
            <Tooltip cursor={{ fill: "transparent" }} />
            <Legend />
            <Bar
              barSize={40}
              dataKey="Reserved"
              stackId="a"
              fill="#6666ff"
              minPointSize={5}
              // label
            >
              {/* <LabelList
                dataKey="Reserved"
                position="end"
                style={{ fill: "black" }}
              /> */}
              <LabelList dataKey="Reserved" content={renderCustomizedLabel} />
            </Bar>

            <Bar
              barSize={40}
              dataKey="Vacant"
              stackId="a"
              minPointSize={5}
              fill="#bb9cf0"
            >
              {/* <LabelList
                dataKey="Vacant"
                position="insideTop"
                style={{ fill: "black" }}
              /> */}
              <LabelList dataKey="Vacant" content={renderCustomizedLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Fragment>
  );
}
