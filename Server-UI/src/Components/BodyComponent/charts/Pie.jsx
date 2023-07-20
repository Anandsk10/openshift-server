import "./pie.scss";
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
import swal from "sweetalert";
import api from "../../../utils/api";

export default function App() {
  const [data, setData] = useState([]);
  // const [fdata, setFdata] = useState([]);

  // const filterd = fdata.filter(function (element) {
  //   return (element = data.Location);
  // });
  // console.log("filter", filterd);
  function handleChange(event) {
    console.log("hiii", data?.Dashboard?.Time);
  }
  useEffect(() => {
    fetchDetails();
  }, []);
  const fetchDetails = async () => {
    // const { data } = await axios.get("dashboard5");
    // setData(data);
    const res = await api
      .get("dashboard5")
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.Historic_Details, "getHistoric_Details");

          console.log("dotnet value ", res.data);
          setData(res.data);
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
  // console.log("ggg", data);

  // const CustomizedLabel = (x, y, fill, pv) => {
  //   return (
  //     <text
  //       x={x}
  //       y={y}
  //       dy={-4}
  //       fontSize="16"
  //       fontFamily="sans-serif"
  //       fill={fill}
  //       textAnchor="middle"
  //     >
  //       {pv}%
  //     </text>
  //   );
  // };

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
            id="heading1"
            style={{
              textAlign: "center",
              color: "black",
              fontSize: 20,
              fontWeight: 400,
            }}
          >
            Server Age{" "}
          </p>
          {/* <MoreVertIcon fontSize="small" /> */}
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            className="featuredChart"
            width="100%"
            height={400}
            data={data?.Dashboard}
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
              dataKey="Time"
              axisLine={false}
              tickLine={false}
            />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: "transparent" }} />
            <Legend />
            <Bar
              barSize={40}
              dataKey="Reserved"
              stackId="a"
              fill="#6666ff"
              // label={CustomizedLabel}
              // label
            >
              {/* <LabelList
                dataKey="Reserved"
                position="insideTop"
                style={{ fill: "#fff" }}
              /> */}
              <LabelList dataKey="Reserved" content={renderCustomizedLabel} />
            </Bar>
            <Bar
              barSize={40}
              dataKey="Vacant"
              stackId="a"
              fill=" #bb9cf0"
              // label={CustomizedLabel}
            >
              {/* <LabelList
                dataKey="Vacant"
                position="insideTop"
                style={{ fill: "#fff" }}
              /> */}
              <LabelList dataKey="Vacant" content={renderCustomizedLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Fragment>
  );
}
