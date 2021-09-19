import React from "react";
import "./NoticeBoardHeader.css";
import Member1 from "../../assets/member-avatar.svg";
import Member2 from "../../assets/member-2.svg";
import Member3 from "../../assets/member-3.svg";
import Member4 from "../../assets/member-4.svg";

function NoticeBoardHeader() {
  return (
    <div className="noticeboard-header">
      <div className="noticeboard-header-container">
        <div className="heading">Notice Board</div>

        <div className="members-avatars-grp">
          <div className="avatar-wrap">
            <div className="avatar">
              <img src={Member4} alt="avatar" />
            </div>

            <div className="avatar">
              <img src={Member3} alt="avatar" />
            </div>

            <div className="avatar">
              <img src={Member2} alt="avatar" />
            </div>

            <div className="avatar">
              <img src={Member1} alt="avatar" />
            </div>
          </div>

          <div className="member-total-count">145</div>
        </div>
      </div>
    </div>
  );
}

export default NoticeBoardHeader;
