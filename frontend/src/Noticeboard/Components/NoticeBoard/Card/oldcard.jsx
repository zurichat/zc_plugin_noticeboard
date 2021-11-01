import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import Pagination from '../Pagination/pagination';
import '../../../Pages/OldNotice/oldNotices.css';
import Card from '../Card';
import OldNoticeHeader from './Old_Notices/oldNoticeHeader';
import { UserContext } from '../../../Data-fetcing';

function OldNotices() {
  const [loading, isLoading] = useState(true);

  // setting state for pagination
  const { oldnotices, setOldnotices } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const PageSize = 9;

  // filtering notices
  const date = new Date();
  const currentDate = date.getDate();

  let prevDate = null;
  if (currentDate > 1) {
    prevDate = currentDate - 1;
  } else {
    prevDate = 1;
  }

  // retrieving notices
  const getNotices = async () => {
    const response = await fetch(
      'https://noticeboard.zuri.chat/api/v1/organisation/614679ee1a5607b13c00bcb7/notices',
    );
    const data = await response.json();
    setOldnotices(data.data);
    // console.log(currentDate);
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
      (notice) => prevDate <= notice.created.slice(8, 10),
    );

    return filteredNotices.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, PageSize, oldnotices, prevDate]);

  if (loading) {
    return (
      <div className="preloader">
        <h1 className="isLoading">Loading...</h1>
        <i className="fas fa-spinner fa-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="old-notice-container">
        <OldNoticeHeader />
        <section className="adminNotice-section">
          {currentNoticeData.map((notice) => (
            <Card person={notice} key={notice._id} />
          ))}
        </section>
        <Pagination
          totalCount={oldnotices.length}
          pageSize={PageSize}
          currentPage={currentPage}
          onPageChange={() => setCurrentPage(currentPage)}
        />
      </div>
    </>
  );
}

export default OldNotices;
