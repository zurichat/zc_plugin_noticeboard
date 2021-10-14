import React from 'react'
import './CreateNoticeModal.css'
import Calender from "../../../assets/svg/bx_bx-calendar.svg"
import Dropdown from "../../../assets/svg/zuridropdown.svg"
import Clock from "../../../assets/svg/clock.svg"



const CreateNoticeModal = ()  => {


  return (
    <div>
    <div>
      <div>
        </div>
       <div className= "main-container" id="main-container">
        <div className="schedule-container">
        <div className="text-bar">
        <div className="schedule-notice">
            <h5>Schedule Notice</h5>
            <p>Set a time frame for your notice to get published</p>
        </div>
        </div>
        <div className="box-bars">
            <div className="calender">
                <img className="calender2" src={Calender} alt="calender symbol" />
                <p>Today</p>
                <img className="dropdown" src={Dropdown} alt="dropdown to show more information"/>
            </div>
            <div className="time">
                <img className="clock" src={Clock} alt="clock symbol"/>
                <p>Time</p>
                <img className="dropdown2" src={Dropdown} alt="dropdown to show more information"/>
            </div>
        </div>
            <div className="last-bar">
                <div className="cancel" 
                onClick={()=>{
                      document.querySelector(".main-container").style.display="none"
                    }}>
                    <p>Cancel</p>
                </div>
                <div className="schedule-notice2">
                    <p>Schedule Notice</p>
                </div>
            </div>

    </div>
    </div>
    </div>
    </div>
  )
}

export default CreateNoticeModal
