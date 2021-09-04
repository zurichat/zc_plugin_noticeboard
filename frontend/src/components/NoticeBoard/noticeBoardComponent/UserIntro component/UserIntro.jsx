import React from 'react'
import './UserIntro.css'

const UserIntro = () => {
  return (
    <div>
      <div className="UserIntro">
        <div className="IntroImg">
          <img src={require("../../../../assets/Illustration.svg").default} />
        </div>
        <p>Hey your notice board is empty. notices would <br /> appear here when published.</p>
      </div>
      
    </div>
  )
}

export default UserIntro
