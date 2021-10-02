import React, { useState, useEffect, useContext } from "react";
import CardNotice from "./CardNotice";
import "./UserNoticeBoard.css";
import UserNoticeModal from "./UserNoticeModal";
import { DataContext } from "../../../App";
import { UserContext } from "../../../Data-fetcing";
import logo from "../../../assets/svg/logo.svg";
import noNotice from "../../../assets/svg/no_notices.svg";
import { Link } from "react-router-dom";
import { UserInfoContext } from "../../../App";

const UserNotice = () => {
  const { loading, setLoading, isError, setIsError } = useContext(UserContext);

  const today = new Date();
  const date = today.getDate();

  const [notices, setNotices] = useState([]);

  const userData = useContext(UserInfoContext);
  // Read Organization ID
  const _globalData = useContext(DataContext);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = () => {
    fetch(
      `https://noticeboard.zuri.chat/api/v1/organisation/${userData?.org_id}/notices`
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
        setNotices(data.data);
        console.log(data.data);
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

  if (notices?.length <= 0) {
    return (
      <div className="user-notice">
        <div className="notice-heading">
          <p>Notices</p>
        </div>

        <div className="no-notice">
          <img src={noNotice} alt="no-notice" className="no-notice-img" />
          <h1
            className="no-new-notices"
            style={{
              fontSize: "1rem",
              textAlign: "center",
              color: "#000",
              marginTop: "20px",
            }}
          >
            Hey there, You have no notice for the day, they would appear here
            when published
          </h1>
          <div className="notice-btn-div">
            <Link to="/noticeboard">
              <div className="older-notices">
                <p className="older-notices-text">Go Back</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-notice" id="user-notice">
      <div className="notice-heading">
        <p>Notices</p>
      </div>

      <div className="user-notice-post">
        {notices.map((notice) => (
          <div key={notice._id}>
            <CardNotice notice={notice} />
            <UserNoticeModal notice={notice} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserNotice;
