import {useContext, useState} from 'react';
import { SubscribeToChannel } from '@zuri/control';
import { UserContext } from "../../Data-fetcing";
import axios from 'axios';
import { UserInfoContext } from '../../App'

// Performs subscribing to Noticeboard room on centrifugo

export const CentrifugoConnection = async() =>{ 
  const userData = useContext(UserInfoContext)
  // const _globalData = useContext(DataContext)
  const org_id = userData.Organizations[0]
  const [room_id, setRoom_id] = useState("")

    await axios
    // .get(`https://noticeboard.zuri.chat/api/v1/organisation/${org_id}/get-room`
    // )
    .get(`http://localhost:8000/api/v1/organisation/614679ee1a5607b13c00bcb7/get-room`
    )
    .then((res) => {
      let data = res.data.data[0]._id;
      return data
    }).then((data)=>{
      setRoom_id(data.toString())
    }).catch((error) => console.log(error));

    const { setPeople, setNotices } = useContext(UserContext);
    
    const date = new Date();
    const currentDate = date.getDate();

    let prevDate = null;
    if (currentDate > 1) {
      prevDate = currentDate - 1;
    } else {
      prevDate = 1;
    }

    const callback = (ctx) => {
      const message = ctx.data.data;
      setPeople(
        message
          .reverse()
          .filter(
            (notice) => currentDate == notice.created.slice(8, 10)
          )
      );
      setNotices(
        message
          .reverse()
          .filter(
            (notice) => prevDate >= notice.created.slice(8, 10)
          )
      );
      console.log(ctx)
    }
    SubscribeToChannel(room_id, callback ); 
}