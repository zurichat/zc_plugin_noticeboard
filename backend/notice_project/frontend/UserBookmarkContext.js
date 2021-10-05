import {createContext,useState} from "react"
export const BookmarkContex = createContext();
const UserBookmarkContextProvider = (props) => {
 const [bookmarkDetails,setBookmarkDetails] = useState();
 const [toggleBookmark,setToggleBookmark] = useState(false)
 return (  
  <BookmarkContex.Provider value={bookmarkDetails,setToggleBookmark,setBookmarkDetails,toggleBookmark}>
   {this.props.children}
  <BookmarkContex.Provider>
 );
}
 
export default UserBookmarkContextProvider;
