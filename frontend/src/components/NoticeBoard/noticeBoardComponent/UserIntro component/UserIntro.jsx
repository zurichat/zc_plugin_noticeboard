import { Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import './UserIntro.css'
import defaultEdit from './default.svg'
import { IntroButtonStyles } from './styledComponents/IntroButtonStyles'
import { IntroPMobileStyles } from './styledComponents/IntroPMobileStyles'

 
const UserIntro = () => {
  return (
    <div>
      <div className="UserIntro">
        <div className="IntroImg">
          <img className="Img" alt="zuri" src={require("../../../../assets/Illustration.svg").default} />
        </div>
        
        <IntroPMobileStyles>
         <p>👋  Hey you have been invited to the notice<br/>board, create notices for
         the workspace and different<br/>channels and you can pin important notices to help<br/>everyone identify them.</p>
        </IntroPMobileStyles>
        <Link to="/admin-notice">
          <IntroButtonStyles label="View Notice" variant="contained">
            <span>View Notice</span>
            <img src={defaultEdit} alt='create notice' />
          </IntroButtonStyles>
        </Link>
     </div>
    </div>
  )
}
export default UserIntro
