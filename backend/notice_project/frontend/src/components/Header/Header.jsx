import React, { useState } from "react";
import { createBrowserHistory } from "history";
import "./Header.css";
import axios from "axios";
import profileIcon from "./images/profile_icon_img_x2.png";

const Header = () => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    console.log(text);
  };

  const history = createBrowserHistory({ forceRefresh: true });
  const api = axios.create({
    baseURL: "https://noticeboard.zuri.chat/api/v1",
  });

  // const handleSubmit = async (e) => {
  // 	e.preventDefault();
  // 	let res = await api.get(`/search?q=${text}`);
  // 	console.log(res.data.data);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`/search?q=${text}`);
      const searchData = response.data.data;
      console.log(response.data.data);
      console.log(searchData);
      setText("");
      history.push({
        pathname: "/noticeboard/search",
        state: { searchData },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="header">
      <div className="header__wraps">
        <form onSubmit={handleSubmit} className="header__form">
          <div className="header__search-icon">
            <svg
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.875 13.5C10.9816 13.5 13.5 10.9816 13.5 7.875C13.5 4.7684 10.9816 2.25 7.875 2.25C4.7684 2.25 2.25 4.7684 2.25 7.875C2.25 10.9816 4.7684 13.5 7.875 13.5Z"
                stroke="#333333"
                strokeWidth="1.22693"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.7496 15.75L11.8496 11.85"
                stroke="#333333"
                strokeWidth="1.22693"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            className="header__form-input"
            type="text"
            onChange={handleChange}
            value={text}
            placeholder="Search your workspace"
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
