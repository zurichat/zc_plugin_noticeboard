import React, { useState, useEffect } from "react";
import notice from "../../../assets/createNotice.svg";
import "../noticeBoardComponent/AdminNotice.css";
import Card from "../noticeBoardComponent/Card";
import { Button } from "@material-ui/core";
// import data from './Data'
import logo from "../../../assets/svg/logo.svg";
import { withRouter, Link } from "react-router-dom";
// import axios from 'axios'

const PinnedNotices = (props) => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setInterval(() => {
      fetch("https://noticeboard.zuri.chat/api/v1/notices")
        .then((res) => {
          if (res.status >= 200 && res.status <= 299) {
            return res.json();
          } else {
            setLoading(false);
            setIsError(true);
          }
        })
        .then((data) => {
          setPeople(data.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }, 5000);
  }, []);

  if (loading) {
    return (
      <div className="preloader">
        <img className="logo" src={logo} alt="logo" />
        <h1 className="isLoading">Loading...</h1>
        <i className="fas fa-spinner fa-spin"></i>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="preloader">
        <img className="logo" src={logo} alt="logo" />
        <h1
          className="isError"
          style={{ color: "red", fontSize: "1.5rem", marginTop: "100px" }}
        >
          Error. Try refreshing your browser
        </h1>
        <i className="fas fa-spinner fa-spin"></i>
      </div>
    );
  }

  return (
    <div className="adminnotice">
      <div className="pinned-button-container">
        <div className="pin-text">
          <p className="text">Notices</p>
        </div>
        <Button
          className="header-button"
          onClick={() => props.history.push("/noticeboard/create-notice")}
          variant="contained"
          disableRipple
        >
          Create Notice <img src={notice} alt="create notice" />
        </Button>
      </div>
      {/* the is the beginning of the section where the card for each notice starts from */}
      <section>
        {people.map((person) => {
          return <Card person={person} key={person._id} />;
        })}
      </section>
      <Link to="/noticeboard/old-notices">
        <div className="older-notices">
          <p>View older notices</p>
        </div>
      </Link>
    </div>
  );
};

export default withRouter(PinnedNotices);

// !for some strange reason, the "userImage" path in the json data is not connecting
