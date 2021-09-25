import React, { useState, useEffect, useMemo } from "react";
import Pagination from "./pagination";
import "./oldNotices.css";
import Card from "../Card";
import OldNoticeHeader from "./oldNoticeHeader";

function OldNotices() {
  const [people, setPeople] = useState([]);
  const [loading, isLoading] = useState(true);

  //setting state for pagination
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let PageSize = 9;

  // filtering notices
  const date = new Date();
  const currentDate = date.getDate();

  let prevDate = null;
  if (currentDate > 1) {
    prevDate = currentDate - 1;
  } else {
    prevDate = 1;
  }

  useEffect(() => {
    setPeople(notices);
    isLoading(false);
    getNotices();
  }, [notices]);

  //retrieving notices
  const getNotices = async () => {
    const response = await fetch(
      "https://noticeboard.zuri.chat/api/v1/notices"
    );
    const data = await response.json();
    setNotices(data.data);
  };

  const currentNoticeData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    const filteredNotices = notices.filter(
      (notice) => prevDate >= notice.created.slice(8, 10)
    );

    return filteredNotices.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, PageSize, notices, prevDate]);

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
        <section className="old-notices">
          {currentNoticeData.map((notice, index) => {
            return <Card person={notice} key={index} />;
          })}
        </section>
        <Pagination
          totalCount={notices.length}
          pageSize={PageSize}
          currentPage={currentPage}
          onPageChange={(currentPage) => setCurrentPage(currentPage)}
        />
      </div>
    </>
  );
}

export default OldNotices;
