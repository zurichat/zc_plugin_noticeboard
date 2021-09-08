import React, { useState } from "react";
import CardNotice from "./CardNotice";
import "./UserNoticeBoard.css";
import NoticeData from "./DataToo.json";
import UserNoticeModal from "./UserNoticeModal";

const UserNotice = () => {
  const [users] = useState(NoticeData);
  
  return (
    <div className="user-notice" id="user-notice">
      <div className="notice-heading">
        <p>Notices</p>
      </div>

      <div className="user-notice-post">
        {users.map((user) => (
          <div key={user.id}>
            <CardNotice user={user} />
            <UserNoticeModal user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserNotice;
