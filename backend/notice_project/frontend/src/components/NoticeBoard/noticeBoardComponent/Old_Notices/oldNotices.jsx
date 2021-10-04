import React, { useState, useEffect, useMemo, useContext } from "react";
import Pagination from "./pagination";
import "./oldNotices.css";
import Card from "../Card";
import OldNoticeHeader from "./oldNoticeHeader";
import { UserContext } from "../../../../Data-fetcing";

function OldNotices() {
  // const [people, setPeople] = useState([]);
  const [loading, isLoading] = useState(true);

  //setting state for pagination
<<<<<<< HEAD
  const { notices, setNotices } = useContext(UserContext);
  // const [notices, setNotices] = useState([]);
=======
  const {oldnotices, setOldnotices} = useContext(UserContext);
>>>>>>> 49babbdbfc1c358a44c9b1ce1d770333ff419737
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
    // setPeople(notices);
    isLoading(false);
    getNotices();
  }, []);

  //retrieving notices
  const getNotices = async () => {
    const response = await fetch(
      `https://noticeboard.zuri.chat/api/v1/organisation/614679ee1a5607b13c00bcb7/notices`
    );
    const data = await response.json();
<<<<<<< HEAD
    setNotices(data.data);
    console.log(currentDate);
=======
    setOldnotices(data.data);
    console.log(currentDate)
>>>>>>> 49babbdbfc1c358a44c9b1ce1d770333ff419737
  };

  const currentNoticeData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    const filteredNotices = oldnotices.filter(
      (notice) => prevDate <= notice.created.slice(8, 10)
    );

    return filteredNotices.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, PageSize, oldnotices, prevDate]);

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
