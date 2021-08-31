import React from "react";

const ModalBtn = (props) => {
  return (
    <>
      <button
        className="modal-btn"
        style={{ backgroundColor: props.backgroundColor, color: props.color, width:props.width, fontWeight: props.fontWeight, marginRight: props.marginRight }}
      >
        {props.innerText}
      </button>
    </>
  );
};

export default ModalBtn;
