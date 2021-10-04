import { createContext, useState } from "react";
export const UserBookmarkContext = createContext();

const UserBookmarkContextProvider = (props) => {
  const [bookmarkDetails, setBookmarkDetails] = useState("");
  const [toggleBookmark, setToggleBookmark] = useState(false);
  return (
    <UserBookmarkContext.Provider
      value={{
        bookmarkDetails,
        setBookmarkDetails,
        toggleBookmark,
        setToggleBookmark,
      }}
    >
      {props.children}
    </UserBookmarkContext.Provider>
  );
};

export default UserBookmarkContextProvider;
