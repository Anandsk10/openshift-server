import React from "react";
import "./home.scss";
import { Box, Card, Grid, Typography, Button } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import Pie from "../charts/Pie";
import Dotnet from "../charts/Dotnet";
import Bar1 from "../charts/Bar";
import { Hidden } from "@mui/material";
const Home = () => {
  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    // <div className="home">
    //   {/* <Sidebar/> */}
    //   <h2
    //     style={{
    //       textAlign: "center",
    //       color: "black",
    //       fontSize: 20,
    //       fontWeight: 800,
    //     }}
    //   >
    //     Server Usage Dashboard
    //   </h2>
    //   <div className="homeContainer">
    //     {/* <Navbar/> */}

    //     {/* <div className="widget"></div> */}
    //     <div className="dotnet">
    //       <Dotnet />
    //     </div>
    //     <div className="dotnet">
    //       <Pie />
    //     </div>
    //     <div className="pie">
    //       <Bar1 />
    //     </div>
    //     {/* <div className="homeContainer">
    //       <div className="charts"></div>
    //     </div> */}
    //   </div>
    // </div>
    <>
      <Stack style={{ marginTop: 60, }}>
        <iframe
          title="Server Usage"
          width="100%"
          height={615}
          // maxHeight={'100%'}
          // scrolling={"no"}
          // overflow={"hidden"}
          // style={{ height: "185px", overflow: "scroll", width: "100%" }}
          src="https://app.powerbi.com/reportEmbed?reportId=520195b8-b783-44f8-871e-049fef12ff3c&autoAuth=true&ctid=3dd8961f-e488-4e60-8e11-a82d994e183d&filterPaneEnabled=false&navContentPaneEnabled=false"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
      </Stack>
    </>
  );
};

export default Home;
