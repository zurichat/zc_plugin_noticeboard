import React, { useContext } from "react";
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";

import CancelNoticeBtn from "./BookmarkCancelNoticeBtn";

import dot from "../../../assets/Ellipse135.svg";
import noticePlaceholderImage from "../../../assets/noticePlaceholderImage.svg";
import "./BookmarkViewNotice.css";

import deleteBookmarkIcon from "../../../assets/delete-icon.svg";
import { UserContext } from "../../../Data-fetcing";

const BookmarkViewNoticeModal = ({ persons, closeModal, deleteBookmarkID }) => {
  const cancelBtn = () => {
    const modalCard = document.getElementById("modal");
    const contain = document.getElementById("contain");
    modalCard.classList.add("none");
    contain.classList.add("none");
    closeModal(false);
  };
  const { toggleBookmark, setToggleBookmark } = useContext(UserContext);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal(false);
    }
  });

  // const deleteBookmark = () => {
  //   unBookmarkNotice();
  // };
  const getMonthName = (month) => {
    const d = new Date();
    d.setMonth(month - 1);
    const monthName = d.toLocaleString("default", { month: "short" });
    return monthName;
  };

  // function to unbookmark a notice
  const unBookmarkNotice = () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    };

    fetch(
      `https://noticeboard.zuri.chat/api/v1/organisation/614679ee1a5607b13c00bcb7/bookmark/${deleteBookmarkID}/delete`,
      options
    )
      .then((response) => {
        if (response.ok) {
          setToggleBookmark(!toggleBookmark);
        }
        // setLoader(false);
      })
      .then((response) => {
        setToast(true);

        setTimeout(() => {
          setToast(false);
        }, 2000);
      })

      .catch((error) => {
        console.log(error);
      });
    cancelBtn();
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
                <Tooltip title="Delete">
                  <img
                  style={{ cursor: "pointer" }}
                  onClick={unBookmarkNotice}
                  src={deleteBookmarkIcon}
                  alt="bookmark icon"
                />
                </Tooltip>
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
