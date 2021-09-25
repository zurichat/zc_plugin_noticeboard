import "./App.css";
import Header from "./components/Header/Header";
import NoticeBoard from "./components/NoticeBoard/NoticeBoard";
import { BrowserRouter as Router } from "react-router-dom";
import Centrifuge from "centrifuge";
import { useEffect, useState } from "react";
import { GetUserInfo } from "@zuri/control";


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
      //option 1 write function to re-render the component that needs re-rendering
      //option 2, perform data fetch again
    });

    centrifuge.on('publish', function(ctx) {
      console.log(ctx);
  });

  }

  console.log(GetUserInfo())


  useEffect(() => {
    CentrifugoConnection()
  });

  return (
    <Router basename="/noticeboard">
      <div className="App">
        <div className="app__body">
          <span className="app__bodyFlex">
            <Header />
            <NoticeBoard />
          </span>
        </div>
      </div>
    </Router>
  );
}

export default App;
