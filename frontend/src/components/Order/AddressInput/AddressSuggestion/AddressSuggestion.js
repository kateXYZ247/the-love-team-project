import React from "react";
import parse from "autosuggest-highlight/parse";
import { Grid, makeStyles } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

function AddressSuggestion(props) {
  const classes = useStyles();
  const { option } = props;

  if (
    option === null ||
    option === undefined ||
    !option.hasOwnProperty("structured_formatting") ||
    option.structured_formatting === undefined ||
    !option.structured_formatting.hasOwnProperty(
      "main_text_matched_substrings"
    ) ||
    !option.structured_formatting.hasOwnProperty("main_text") ||
    !option.structured_formatting.hasOwnProperty("secondary_text")
  ) {
    return null;
  }
  const matches = option.structured_formatting.main_text_matched_substrings;
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
          <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
            {part.text}
          </span>
        ))}

        <Typography variant="body2" color="textSecondary">
          {option.structured_formatting.secondary_text}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default AddressSuggestion;
