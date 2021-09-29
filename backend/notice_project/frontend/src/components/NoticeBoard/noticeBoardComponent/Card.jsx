import React from "react";
import moment from 'moment'


import dot from "../../../assets/Ellipse135.svg";
import AdminMenu from "./AdminNoticeMenu";
import ViewNoticeModal from "../ViewNoticeCardModal/ViewNoticeModal";

const Card = ({ person, people }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [persons, setPersons] = React.useState([person]);

  const filterUsers = (index) => {
    const user = persons.filter((person) => person._id === index);
    setPersons(user);
    setOpenModal(true);
  };


  console.log(persons)


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
    <>
      <article className="card-adminNotice">
        <div className="card-header-adminNotice">
          <div className="profile-adminNotice">
            <div className="img-profile-container-adminNotice">
              <img
                className="profile-pic-adminNotice"
                src={person.author_img_url !== 'null' ? person.author_img_url : "https://images.unsplash.com/photo-1582233479366-6d38bc390a08?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" }
                alt="profile-pic"
              />
            </div>
            <div className="identity-adminNotice">
              {/* no user details in notices from the api */}
              <h6 className="name">{person.author_name !== 'null' ?  person.author_name : person.author_username}</h6>
              <p className="time-date-adminNotice">
             { moment(person.created).fromNow()}
                {/* <span>
                  {currentMonth}&nbsp;{person.created.slice(8, 10)}
                </span>
                <span className="adminDot">
                  <img src={dot} alt="" />
                </span>{" "} */}
                {/* <span>{person.created.substring(11, 20)}</span> */}
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
          <button
            className="card-button-adminNotice"
            onClick={() => filterUsers(person._id)}
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
