import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    //  flexGrow: 1,
    marginTop: 30,
    backgroundColor: `${theme.palette.primary.main}`,
    position: "flex",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100 %",
    margin: "auto",
  },
  footerText: {
    color: "#fff",
    fontSize: 13,
  },
  footerTextBottom: {
    color: "#fff",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 13,
    fontWeight: 500,
  },
  footerTitle: {
    color: "#fff",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 22,
    fontWeight: 500,
  },
}));

function Footer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={4} align="center">
          <Box>
            <p className={classes.footerTitle}> Company</p>
            <p className={classes.footerText}>About us</p>
            <p className={classes.footerText}>Services</p>
            <p className={classes.footerText}>Projects</p>
            <p className={classes.footerText}>Career</p>
            <p className={classes.footerText}>Contacts</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} align="center">
          <Box>
            <p className={classes.footerTitle}>Quick Links</p>
            <p className={classes.footerText}>Success Stories</p>
            <p className={classes.footerText}>Achievements</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} align="center">
          <Box>
            <p className={classes.footerTitle}>Follow Us</p>
            <InstagramIcon style={{ color: grey[50], fontSize: 35 }} />
            <FacebookIcon style={{ color: grey[50], fontSize: 35 }} />
            <TwitterIcon style={{ color: grey[50], fontSize: 35 }} />
            <WhatsAppIcon style={{ color: grey[50], fontSize: 35 }} />
          </Box>
        </Grid>
        <Grid item xs={12} align="center">
          <Box className={classes.footerTextBottom}>
            <p> Copyright (c) 2021 The Love Team. - All rights reserved.</p>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
