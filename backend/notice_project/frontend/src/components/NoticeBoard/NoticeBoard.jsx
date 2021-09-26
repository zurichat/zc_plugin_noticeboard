import React from "react";
import { useEffect, useState, useContext } from "react";
import "./NoticeBoard.css";
import NoticeBoardHeader from "./NoticeBoardHeader";
import AdminNotice from "../NoticeBoard/noticeBoardComponent/AdminNotice";
import OldNotices from "../NoticeBoard/noticeBoardComponent/Old_Notices/oldNotices";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import CreateNotice from "./noticeBoardComponent/CreateNotice";
import UserIntro from "../NoticeBoard/noticeBoardComponent/UserIntro component/UserIntro";
import UserNotice from "./noticeBoardComponent/UserNoticeBoard";
import EmailUnsubscription from "./EmailUnsubscriptionPage/EmailUnsubscription";
import SearchResult from "./noticeBoardComponent/SearchResult";
import { UserContext } from "../../Data-fetcing";
import Centrifuge from "centrifuge";
import EditNotice from "./noticeBoardComponent/EditNotice/EditNotice";
import { DataContext } from "../../App";

function NoticeBoard() {
  const { setPeople } = useContext(UserContext);

  const _globalData = useContext(DataContext);
  const org_id = _globalData.Organizations[0];

  const today = new Date();
  const date = today.getDate();

  const CentrifugoConnection = () => {
    const centrifuge = new Centrifuge(
      "wss://realtime.zuri.chat/connection/websocket",
      { debug: true }
    );
    const today = new Date();
    const date = today.getDate();

    centrifuge.on("connect", function (ctx) {
      console.log("connected", ctx);
    });

    centrifuge.on("disconnect", function (ctx) {
      console.log("disconnected", ctx);
    });

    centrifuge.connect();

    centrifuge.subscribe("noticeboard", (ctx) => {
      const message = ctx.data.data;
      setPeople(
        setPeople(
          message.filter(
            (notice) => notice.created.substring(8, 10) === date.toString()
          )
        )
      );

      console.log(message);
    });

    centrifuge.on("publish", function (ctx) {
      console.log(ctx);
    });
  };

//   useEffect(() => {
//     CentrifugoConnection();
//   }, []);

  return (
    <div className="notice">
      <NoticeBoardHeader />
      <Switch>
        <Route exact path="/noticeboard/search">
          <SearchResult />
        </Route>

        <Route exact path="/noticeboard/create-notice">
          <CreateNotice />
        </Route>
        <Route exact path="/noticeboard/admin-notice">
          <AdminNotice />
        </Route>
        <Route exact path="/noticeboard/edit-notice/:currentNoticeID">
          <EditNotice />
        </Route>
        <Route exact path="/noticeboard/user-notice">
          <UserNotice />
        </Route>

        <Route exact path="/noticeboard/old-notices">
          <OldNotices />
        </Route>

        <Route exact path="/noticeboard/unsubscribe-email/:userId/:orgId">
          <EmailUnsubscription />
        </Route>

        <Route exact path="/noticeboard">
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
