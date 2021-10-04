import React, { useEffect, useContext, useState } from "react";
import notice from "../../../assets/createNotice.svg";
import noNotice from "../../../assets/svg/no_notices.svg";
import "../noticeBoardComponent/AdminNotice.css";
import Card from "../noticeBoardComponent/Card";
import { Button } from "@material-ui/core";
import logo from "../../../assets/svg/logo.svg";
import { withRouter, Link } from "react-router-dom";
import { DataContext } from "../../../App";
import { UserContext } from "../../../Data-fetcing";
import Subscription from "../EmailSubscribe/Subscription";
import { UserInfoContext } from "../../../App";

import { BookmarkContext } from "./BookmarkContext";

const PinnedNotices = (props) => {
  const {
    people,
    setPeople,
    loading,
    setLoading,
    isError,
    setIsError,
    searchText,
    filteredNotice,
  } = useContext(UserContext);

  // const today = new Date();
  // const date = today.getDate();
  const date = new Date();
  const currentDate = date.getDate();

  // Read Organization ID
  const _globalData = useContext(DataContext);
  const org_id = _globalData.Organizations[0];

  //Bookmark
  const { bookmarkDetails, setBookmarkDetails, toggleBookmark } =
    useContext(BookmarkContext);
  let user = JSON.parse(sessionStorage.getItem("user"));
  const fetchBookmarked = () => {
    fetch(
      `https://noticeboard.zuri.chat/api/v1/organisation/${org_id}/user/${user.id}/bookmark`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          setBookmarkDetails(data);
        }
      });
  };

  useEffect(() => {
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
            (notice) => currentDate == notice.created.slice(8, 10)
          )
        );

        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchBookmarked();
    console.log(bookmarkDetails);
  }, [toggleBookmark]);

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
    return (
      <div className="adminnotice">
        <div className="pinned-button-container">
          <div className="pin-text">
            <p className="text">Notices</p>
          </div>
          <Button
            className="header-button"
            color="primary"
            onClick={() => props.history.push("/noticeboard/create-notice")}
            variant="contained"
            disableRipple
          >
            Create Notice <img src={notice} alt="create notice" />
          </Button>
        </div>
        <div className="no-notice">
          <img src={noNotice} alt="no-notice" className="no-notice-img" />
          <h1 className="no-new-notices">
            Hey there, You have no notice for the day, they would appear here
            when published
          </h1>
          <div className="notice-btn-div">
            {/* <Link to="/noticeboard">
              <div className="older-notices">
                <p className="older-notices-text">Go Back</p>
              </div>
            </Link> */}

            <Link to="/noticeboard/old-notices">
              <div className="older-notices">
                <p className="older-notices-text">View older notices</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="adminnotice">
      <div className="pinned-button-container">
        <div className="pin-text">
          <p className="text">Notices</p>
        </div>
        <Button
          className="header-button"
          onClick={() => props.history.push("/noticeboard/create-notice")}
          variant="contained"
          disableRipple
        >
          Create Notice <img src={notice} alt="create notice" />
        </Button>
      </div>
      {/* the is the beginning of the section where the card for each notice starts from */}

      <section className="adminNotice-section">
        {searchText
          ? filteredNotice?.map((person) => {
              return <Card person={person} key={person._id} />;
            })
          : people?.map((person) => {
              return <Card person={person} key={person._id} />;
            })}
      </section>

      <Link to="/noticeboard/old-notices">
        <div className="older-notices">
          <p className="older-notices-text">View older notices</p>
        </div>
      </Link>
      <Subscription />
    </div>
  );
};

export default withRouter(PinnedNotices);

// !for some strange reason, the "userImage" path in the json data is not connecting
