import React from "react";
import "./UserNoticeModal.css";
import { Button } from "@material-ui/core";

function UserNoticeModal({ user }) {
  const id = String(user.id);

  return (
    <div className="userNoticeModal" id={id}>
      <div className="userNoticeModal-container">
        <div className="userNoticeModal-innerContainer">
          <div className='userNoticeModal-userInfo'>
            <img
              className="userNoticeModal-image"
              src={user.image}
              alt="user-image"
            />
            <div>
              <h1 className="userNoticeModal-username">{user.username}</h1>
              <div className="time-stamp">
                <span className="stamp-day">{user.date}</span>
                <span className="stamp-hour">{user.timestamp}</span>
              </div>
            </div>
          </div>

          <p>{user.moreInfo}</p>
          <Button></Button>
        </div>
      </div>
    </div>
  );
}

export default UserNoticeModal;
