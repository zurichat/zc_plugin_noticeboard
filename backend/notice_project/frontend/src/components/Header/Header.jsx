import React, { useEffect, useContext } from "react";
import "./Header.css";
import { UserContext } from "../../Data-fetcing";

const Header = () => {
  const { people, setFilteredNotice, searchText, setSearchText } =
    useContext(UserContext);

  useEffect(() => {
    const filterNotice = people?.filter((title) =>
      title.title.toLowerCase().includes(searchText?.toLowerCase())
    );
    setFilteredNotice(filterNotice);
  }, [searchText]);

  return (
    <header className="header">
      <div className="header__wraps">
        <form className="header__form">
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
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search your workspace"
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
