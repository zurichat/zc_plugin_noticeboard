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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'



function AdminMenu() {
  const menu = [
    { icon: BookmarkIcon, linkText: "Bookmark" },
    { icon: EditIcon, linkText: "Edit notice" },
    { icon: ReminderIcon, linkText: "Remind me about this" },
    { icon: CopyLinkIcon, linkText: "Copy link" },
    { icon: DeleteIcon, linkText: "Delete notice" },
    { icon: MoreMessage, linkText: "More message shortcuts..." },
  ];

  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen =() =>{
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false);
  };

  const deleteNoticeModal =(e) =>{
    const target = e.target.innerHTML
    console.log(target)
  // dont change the logical operator to '==' or '='. it will mess the code up. leave it as ===
    if(target === 'Delete notice' ){
        handleOpen()
    }
  }


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
        <DialogTitle id="alert-dialog-title">{"Delete Notice?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete notice, this action cannot be undone once you delete it.
            Kindly proceed while you click on the delete button
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
           onClick={handleClose}
           color="primary"
           style={{textTransform:'none', padding:'1em 3em', backgroundColor:'#FCF8F7', color:'black'}}
            >
           Cancel
          </Button>
          <Button
           
            color="primary"
            variant='filled' 
             autoFocus
             style={{textTransform:'none', padding:'1em 1em', backgroundColor:'red', color:'white'}}
             >
            Delete Notice
          </Button>
        </DialogActions>
      </Dialog>
      )}
    </div>
  );
}
export default AdminMenu;
