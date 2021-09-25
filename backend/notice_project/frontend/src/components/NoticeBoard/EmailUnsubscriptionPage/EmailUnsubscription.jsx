import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./EmailUnsubscription.css";
import gif from "./gif.jpg";
import zuri from "./zuri.png";
import envelope from "./envelope.svg";
import axios from "axios";

const EmailUnsubscription = () => {
  const [subscribed, setSubscribed] = useState(true);
  const { id } = useParams();
  const history = useHistory();
  const handleNo = () => {
    history.go(-1);
    console.log("no", id);
  };

  const handleYes = (e) => {
    e.preventDefault();
    const data = {
      email: "franklin@gmail.com",
      user_id: id,
    };
    axios
      .post(`https://noticeboard.zuri.chat/api/v1/unsubscribe?org=${id}`, data)
      .then((response) => {
        console.log("yes", response);
        setSubscribed(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="unsubscribe">
      <div className="container">
        {subscribed ? (
          <div className="content">
            <div className="header">
              <h1>Notice Board Plugin</h1>
              <div>
                <img src={zuri} alt="" height="30px" width="auto" />
              </div>
            </div>

            <div>
              <p className="big">Unsubscribe</p>
              <p>We are sorry to see you go!</p>
            </div>

            <div>
              <img src={gif} height="250px" width="250px" />
            </div>

            <div>
              <p>
                Are you sure you want to unsubscribe from all zuri notice board
                emails?
              </p>
            </div>

            <div className="btn">
              <button onClick={handleNo}>No</button>
              <button onClick={handleYes}>Yes</button>
            </div>
          </div>
        ) : (
          <div className="unsubscribed">
            <div style={{ margin: "auto 0" }}>
              <img src={envelope} alt="envelope" height="100px" width="100px" />
              <p>You have successfully unsubscribed from our mailing list</p>
              <button onClick={handleNo}>Back</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailUnsubscription;
