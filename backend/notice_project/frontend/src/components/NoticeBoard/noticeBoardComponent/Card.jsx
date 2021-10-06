import React, { useContext } from "react";
import moment from "moment";

import viewIcon from "../../../assets/Seen.svg";
import dot from "../../../assets/Ellipse135.svg";
import AdminMenu from "./AdminNoticeMenu";
import ViewNoticeModal from "../ViewNoticeCardModal/ViewNoticeModal";
import noticePlaceholderImage from '../../../assets/noticePlaceholderImage.svg'
import { UserInfoContext } from "../../../App";

const Card = ({ person, people }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [persons, setPersons] = React.useState([person]);

  const filterUsers = (index) => {
    const user = persons.filter((person) => person._id === index);
    setPersons(user);
    setOpenModal(true);
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentMonth = months[Number(person.created.slice(5, 7)) - 1];

  // Functinality for the number of views
  const UserData = useContext(UserInfoContext);
  const updateView = (noticeID) => {
    const apiCall = `https://noticeboard.zuri.chat/api/v1/organisation/${UserData?.org_id}/notices/${noticeID}?query=${UserData?.email}`;
    fetch(apiCall)
      .then((result) => result.json())
      .then((data) => {
        console.log("View count data", data);
      });
    console.log(UserData.org_id);
  };
  // function converting the views from strings to numbers
  const viewNumber = (count) => {
    const viewss = count.split(" ").length - 1;
    return viewss;
  };

  return (
    <>
      <article className="card-adminNotice">
        <div className="card-header-adminNotice">
          <div className="profile-adminNotice">
            <div className="img-profile-container-adminNotice">
              <img
                className="profile-pic-adminNotice"
                src={
                  person.author_img_url !== "null"
                    ? person.author_img_url
                    : noticePlaceholderImage
                }
                alt="profile-pic"
              />
            </div>
            <div className="identity-adminNotice">
              <div className='name'>
                {person.author_name !== "null"
                  ? person.author_name
                  : person.author_username}
                  </div>
              <p className="time-date-adminNotice">
                {moment(person.created).fromNow()}
              </p>
            </div>
          </div>
          <AdminMenu noticeID={person._id} />
        </div>
        {/* body of card */}
        <div className="card-body-adminNotice">
          <h3 className="card-title-adminNotice">
            {person.title.replace(/<[^>]+>/g, "")}
          </h3>
          <p className="card-info-adminNotice">
            {person.message.replace(/<[^>]+>/g, "").substring(0, 150)}...
          </p>
        </div>
        {/* icons tray */}
        <div className="icon-button-tray-adminNotice">
          <div className="view-icon-grp">
            <div>
              <img src={viewIcon} alt="" />
            </div>

            <div className="views-num">
              {viewNumber(person.views)}
            </div>
          </div>
          <button
            className="card-button-adminNotice"
            onClick={() => {
              filterUsers(person._id);
              updateView(person._id);

            }}
          >
            View Notice
          </button>
        </div>
      </article>
      {openModal && (
        <ViewNoticeModal persons={persons} closeModal={setOpenModal} />
      )}
    </>
  );
};

export default Card;
