/* eslint-disable react/jsx-filename-extension */
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import ZuriGlobalHeader from './Noticeboard/NoticeBoardHeader';
// eslint-disable-next-line import/no-cycle
import NoticeBoard from './NoticeBoard/NoticeBoard';
// import { GetUserInfo } from "@zuri/control";
import { UserProvider } from './Context/Data-fetcing';
import BookmarkContextProvider from './Context/BookmarkContext';
import UserBookmarkContextProvider from './Context/UserBookmarkContext';

// For testing purposes

export const DataContext = React.createContext();
export const UserInfoContext = React.createContext();

function App() {
  const [userData, setUserData] = useState(null);
  /* Get User Info  */

  const currentWorkspace = localStorage.getItem('currentWorkspace');
  const token = sessionStorage.getItem('token');
  // eslint-disable-next-line consistent-return
  const GetUserInfo = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if ((user && token) !== null) {
      setUserData('loading');
      try {
        const response = await axios.get(
          `https://api.zuri.chat/organizations/${currentWorkspace}/members/?query=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const UserData = response.data.data[0];
        UserData.currentWorkspace = currentWorkspace;
        setUserData(UserData);
        return UserData;
      } catch (err) {
        return err;
      }
    }
  };

  useEffect(() => {
    GetUserInfo();
  }, []);

  return (
    <Router basename="/noticeboard">
      <UserInfoContext.Provider value={userData}>
        <UserProvider>
          <div className="App">
            <div className="app__body">
              <span className="app__bodyFlex">
                <ZuriGlobalHeader />
                <BookmarkContextProvider>
                  <UserBookmarkContextProvider>
                    <NoticeBoard />
                  </UserBookmarkContextProvider>
                </BookmarkContextProvider>
              </span>
            </div>
          </div>
        </UserProvider>
      </UserInfoContext.Provider>
    </Router>
  );
}

export default App;
