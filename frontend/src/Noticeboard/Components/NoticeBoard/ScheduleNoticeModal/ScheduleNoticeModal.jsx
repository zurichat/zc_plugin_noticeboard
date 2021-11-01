/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './ScheduleNoticeModal.css';
import calender from '../../../../assets/bx_bx-calendar.svg';
import dropdown from '../../../../assets/zuridropdown.svg';
import Clock from '../../../../assets/clock.svg';

const ScheduleNoticeModal = ({ showModal, setShowModal }) => (
  <div>
    {showModal ? (
      <div>
        <div />
        <div className="schedule_notice_main_container">
          <div className="schedule-container">
            <div className="text-bar">
              <div className="schedule-notice">
                <h5>Schedule Notice</h5>
                <p>Set a time frame for your notice to get published</p>
              </div>
              <div className="time-zone">
                <p>Select Time Zone:</p>
                <div className="gmt">
                  <p>Nigeria GMT+1 </p>
                  <img src={dropdown} alt="dropdown to show more information" />
                </div>
              </div>
            </div>
            <div className="box-bars">
              <div className="calender">
                <img
                  className="calender2"
                  src={calender}
                  alt="calender symbol"
                />
                <p>Today</p>
                <img
                  className="dropdown"
                  src={dropdown}
                  alt="dropdown to show more information"
                />
              </div>
              <div className="time">
                <img className="clock" src={Clock} alt="clock symbol" />
                <p>Time</p>
                <img
                  className="dropdown2"
                  src={dropdown}
                  alt="dropdown to show more information"
                />
              </div>
            </div>
            <div className="last-bar">
              <div className="cancel" onClick={() => setShowModal(false)}>
                <p>Cancel</p>
              </div>
              <div className="schedule-notice2">
                <p>Schedule Notice</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null}
  </div>
);

export default ScheduleNoticeModal;
