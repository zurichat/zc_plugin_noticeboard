import './App.css';
import Header from './components/Header/Header';
import NoticeBoard from './components/NoticeBoard/NoticeBoard';
import Sidebar from './components/Sidebar/Sidebar';
<<<<<<< HEAD
=======
import { BrowserRouter as Router} from "react-router-dom"
>>>>>>> f8a34e3fb11b6670a24b3b6648863578f4037f16



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
