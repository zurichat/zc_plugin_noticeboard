import React, { useEffect, useContext, useState } from "react";
import notice from "../../../../assets/createNotice.svg";
import noNotice from "../../../../assets/svg/no_notices.svg";
import "./bookmark-notice.css";
import CardComponent from "../../noticeBoardComponent/CardComponent";
import { Button } from "@material-ui/core";
import logo from "../../../../assets/svg/logo.svg";
import { withRouter, Link, history } from "react-router-dom";
import { UserInfoContext } from "../../../../App";
import { UserContext } from "../../../../Data-fetcing";
import { DataContext } from "../../../../App";

import { BookmarkContext } from "../BookmarkContext";

const BookmarkedNotices = (props) => {
  const {
    loading,
    setLoading,
    isError,
    setIsError,
    searchText,
    filteredNotice,
    toggleBookmark,
  } = useContext(UserContext);

  const _globalData = useContext(DataContext);
  const org_id = _globalData.Organizations[0];
  let user = JSON.parse(sessionStorage.getItem("user"));
  const userData = useContext(UserInfoContext);
  // const { notice } = useContext(BookmarkContext);
  const [result, setResult] = useState();
  const [bookmarked, setBookmarked] = useState();
  const [notice, setNotice] = useState();
  const [bookmarkID, setBookmarkID] = useState();

  const fetchBookmarked = () => {
    fetch(
      `https://noticeboard.zuri.chat/api/v1/organisation/${org_id}/user/${user.id}/bookmark`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          setBookmarked(data);
        } else {
          setLoading(false);
          setIsError(true);
        }
      });
  };

  useEffect(() => {
    fetchBookmarked();

    fetch(
      `https://noticeboard.zuri.chat/api/v1/organisation/614679ee1a5607b13c00bcb7/notices`
    )
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          return;
        }
      })
      .then((data) => {
        // setLoading(false);
        setNotice(data.data);
      })
      .catch((error) => console.log(error));
  }, [toggleBookmark]);

  useEffect(() => {
    if (notice && bookmarked) {
      setLoading(false);
      const filteredBookmark = notice?.filter((elem) => {
        return bookmarked?.data.some((f) => {
          return elem?._id === f?.notice_id;
        });
      });

      const filteredID = bookmarked?.data?.filter((elem) => {
        return notice?.some((f) => {
          return elem?.notice_id === f?._id;
        });
      });

      if (filteredBookmark) {
        setResult(filteredBookmark);
        setBookmarkID(filteredID);
      }
    }
  }, [notice, bookmarked]);

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

  if (result == null) {
    return (
      <div className="adminnotice">
        <div className="pinned-button-container">
          <div className="pin-text">
            <p className="text">Bookmarked Notices</p>
          </div>
          <Button
            className="header-button"
            color="primary"
            onClick={() => {
              props.history.goBack();
            }}
            variant="contained"
            disableRipple
          >
            Back <img src={notice} alt="Admin notice" />
          </Button>
        </div>
        <div className="no-notice">
          <img src={noNotice} alt="no-notice" className="no-notice-img" />
          <h1 className="no-new-notices">
            Hey there, You have no bookmarked notices, they would appear here
            when bookmarked
          </h1>
          <div className="notice-btn-div">
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
          <p className="text">Boomkarked Notices</p>
        </div>
        <Button
          className="header-button"
          onClick={() =>
            props.history.push(
              userData?.role === "owner"
                ? "/noticeboard/admin-notice"
                : "/noticeboard/user-notice"
            )
          }
          variant="contained"
          disableRipple
        >
          Back
        </Button>
      </div>
      {/* the is the beginning of the section where the card for each notice starts from */}

      <section className="adminNotice-section">
        {searchText
          ? filteredNotice?.map((person) => {
              return (
                <CardComponent
                  bookmarkID={bookmarkID}
                  person={person}
                  key={person._id}
                />
              );
            })
          : result?.map((person) => {
              return (
                <CardComponent
                  bookmarkID={bookmarkID}
                  person={person}
                  key={person._id}
                />
              );
            })}
      </section>

      <Link to="/noticeboard/old-notices">
        <div className="older-notices">
          <p className="older-notices-text">View older notices</p>
        </div>
      </Link>
    </div>
  );
};

export default withRouter(BookmarkedNotices);

// !for some strange reason, the "userImage" path in the json data is not connecting
