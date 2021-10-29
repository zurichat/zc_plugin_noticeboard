import React, { useEffect, useContext, useState } from 'react';
import { Button } from '@material-ui/core';
import './bookmark-notice.css';
import { withRouter, Link } from 'react-router-dom';
import CardComponent from '../CardComponent';
import logo from '../../../../assets/svg/logo.svg';
import { UserInfoContext } from '../../../../App';
import { UserContext } from '../../../../Data-fetcing';

import noNotice from '../../../../assets/svg/no_notices.svg';

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

  const user = JSON.parse(sessionStorage.getItem('user'));
  const userData = useContext(UserInfoContext);
  // const { notice } = useContext(BookmarkContext);
  const [result, setResult] = useState();
  const [bookmarked, setBookmarked] = useState();
  const [notice, setNotice] = useState();
  const [bookmarkID, setBookmarkID] = useState();

  const currentWorkspace = localStorage.getItem('currentWorkspace');

  const fetchBookmarked = () => {
    fetch(
      `https://noticeboard.zuri.chat/api/v1/organisation/${currentWorkspace}/user/${user.id}/bookmark`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'success') {
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
      `https://noticeboard.zuri.chat/api/v1/organisation/${currentWorkspace}/notices`,
    )
      .then((data) => {
        if (data.status >= 200 && data.status <= 299) {
          setNotice(data.data);
        }
      })
      .catch((error) => error.statusText);
  }, [toggleBookmark]);

  useEffect(() => {
    if (notice && bookmarked) {
      setLoading(false);
      const filteredBookmark = notice
        ?.filter((elem) => bookmarked?.data.some((f) => elem?._id === f?.notice_id));

      const filteredID = bookmarked
        ?.data?.filter((elem) => notice?.some((f) => elem?.notice_id === f?._id));

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
        <i className="fas fa-spinner fa-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="preloader">
        <img className="logo" src={logo} alt="logo" />
        <h1
          className="isError"
          style={{
            color: 'red',
            fontSize: '1.5rem',
            marginTop: '100px',
          }}
        >
          Error. Try refreshing your browser
        </h1>
        <i className="fas fa-spinner fa-spin" />
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
            Back
            <img src={notice} alt="Admin notice" />
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
          onClick={() => props.history.push(userData?.role === 'owner' ? '/noticeboard/admin-notice' : '/noticeboard/user-notice')}
          variant="contained"
          disableRipple
        >
          Back
        </Button>
      </div>
      {/* the is the beginning of the section where the card for each notice starts from */}

      <section className="adminNotice-section">
        {searchText
          ? filteredNotice?.map((person) => (
            <CardComponent
              bookmarkID={bookmarkID}
              person={person}
              key={person._id}
            />
          ))
          : result?.map((person) => (
            <CardComponent
              bookmarkID={bookmarkID}
              person={person}
              key={person._id}
            />
          ))}
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
