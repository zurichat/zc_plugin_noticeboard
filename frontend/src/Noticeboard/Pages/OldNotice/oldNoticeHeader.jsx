import React, { useState } from "react";
import down from "./down.svg";
import back from "./back.png";
import { Link } from "react-router-dom";
import "./oldNotices.css";

function OldNoticeHeader() {
  const [openMenu, setOpenMenu] = useState(false);

  const OpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div>
      <div className="oldNotice-title-btn">
        <h1 className="old-notice-title">Older Notices</h1>
        <div>
          <Link to="/noticeboard/admin-notice">
            <button className="old-notice-back-button">
              <span className="backImageOldNotice">
                <img src={back} alt="back" />
              </span>
              <span>Back</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="sort-oldNotice" onClick={OpenMenu}>
        <p className="sort-oldNotice-selected">
          <span className="sort-bold-oldNotice">Sort:</span> Newest Message
          <span className="sort-arrowDown-container-oldNotice">
            <img className="sort-arrowDown-oldNotice" src={down} alt="down" />
          </span>
        </p>
        {openMenu && <Menu />}
      </div>
    </div>
  );
}

const Menu = () => {
  const sortFromOldest = (event) => {
    ///
    const sortData = async () => {
      //
    };
  };

  return (
    <div className="sortMenu-oldNotice">
      <p className="sort-oldNotice-option focus">Newest Message</p>
      <p
        className="sort-oldNotice-option"
        onClick={(event) => sortFromOldest(event)}
      >
        Oldest Message
      </p>
    </div>
  );
};

export default OldNoticeHeader;
