import React from 'react'
import "./AdminEntryPage.css"
import admin_entry_image from "../../../assets/entry-page-image.svg";
import hand_emoji from "../../../assets/hand-emoji.webp";
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';

function AdminEntryPage() {
    
    return (
        <>
            <div className= "intro_wrapper">
                <div className="intro_image_wrapper">
                    <img className="intro_image" src={admin_entry_image} alt="Intro Images"/>
                    <span className="image-shadow"></span>
                </div>
                
                <div className = "intro_msg_wrapper">
                    <p className="intro_msg">
                    <img className="icon" src={hand_emoji} alt="a light-skinned hand emoji"/> Hey, you have been invited to this channel to create notices for the workspace
                        and different channels and you can now pin important notices to help everyone
                    </p>
                    <Link to="/admin-notice">
                        <Button variant="contained"  className="intro_button">View Notice</Button>
                    </Link>
                </div>
            </div>
            
        </>
    )
}

export default AdminEntryPage;
