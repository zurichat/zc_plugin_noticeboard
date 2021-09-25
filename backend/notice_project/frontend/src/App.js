import "./App.css";
import Header from "./components/Header/Header";
import NoticeBoard from "./components/NoticeBoard/NoticeBoard";
import { BrowserRouter as Router } from "react-router-dom";
import { GetUserInfo } from "@zuri/control";


function App() {

  console.log(GetUserInfo());
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
