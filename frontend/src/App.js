import './App.css';
import Header from './components/Header/Header';
import NoticeBoardHeader from './components/NoticeBoard/NoticeBoardHeader';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <div className="app__body">
        <Sidebar />
        <span className="app__bodyFlex">
          <Header />  
          <NoticeBoardHeader />
        </span>
        
      </div>
      
      
   </div>
  );
}

export default App;
