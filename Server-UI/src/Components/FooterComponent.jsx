import React from "react";
import { Box, Grid, Typography, Card } from "@material-ui/core";
import { useStyles } from "./BodyComponent/BodyStyles";
import FavoriteIcon from "@material-ui/icons/Favorite";

export default function FooterComponent() {
  const classes = useStyles();
  return (
    <Box
      sx={{
        marginTop: "calc(10% + 60px)",
        width: "100%",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
      component="footer"
      square
      variant="outlined"
      spacing={10}
      className={classes.footer}
      style={{
        flexGrow: 1,
        justifyContent: "center",
        display: "flex",
        my: 1,
      }}
    >
      {/* <Grid container> */}
      {/* <Grid item xs={12} sm={6} sx={{ mt: 40.5 }}>
          <Typography variant="body1" color="textSecondary" align="center">
          </Typography>
        </Grid> */}
      {/* Created With and affection <FavoriteIcon color='secondary' /> */}
      <Grid item xs={12} sm={12}>
        {/* <br /> */}
        <Typography
          variant="body1"
          style={{ color: "#fff", textAlign: "center", marginTop: 0 }}
          align="center"
          className="footerText"
        >
          ©2022 Infobell IT Solutions Pvt.Ltd.
        </Typography>
      </Grid>
      {/* </Grid> */}
    </Box>
  );
}
