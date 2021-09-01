import './App.css';
import Header from './components/Header/Header';
import NoticeBoard from './components/NoticeBoard/NoticeBoard';
import UserIntro from './components/NoticeBoard/UserIntro/UserIntro';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <div className="app__body">
        <Sidebar />
        <span className="app__bodyFlex">
          <Header />  
          {/*<NoticeBoard />*/}
          <UserIntro />
        </span>
        
      </div>
      
      
   </div>
  );
}

export default App;
