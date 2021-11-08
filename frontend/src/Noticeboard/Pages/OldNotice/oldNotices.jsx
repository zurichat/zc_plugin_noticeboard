import React, { useState, useEffect, useMemo, useContext } from "react";
import Pagination from "../../Components/NoticeBoard/Pagination/pagination";
import "./oldNotices.css";
import Card from "../../Components/NoticeBoard/Card/Card";
import OldNoticeHeader from "./oldNoticeHeader";
import { UserContext } from "../../../Context/Data-fetcing";
import {BookmarkContext} from "../../../Context/BookmarkContext"

function OldNotices() {
  // const [people, setPeople] = useState([]);
  const [loading, isLoading] = useState(true);

  //setting state for pagination
  const {oldnotices, setOldnotices} = useContext(UserContext);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let PageSize = 9;
  const orgId = localStorage.getItem('currentWorkspace');

  // filtering notices
  const date = new Date();
  const currentDate = date.getDate();
  
  let prevDate = null;
  if (currentDate > 1) {
    prevDate = currentDate - 1;
  } else {
    prevDate = 1;
  }

    //retrieving notices
  const getNotices = async () => {
    const response = await fetch(
      `https://noticeboard.zuri.chat/api/v1/organisation/${orgId}/notices`
    );
    const data = await response.json();
    setOldnotices(data.data);
    console.log(currentDate)
  };

  useEffect(() => {
    // setPeople(notices);
    isLoading(false);
    getNotices();
  }, []);


  const currentNoticeData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    const filteredNotices = oldnotices.filter(
      (notice) => prevDate <= notice.created.slice(8, 10)
    );

    return filteredNotices.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, PageSize, oldnotices, prevDate]);


  //Bookmark
  const { bookmarkDetails, setBookmarkDetails, toggleBookmark } =
    useContext(BookmarkContext);
  let user = JSON.parse(sessionStorage.getItem("user"));
  const fetchBookmarked = () => {
    fetch(
      `https://noticeboard.zuri.chat/api/v1/organisation/${orgId}/user/${user.id}/bookmark`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          setBookmarkDetails(data);
          console.log("fethed" + data)
        }
      });
  };

  useEffect(() => {
    fetchBookmarked();
  }, [toggleBookmark]);

  if (loading) {
    return (
      <div className="preloader">
        <h1 className="isLoading">Loading...</h1>
        <i className="fas fa-spinner fa-spin"></i>
      </div>
    );
  }

  return (
    <>
      <div className="old-notice-container">
        <OldNoticeHeader />
        <section className="adminNotice-section">
          {currentNoticeData.map((notice, index) => {
            return <Card person={notice} key={index} />;
          })}
        </section>
        <Pagination
          totalCount={oldnotices.length}
          pageSize={PageSize}
          currentPage={currentPage}
          onPageChange={(currentPage) => setCurrentPage(currentPage)}
        />
      </div>
    </>
  );
}

export default OldNotices;
