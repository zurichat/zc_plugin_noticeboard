import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [allUsers, setAllUsers] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState({});

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
        setSelectedNotice
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
