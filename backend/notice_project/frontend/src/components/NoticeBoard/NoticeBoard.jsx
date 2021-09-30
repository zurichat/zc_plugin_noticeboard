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
import EditNotice from "./noticeBoardComponent/EditNotice/EditNotice";
import { DataContext } from "../../App";
import Snackbar from "@material-ui/core/Snackbar";
import { SubscribeToChannel } from '@zuri/control'
import Parcel from 'single-spa-react/parcel'
import { pluginHeader } from '@zuri/plugin-header' 

function NoticeBoard() {
  const { setPeople } = useContext(UserContext);
  const [toast, setToast] = useState(false);
  const [loader, setLoader] = useState(false);
  const [cent, setCent] = useState(false);

  const _globalData = useContext(DataContext);
  const org_id = _globalData.Organizations[0];

  const headerConfig = {
    name: 'NOTICEBOARD', //Name on header
    icon: 'https://www.pngfind.com/pngs/m/19-194225_png-file-svg-hashtag-icon-png-transparent-png.png', //Image on header
    thumbnailUrl: [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      'https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg',
      'https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png'
    ], //Replace with images of users
    userCount: 20, //User count on header
   eventTitle: () => {
      //Block of code to be triggered on title click
    },
    eventThumbnail: () => {
      //Block of code to be triggered on thumbnail click
    },
    hasThumbnail: true //set false if you don't want thumbnail on the header
  }

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
      <Parcel
 config={pluginHeader}
 wrapWith="div"
 wrapStyle={{width: "100%" }}
 headerConfig={headerConfig}
 />
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
