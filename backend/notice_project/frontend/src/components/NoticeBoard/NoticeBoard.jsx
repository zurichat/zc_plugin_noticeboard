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
import axios from 'axios'
//import { SubscribeToChannel } from '@zuri/control'

function NoticeBoard() {
  const { setPeople } = useContext(UserContext);
  const [toast, setToast] = useState(false);
  const [loader, setLoader] = useState(false);
  const [cent, setCent] = useState(false);

  const _globalData = useContext(DataContext);
  const org_id = _globalData.Organizations[0];

  const CentrifugoConnection = () =>{ 
    const today = new Date();
    const date = today.getDate(); 
  
    const callback = () => {
      const message = ctx.data.data;
      setPeople(
        message
          .reverse()
          .filter(
            (notice) => notice.created.substring(8, 10) === date.toString()
          )
      );
      console.log(ctx)
    }
    SubscribeToChannel("noticebaord-team-aquinas-stage-10", callback ); 
  }

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
          message={cent == true
                    ?"Centrifugo Connected"
                    :"Centrifugo Disconnected"
                  }
          severity={cent == true
            ?"success"
            :"error"
          }  
        />
        
    </div>
  );
}

export default NoticeBoard;
