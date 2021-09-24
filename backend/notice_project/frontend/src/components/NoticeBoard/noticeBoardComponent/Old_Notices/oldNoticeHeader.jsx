import React, { useState } from "react";
import down from "./down.svg";
import "./oldNotices.css";

function OldNoticeHeader() {
  const [openMenu, setOpenMenu] = useState(false);

  const OpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div>
      <h1 className="old-notice-title">Older Notices</h1>
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
    /*
    const elementList = Array.from(
      document.getElementsByClassName("sort-oldNotice-option")
    );
    elementList.map((element) => element.classList.remove("focus"));
    event.currentTarget.classList.add("focus"); */
    const sortData = async () => {
      //
    }
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
