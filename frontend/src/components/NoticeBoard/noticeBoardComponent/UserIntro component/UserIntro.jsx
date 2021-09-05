import { Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import './UserIntro.css'
import { Link } from 'react-router-dom'
import defaultEdit from './default.svg'

const UserIntro = () => {
  return (
    <div>
      <div className="UserIntro">
        <div className="IntroImg">
          <img className="Img" alt="zuri" src={require("../../../../assets/Illustration.svg").default} />
        </div>
        <div className='UserIntroPdesktop'>
          <p>👋  Hey you have been invited to the notice board, create notices for</p>
          <span>the workspace and different channels and you can pin important</span>
          <span>notices to help everyone identify them.</span>
        </div>
        <div className='UserIntroPmobile'>
          <p>👋  Hey you have been invited to the notice<br/>board, create notices for
          the workspace and different<br/>channels and you can pin important notices to help<br/>everyone identify them.</p>
        </div>
        <Link to="/admin-notice"><Button label="View Notice" className="IntroButton" variant="contained">View Notice <img src={defaultEdit} alt='create notice' /></Button></Link>
     </div>
    </div>
  )
}

export default UserIntro
