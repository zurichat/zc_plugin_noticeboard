import "./App.css";
import Header from "./components/Header/Header";
import NoticeBoard from "./components/NoticeBoard/NoticeBoard";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserProvider } from './Data-fetcing';
// import { GetUserInfo } from "@zuri/control";


function App() {

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
