import { useState, useEffect, useContext } from "react";
import BookmarkIcon from "../../../assets/bookmark-icon.svg";
import BookmarkIconActive from "../../../assets/bookmark-icon-active.svg";
import { BookmarkContext } from "./BookmarkContext";
import { DataContext } from "../../../App";
import axios from "axios";

const BookmarkButton = ({ noticeID }) => {
  const { bookmarkDetails, setToggleBookmark, toggleBookmark } =
    useContext(BookmarkContext);
  const [bookmarkStatus, setBookmarkStatus] = useState(false);
  let user = JSON.parse(sessionStorage.getItem("user"));

  const AdminMenuStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
  };

  const _globalData = useContext(DataContext);
  // const { selectedNotice, setSelectedNotice } = useContext(UserContext);
  const org_id = _globalData.Organizations[0];
  const [bookmarkedNoticeID, setBookmarkNoticeID] = useState();
  useEffect(() => {
    if (bookmarkDetails) {
      const check = bookmarkDetails?.data.filter(
        (data) => data.notice_id === noticeID
      );
      setBookmarkNoticeID(check[0]);
      if (check.length !== 0) {
        setBookmarkStatus(true);
      } else {
        setBookmarkStatus(false);
      }
    }
    console.log("user button ran");
  }, []);

  console.log(bookmarkedNoticeID);
  const bookmarkNotice = () => {
    axios
      .post(
        `https://noticeboard.zuri.chat/api/v1/organisation/${_globalData.Organizations[0]}/bookmark`,
        {
          notice_id: noticeID,
          user_id: user.id,
        }
      )
      .then((data) => {
        console.log(data);
        setBookmarkStatus(true);
        setToggleBookmark(!toggleBookmark);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  const deleteBookmarkNotice = () => {
    axios
      .delete(
        `https://noticeboard.zuri.chat/api/v1/organisation/${_globalData.Organizations[0]}/bookmark/${bookmarkedNoticeID._id}/delete`
      )
      .then((data) => {
        console.log(data);
        setBookmarkStatus(false);
        setToggleBookmark(!toggleBookmark);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  const bookmarkFunction = () => {
    if (!bookmarkStatus) {
      bookmarkNotice();
    } else {
      deleteBookmarkNotice();
    }

    console.log("clicked bookmarkedW" + noticeID);
    // console.log(
    //   bookmarkDetails.data.filter(
    //     (data) => data.notice_data.id === "61598a4ff2348700c23781fe"
    //   )
    // );
    // deleteBookmarkNotice();
    // console.log(UserData);

    console.log(bookmarkDetails?.data);
  };

  return (
    <div
      onClick={() => {
        bookmarkFunction();
      }}
    >
      <div style={AdminMenuStyle}>
        <img
          src={bookmarkStatus ? BookmarkIconActive : BookmarkIcon}
          alt="Bookmark"
          style={{ paddingRight: "10px" }}
        />
        <span
          style={{
            color: "#999999",
            width: "100%",
          }}
        >
          Bookmark {noticeID}
        </span>
      </div>
    </div>
  );
};

export default BookmarkButton;
