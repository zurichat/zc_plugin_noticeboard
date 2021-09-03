import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import NoticeCreationDashboard from './components/NoticeBoard/NoticeCreationDashboard/NoticeCreationDashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/create" exact component={NoticeCreationDashboard} />
        </Switch>
      </BrowserRouter>
   </div>
  );
}

export default App;
