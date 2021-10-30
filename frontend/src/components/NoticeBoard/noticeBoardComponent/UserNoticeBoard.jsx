import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
} from 'react';
import { Link } from 'react-router-dom';
import CardNotice from './CardNotice';
import './UserNoticeBoard.css';
import UserNoticeModal from './UserNoticeModal';
import { UserContext } from '../../../Data-fetcing';
import logo from '../../../assets/svg/logo.svg';
import noNotice from '../../../assets/svg/no_notices.svg';
import Pagination from './Old_Notices/pagination';
import { UserBookmarkContext } from './UserBookmarkContext';

const UserNotice = () => {
  const {
    loading,
    setLoading,
    isError,
    setIsError,
    notices,
    setNotices,
  } = useContext(UserContext);

  const orgId = localStorage.getItem('currentWorkspace');
  // console.log(orgId, 'Miss');

  // Read Organization ID
  const fetchNotices = () => {
    fetch(
      `https://noticeboard.zuri.chat/api/v1/organisation/${orgId}/notices`,
    )
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          res.json();
        }
        setLoading(false);
        setIsError(true);
      })
      .then((data) => {
        setNotices(data.data);
        setLoading(false);
        // console.log(data.data);
      })
      .catch((error) => {
        setLoading(false);
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Bookmarks
  const { setBookmarkDetails, toggleBookmark } = useContext(
    UserBookmarkContext,
  );
  const user = JSON.parse(sessionStorage.getItem('user'));
  const fetchBookmarked = () => {
    fetch(
      `https://noticeboard.zuri.chat/api/v1/organisation/${orgId}/user/${user.id}/bookmark`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'success') {
          setBookmarkDetails(data);
        }
      });
  };

  useEffect(() => {
    fetchBookmarked();
  }, [toggleBookmark]);

  // For User Notice Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const PageSize = 12;

  const NoticeData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    const paginatedNotice = notices.slice(
      firstPageIndex,
      lastPageIndex,
    );

    return paginatedNotice;
  }, [currentPage, PageSize, notices]);
  // console.log(NoticeData, "NOTICE DATA");

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

  if (notices?.length <= 0) {
    return (
      <div className="user-notice">
        <div className="notice-heading">
          <p>Notices</p>
        </div>

        <div className="no-notice">
          <img
            src={noNotice}
            alt="no-notice"
            className="no-notice-img"
          />
          <h1
            className="no-new-notices"
            style={{
              fontSize: '1rem',
              textAlign: 'center',
              color: '#000',
              marginTop: '20px',
            }}
          >
            Hey there, You have no notice for the day, they would
            appear here when published
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
        onPageChange={() => setCurrentPage(currentPage)}
      />
    </div>
  );
};

export default UserNotice;
