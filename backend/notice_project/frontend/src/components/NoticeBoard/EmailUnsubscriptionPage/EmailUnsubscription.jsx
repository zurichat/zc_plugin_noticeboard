import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./EmailUnsubscription.css";
import gif from "./gif.jpg";
import zuri from "./zuri.png";

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
    console.log("yes");
    setSubscribed(false);
    // fetch("", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: id,
    // }).then((data) => setSubscribed(false));
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
            <p>You have successfully unsubscribed from our mailing list</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailUnsubscription;
