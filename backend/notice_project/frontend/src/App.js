import "./App.css";
import Header from "./components/Header/Header";
import NoticeBoard from "./components/NoticeBoard/NoticeBoard";
import { BrowserRouter as Router } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import { GetUserInfo } from "@zuri/control";
import { UserProvider } from "./Data-fetcing";
import { SearchProvider } from "./noticeContext";
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
  // const CentrifugoConnection = () => {
  //   const centrifuge = new Centrifuge(
  //     "wss://realtime.zuri.chat/connection/websocket",
  //     { debug: true }
  //   );

  //   centrifuge.on("connect", function (ctx) {
  //     console.log("connected", ctx);
  //   });

  //   centrifuge.on("disconnect", function (ctx) {
  //     console.log("disconnected", ctx);
  //   });

  //   centrifuge.connect();

  //   centrifuge.subscribe("noticeboard", (ctx) => {
  //     //       console.log(ctx.data);
  //     //option 1 write function to re-render the component that needs re-rendering
  //     //option 2, perform data fetch again
  //   });

  //   centrifuge.on("publish", function (ctx) {
  //     console.log(ctx);
  //   });
  // };

  // // console.log(GetUserInfo());

  // useEffect(() => {
  //   CentrifugoConnection();
  // });

  const [userData, setUserData] = useState(null);

  //*********Get User Info ***********

  const currentWorkspace = localStorage.getItem("currentWorkspace");
  let token = sessionStorage.getItem("token");
  const GetUserInfo = async () => {
    let user = JSON.parse(sessionStorage.getItem("user"));

    if ((user && token) !== null) {
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
        // console.log('getuserinfo', response.data.data)
        setUserData(UserData);
        return UserData;
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("YOU ARE NOT LOGGED IN, PLEASE LOG IN");
    }
  };

  useEffect(async () => {
    await GetUserInfo();
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
                    <Header />
                    <NoticeBoard />
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
