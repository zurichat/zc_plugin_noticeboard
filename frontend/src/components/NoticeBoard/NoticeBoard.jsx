import React from "react";
import { useEffect, useState } from "react";
import "./NoticeBoard.css";
import NoticeBoardHeader from "./NoticeBoardHeader";
import AdminNotice from "../NoticeBoard/noticeBoardComponent/AdminNotice";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import CreateNotice from "./noticeBoardComponent/CreateNotice";
import UserIntro from "../NoticeBoard/noticeBoardComponent/UserIntro component/UserIntro";
import UserNotice from "./noticeBoardComponent/UserNoticeBoard";
import EmailUnsubscription from "./EmailUnsubscriptionPage/EmailUnsubscription";
import SearchResult from "./noticeBoardComponent/SearchResult";

function NoticeBoard() {
	return (
		<div className="notice">
			<NoticeBoardHeader />
			<Switch>
				<Route exact path="/search">
					<SearchResult />
				</Route>

				<Route exact path="/create-notice">
					<CreateNotice />
				</Route>
				<Route exact path="/admin-notice">
					<AdminNotice />
				</Route>
				<Route exact path="/user-notice">
					<UserNotice />
				</Route>

				<Route exact path="/unsubscribe-email/:id">
					<EmailUnsubscription />
				</Route>

				<Route exact path="/">
					<UserIntro />
				</Route>

				{/* <Route path="/"> 
      this component should be created in the NoticeBoard/noticeBoard folder  remember to create a link for the View Notice Button that routes to admin-notice above <UserNotice />
    </Route> */}
			</Switch>
		</div>
	);
}

export default NoticeBoard;
