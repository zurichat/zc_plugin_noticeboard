import React, { useEffect, useState } from "react";
import styled from "styled-components";

import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";

export const AddUsers = ({ setOpenModal, openModal }) => {
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
    <BackDrop>
      <AddUserContainer>
        <AddUserHeader>
          <h2>Add users to Noticeboard</h2>
          <span>
            <CloseIcon onClick={() => setOpenModal(false)} />
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
                  <img src={"img1.png"} alt="Search" />
                  <h2>Thersa Webb</h2>
                  <CloseIcon />
                </Users>
              </ListUsers>
              <button onClick={getUsers}>Add User</button>
            </>
          )}
        </AddUserForm>
      </AddUserContainer>
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
    padding: 1em 2em 1em 3em;
    font-size: 1em;
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
