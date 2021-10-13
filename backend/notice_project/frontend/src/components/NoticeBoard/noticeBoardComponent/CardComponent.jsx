import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { UserInfoContext } from "../../../App";

import dot from "../../../assets/Ellipse135.svg";
import see from "../../../assets/Seen.svg";
import AdminMenu from "./AdminNoticeMenu";
import BookmarkViewNoticeModal from "../BookmarkViewNoticeModal/BookmarkViewNoticeModal";
import imgPlaceholder from "../../../assets/noticePlaceholderImage.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: "50px",
  },
  box: {
    width: "250px",
    height: "auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  btnviews: {
    display: "flex",
    justifyContent: "space-between",
  },
  views: {
    display: "flex",
  },
  number: {
    marginLeft: "5px",
  },
}));

const CardComponent = ({ person, people, bookmarkID }) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false);
  const [persons, setPersons] = React.useState([person]);
  const [count, setCount] = useState("");
  const [loading, setLoading] = useState(false);

  const filterUsers = (index) => {
    const user = persons.filter((person) => person._id === index);
    setPersons(user);
    setOpenModal(true);
  };

  const deleteBookmarkID = bookmarkID?.filter(
    (bookmark) => bookmark?.notice_id === person?._id
  )[0]?._id;

  // Functinality for the number of views
  const UserData = useContext(UserInfoContext);
  const updateView = (noticeID) => {
    const apiCall = `https://noticeboard.zuri.chat/api/v1/organisation/${UserData?.org_id}/notices/${noticeID}?query=${UserData?.email}`;
    fetch(apiCall)
      .then((result) => result.json())
      .then((data) => {
        console.log("View count data", data);
      });
    console.log(UserData.org_id);
  };
  // function converting the views from strings to numbers
  const viewNumber = (count) => {
    const viewss = count.split(" ").length + 1;
    return viewss;
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // const currentMonth = months[Number(person.created.slice(5, 7)) - 1];

  return (
    <>
<<<<<<< HEAD
      <Box className={classes.box}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar
                className={classes.avatar}
                variant="square"
                src={
                  person.author_img_url !== "null"
                    ? person.author_img_url
                    : imgPlaceholder
                }
              />
=======
    <Box display='flex' justifyContent='center'pb='30px'>
        <Card className={classes.root}  >
      <CardHeader
        avatar={
          <Avatar className={classes.avatar} variant='square' src={person.author_img_url !== 'null' ? person.author_img_url : imgPlaceholder } />

        }
        action={
          <AdminMenu noticeID={person._id} />
        }
        title={person.author_name !== 'null' ? <Box fontWeight="fontWeightBold">{person.author_name}</Box> : <Box fontWeight="fontWeightBold">{person.author_username} </Box>}
        subheader={ moment(person.created).fromNow()}
      />
      <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
      {person.title.replace(/<[^>]+>/g, "")}
          </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        {person.message.replace(/<[^>]+>/g, "").substring(0, 150)}...
        </Typography>
      </CardContent>
      <Box display='flex' justifyContent='flex-end' pr='10px'>
      <CardActions disableSpacing>
            <div>
              <img src={see} alt="" />
              <p className="number"
              >{viewNumber(count)}</p>
            </div>
          <button
            className="card-button-adminNotice"
            onClick={() => {
              filterUsers(person._id);
              noticeViews(person._id);
            }}
          >
            {
              loading ? "Loading..." : "View Notice"
>>>>>>> 77a1721949de43c67f872bde6a4d164ca8be056a
            }
            // action={<AdminMenu noticeID={person._id} />}
            title={
              person.author_name !== "null" ? (
                <Box fontWeight="fontWeightBold">{person.author_name}</Box>
              ) : (
                <Box fontWeight="fontWeightBold">{person.author_username} </Box>
              )
            }
            subheader={moment(person.created).fromNow()}
            action={<div style={{ marginTop: "25px" }}></div>}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {person.title.replace(/<[^>]+>/g, "")}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {person.message.replace(/<[^>]+>/g, "").substring(0, 150)}...
            </Typography>
          </CardContent>
          <Box>
            <CardActions className={classes.btnviews}>
              <div className={classes.views}>
                <img src={see} alt="views" />
                <p className={classes.number}>{viewNumber(person.views)}</p>
              </div>
              <button
                className="card-button-adminNotice"
                onClick={() => {
                  filterUsers(person._id);
                  updateView(person._id);
                }}
              >
                View Notice
              </button>
            </CardActions>
          </Box>

          {openModal && (
            <BookmarkViewNoticeModal
              persons={persons}
              closeModal={setOpenModal}
              deleteBookmarkID={deleteBookmarkID}
            />
          )}
        </Card>
      </Box>
<<<<<<< HEAD
    </>
=======
      </>


>>>>>>> 77a1721949de43c67f872bde6a4d164ca8be056a
  );
};

export default CardComponent;
