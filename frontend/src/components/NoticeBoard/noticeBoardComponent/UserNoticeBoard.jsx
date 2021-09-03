import React, { useState } from "react";
import CardNotice from "./CardNotice";
import "./UserNoticeBoard.css";

import NoticeData from "./DataToo.json";

const UserNotice = () => {
  const [users] = useState(NoticeData);

  return (
    <div className="user-notice">
      <div className="notice-heading">
        <p>Notices</p>
      </div>

      <div className="user-notice-post">
        {users.map((user) => (
          <CardNotice user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
};

export default UserNotice;
