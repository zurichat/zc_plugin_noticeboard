import React from 'react'
import "./NoticeBoard.css"
import axios from "axios"


function NoticeBoard() {
    return (
        <div className="notice">
            <h3>Endpoints</h3>
            {axios.get("/api/endpoints/")}
        </div>
    )
}

export default NoticeBoard
