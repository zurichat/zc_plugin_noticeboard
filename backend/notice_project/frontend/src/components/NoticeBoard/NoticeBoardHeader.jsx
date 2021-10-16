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

import axios from "axios";

function ZuriGlobalHeader() {
  const [openModal, setOpenModal] = useState(false);
  const { allUsers, setAllUsers } = useContext(UserContext);
  const userData = useContext(UserInfoContext);
  const [notificationTab, setNotificationTab] = useState(false);

  const toggleNotificationTab = () => {
    setNotificationTab(!notificationTab);
  };

  useEffect(() => {
    getAllUsers();
  }, [userData]);

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
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(userData, userData?.org_id);

  const [roomDetails, setRoomDetails] = useState([]);

  /* Room Information api*/
  //CREATE NOTICE API CALL STARTS
  const api = axios.create({
    baseURL: "https://noticeboard.zuri.chat/api/v1",
  });

  const org_Id = localStorage.getItem("currentWorkspace");

  // console.log(org_Id);

  const getRoomDetails = async () => {
    try {
      const res = await api.get(`/organisation/${org_Id}/get-room`);

      let data = await res.data;

      let roomApi = data.data[0];

      setRoomDetails(roomApi);
      // console.log(roomApi, roomApi.room_id, roomApi.room_member_id[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRoomDetails();
  }, []);

  // console.log(roomDetails);

  /* add member api*/
  // room object
  const member_id = userData?._id;

  const room_id = roomDetails.room_id;

  const room_length = roomDetails.room_member_id?.length;

  const users =
    allUsers?.map((user) => ({
      _id: user._id,
      email: user.email,
    })) ?? [];

  const members = roomDetails.room_member_id;

  const membersList = users
    .filter((user) => members.find((id) => id === user._id))
    .map((member) => ({
      _id: member._id,
      email: member.email,
    }));

  // console.log(users, members, membersList);

  const headerConfig = {
    name: "NOTICEBOARD", //Name on header
    icon: NoticeboardIcon, //Image on header
    thumbnailUrl: [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg",
      "https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png",
    ], //Replace with images of users
    userCount: room_length, //User count on header
    hasThumbnail: true, //set false if you don't want thumbnail on the header
    roomInfo: {
      membersList: membersList,
      addmembersevent: (values) => {
        // console.log(values);
        const member_ids = values.map((value) => value.value);

        const payload = {
          room_id,
          member_ids,
        };

        const addToRoom = async () => {
          try {
            const res = await api.post(
              `/organisation/${org_Id}/room/${room_id}/members/${member_id}`,
              payload
            );
            // console.log(res);
            return res;
          } catch (err) {
            console.log(err);
          }
        };

        addToRoom();
      },
      removememberevent: (id) => {
        // console.log(id);
        const member_ids = [id];

        const payload = {
          room_id,
          member_ids,
        };

        const removeFromRoom = async () => {
          try {
            const res = await api.patch(
              `/organisation/${org_Id}/room/${room_id}/members/${member_id}`,
              payload
            );
            // console.log(res);
            return res;
          } catch (err) {
            console.log(err);
          }
        };

        removeFromRoom();
      },
    },
  };

  return (
    <div className="zuriMain-header">
      <Parcel
        config={pluginHeader}
        wrapWith="div"
        wrapStyle={{ width: "100%" }}
        headerConfig={headerConfig}
      />

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
