import "./App.css";
import Header from "./components/Header/Header";
import NoticeBoard from "./components/NoticeBoard/NoticeBoard";
import { BrowserRouter as Router } from "react-router-dom";
import Centrifuge from "centrifuge";
import { useEffect, useState } from "react";
import { GetUserInfo } from "@zuri/zuri-control";

function App() {
  
  const CentrifugoConnection = () =>{
    const centrifuge = new Centrifuge(
      "wss://realtime.zuri.chat/connection/websocket",
      { debug: true }
    );

    centrifuge.on("connect", function (ctx) {
      console.log("connected", ctx);

      centrifuge.subscribe("noticeboard", (ctx) => {
        console.log(ctx.data);
        //option 1 write function to re-render the component that needs re-rendering
        //option 2, perform data fetch again
      });
    });

    centrifuge.on("disconnect", function (ctx) {
      console.log("disconnected", ctx);
    });

    centrifuge.connect();
  }

  let userID="6146f82c845b436ea04d10e1"

  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TWpVd09EQTJObnhIZDNkQlIwUlplRTVFVFROTlJGVXdXa1JCZVU5RVVtbFplbHBvVDFSSmVVMTZVVEpaWnowOWZIN1pRLUZHYTlSTExIcjczUERnWVlDX3V4NU5BMmhzWUZ6M0FheERKNlRUIiwiZW1haWwiOiJwaWRAb3h5LmNvbSIsImlkIjoiNjE0MzcwNTRkMDI4NGJjNmE5MjIzNDZiIiwib3B0aW9ucyI6eyJQYXRoIjoiLyIsIkRvbWFpbiI6IiIsIk1heEFnZSI6NzkzOTY4NjE3NSwiU2VjdXJlIjpmYWxzZSwiSHR0cE9ubHkiOmZhbHNlLCJTYW1lU2l0ZSI6MH0sInNlc3Npb25fbmFtZSI6ImY2ODIyYWY5NGUyOWJhMTEyYmUzMTBkM2FmNDVkNWM3In0.SwBlvr0h2BSas0aCPaqQaRr";

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
