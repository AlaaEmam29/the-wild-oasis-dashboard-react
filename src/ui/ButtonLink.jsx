import React from "react";
import Button from "./Button";

export default function ButtonLink(props) {
  return (
    <Button variation="link" {...props}>
      {props.icon} <span>{props.children}</span>
    </Button>
  );
}
