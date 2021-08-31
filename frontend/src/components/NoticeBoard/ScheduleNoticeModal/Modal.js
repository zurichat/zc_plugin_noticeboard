import React from "react";
import ModalBtn from "./ModalBtn";
import './Modal.css'

const Modal = () => {
  return (
    <>
      <section className="modal-container">
        <div className="flexed">
          <div className="modal-title-container">
            <h3 className="modal-title-one">Schedule Notice</h3>
            <p className="modal-title-two">
              Set a time frame for your notice to get published
            </p>
          </div>

          <div className="time-zone-container">
            <label htmlFor="time-zone" className="label">
              Select Time Zone:
            </label>
            <select name="time-zone" id="time-zone" className="time-zone">
              <option value="Africa/Lagos">Nigeria GMT +1</option>
              <option value="US/Pacific">US/Pacific</option>
              <option value="US/Eastern">US/Eastern</option>
              <option value="Europe/London">Europe/London</option>
              <option value="Europe/Paris">Europe/Paris</option>
              <option value="Europe/Amsterdam">Europe/Amsterdam</option>
              <option value="Europe/Berlin">Europe/Berlin</option>
              <option value="Australia/Sydney">Australia/Sydney</option>
            </select>
          </div>
        </div>

        <div className="flexed-input-container">
          <input type="date" className="date-input" />
          <i className="far fa-calendar-alt"></i>
          <input type="time" className="time-input" />
          <i className="far fa-clock"></i>
        </div>

        <div className="btns">
        <ModalBtn innerText="Cancel" backgroundColor="#f6f6f6" width="110px" color="black" fontWeight="normal" marginRight="20px"/>
        <ModalBtn innerText="Schedule Notice" backgroundColor="#00B87C" />
        </div>
      </section>
    </>
  );
};

export default Modal;
