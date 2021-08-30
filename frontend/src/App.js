import './App.css';
import Header from './components/Header/Header';
import Notice from './components/NoticeBoard/Notice';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <div className="app__body">
        <Sidebar />
        <Header />
      </div>
   </div>
  );
}

export default App;
