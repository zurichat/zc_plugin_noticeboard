import React, { useState } from "react";
import styled from "styled-components";
import "./NoticeBoardHeader.css";
import Member1 from "../../assets/member-avatar.svg";
import Member2 from "../../assets/member-2.svg";
import Member3 from "../../assets/member-3.svg";
import Member4 from "../../assets/member-4.svg";
import { AddUsers } from "../AddUsers/AddUsers";
import AddIcon from "@material-ui/icons/Add";

function NoticeBoardHeader() {
  const [openModal, setOpenModal] = useState(false)
  return (
    <div className="noticeboard-header">
      <div className="noticeboard-header-container">
        <div className="heading">Notice Board</div>
    {
      openModal?  <AddUsers setOpenModal={setOpenModal} openModal={openModal} notice={true}/> : ""
    }

        <div className="members-avatars-grp">
          <AddIcon onClick={()=> setOpenModal(true)}/>
          <div className="avatar-wrap">
            <div className="avatar">
              <img src={Member4} alt="avatar" />
            </div>

            <div className="avatar">
              <img src={Member3} alt="avatar" />
            </div>

            <div className="avatar">
              <img src={Member2} alt="avatar" />
            </div>

            <div className="avatar">
              <img src={Member1} alt="avatar" />
            </div>
          </div>

          <div className="member-total-count">145</div>
        </div>
      </div>
    </div>
  );
}

export default NoticeBoardHeader;

const AddUserButton = styled.button`
    color: white;
    background-color: #00bb7c;
    padding: 1em;
    font-size: 16px;
    line-height: 24px;
    border-radius: 2px;
    margin-top: 1.5em;
    //width: 10em;
    outline: none;
    border: 0;

    @media (max-width: ${500}px) {
      //width: 100%;
    }
`;