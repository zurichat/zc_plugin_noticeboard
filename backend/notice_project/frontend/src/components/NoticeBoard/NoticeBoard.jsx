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
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";

function NoticeBoard() {
  const { setPeople } = useContext(UserContext);
  const [toast, setToast] = useState(false);
  const [channelId, setChannelId] = useState("");
  const [loader, setLoader] = useState(false);
  const [cent, setCent] = useState(false);

  const _globalData = useContext(DataContext);
  const org_id = _globalData.Organizations[0];

  const today = new Date();
  const date = today.getDate();

  const CentrifugoConnection = async () => {
    await axios
      .get(
        `https://noticeboard.zuri.chat/api/v1/organisation/614679ee1a5607b13c00bcb7/get-room`
      )
      .then((res) => {
        const response = res.data.data[0]._id;
        setChannelId(response.toString());
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    const Connecting = () => {
      const centrifuge = new Centrifuge(
        "wss://realtime.zuri.chat/connection/websocket",
        { debug: true }
      );

      const today = new Date();
      const date = today.getDate();

      centrifuge.on("connect", function (ctx) {
        setCent(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 5000);
      });

      centrifuge.on("disconnect", function (ctx) {
        setCent(false);

        setTimeout(() => {
          setToast(true);
        });
        console.log("disconnected", ctx);
      });

      centrifuge.connect();

      centrifuge.subscribe(`channelId`, (ctx) => {
        const message = ctx.data.data;
        setPeople(
          message
            .reverse()
            .filter(
              (notice) => notice.created.substring(8, 10) === date.toString()
            )
        );
      });
    };

    Connecting();
  };

  useEffect(() => {
    CentrifugoConnection();
  }, []);

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

      <Snackbar
        open={toast}
        autoHideDuration={5000}
        onClose={() => setLoader(false)}
        message={
          cent == true ? "Centrifugo Connected" : "Centrifugo Disconnected"
        }
        severity={cent == true ? "success" : "error"}
      />
    </div>
  );
}

export default NoticeBoard;
