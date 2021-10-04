import React, { useState, useEffect, useContext, useMemo } from "react";
import CardNotice from "./CardNotice";
import "./UserNoticeBoard.css";
import UserNoticeModal from "./UserNoticeModal";
import { DataContext } from "../../../App";
import { UserContext } from "../../../Data-fetcing";
import logo from "../../../assets/svg/logo.svg";
import noNotice from "../../../assets/svg/no_notices.svg";
import { Link } from "react-router-dom";
import { UserInfoContext } from "../../../App";
import Pagination from "./Old_Notices/pagination";
import { UserBookmarkContext } from "./UserBookmarkContext";

const UserNotice = () => {
  const { loading, setLoading, isError, setIsError, notices, setNotices } = useContext(UserContext);

  const today = new Date();
  const date = today.getDate();

  // const [notices, setNotices] = useState([]);

  // Read Organization ID
  const _globalData = useContext(DataContext);
  const org_id = _globalData.Organizations[0];

  const { bookmarkDetails, setBookmarkDetails, toggleBookmark } =
    useContext(UserBookmarkContext);
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
    fetchBookmarked();
    console.log(bookmarkDetails);
  }, [toggleBookmark]);

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
        setNotices(data.data);
        console.log(data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  // For User Notice Pagination
  const [currentPage, setCurrentPage] = useState(1);
  let PageSize = 12;

  const NoticeData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    const paginatedNotice = notices.slice(firstPageIndex, lastPageIndex);

    return paginatedNotice;
  }, [currentPage, PageSize, notices]);
  // console.log(NoticeData, "NOTICE DATA");

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
        {NoticeData?.map((notice) => (
          <div key={notice._id}>
            <CardNotice notice={notice} />
            <UserNoticeModal notice={notice} />
          </div>
        ))}
      </div>

      <Pagination
        totalCount={notices.length}
        pageSize={PageSize}
        currentPage={currentPage}
        onPageChange={(currentPage) => setCurrentPage(currentPage)}
      />
    </div>
  );
};

export default UserNotice;
