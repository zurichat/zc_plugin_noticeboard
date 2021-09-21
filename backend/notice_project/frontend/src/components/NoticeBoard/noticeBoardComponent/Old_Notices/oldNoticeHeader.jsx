import React from "react";
import down from "./down.svg";
import "./oldNotices.css";

function OldNoticeHeader() {
  return (
    <div>
      <h1 className="old-notice-title">Older Notices</h1>
      <div className="sort">
        <p>
          <span className="sort-bold">Sort:</span> Most Relevant
          <span className="sort-arrowDown-container">
            <img className="sort-arrowDown" src={down} alt="down" />
          </span>
        </p>
      </div>
      <div className="sort">
        <p>
          <span className="sort-bold">Show:</span> Most Relevant
          <span className="sort-arrowDown-container">
            <img className="sort-arrowDown" src={down} alt="down" />
          </span>
        </p>
      </div>
    </div>
  );
}

export default OldNoticeHeader;
