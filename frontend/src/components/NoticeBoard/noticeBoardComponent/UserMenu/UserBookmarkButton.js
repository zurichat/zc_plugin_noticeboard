/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BookmarkIcon from '../../../../assets/bookmark-icon.svg';
import BookmarkIconActive from '../../../../assets/bookmark-icon-active.svg';
import { UserBookmarkContext } from '../UserBookmarkContext';

const UserBookmarkButton = ({ noticeID }) => {
  // eslint-disable-next-line operator-linebreak
  const { bookmarkDetails, setToggleBookmark, toggleBookmark } =
    useContext(UserBookmarkContext);
  const [bookmarkStatus, setBookmarkStatus] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('user'));

  const UserMenuStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  };

  const [bookmarkedNoticeID, setBookmarkNoticeID] = useState();
  const orgId = localStorage.getItem('currentWorkspace');

  useEffect(() => {
    if (bookmarkDetails) {
      const check = bookmarkDetails?.data.filter(
        (data) => data.notice_id === noticeID,
      );
      setBookmarkNoticeID(check[0]);
      if (check.length !== 0) {
        setBookmarkStatus(true);
      } else {
        setBookmarkStatus(false);
      }
    }
  });

  const bookmarkNotice = () => {
    axios
      .post(
        `https://noticeboard.zuri.chat/api/v1/organisation/${orgId}/bookmark`,
        {
          notice_id: noticeID,
          user_id: user.id,
        },
      )
      .then(() => {
        setBookmarkStatus(true);
        setToggleBookmark(!toggleBookmark);
      })
      .catch((err) => err);
  };

  const deleteBookmarkNotice = () => {
    axios
      .delete(
        `https://noticeboard.zuri.chat/api/v1/organisation/${orgId}/bookmark/${bookmarkedNoticeID?._id}/delete`,
      )
      .then(() => {
        setBookmarkStatus(false);
        setToggleBookmark(!toggleBookmark);
      })
      .catch((err) => err);
  };

  const bookmarkFunction = () => {
    if (!bookmarkStatus) {
      bookmarkNotice();
    } else {
      deleteBookmarkNotice();
    }
  };

  return (
    <div
      style={UserMenuStyle}
      onClick={() => {
        bookmarkFunction();
      }}
    >
      <img
        src={bookmarkStatus ? BookmarkIconActive : BookmarkIcon}
        alt="Bookmark"
        style={{ paddingRight: '10px' }}
      />
      <span
        style={{
          color: '#999999',
          width: '100%',
        }}
      >
        Bookmark
      </span>
    </div>
  );
};

export default UserBookmarkButton;
