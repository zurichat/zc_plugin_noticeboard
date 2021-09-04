import React from 'react';
import "./NoticeBoard.css";
import axios from "axios";


function NoticeBoard() {
    const [endpoint, setEndpoint] = React.useState(null);

    React.useEffect(() => {
        axios.get('/api/endpoints').then((response) => {
            setEndpoint(response.data);
        });
    }, []);

    if (!endpoint) return null;
    const endpoints = Object.keys(endpoint).map((item)=>endpoint[item])
    
    return (
        <div className="notice">
            <h3>Endpoints From Backend</h3>

            {endpoints.map((item, i)=>{
                return <li key={i}>{item}</li>
            })}
        </div>
    )
}

export default NoticeBoard
