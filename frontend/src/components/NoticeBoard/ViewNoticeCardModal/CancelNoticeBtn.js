import React from "react";
import { Button } from "@material-ui/core";

const CancelNoticeBtn = ({ onClick }) => {
  return (
    <>
      <div className="cancel-btn-container">
        <Button
          className="cancel-btn"
          style={{
            color: "black",
            backgroundColor: "#c1c1c1",
            textTransform: "capitalize",
            width: "100px",
            padding: "8px",
            display: "flex",
            marginTop: "20px",
            fontFamily: "Lato"
          }}
          onClick={onClick}
        >
          Close
        </Button>
      </div>
    </>
  );
};

export default CancelNoticeBtn;
