import React from 'react'
import './CreateNoticeModal.css'
import calender from "../../../../assets/svgbx_bx-calendar.svg"
import dropdown from "../../../../assets/svgzuridropdown.svg"
import Clock from "../../../../assets/svgclock.svg"



const CreateNoticeModal = ({showModal, setShowModal})  => {


  return (
    <div>
        { showModal ?
    <div>
      <div>
        </div>
       <div className= "main-container">
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
                <img src= {dropdown} alt="dropdown to show more information"/>
            </div>
        </div>
        </div>
        <div className="box-bars">
            <div className="calender">
                <img className="calender2" src={calender} alt="calender symbol" />
                <p>Today</p>
                <img className="dropdown" src={dropdown} alt="dropdown to show more information"/>
            </div>
            <div className="time">
                <img className="clock" src={Clock} alt="clock symbol"/>
                <p>Time</p>
                <img className="dropdown2" src={dropdown} alt="dropdown to show more information"/>
            </div>
        </div>
            <div className="last-bar">
                <div className="cancel" onClick = { () => setShowModal(false)}>
                    <p>Cancel</p>
                </div>
                <div className="schedule-notice2">
                    <p>Schedule Notice</p>
                </div>
            </div>

    </div>
    </div>
    </div> : null }
    </div>
  )
}

export default CreateNoticeModal
