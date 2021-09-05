import './App.css';
import Header from './components/Header/Header';
import NoticeBoard from './components/NoticeBoard/NoticeBoard';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router} from "react-router-dom";
import UserIntro from './components/NoticeBoard/noticeBoardComponent/UserIntro component/UserIntro'



function App() {
  return (
    <Router>
      <div className="App">
        <div className="app__body">
          <Sidebar />
          <span className="app__bodyFlex">
            <Header />
            <NoticeBoard />
          </span>
          {/* <UserIntro /> */}
        </div>
      </div>
   </Router>
  );
}

export default App;
