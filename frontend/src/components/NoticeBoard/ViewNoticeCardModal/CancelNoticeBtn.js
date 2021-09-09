import React from "react";
import { Button } from "@material-ui/core";

const CancelNoticeBtn = ({ onClick }) => {
  return (
    <>
      <div className="cancel-btn-container">
        <Button
          className="cancel-btn"
          id="cancel-btn"
          variant="contained"
          style={{
            color: "#00B87C",
            background: "#f7f7f7",
            textTransform: "capitalize",
            padding: "8px",
            display: "flex",
            marginTop: "25px",
            fontFamily: "Lato",
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
