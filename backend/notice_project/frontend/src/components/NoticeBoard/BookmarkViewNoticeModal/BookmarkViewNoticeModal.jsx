import React from "react";
import moment from "moment";

import CancelNoticeBtn from "./BookmarkCancelNoticeBtn";
// import AdminMenu from "../noticeBoardComponent/AdminNoticeMenu";
import dot from "../../../assets/Ellipse135.svg";
import noticePlaceholderImage from "../../../assets/noticePlaceholderImage.svg";
import "./BookmarkViewNotice.css";

import BookmarkIcon from "../../../assets/bookmark-icon.svg";
import BookmarkIconActive from "../../../assets/bookmark-icon-active.svg";

const BookmarkViewNoticeModal = ({ persons, closeModal }) => {
  const cancelBtn = () => {
    const modalCard = document.getElementById("modal");
    const contain = document.getElementById("contain");
    modalCard.classList.add("none");
    contain.classList.add("none");
    closeModal(false);
  };

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal(false);
    }
  });

  const getMonthName = (month) => {
    const d = new Date();
    d.setMonth(month - 1);
    const monthName = d.toLocaleString("default", { month: "short" });
    return monthName;
  };

  return (
    <div className="contain" id="contain">
      {persons.map((person) => {
        return (
          <div className="modal-card" id="modal" key={person._id}>
            <div className="user-details-menu-flex">
              <div className="img-and-name-container">
                <div className="img">
                  <img
                    src={
                      person.author_img_url !== "null"
                        ? person.author_img_url
                        : noticePlaceholderImage
                    }
                    alt=""
                    className="user-picture"
                  />
                </div>
                <div className="name-time">
                  {person.author_name !== "null"
                    ? person.author_name
                    : person.author_username}
                  <div className="time-stamps">
                    <p className="date-stamp stamp-one">
                      {moment(person.created).fromNow()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="admin-menu-container">
                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => console.log("clikcked")}
                  src={BookmarkIconActive}
                  alt="bookmark icon"
                />
              </div>
            </div>

            <h2 className="modal-title">
              {person.title.replace(/<[^>]+>/g, "")}
            </h2>
            <p className="modal-info">
              {person.message.replace(/<[^>]+>/g, "")}
            </p>
            <div>
              <CancelNoticeBtn onClick={cancelBtn} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookmarkViewNoticeModal;
