import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./EmailUnsubscription.css";
import gif from "./gif.jpg";
import zuri from "./zuri.png";
import envelope from "./envelope.svg";
import axios from "axios";

const EmailUnsubscription = () => {
  const [subscribed, setSubscribed] = useState(true);
  const [result, setResult] = useState();
  const { userId, orgId } = useParams();
  const history = useHistory();
  const handleNo = () => {
    history.go(-1);
  };

  // const userId = "614dec17f31a74e068e4d0f4";
  // const orgId = "614dec17f31a74e068e4d0f3";

  const handleYes = (e) => {
    e.preventDefault();
    axios
      .get(`https://api.zuri.chat/organizations/${orgId}/members`)
      .then((res) => {
        const result = res.data.data.filter((data) => data._id === userId)[0];

        return axios
          .post(
            `https://noticeboard.zuri.chat/api/v1/unsubscribe?org=${orgId}`,
            {
              email: result.email,
              user_id: result._id,
            }
          )
          .then((res) => {
            console.log(res.data.status);
            if (res.data.status) {
              setSubscribed(false);
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="unsubscribe">
      <div className="container">
        {subscribed ? (
          <div className="content">
            <div className="header">
              <img src={zuri} alt="zuri_logo" height="30px" width="auto" />
            </div>

            <div>
              <p className="big">Unsubscribe from Notice Board Emails</p>
              <p>We are sorry to see you go!</p>
            </div>

            <div>
              <img src={gif} height="250px" width="250px" />
            </div>

            <div>
              <p>
                Are you sure you want to unsubscribe from Zuri notice board new
                notice emails?
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
