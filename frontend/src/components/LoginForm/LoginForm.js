import React from "react";
import { Box, Grid, TextField } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ColorButton from "../UI/Buttons/ColorButton";

function LoginForm(props) {
  const {
    onSubmit,
    username,
    setUsername,
    password,
    setPassword,
    keepSignedIn,
    setKeepSignedIn,
  } = props;
  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Box
            p={2}
            ml={1}
            height="20px"
            fontWeight="fontWeightBold"
            fontSize={24}
          >
            Login
          </Box>
          <Box p={2} height="40px">
            <TextField
              id="userName"
              label="UserName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box p={2} height="40px">
            <TextField
              id="Password"
              label="Password"
              type="password"
              autoComplete="on"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box p={2} height="20px">
            <FormControlLabel
              control={
                <Checkbox
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  name="check"
                />
              }
              label="Keep me signed in"
            />
          </Box>
          <Box p={2} height="30px">
            <ColorButton
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              color="primary"
            >
              LOG IN
            </ColorButton>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginForm;
