import React, { useState, useEffect, useContext } from "react";
import CardNotice from "./CardNotice";
import "./UserNoticeBoard.css";
import UserNoticeModal from "./UserNoticeModal";
import { DataContext } from "../../../App";
import { UserContext } from "../../../Data-fetcing";
import logo from "../../../assets/svg/logo.svg";
import UserIntro from "./UserIntro component/UserIntro";

const UserNotice = (props) => {
  const { people, setPeople, loading, setLoading, isError, setIsError } =
    useContext(UserContext);

  const today = new Date();
  const date = today.getDate();

  // Read Organization ID
  const _globalData = useContext(DataContext);
  const org_id = _globalData.Organizations[0];

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = () => {
    fetch(
      `https://noticeboard.zuri.chat/api/v1/organisation/614679ee1a5607b13c00bcb7/notices`
    )
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          setLoading(false);
          setIsError(true);
        }
      })
      .then((data) => {
        setPeople(
          data.data.filter(
            (notice) => notice.created.substring(8, 10) === date.toString()
          )
        );
        // console.log(data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  if (loading) {
    return (
      <div className="preloader">
        <img className="logo" src={logo} alt="logo" />
        <h1 className="isLoading">Loading...</h1>
        <i className="fas fa-spinner fa-spin"></i>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="preloader">
        <img className="logo" src={logo} alt="logo" />
        <h1
          className="isError"
          style={{ color: "red", fontSize: "1.5rem", marginTop: "100px" }}
        >
          Error. Try refreshing your browser
        </h1>
        <i className="fas fa-spinner fa-spin"></i>
      </div>
    );
  }

  if (people?.length <= 0) {
    return <UserIntro />;
  }

  return (
    <div className="user-notice" id="user-notice">
      <div className="notice-heading">
        <p>Notices</p>
      </div>

      <div className="user-notice-post">
        {people.map((person) => (
          <div key={person._id}>
            <CardNotice person={person} />
            <UserNoticeModal person={person} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserNotice;
