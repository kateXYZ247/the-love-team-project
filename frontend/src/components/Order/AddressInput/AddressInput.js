import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import throttle from "lodash/throttle";
import {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete/dist/utils";
import { GOOGLE_MAP_CALL_DELAY } from "../../../constant/api";
import AddressSuggestion from "./AddressSuggestion/AddressSuggestion";

const autocompleteService = { current: null };

function AddressInput(props) {
  const { initAddress, onAddressChange, onLatLngChange, checkAddress, validAddress } = props;

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
      onBlur={checkAddress}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          FormHelperTextProps={{
            error: true,
          }}
          label="Your Full Address"
          variant="outlined"
          helperText={validAddress === "null" ? 'Address is required' : ''}
          fullWidth
        />
      )}
      renderOption={(option) => <AddressSuggestion option={option} />}
    />
  );
}

export default AddressInput;
