import React, { useEffect, useState } from "react";
import styled from "styled-components";

import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import AddUserIcon from "@material-ui/icons/PersonAdd";
import Img from "./images/img1.png";

//members documents
const ListMemberContainer = ({ Name, Img, Username, Job }) => {
  return (
    <MembersContainer>
      <MemberDetails>
        <img src={Img} alt="member" />
        <div>
          <div>
            <MemberName>{Name}</MemberName>
            <Status></Status>
            <UserName>{Username}</UserName>
          </div>
          <Role>{Job}</Role>
        </div>
      </MemberDetails>
      <Remove>Remove</Remove>
    </MembersContainer>
  );
};

// Notice board component
export const Noticeboard = ({ setShowAddUser, setOpenModal }) => {
  return (
    <NoticeContainer >
      <AddUserHeader>
        <h2>Noticeboard members</h2>
        <span>
          <CloseIcon onClick={() => setOpenModal(false)} />
        </span>
      </AddUserHeader>

      <AddUserForm>
        <SearchUser>
          <input type="text" placeholder="Search for user in this channel" />
          <span>
            <SearchIcon />
          </span>
        </SearchUser>
      </AddUserForm>

      <AddUserBox onClick={() => setShowAddUser(true)}>
        <AddUserIcon />
        <h3>Add a User</h3>
      </AddUserBox>

      {/* list of member */}
      <ListMemberContainer
        Name={"Deyrin Cutting"}
        Img={Img}
        Username={"@cuttingproduct"}
        Job={"Product design"}
      />
      <ListMemberContainer
        Name={"Bessie Cooper"}
        Img={Img}
        Username={"@officialbessie"}
        Job={"CEOing"}
      />
      <ListMemberContainer
        Name={"Esther Howard"}
        Img={Img}
        Username={"@Esther"}
        Job={"CTO"}
      />
      <ListMemberContainer
        Name={"Thersa Webb"}
        Img={Img}
        Username={"@peopleperson"}
        Job={"Human Resource"}
      />
      <ListMemberContainer
        Name={"Kristin Watson"}
        Img={Img}
        Username={"@Kristinmoney"}
        Job={"CFO"}
      />
      <ListMemberContainer
        Name={"Robert Fox"}
        Img={Img}
        Username={"@robertfox"}
        Job={"Head of Marketing"}
      />
      <ListMemberContainer
        Name={"Ralph Edwards"}
        Img={Img}
        Username={"@Raplh"}
        Job={"Co-founder"}
      />
    </NoticeContainer>
  );
};

//add new member component
const AddUserNoticeboard = ({setShowAddUser}) => {
  const [message, setMessage] = useState(null);
  const getUsers = async (e) => {
    e.preventDefault();
    try {
      const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      };
      let response = await fetch(
        "https://noticeboard.zuri.chat/api/v1/add_user",
        requestOptions
      );
      let data = await response.json();
      console.log(data);
      setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AddUserContainer>
      <AddUserHeader>
        <h2>Add users to Noticeboard</h2>
        <span>
          <CloseIcon onClick={() => setShowAddUser(false)} />
        </span>
      </AddUserHeader>

      <AddUserForm>
        {/* <SearchUser>
        <input
          type="text"
          placeholder="Search for user in this workspace"
        />
        <span>
          <SearchIcon />
        </span>
      </SearchUser> */}
        {message ? (
          message
        ) : (
          <>
            <ListUsers>
              <Users>
                <img src={Img} alt="Search" />
                <h2>Thersa Webb</h2>
                <CloseIcon />
              </Users>
            </ListUsers>
            <button onClick={getUsers}>Add User</button>
          </>
        )}
      </AddUserForm>
    </AddUserContainer>
  );
};

export const AddUsers = ({ setOpenModal, openModal, notice }) => {


  const [showAddUser, setShowAddUser] = useState(false)

  return (
    <BackDrop>
        {showAddUser? (<AddUserNoticeboard setShowAddUser={setShowAddUser} />): (<Noticeboard setOpenModal={setOpenModal} setShowAddUser={setShowAddUser}/>)}
       
    </BackDrop>
  );
};

const BackDrop = styled.div`
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const AddUserContainer = styled.div`
  background-color: #fefefe;
  margin: 20% auto;
  padding: 1em;
  //border: 1px solid #888;
  width: 30em;
  position: relative;
  z-index: 999;
  height: 14em;
  @media (max-width: ${500}px) {
    width: 90%;
    margin: 50% auto;
  }

  &.notice{
    margin: 10% auto;
  }
`;

const AddUserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1em;

  h2 {
    font-size: 20px;
    font-weight: 700;
  }
  span {
    :hover {
      cursor: pointer;
      opacity: 0.5;
    }
  }
`;

const AddUserForm = styled.form`
  padding-top: 1em;
  button {
    color: white;
    background-color: #00bb7c;
    padding: 1em;
    font-size: 16px;
    line-height: 24px;
    border-radius: 2px;
    margin-top: 1.5em;
    width: 10em;
    outline: none;
    border: 0;
    float: right;

    @media (max-width: ${500}px) {
      //width: 100%;
    }
  }
`;

const SearchUser = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  input {
    border: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    padding: 1em 2em 1em 2.5em;
    font-size: 1em;

    ::placeholder {
      opacity: 0.6;
      font-weight: 400;
    }
  }

  span {
    position: absolute;
    left: 0;
    padding-left: 0.5em;
    margin-top: 0.5em;
    color: #00000059;
  }
`;

const ListUsers = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 0.5em 1em 0.5em 0.5em;
  display: grid;
  grid-template-columns: 50% 50%;
`;

const Users = styled.div`
  display: flex;
  justify-content: space-between;
  width: 11em;
  background: #74f3d64f;
  align-items: center;
  padding: 0 0.5em 0 0;

  h2 {
    font-size: 1em;
    line-height: 100%;
    color: #333333;
    font-weight: 500;
  }
  .MuiSvgIcon-root {
    font-size: 1.2em;
    color: #333;
  }

  @media (max-width: ${500}px) {
    width: 100%;

    h2 {
      font-size: 0.8em;
    }

    .MuiSvgIcon-root {
      font-size: 1em;
    }
  }
`;

const NoticeContainer = styled(AddUserContainer)`
  height: unset;
  margin: 10% auto;
`;

const AddUserBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1em;
  color: #00bb7c;
  h3 {
    margin-left: 0.7em;
    color: #00bb7c;
  }
  &:hover{
    opacity: .7;
    cursor: pointer;
  }
`;

const MembersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2em;
`;
const MemberDetails = styled.div`
  display: flex;
  width: 20em;
  justify-content: flex-start;

  img {
    //height: 2em;
  }

  > div {
    margin-left: 0.7em;
    div {
      display: flex;
      align-items: center;
    }
  }
`;

const Remove = styled.h3`
  color: #00bb7c;
`;

const MemberName = styled.h3`
      @media (max-width: ${500}px) {
      font-size: 12px;
    }
`;
const Status = styled.span`
  height: 0.5em;
  width: 0.5em;
  background-color: #00bb7c;
  border-radius: 50%;
  margin-left: 0.5em;
`;
const UserName = styled.h5`
  opacity: 0.6;
  margin-left: 0.5em;
  @media (max-width: ${500}px) {
      font-size: 12px;
    }
`;
const Role = styled.h4`
  font-size: 12px;
  opacity: 0.5;
  margin-top: 0.3em;
  @media (max-width: ${500}px) {
      font-size: 11px;
    }
`;
