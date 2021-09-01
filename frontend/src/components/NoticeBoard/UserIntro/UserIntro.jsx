import React from 'react'
import "./UserIntro.css"

function UserIntro() {
    return (
        <div className="notice">
          <div className="userBody">
              <div className="userBodyImg">
                <img src={require("./img/Illustration.svg").default} />
                <span>Hey your notice board is empty, all general and departmental</span>
                <span>notices would appear here when spotted.</span>
              </div>
              
          </div>
          
        </div>
    )
}

export default UserIntro
