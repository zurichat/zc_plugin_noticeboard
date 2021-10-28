import { createContext, useState } from "react";
export const BookmarkContext = createContext();

const BookmarkContextProvider = (props) => {
  const [bookmarkDetails, setBookmarkDetails] = useState();
  const [toggleBookmark, setToggleBookmark] = useState(false);
  return (
    <BookmarkContext.Provider
      value={{
        bookmarkDetails,
        setBookmarkDetails,
        toggleBookmark,
        setToggleBookmark,
      }}
    >
      {props.children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContextProvider;
