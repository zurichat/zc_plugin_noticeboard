import React, { useState, useContext, useEffect } from "react";
// import styled from "styled-components";
import "./NoticeBoardHeader.css";
import NoticeboardIcon from "../../assets/noticeboard.svg";
import noNotification from "../../assets/noNotification.svg";
import { AddUsers } from "../AddUsers/AddUsers";
// import AddIcon from "@material-ui/icons/Add";
import { UserInfoContext } from "../../App";
import { UserContext } from "../../Data-fetcing";
import Parcel from "single-spa-react/parcel";
import { pluginHeader } from "@zuri/plugin-header";

function ZuriGlobalHeader() {
  const [openModal, setOpenModal] = useState(false);
  const { allUsers, setAllUsers } = useContext(UserContext);
  const userData = useContext(UserInfoContext);
  const [notificationTab, setNotificationTab] = useState(false);

  const toggleNotificationTab = () => {
    setNotificationTab(!notificationTab);
  };

  const getAllUsers = async () => {
    try {
      const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      };
      let response = await fetch(
        `https://api.zuri.chat/organizations/${userData?.currentWorkspace}/members`,
        requestOptions
      );
      let data = await response.json();
      setAllUsers(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const headerConfig = {
    name: "NOTICEBOARD", //Name on header
    icon: NoticeboardIcon, //Image on header
    thumbnailUrl: [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg",
      "https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png",
    ], //Replace with images of users
    userCount: allUsers?.length, //User count on header
    eventTitle: () => {
      //Block of code to be triggered on title click
    },
    eventThumbnail: () => {
      //Block of code to be triggered on thumbnail click
      setOpenModal(true);
      console.log(allUsers[0].image_url);
    },
    hasThumbnail: true, //set false if you don't want thumbnail on the header
  };

  useEffect(() => {
    getAllUsers();
  }, [userData]);

  return (
    <div className="zuriMain-header">
      <Parcel
        config={pluginHeader}
        wrapWith="div"
        wrapStyle={{ width: "100%" }}
        headerConfig={headerConfig}
      />

      {openModal ? (
        <AddUsers
          setOpenModal={setOpenModal}
          openModal={openModal}
          notice={true}
        />
      ) : (
        ""
      )}

      <div className="noNotification-container">
        <img
          src={noNotification}
          alt="noNotification"
          onClick={toggleNotificationTab}
        />
      </div>

      {notificationTab && <NotificationTab />}
    </div>
  );
}

const NotificationTab = () => {
  return (
    <div className="notificationTab">
      <div className="notificationTab-innerContainer">
        <p className="notificationTab-intro">
          You set a reminder for this notice
        </p>
        <div className="notificationTab-title-time">
          <h3 className="notificationTab-title">Staff Meeting</h3>
          <p className="notificationTab-time">13:00</p>
        </div>
        <div>
          <button className="notificationTab-button">View Notice</button>
        </div>
      </div>
    </div>
  );
};

export default ZuriGlobalHeader;

// return (
//   <div className="noticeboard-header">
//     <div className="noticeboard-header-container">
//       <div className="heading">Notice Board</div>
//   {
//      openModal ? <AddUsers setOpenModal={setOpenModal} openModal={openModal} notice={true}/> : ""
//   }

//       <AvatarGroup className="members-avatars-grp" onClick={()=> setOpenModal(true)}>
//         {/* <AddIcon onClick={()=> setOpenModal(true)}/> */}
//         <div className="avatar-wrap">
//           <div className="avatar">
//             <img src={Member4} alt="avatar" />
//           </div>

//           <div className="avatar">
//             <img src={Member3} alt="avatar" />
//           </div>

//           <div className="avatar">
//             <img src={Member2} alt="avatar" />
//           </div>

//           <div className="avatar">
//             <img src={Member1} alt="avatar" />
//           </div>
//         </div>

//          <div className="member-total-count">{allUsers?.length}</div>
//       </AvatarGroup>
//     </div>
//   </div>
// );
// }

// export default NoticeBoardHeader;

// const AddUserButton = styled.button`
//   color: white;
//   background-color: #00bb7c;
//   padding: 1em;
//   font-size: 16px;
//   line-height: 24px;
//   border-radius: 2px;
//   margin-top: 1.5em;
//   //width: 10em;
//   outline: none;
//   border: 0;

//   @media (max-width: ${500}px) {
//     //width: 100%;
//   }
// `;

// const AvatarGroup = styled.div`
// &:hover{
//   cursor: pointer;
//   opacity: 0.5
// }
// `;
