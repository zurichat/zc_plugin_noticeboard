import React from 'react';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import noticePlaceholderImage from '../../../assets/noticePlaceholderImage.svg';
import './UserNoticeModal.css';
import UserMenu from './UserMenu/UserMenu';

function UserNoticeModal({ notice }) {
  const id = String(notice._id);
  const modalId = `modal_${id}`;

  const CloseModal = (event) => {
    const clickedButton = event.currentTarget.getAttribute('id');
    const modalID = `modal_${clickedButton}`;
    document.getElementById(modalID).style.display = 'none';
  };

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.getElementById(modalId).style.display = 'none';
    }
  });

  return (
    <div className="userNoticeModal" id={modalId}>
      <div className="userNoticeModal-container">
        <div className="userNoticeModal-innerContainer">
          <div className="userNoticeModal-userInfo">
            <div className="userNoticeModal-imageAndText">
              <div className="userNoticeModal-imageContainer">
                <img
                  className="userNoticeModal-image"
                  src={
                    notice.author_img_url !== 'null'
                      ? notice.author_img_url
                      : noticePlaceholderImage
                  }
                  alt="user"
                />
              </div>
              <div className="userNoticeModal-textContainer">
                <h1 className="userNoticeModal-username">
                  {notice.author_username}
                </h1>
                <div className="userNoticeModal-timeStamp">
                  <span className="userNoticeModal-stampDay">
                    {moment(notice.created).fromNow()}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <UserMenu noticeID={notice._id} />
            </div>
          </div>
          <div>
            <h2 className="userNoticeModal-title">{notice.title}</h2>
          </div>

          <p className="userNoticeModal-paragraph">
            {notice.message}
          </p>

          <div className="closeModalButton-container">
            <Button
              className="closeModalButton"
              variant="contained"
              id={id}
              onClick={(event) => CloseModal(event)}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserNoticeModal;
