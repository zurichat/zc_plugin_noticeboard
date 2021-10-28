import "./App.css";
import ZuriGlobalHeader from "./components/NoticeBoard/NoticeBoardHeader";
import NoticeBoard from "./components/NoticeBoard/NoticeBoard";
import { BrowserRouter as Router } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import { GetUserInfo } from "@zuri/control";
import { UserProvider } from "./Data-fetcing";
import { SearchProvider } from "./noticeContext";
import BookmarkContextProvider from "./components/NoticeBoard/noticeBoardComponent/BookmarkContext";
import UserBookmarkContextProvider from "./components/NoticeBoard/noticeBoardComponent/UserBookmarkContext";
import axios from "axios";

// For testing purposes

const _globalData = {
  Organizations: ["614679ee1a5607b13c00bcb7"],
  created_at: "2021-09-21T07:02:33.998839808+02:00",
  deactivated: false,
  deactivated_at: "0001-01-01T00:00:00Z",
  email: "layobright@gmail.com",
  email_verification: null,
  first_name: "Layo",
  isverified: true,
  last_name: "Bright",
  password: "$2a$14$qDozTdwwG2x7LoM1hVBJueWcQugPwQs7Ngi2A4dmBmjvLmH/sdHV6",
  password_resets: null,
  phone: "",
  settings: null,
  time_zone: "",
  updated_at: "0001-01-01T00:00:00Z",
  workspaces: null,
  _id: "61496769e4b2aebf8ec8cff1",
};

//const _globalData = GetUserInfo();
export const DataContext = React.createContext();
export const UserInfoContext = React.createContext();

function App() {
  //let _globalData;

  const [userData, setUserData] = useState(null);

  //*********Get User Info ***********

  const currentWorkspace = localStorage.getItem("currentWorkspace");
  let token = sessionStorage.getItem("token");
  const GetUserInfo = async () => {
    let user = JSON.parse(sessionStorage.getItem("user"));

    if ((user && token) !== null) {
      setUserData("loading");
      try {
        const response = await axios.get(
          `https://api.zuri.chat/organizations/${currentWorkspace}/members/?query=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let UserData = response.data.data[0];
        UserData.currentWorkspace = currentWorkspace;
        setUserData(UserData);
        return UserData;
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("YOU ARE NOT LOGGED IN, PLEASE LOG IN");
    }

    console.log(userData);
  };

  useEffect(() => {
    GetUserInfo();
  }, []);

  return (
    <Router basename="/noticeboard">
      <UserInfoContext.Provider value={userData}>
        <DataContext.Provider value={_globalData}>
          <UserProvider>
            <SearchProvider>
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
            </SearchProvider>
          </UserProvider>
        </DataContext.Provider>
      </UserInfoContext.Provider>
    </Router>
  );
}

export default App;
