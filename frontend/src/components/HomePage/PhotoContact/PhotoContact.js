import React from "react";
import { Grid, Box, lighten } from "@material-ui/core";
import memberPhoto from "../../../assets/images/memberPhoto.svg";
import PhotoContactRight from "./PhotoContactRight/PhotoContactRight";

import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";

const MainBox = withStyles((theme) => ({
  root: {
    width: 1600,
    backgroundColor: lighten(theme.palette.primary.light, 0.8),
  },
}))(Box);

function PhotoContact(props) {
  // const theme = useTheme();
  return (
    <MainBox>
      <Grid container justify="center">
        <Grid item xs={12} sm={6}>
          <Box marginTop="100px">
            <img src={memberPhoto} alt="photo" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} align="center">
          <PhotoContactRight />
        </Grid>
      </Grid>
    </MainBox>
  );
}

export default PhotoContact;
