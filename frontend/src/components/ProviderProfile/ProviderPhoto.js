import { Box, Chip, Grid } from "@material-ui/core";
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import DoneIcon from "@material-ui/icons/Done";
import photo from "../../assets/images/providerAvatar.jpg";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
  approve: {
    textAlign: "flex-end",
    justifyContent: "flex-end",
  },
}));

function ProviderPhoto(props) {
  const { handleSwitch, avail } = props;

  const handleChange = (event) => {
    handleSwitch(!avail);
  };
  const classes = useStyles();
  return (
    <Grid container justify={"space-around"}>
      <Grid item xs={4}>
        <Avatar alt="Cindy Baker" src={photo} className={classes.large} />
      </Grid>
      <Grid item xs={6} className={classes.approve}>
        <Box minWidth={"250px"} align={"center"}>
          <Box mt={3}>
            <Chip
              icon={<DoneIcon />}
              label="Approved"
              clickable
              color="primary"
            />
          </Box>
          <Box mt={3}>
            <FormControlLabel
              control={
                <Switch
                  checked={avail}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label={avail ? "available" : "unavailable"}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ProviderPhoto;
