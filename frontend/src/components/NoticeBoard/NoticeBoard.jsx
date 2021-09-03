import React from "react";
import "./NoticeBoard.css";
import NoticeBoardHeader from "./NoticeBoardHeader";
import AdminNotice from "../NoticeBoard/noticeBoardComponent/AdminNotice";
import UserNotice from "../NoticeBoard/userNotice/UserNoticeBoard";

function NoticeBoard() {
  return (
    <div className="notice">
      <NoticeBoardHeader />
      <AdminNotice />
      <UserNotice />
    </div>
  );
}

export default NoticeBoard;
