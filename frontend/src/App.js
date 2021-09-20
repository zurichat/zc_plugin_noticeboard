import "./App.css";
import Header from "./components/Header/Header";
import NoticeBoard from "./components/NoticeBoard/NoticeBoard";
import { BrowserRouter as Router } from "react-router-dom";
import Centrifuge from "centrifuge";
import { useEffect, useState } from "react";

function App() {
  const [cent, setCent] = useState("");
  const [message, setMessage] = useState("No message");

  useEffect(() => {
    const centrifuge = new Centrifuge(
      // "ws://localhost:8000/connection/websocket"
      "wss://realtime.zuri.chat/connection/websocket",
      { debug: true }
    );

    centrifuge.on("connect", function (ctx) {
      setCent("Centrifugo as connected");
      console.log("connected", ctx);

      centrifuge.subscribe("noticeboard", (ctx) => {
        console.log(ctx.data);
        //option 1 write function to re-render the component that needs re-rendering
        //option 2, perform data fetch again

        setMessage(`${ctx.data.messages}`);
      });
    });

    centrifuge.on("disconnect", function (ctx) {
      console.log("disconnected", ctx);
      setCent("Centrifugo is disconnected");
    });

    centrifuge.connect();

    console.log(
      "Use effect is sha running bebe go find fault somewhere else ode"
    );
  });

  return (
    <Router>
      <div className="App">
        <div>
          <p>{cent}</p>
          <p>{message}</p>
        </div>
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
