import "./App.css";
import Header from "./components/Header/Header";
import NoticeBoard from "./components/NoticeBoard/NoticeBoard";
import { BrowserRouter as Router } from "react-router-dom";
import Centrifuge from "centrifuge";
import { useEffect, useState } from "react";
import { UserProvider } from './Data-fetcing';
// import { GetUserInfo } from "@zuri/zuri-control";

function App() {
  
  const CentrifugoConnection = () =>{
    const centrifuge = new Centrifuge(
      "wss://realtime.zuri.chat/connection/websocket",
      { debug: true }
    );

    centrifuge.on("connect", function (ctx) {
      console.log("connected", ctx);
    });

    centrifuge.on("disconnect", function (ctx) {
      console.log("disconnected", ctx);
    });

    centrifuge.connect();

    centrifuge.subscribe("noticeboard", (ctx) => {
      console.log(ctx);
      
      const fetching = () =>{
        fetch("https://noticeboard.zuri.chat/api/v1/notices")
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          setLoading(false);
          setIsError(true);
        }
      })
      .then((data) => {
        setPeople(data.data.filter((notice) => notice.created.substring(8, 10) === date.toString()));
        setLoading(false);
      })
      .catch((error) => console.log(error));
      } 

    });

    centrifuge.on('publish', function(ctx) {
      console.log(ctx);
  });

  

  }

  // console.log(GetUserInfo())


  useEffect(() => {
    CentrifugoConnection()
  });

  return (
    <Router basename="/noticeboard">
      <UserProvider >
        <div className="App">
          <div className="app__body">
            <span className="app__bodyFlex">
              <Header />
              <NoticeBoard />
            </span>
          </div>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
