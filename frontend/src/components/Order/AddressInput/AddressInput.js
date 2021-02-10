import React, { useEffect, useState } from "react";
import { Grid, makeStyles, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Typography from "@material-ui/core/Typography";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete/dist/utils";
import { GOOGLE_MAP_CALL_DELAY } from "../../../constant/api";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const autocompleteService = { current: null };

function AddressInput(props) {
  const { initAddress, onAddressChange, onLatLngChange } = props;

  const classes = useStyles();

  const [value, setValue] = useState({ description: initAddress });
  const [inputValue, setInputValue] = useState(initAddress);
  const [options, setOptions] = useState([]);

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, GOOGLE_MAP_CALL_DELAY),
    []
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];
        if (value) {
          newOptions = [value];
        }
        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const valueChangedHandler = (event, newValue) => {
    setOptions(newValue ? [newValue, ...options] : options);
    setValue(newValue);
    if (newValue) {
      onAddressChange(newValue.description);
      fetchLatLng(newValue.description);
    }
  };

  const fetchLatLng = (addr) => {
    geocodeByAddress(addr)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        onLatLngChange(latLng.lat, latLng.lng);
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <Autocomplete
      id="google-map-demo"
      fullWidth
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      getOptionSelected={(option, value) => {
        return option.description === value.description;
      }}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={valueChangedHandler}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Your Full Address"
          variant="outlined"
          fullWidth
        />
      )}
      renderOption={(option) => {
        if (option === null || option === undefined) {
          return null;
        }
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}

export default AddressInput;
