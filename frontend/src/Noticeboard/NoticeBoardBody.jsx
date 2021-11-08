/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import React, { useEffect, useState, useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Header from './Components/Header/Header';
import './NoticeBoard.css';
import AdminNotice from './Pages/AdminNotice/AdminNotice';
import OldNotices from './Pages/OldNotice/oldNotices';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import CreateNotice from './Pages/CreateNotice/CreateNotice';
import UserIntro from './Pages/LandingPage/UserIntro';
import UserNotice from './Pages/UserNotice/UserNoticeBoard';
import EditNotice from './Pages/EditNotice/EditNotice';
import CentrifugoConnection from '../Utils/real-time-connection';
import BookmarkedNotices from './Pages/BookmarkPage/bookmarked-notices';

function NoticeBoardBody() {
  const [toast] = useState(false);
  const [loader, setLoader] = useState(false);
  const [cent, setCent] = useState(false);

  const RealTime = CentrifugoConnection();
  useEffect(() => {
    RealTime;
  }, []);

  return (
    <div className="notice">
      <Header />
      <Switch>
        <Route exact path="/noticeboard/bookmark">
          <BookmarkedNotices />
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

        <Route exact path="/noticeboard">
          <UserIntro />
        </Route>
      </Switch>

      <Snackbar
        open={toast}
        autoHideDuration={5000}
        onClose={() => setLoader(false)}
        message={
          cent === true ? 'Centrifugo Connected' : 'Centrifugo Disconnected'
        }
        severity={cent === true ? 'success' : 'error'}
      />
    </div>
  );
}

export default NoticeBoardBody;
