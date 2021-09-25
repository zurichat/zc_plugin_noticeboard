import React from "react";
import dot from "../../../assets/Ellipse135.svg";
import { Button } from "@material-ui/core";
import AdminMenu from "./AdminNoticeMenu";
import ViewNoticeModal from "../ViewNoticeCardModal/ViewNoticeModal";

const Card = ({ person }) => {
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

  return (
    <div>
      <article className="card-adminNotice">
        <div className="card-header-adminNotice">
          <div className="profile-adminNotice">
            <div className="img-profile-container-adminNotice">
              <img
                className="profile-pic-adminNotice"
                src="https://images.unsplash.com/photo-1582233479366-6d38bc390a08?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt="profile-pic"
              />
            </div>
            <div className="identity-adminNotice">
              {/* no user details in notices from the api */}
              {/* <h6 className="name">{person.userName}</h6> */}
              <p className="time-date-adminNotice">
                <span>
                  {currentMonth}&nbsp;{person.created.slice(8, 10)}
                </span>
                <span className="adminDot">
                  <img src={dot} alt="" />
                </span>{" "}
                <span>{person.created.substring(11, 20)}</span>
              </p>
            </div>
          </div>
          <AdminMenu noticeID={person._id} />
        </div>
        {/* body of card */}
        <div className="card-body-adminNotice">
          <h5 className="card-title-adminNotice">
            {person.title.replace(/<[^>]+>/g, "")}
          </h5>
          <p className="card-info-adminNotice">
            {person.message.replace(/<[^>]+>/g, "").substring(0, 150)}...
          </p>
        </div>
        {/* icons tray */}
        <div className="icon-button-tray-adminNotice">
          <div className="icon-tray-adminNotice">
            {/* the seen feature was removed */}
            {/* <div>
              <img src={see} alt="" />
              <p className="number">{person.views}</p>
            </div> */}
          </div>
          <button
            className="card-button-adminNotice"
            variant="outlined"
            color="primary"
            onClick={() => filterUsers(person._id)}
          >
            View Notice
          </button>
        </div>
      </article>
      {openModal && (
        <ViewNoticeModal persons={persons} closeModal={setOpenModal} />
      )}
    </div>
  );
};

export default Card;
