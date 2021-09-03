<<<<<<< HEAD
import React from 'react';
import "./NoticeBoard.css";
import axios from "axios";


function NoticeBoard() {
    const [endpoint, setEndpoint] = React.useState(null);

    React.useEffect(() => {
        axios.get('/api/endpoints').then((response) => {
            setEndpoint(response.data);
        });
    }, []);

    if (!endpoint) return null;
    const endpoints = Object.keys(endpoint).map((item)=>endpoint[item])
    
    return (
        <div className="notice">
            <h3>Endpoints From Backend</h3>

            {endpoints.map((item, i)=>{
                return <li key={i}>{item}</li>
            })}
        </div>
    )
=======
import React from 'react'
import './NoticeBoard.css'
import NoticeBoardHeader from './NoticeBoardHeader'
import AdminNotice from '../NoticeBoard/noticeBoardComponent/AdminNotice'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import UserNotice from "../NoticeBoard/noticeBoardComponent/UserNoticeBoard";
import CreateNotice from './noticeBoardComponent/CreateNotice'

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

        {/* <Route path="/">
          this component should be created in the NoticeBoard/noticeBoard folder  remember to create a link for the View Notice Button that routes to admin-notice above <UserNotice />
        </Route> */}
      </Switch>
    </div>
  );
>>>>>>> 1c87e21052b32b6e35cb259d46014e491b3017ee
}

export default NoticeBoard;
