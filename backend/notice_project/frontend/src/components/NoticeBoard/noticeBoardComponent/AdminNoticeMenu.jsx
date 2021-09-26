import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import BookmarkIcon from "../../../assets/bookmark-icon.svg";
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






function AdminMenu({ noticeID }) {
  const menu = [
    { icon: EditIcon, linkText: "Edit notice" },
    { icon: DeleteIcon, linkText: "Delete notice" },
  ];

  const [openModal, setOpenModal] = React.useState(false);

  const [loader, setLoader] = useState(false)
  const [toast, setToast] = useState(false)

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const deleteNoticeFunc =() =>{
    deleteNotice(noticeID);
    setLoader(true)
    setTimeout(()=>{
      setLoader(false)
    },3000)
    toastPop()
    setTimeout(()=>{
      setToast(false)
    },2000)
  }

  const toastPop =() =>{
    setTimeout(() =>{
        setToast(true)
    },4000)
  }

  const deleteNoticeModal = (e) => {
    const target = e.target;
    if ((target.innerHTML = "Delete notice")) {
      handleOpen();
    }
  };

  const AdminMenuStyle = {
    display: "flex",
    alignItems: "center",
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
    axios
    .delete(`https://noticeboard.zuri.chat/api/v1/notices/${noticeId}/delete`)
    .then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  handleClose();
  console.log(noticeId);
  };

 

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
        {menu.map(({ icon, linkText }) => (
          <MenuItem
            key={linkText}
            onClick={closeMenu}
            className="overrideHeight"
            disableRipple
          >
            <div style={AdminMenuStyle}>
              <img src={icon} alt={linkText} style={MenuIconStyle} />
              <span
                style={{
                  color: "#999999",
                }}
                onClick={deleteNoticeModal}
              >
                {linkText}
              </span>
            </div>
          </MenuItem>
        ))}
      </Menu>
      {openModal && (
        <Dialog
          open={openModal}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"><p id='header'>Delete Notice?</p></DialogTitle>
          <DialogContent>
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
              // onClick={() => {
              //   deleteNotice(noticeID);
              // }}
            >
              Delete Notice
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {loader && (
  
    <Backdrop
    sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={loader}
    onClick={handleClose}
  >
    <CircularProgress color="primary" />
    <p>Deleting...</p>
  </Backdrop>
     
      )}
      {toast && (
          <Snackbar
             open={() => setLoader(true)}
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
