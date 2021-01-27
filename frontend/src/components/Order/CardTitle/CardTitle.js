import React from "react";
import { CardHeader } from "@material-ui/core";

function CardTitle(props) {
  return (
    <CardHeader
      title={props.title}
      titleTypographyProps={{
        align: "center",
        variant: "h5",
      }}
      subheader={props.subtitle}
      subheaderTypographyProps={{
        align: "center",
      }}
    />
  );
}

export default CardTitle;
