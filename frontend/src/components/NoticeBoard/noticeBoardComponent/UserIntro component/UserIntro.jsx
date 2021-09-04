import React from 'react'
import './UserIntro.css'

const UserIntro = () => {
  return (
    <div>
      <div className="UserIntro">
        <div className="IntroImg">
          <img src={require("../../../../assets/Illustration.svg").default} />
        </div>
        <p>Hey your notice board is empty. notices would</p>
        <span>appear here when published.</span>
      </div>
      
    </div>
  )
}

export default UserIntro
