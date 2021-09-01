import React from 'react'
import "./NoticeBoard.css"
import axios from "axios"


function NoticeBoard() {
    return (
        <div className="notice">
            {axios.get("/api/endpoints/")}
        </div>
    )
}

export default NoticeBoard
