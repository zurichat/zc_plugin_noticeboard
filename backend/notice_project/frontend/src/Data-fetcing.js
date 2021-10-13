import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [allUsers, setAllUsers] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState({});
  const [searchText, setSearchText] = useState();
  const [filteredNotice, setFilteredNotice] = useState(people);
  const [oldnotices, setOldnotices] = useState([]);
  const [notices, setNotices] = useState([]);
  const [toggleBookmark, setToggleBookmark] = useState(false);

  return (
    <UserContext.Provider
      value={{
        people,
        setPeople,
        allUsers,
        setAllUsers,
        loading,
        setLoading,
        isError,
        setIsError,
        selectedNotice,
        setSelectedNotice,
        searchText,
        setSearchText,
        filteredNotice,
        setFilteredNotice,
        notices,
        setNotices,
        oldnotices,
        setOldnotices,
        toggleBookmark,
        setToggleBookmark,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
