import { Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import './UserIntro.css'

const UserIntro = () => {
  return (
    <div>
      <div className="UserIntro">
        <div className="IntroImg">
          <img className="Img" alt="zuri" src={require("../../../../assets/Illustration.svg").default} />
        </div>
        <p>👋  Hey you have been invited to the notice board, create notices for</p>
        <span>the workspace and different channels and you can pin important</span>
        <span>notices to help everyone identify them</span>
        <Link to="/admin-notice"><Button label="View Notice" className="IntroButton" variant="contained">View Notice</Button></Link>
     </div>
      
      
    </div>
  )
}

export default UserIntro
