import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./UserIntro.css";
import defaultEdit from "./default.svg";
import { IntroPMobileStyles } from "./styledComponents/IntroPMobileStyles";
import Illustration from "../../../../assets/Illustration.svg";
import { UserInfoContext } from "../../../../App";
import Subscription from '../../EmailSubscribe/Subscription'

const UserIntro = () => {
  const userData = useContext(UserInfoContext);

  return (
    <div>
      <div className="UserIntro">
        <div className="UserIntro-innerContainer">
          <div className="IntroImg">
            <img className="Img" alt="zuri" src={Illustration} />
          </div>

          <IntroPMobileStyles>
            <p className="userIntro-mainText">
              👋 Hey! You have been invited to the Notice board. No new notices,
              they will appear here as soon as they have been created.
            </p>
          </IntroPMobileStyles>
          <Link
            to={
              userData?.role === "owner"
                ? "/noticeboard/admin-notice"
                : "/noticeboard/user-notice"
            }
            style={{ textDecoration: "none" }}
          >
            <button className="view-notice-btn-userIntro" label="View Notice">
              <span className="view-notice-btn">View Notice!!</span>
              <img src={defaultEdit} alt="create notice" />
            </button>
          </Link>
        </div>
      </div>
      <Subscription />
    </div>
  );
};
export default UserIntro;
