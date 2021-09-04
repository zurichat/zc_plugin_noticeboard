<<<<<<< HEAD
import React from 'react';
import "./NoticeBoard.css";
import axios from "axios";

=======
import React from 'react'
import './NoticeBoard.css'
import NoticeBoardHeader from './NoticeBoardHeader'
import AdminNotice from '../NoticeBoard/noticeBoardComponent/AdminNotice'
import { BrowserRouter as  Switch, Route } from "react-router-dom"
// import UserNotice from "../NoticeBoard/noticeBoardComponent/UserNoticeBoard";
import CreateNotice from './noticeBoardComponent/CreateNotice'
import UserIntro from "../NoticeBoard/noticeBoardComponent/UserIntro component/UserIntro"
>>>>>>> f8a34e3fb11b6670a24b3b6648863578f4037f16

function NoticeBoard() {
    const [endpoint, setEndpoint] = React.useState(null);

    React.useEffect(() => {
        axios.get('/api/endpoints').then((response) => {
            setEndpoint(response.data);
        });
    }, []);

<<<<<<< HEAD
    if (!endpoint) return null;
    const endpoints = Object.keys(endpoint).map((item)=>endpoint[item])
    
    return (
        <div className="notice">
            <h3>Endpoints From Backend</h3>
=======
        <Route path="/">
          <UserIntro />
        </Route>
>>>>>>> f8a34e3fb11b6670a24b3b6648863578f4037f16

            {endpoints.map((item, i)=>{
                return <li key={i}>{item}</li>
            })}
        </div>
    )
}

export default NoticeBoard
