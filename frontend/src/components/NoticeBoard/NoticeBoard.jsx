import React from 'react'
import './NoticeBoard.css'
import NoticeBoardHeader from './NoticeBoardHeader'
import AdminNotice from '../NoticeBoard/noticeBoardComponent/AdminNotice'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import UserNotice from "../NoticeBoard/noticeBoardComponent/UserNoticeBoard";
import CreateNotice from './noticeBoardComponent/CreateNotice'
import AdminEntryPage from "../NoticeBoard/noticeBoardComponent/AdminEntryPage";

function NoticeBoard() {
  return (
    <div className="notice">
      <NoticeBoardHeader />
      <Switch>
        <Route path="/create-notice">
          <CreateNotice />
        </Route>
        <Route path="/admin-notice">
          <AdminNotice />
        </Route>

        <Route path="/user-notice">
          <UserNotice />
        </Route>

        <Route path="/">
          <AdminEntryPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default NoticeBoard;
