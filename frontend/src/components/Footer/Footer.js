import React from "react";
import classes from "./Footer.module.css";
import { useTheme } from "@material-ui/core/styles";

import Bitmap from "../../assets/images/Bitmap.svg";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { grey } from "@material-ui/core/colors";

function Footer(props) {
  const theme = useTheme();
  return (
    <div
      className={classes.container}
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <div className={classes.container1}>
        <div className={classes.left}>
          <p className={classes.bigLetter}> Company</p>
          <p className={classes.sLetter}>About us</p>
          <p className={classes.sLetter}>Services</p>
          <p className={classes.sLetter}>Projects</p>
          <p className={classes.sLetter}>Career</p>
          <p className={classes.sLetter}>Contacts</p>
        </div>
        <div className={classes.middle}>
          <p className={classes.bigLetter}>Quick Links</p>
          <p className={classes.sLetter}>Success Stories</p>
          <p className={classes.sLetter}>Achievements</p>
        </div>
        <div className={classes.right}>
          <p className={classes.bigLetter}>Follow Us</p>

          <InstagramIcon style={{ color: grey[50], fontSize: 35 }} />
          <FacebookIcon style={{ color: grey[50], fontSize: 35 }} />
          <TwitterIcon style={{ color: grey[50], fontSize: 35 }} />
          <WhatsAppIcon style={{ color: grey[50], fontSize: 35 }} />
        </div>
      </div>
      <div className={classes.copyright}>
        <p> Copyright © 2021 The Love Team. - All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
