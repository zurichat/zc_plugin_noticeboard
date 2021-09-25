import React from "react";
import { Link } from "react-router-dom";
import "./UserIntro.css";
import defaultEdit from "./default.svg";
import { IntroButtonStyles } from "./styledComponents/IntroButtonStyles";
import { IntroPMobileStyles } from "./styledComponents/IntroPMobileStyles";
import Illustration from "../../../../assets/Illustration.svg";

const UserIntro = () => {
  return (
    <div>
      <div className="UserIntro">
        <div className="UserIntro-innerContainer">
          <div className="IntroImg">
            <img className="Img" alt="zuri" src={Illustration} />
          </div>

          <IntroPMobileStyles>
            <p className="userIntro-mainText">
              👋 Hey! You have been invited to the Notice board, Create notices
              for the workspace and different channels and you can pin important
              notices to help everyone identify them.
            </p>
          </IntroPMobileStyles>
          <Link to="/noticeboard/admin-notice">
            <button className='view-notice-btn-userIntro' label="View Notice">
              <span className="view-notice-btn">View Notice</span>
              <img src={defaultEdit} alt="create notice" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default UserIntro;
