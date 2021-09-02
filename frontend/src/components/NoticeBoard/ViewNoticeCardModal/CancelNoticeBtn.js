import React from "react";
import { Button } from "@material-ui/core";

const CancelNoticeBtn = () => {
  return (
    <>
      <div className="cancel-btn-container">
        <Button
          className="cancel-btn"
          style={{
            color: "#bebebe",
            backgroundColor: "#F6F6F6",
            textTransform: "capitalize",
            width: "100px",
            padding: "8px",
            display: "flex",
            marginTop: "20px",
          }}
        >
          Close
        </Button>
      </div>
    </>
  );
};

export default CancelNoticeBtn;
