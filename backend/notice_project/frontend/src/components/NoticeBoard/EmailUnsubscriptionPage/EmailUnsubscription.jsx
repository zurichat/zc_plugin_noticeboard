import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./EmailUnsubscription.css";
import gif from "./gif.jpg";
import zuri from "./zuri.png";
import envelope from "./envelope.svg";
import axios from "axios";

const EmailUnsubscription = () => {
  const [subscribed, setSubscribed] = useState(true);
  const [alreadyUnsubscribed, setAlreadyUnsubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const { userId, orgId } = useParams();
  const history = useHistory();

  const handleNo = () => {
    history.push("/");
  };

  const handleYes = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .get(`https://api.zuri.chat/organizations/${orgId}/members`)
      .then((res) => {
        const result = res.data.data.filter((data) => data._id === userId)[0];
        if (Boolean(result)) {
          if (result.length !== 0) {
            axios
              .get(
                `https://noticeboard.zuri.chat/api/v1/unsubscribe?org=${orgId}`
              )
              .then((res) => {
                const check = res.data.data.filter(
                  (data) => data.user_id === userId
                );
                if (check.length === 0) {
                  axios
                    .post(
                      `https://noticeboard.zuri.chat/api/v1/unsubscribe?org=${orgId}`,
                      {
                        email: result.email,
                        user_id: result._id,
                      }
                    )
                    .then((res) => {
                      if (
                        res.data.Message ===
                        "You have successfully Unsubscribed"
                      ) {
                        setLoading(true);
                        setSubscribed(false);
                        setMessage(
                          "You have successfully unsubcribed from our mailing list"
                        );
                      } else {
                        setLoading(true);
                        setSubscribed(false);
                        setMessage(res.data.message);
                      }
                    })
                    .catch((err) => console.log(err));
                } else {
                  setAlreadyUnsubscribed(true);
                  setSubscribed(false);
                  setMessage("You have already unsubscribed before");
                }
              })
              .catch((err) => {
                setSubscribed(false);
                setMessage(err.message);
              });
          }
        } else {
          setSubscribed(false);
          setMessage("You're not a member of this organization");
        }
      })
      .catch((err) => {
        setSubscribed(false);
        setMessage(err.message);
        console.log(err);
      });
  };
  return (
    <div className="unsubscribe">
      <div className="container">
        {subscribed && !alreadyUnsubscribed ? (
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

            {loading && (
              <button disabled style={{ cursor: "not-allowed" }}>
                Unsubscribing...
              </button>
            )}
            {!loading && (
              <div className="btn">
                <button onClick={handleNo}>No</button>
                <button onClick={handleYes}>Yes</button>
              </div>
            )}
          </div>
        ) : (
          <div className="unsubscribed">
            <div style={{ margin: "auto 0" }}>
              <div style={{ marginBottom: "40px" }}>
                <img src={zuri} alt="zuri_logo" height="30px" width="auto" />
              </div>
              <div style={{ marginBottom: "40px" }}>
                <img src={envelope} className="envelope" alt="envelope" />
                <p>{message}</p>
              </div>

              <button onClick={handleNo}>Back</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailUnsubscription;
