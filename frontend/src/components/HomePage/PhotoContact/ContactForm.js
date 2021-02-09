import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  CardHeader,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textBox: {
    width: 500,
  },
}));

function ContactForm(props) {
  // const { } = props;
  const classes = useStyles();
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Box
          width="400px"
          color="#3C3C3C"
          fontFamily="'Helvetica Neue', sans-serif"
          fontSize={30}
          fontWeight="fontWeightBold"
          // line-height="29px"
          align="center"
          // margin="20px auto"
          marginLeft="50px"
        >
          CONTACT US
        </Box>
      </Grid>
      <Box p={5}>
        <Grid container align="center" spacing={3}>
          <Grid item xs={12}>
            <Box>
              <TextField
                id="FullName"
                label="Full Name"
                defaultValue="Johnny Holland"
                name="FullName"
                variant="outlined"
                className={classes.textBox}
                marginleft="50px"
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              name="Email"
              defaultValue="Ksimpson@topicshots.com"
              variant="outlined"
              className={classes.textBox}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="description"
              // label="Description"
              // name="Description"
              multiline
              rows={4}
              variant="outlined"
              className={classes.textBox}
              defaultValue="Description *"
            />
          </Grid>
        </Grid>
      </Box>
      {/*</CardContent>*/}
      {/*</Grid>*/}
    </Grid>
  );
}

export default ContactForm;
