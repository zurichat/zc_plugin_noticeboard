// import React, { useState } from "react";
import "./ViewNotice.css";
import CancelNoticeBtn from "./CancelNoticeBtn";

const ViewNoticeCards = ({ data }) => {
  const cancelBtn = () => {
    const modalCard = document.getElementById("modal");
    const contain = document.getElementById('contain')
    modalCard.classList.add("none");
    contain.classList.add("none")

  };
  return (
    <div className="contain" id="contain">
      <div className="modal-card" id="modal">
        <div className="img-and-name-container">
          <div className="img">
            <img
              src={data.userImage}
              alt={data.userName}
              className="user-picture"
            />
          </div>

          <div className="name-time">
            <h1 className="user-name">{data.userName}</h1>
            <div className="time-stamps">
              <p className="date-stamp">{data.date}</p>
              <p className="date-stamp stamp-two">{data.timeStamp}</p>
            </div>
          </div>
        </div>

        <h2 className="modal-title">{data.title}</h2>
        <p className="modal-info">{data.info}</p>
        <div>
          <img
            src="https://res.cloudinary.com/clefayomide/image/upload/v1630517027/dummy-img.svg"
            alt="belle cosmetics"
            className="dummy-img"
          />
          <CancelNoticeBtn onClick={cancelBtn}/>
        </div>
      </div>
    </div>
  );
};

export default ViewNoticeCards;
