import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Grid, makeStyles, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

function AddressInput(props) {
  const { initAddress, onAddressChange } = props;

  const classes = useStyles();

  const [address, setAddress] = useState("");

  const addressChangedHandler = (updatedAddress) => {
    setAddress(updatedAddress);
  };

  const onAddressSelect = (selectedAddress) => {
    onAddressChange(selectedAddress);
    geocodeByAddress(selectedAddress)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={addressChangedHandler}
      onSelect={onAddressSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <React.Fragment>
          <Autocomplete
            fullWidth
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.description
            }
            getOptionSelected={(option, value) =>
              option.description === value.description
            }
            filterOptions={(x) => x}
            options={suggestions}
            autoComplete
            includeInputInList
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                {...getInputProps()}
                label="Your Full Address"
                variant="outlined"
                fullWidth
              />
            )}
            renderOption={(suggestion) => {
              return (
                <Grid
                  container
                  alignItems="center"
                  {...getSuggestionItemProps(suggestion, {})}
                >
                  <Grid item>
                    <LocationOnIcon className={classes.icon} />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body2" color="textSecondary">
                      {suggestion.description}
                    </Typography>
                  </Grid>
                </Grid>
              );
            }}
          />
        </React.Fragment>
      )}
    </PlacesAutocomplete>
  );
}

export default AddressInput;
