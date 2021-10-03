import IconButton from "@material-ui/core/IconButton";
import Fade from "@material-ui/core/Fade";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import ListItemText from "@material-ui/core/ListItemText";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import remindIcon from "./assets/remindIcon.svg";
import copyLinkIcon from "./assets/copyLinkIcon.svg";
import BookmarkIcon from "./assets/bookmarkIcon.svg";
import BookmarkIconActive from "./assets/bookmark-icon-active.svg";
// import moreMessagesIcon from "./assets/moreMessagesIcon.svg";
import axios from "axios";
import { UserInfoContext } from "../../../../App";

const useStyles = makeStyles({
  listItemText: {
    color: "#999999",
    weight: 400,
  },
  MenuStyle: {
    display: "flex",
    alignItems: "center",
  },
  MenuIconStyle: {
    paddingRight: "10px",
  },
});

export default function UserMenu({
  noticeID,
  bookmarkDetails,
  toggleBookmark,
  setToggleBookmark,
}) {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = useState(null);

  const handleOpen = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleClose = () => {
    setOpenMenu(null);
  };

  ///Bookmark
  const [bookmarkStatus, setBookmarkStatus] = useState();
  const UserData = useContext(UserInfoContext);
  useEffect(() => {
    bookmarkDetails
      ? bookmarkDetails.data.filter((data) => data.notice_id === noticeID)
        ? setBookmarkStatus(true)
        : setBookmarked(false)
      : "";
  }, [bookmarkDetails]);

  const bookmarkNotice = () => {
    axios
      .post(
        `https://noticeboard.zuri.chat/api/v1/organisation/${UserData?.org_id}/bookmark`,
        {
          notice_id: noticeID,
          user_id: UserData?._id,
        }
      )
      .then((data) => {
        console.log(data);
        setBookmarkStatus(true);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  const deleteBookmarkNotice = () => {
    axios
      .delete(
        `https://noticeboard.zuri.chat/api/v1/organisation/${UserData?.org_id}/bookmark/${bookmarkDetails?._id}/delete`
      )
      .then((data) => {
        console.log(data);
        setBookmarkStatus(false);
        setToggleBookmark(!toggleBookmark);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  const bookmarkFunction = () => {
    if (!bookmarkStatus) {
      bookmarkNotice();
    } else {
      deleteBookmarkNotice();
    }
  };

  const menuContent = [
    { img: BookmarkIcon, text: "Bookmark" },
    { img: remindIcon, text: "Remind me about this" },
    { img: copyLinkIcon, text: "Copy link" },
  ];

  return (
    <>
      <IconButton onClick={handleOpen} disableRipple>
        <MoreVertRoundedIcon style={{ color: "#00bb7c" }} />
      </IconButton>
      <Menu
        anchorEl={openMenu}
        keepMounted
        open={openMenu}
        onClose={handleClose}
        TransitionComponent={Fade}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            marginTop: "30px",
            boxShadow:
              "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 3px 3px 1px rgb(0 0 0 / 14%), 0px 3px 10px 2px rgb(0 0 0 / 12%)",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            bookmarkFunction();
          }}
          className="overrideHeight"
          disableRipple
        >
          <Box className={classes.MenuStyle}>
            <img
              src={bookmarkStatus ? BookmarkIconActive : BookmarkIcon}
              alt="bookmark icon"
              className={classes.MenuIconStyle}
            />
          </Box>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Bookmark"
          />
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
          }}
          className="overrideHeight"
          disableRipple
        >
          <Box className={classes.MenuStyle}>
            <img
              src={copyLinkIcon}
              alt="Copy link"
              className={classes.MenuIconStyle}
            />
          </Box>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Copy link"
          />
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
          }}
          className="overrideHeight"
          disableRipple
        >
          <Box className={classes.MenuStyle}>
            <img
              src={remindIcon}
              alt="Remind me about this"
              className={classes.MenuIconStyle}
            />
          </Box>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Remind me about this"
          />
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
          }}
          className="overrideHeight"
          disableRipple
        >
          {/* <Box className={classes.MenuStyle}>
            <img
              src={moreMessagesIcon}
              alt="more massage icon"
              className={classes.MenuIconStyle}
            />
          </Box> */}
          {/* <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="More message shortcuts..."
          /> */}
        </MenuItem>
      </Menu>
    </>
  );
}
