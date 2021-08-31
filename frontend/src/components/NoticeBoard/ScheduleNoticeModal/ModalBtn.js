import React from "react";
import { Button } from "@material-ui/core";

const ModalBtn = (props) => {
  return (
    <>
      <Button
        color="primary"
        className="modal-btn"
        style={{
          backgroundColor: props.backgroundColor,
          color: props.color,
          width: props.width,
          fontWeight: props.fontWeight,
          marginRight: props.marginRight,
          textTransform: "capitalize",
          fontFamily: "Lato",
          marginTop: "35px",
          borderRadius: "30px",
          marginBottom: "10px",
        }}
      >
        {props.innerText}
      </Button>
    </>
  );
};

export default ModalBtn;
