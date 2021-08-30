import './App.css';
import Header from './Header/Header';
import NoticeBoard from './NoticeBoard/NoticeBoard';
import Sidebar from './Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <div className="app__body">
        <Sidebar />
        <span className="app__bodyFlex">
          <Header />  
          <NoticeBoard />
        </span>
        
      </div>
      
      
   </div>
  );
}

export default App;
