import React from "react";

import { Card, Box, Button, Grid, CardContent } from "@material-ui/core";

const defaultProps = {
  m: 1,
  border: 1,
};

function Title(props) {
  return (
    <Grid container justify="center">
      <Box width="1600px" borderColor="text.primary" {...defaultProps}>
        <Grid item xs={12}>
          <Card>
            <Box
              align="center"
              p={2}
              ml={1}
              height="20px"
              fontWeight="fontWeightBold"
              fontSize={48}
              font="Bodoni 72 Oldstyle Bold"
              marginTop="30px"
            >
              THE LOVE TEAM
            </Box>
            <CardContent>
              <Grid container justify="space-around">
                <Grid container>
                  <Grid item xs={12} align="center">
                    <Box p={2} height="30px">
                      <Button>Service</Button>
                      <Button>How it works</Button>
                      <Button>Joins us</Button>
                      <Button>Sign in</Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Title;
