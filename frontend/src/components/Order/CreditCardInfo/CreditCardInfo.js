import React from "react";
import { Box, Card, CardContent, Grid, TextField } from "@material-ui/core";
import CardTitle from "../CardTitle/CardTitle";
import Cards from "react-credit-cards";

function CreditCardInfo(props) {
  const { creditCard, onInputChange, onFocusChange } = props;

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Card>
          <CardTitle
            title="Add Your Payment Method"
            subtitle="Your personal information is protected"
          />
          <CardContent>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={10} md={6}>
                <Cards
                  cvc={creditCard.cvc}
                  expiry={creditCard.expiry}
                  focused={creditCard.focus}
                  name={creditCard.name}
                  number={creditCard.number}
                />
              </Grid>
              <Grid item xs={10} md={6}>
                <form>
                  <Box p={3}>
                    <Grid container justify="space-around" spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          type="tel"
                          name="number"
                          id="card-number"
                          label="Card Number"
                          pattern="[\d| ]{16,22}"
                          defaultValue=""
                          onChange={onInputChange}
                          onFocus={onFocusChange}
                          fullWidth
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          name="name"
                          id="card-name"
                          label="Name on Card"
                          defaultValue=""
                          onChange={onInputChange}
                          onFocus={onFocusChange}
                          fullWidth
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={7}>
                        <TextField
                          type="tel"
                          name="expiry"
                          id="card-exp"
                          label="Valid Thru"
                          pattern="\d\d/\d\d"
                          defaultValue=""
                          onChange={onInputChange}
                          onFocus={onFocusChange}
                          fullWidth
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          type="tel"
                          name="cvc"
                          id="card-cvc"
                          label="CVC"
                          pattern="\d{3,4}"
                          defaultValue=""
                          onChange={onInputChange}
                          onFocus={onFocusChange}
                          fullWidth
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </form>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default CreditCardInfo;
