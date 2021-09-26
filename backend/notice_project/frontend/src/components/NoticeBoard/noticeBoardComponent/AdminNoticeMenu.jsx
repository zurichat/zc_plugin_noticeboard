import React, { useEffect, useState, useContext } from "react";
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
import { useHistory } from "react-router";
import { DataContext } from "../../../App";
import { UserContext } from "../../../Data-fetcing";


function AdminMenu({ noticeID }) {
  const menu = [
    { icon: EditIcon, linkText: "Edit notice" },
    { icon: DeleteIcon, linkText: "Delete notice" },
  ];

  const [openModal, setOpenModal] = React.useState(false);
  const [noticeList  , setNoticeList ] = useState([]);
  const history = useHistory();

  const handleOpen = () => {
    setOpenModal(true);
  };

  const _globalData = useContext(DataContext);
  const {selectedNotice, setSelectedNotice} = useContext(UserContext)
  const org_id = _globalData.Organizations[0];

  const handleClose = () => {
    setOpenModal(false);
  };

  console.log(org_id, "here")
  const api = axios.create({
    baseURL: `https://noticeboard.zuri.chat`,
    headers: {
      "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept',
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json'
    },
  });
  


  // async function getAllNotices() {
  //   try {
  //     let response = await api.get(`/api/v1/organisation​/614679ee1a5607b13c00bcb7/notices`);
  //     console.log(response, "herew")
  //     let result = await response.data;
  //     setNoticeList(result.data);
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // }
  const fetching = () => {
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
        console.log(data)
      })
      .catch((error) => console.log(error));
  };

  const editNotice = (noticeID) => {
    
    const currentNoticeID = noticeList?.find(element => {
      return element._id == noticeID;
    })
    console.log(currentNoticeID, "here")
    setSelectedNotice(currentNoticeID)
    history.push(`/noticeboard/edit-notice/${currentNoticeID._id}`);
  }

  const handleMenuButton = (e) => {
    const target = e.target;
    if (target.innerHTML === "Delete notice") {
      handleOpen();
    }
    else {
      editNotice(noticeID);
    }
  };

  useEffect(() => {
    fetching();

  }, [noticeID])
  useEffect(() => {
    fetching();

  }, [])

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
      .delete(`https://noticeboard.zuri.chat/api/v1/organisation/614679ee1a5607b13c00bcb7/notices/${noticeId}/delete`)
      .then(
        (response) => {
          console.log(response);
          console.log(noticeId)
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
                onClick={handleMenuButton}
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
              onClick={() => {
                deleteNotice(noticeID);
              }}
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
