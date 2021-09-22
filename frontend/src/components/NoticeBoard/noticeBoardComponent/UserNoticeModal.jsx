import React from "react";
import "./UserNoticeModal.css";
import UserMenu from "./UserMenu/UserMenu";
import { Button } from "@material-ui/core";

function UserNoticeModal({ user }) {
  const id = String(user.id);
  const modal_id = `modal_${id}`;
  const paragraphs = user.moreInfo;

  const CloseModal = (event) => {
    const clickedButton = event.currentTarget.getAttribute("id");
    const modal_id = `modal_${clickedButton}`;
    document.getElementById(modal_id).style.display = "none";
  };

  document.addEventListener('keydown', (event) => {
    if(event.key === "Escape"){
      document.getElementById(modal_id).style.display = "none";
    }
  })

  return (
    <div className="userNoticeModal" id={modal_id}>
      <div className="userNoticeModal-container">
        <div className="userNoticeModal-innerContainer">
          <div className="userNoticeModal-userInfo">
            <div className="userNoticeModal-imageAndText">
              <div className="userNoticeModal-imageContainer">
                <img
                  className="userNoticeModal-image"
                  src={user.image}
                  alt="user"
                />
              </div>
              <div className="userNoticeModal-textContainer">
                <h1 className="userNoticeModal-username">{user.username}</h1>
                <div className="userNoticeModal-timeStamp">
                  <span className="userNoticeModal-stampDay">{user.date}</span>
                  &#183;
                  <span className="userNoticeModal-stampHour">
                    {user.timestamp}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <UserMenu />
            </div>
          </div>
          <div>
            <h2 className="userNoticeModal-title">{user.title}</h2>
          </div>
          {paragraphs.map((paragraph, index) => {
            return (
              <p className="userNoticeModal-paragraph" key={index}>
                {paragraph}
              </p>
            );
          })}

          <div className="closeModalButton-container">
            <Button
              className="closeModalButton"
              variant="contained"
              id={id}
              onClick={(event) => CloseModal(event)}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserNoticeModal;
