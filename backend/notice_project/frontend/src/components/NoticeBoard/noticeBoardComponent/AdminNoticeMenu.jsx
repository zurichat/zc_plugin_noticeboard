import React, { useEffect, useState, useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import BookmarkIcon from "../../../assets/bookmark-icon.svg";
import BookmarkIconActive from "../../../assets/bookmark-icon-active.svg";
import Active from "../../../assets/active.svg";
import EditIcon from "../../../assets/edit-icon.svg";
import ReminderIcon from "../../../assets/reminder-icon.svg";
import CopyLinkIcon from "../../../assets/copy-link-icon.svg";
import DeleteIcon from "../../../assets/delete-icon.svg";
import MoreMessage from "../../../assets/more-messages-icon.svg";
import "./AdminNoticeMenu.css";
import axios from "axios";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { useHistory } from "react-router";
import { DataContext } from "../../../App";
import { UserContext } from "../../../Data-fetcing";

function AdminMenu({ noticeID }) {
  const menu = [
    { icon: EditIcon, linkText: "Edit notice", id: "1" },
    { icon: DeleteIcon, linkText: "Delete notice", id: "2" },
  ];

  const [openModal, setOpenModal] = React.useState(false);
  const [noticeList, setNoticeList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [toast, setToast] = useState(false);
  const history = useHistory();
  ////bookmark status state
  const [bookmarkStatus, setBookmarkStatus] = useState();

  const openDeleteModal = () => {
    setOpenModal(true);
  };

  const _globalData = useContext(DataContext);
  const { selectedNotice, setSelectedNotice } = useContext(UserContext);
  const org_id = _globalData.Organizations[0];

  const handleClose = () => {
    setOpenModal(false);
  };

  const deleteNoticeFunc = () => {
    deleteNotice(noticeID);
     setLoader(true);
    //  setTimeout(()=>{
    //    setLoader(false)
    // }, 4000)
    setTimeout(() => {
      setToast(true);
    }, 4000);

    setTimeout(()=>{
      setToast(false)
    }, 7000)
  };

  const editNotice = (noticeID) => {
    fetch(
      `https://noticeboard.zuri.chat/api/v1/organisation/614679ee1a5607b13c00bcb7/notices`
    )
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          setLoading(false);
          setIsError(true);
        }
      })
      .then((data) => {
        setNoticeList(data.data);
      })
      .catch((error) => console.log(error));

    const currentNoticeID = noticeList?.find((element) => {
      return element._id === noticeID;
    });

    setSelectedNotice(currentNoticeID);
    history.push(`/noticeboard/edit-notice/${currentNoticeID._id}`);
  };

  const AdminMenuStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
  };

  const DialogStyle = {
    padding: "1em",
  };

  const MenuIconStyle = {
    paddingRight: "10px",
  };

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  const openMenu = (evt) => {
    setAnchorEl(evt.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(false);
  };

  const deleteNotice = (noticeId) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    };

    fetch(
      `https://noticeboard.zuri.chat/api/v1/organisation/614679ee1a5607b13c00bcb7/notices/${noticeId}/delete`,
      options
    )
      .then((response) => {
        console.log(response, );
        setLoader(false)
      })
      
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };

  ///Checking if the notice was bookmarked
  //   const checkBookmarkStatus=()=>{
  //     fetch("https://")
  //     .then(res=>{
  //       if(!res.ok){
  //       throw Error("Cound not get the status of the bookmark")
  //       }
  //       return res.json()
  //     })
  //     .then(data=>{
  //       console.log(data)
  //       setBookmarkStatus(true);
  //     })
  //     .catch(err=>{
  //       if(err){
  //         console.log(err)
  //       }
  //     })
  //   }

  //   checkBookmarkStatus();
  //  ///////////////

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={openMenu}
        disableRipple
      >
        <img src={Active} alt="active" />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={closeMenu}
        PaperProps={{
          style: {
            width: "16rem",
            boxShadow:
              "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 3px 3px 1px rgb(0 0 0 / 14%), 0px 3px 10px 2px rgb(0 0 0 / 12%)",
          },
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            closeMenu;
          }}
          className="overrideHeight"
          disableRipple
        >
          <div style={AdminMenuStyle}>
            <img
              src={bookmarkStatus ? BookmarkIconActive : BookmarkIcon}
              alt="Bookmark"
              style={MenuIconStyle}
            />
            <span
              style={{
                color: "#999999",
                width: "100%",
              }}
              onClick={() => setBookmarkStatus(!Boolean(bookmarkStatus))}
            >
              Bookmark
            </span>
          </div>
        </MenuItem>

        <MenuItem onClick={closeMenu} className="overrideHeight" disableRipple>
          <div style={AdminMenuStyle}>
            <img src={EditIcon} alt="Edit notice" style={MenuIconStyle} />
            <span
              style={{
                color: "#999999",
                width: "100%",
              }}
              onClick={() => editNotice(noticeID)}
            >
              Edit notice
            </span>
          </div>
        </MenuItem>
        <MenuItem onClick={closeMenu} className="overrideHeight" disableRipple>
          <div style={AdminMenuStyle}>
            <img
              src={ReminderIcon}
              alt="Remind me about this"
              style={MenuIconStyle}
            />
            <span
              style={{
                color: "#999999",
                width: "100%",
              }}
              onClick={openDeleteModal}
            >
              Remind me about this
            </span>
          </div>
        </MenuItem>

        <MenuItem onClick={closeMenu} className="overrideHeight" disableRipple>
          <div style={AdminMenuStyle}>
            <img src={CopyLinkIcon} alt="Copy link" style={MenuIconStyle} />
            <span
              style={{
                color: "#999999",
                width: "100%",
              }}
              onClick={openDeleteModal}
            >
              Copy link
            </span>
          </div>
        </MenuItem>
        <MenuItem onClick={closeMenu} className="overrideHeight" disableRipple>
          <div style={AdminMenuStyle}>
            <img src={DeleteIcon} alt="Delete Notice" style={MenuIconStyle} />
            <span
              style={{
                color: "#999999",
                width: "100%",
              }}
              onClick={openDeleteModal}
            >
              Delete Notice
            </span>
          </div>
        </MenuItem>
        <MenuItem onClick={closeMenu} className="overrideHeight" disableRipple>
          <div style={AdminMenuStyle}>
            <img src={MoreMessage} alt="Copy link" style={MenuIconStyle} />
            <span
              style={{
                color: "#999999",
                width: "100%",
              }}
              onClick={openDeleteModal}
            >
              More message shortcuts...
            </span>
          </div>
        </MenuItem>
      </Menu>
      {openModal && (
        <Dialog
          open={openModal}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Notice?"}</DialogTitle>
          <DialogContent style={DialogStyle}>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete notice, this action cannot be
              undone once you delete it. Kindly proceed while you click on the
              delete button
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
              style={{
                textTransform: "none",
                padding: "1em 3em",
                backgroundColor: "#FCF8F7",
                color: "black",
              }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              autoFocus
              style={{
                textTransform: "none",
                padding: "1em 2em",
                backgroundColor: "red",
                color: "white",
              }}
              onClick={deleteNoticeFunc}
            >
              Delete Notice
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {loader && (
        <Backdrop
          sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
          onClick={handleClose}
          style={{ zIndex: "2" }}
        >
          <CircularProgress color="primary" style={{ color: "white" }} />
          <p style={{ color: "white" }}>Deleting...</p>
        </Backdrop>
      )}
      {toast && (
        <Snackbar
          open={toast}
          autoHideDuration={6000}
          onClose={() => setLoader(false)}
          message="Notice Deleted"
          severity="success"
        />
      )}
    </div>
  );
}
export default AdminMenu;
