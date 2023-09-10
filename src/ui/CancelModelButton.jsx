import React from "react";
import Model from "./Model";

export default function CancelModelButton(props) {
  return (
    <Model.Cancel variation="secondary" type="reset" {...props}>
      Cancel
    </Model.Cancel>
  );
}
