import {useContext, useState} from 'react';
import { SubscribeToChannel } from '@zuri/control';
import { UserContext } from "../../Data-fetcing";

// Performs subscribing to Noticeboard room on centrifugo

export const CentrifugoConnection = async() =>{

    const { setPeople, setNotices, setOldnotices } = useContext(UserContext);

    const date = new Date();
    const currentDate = date.getDate();

    let prevDate = null;
    if (currentDate > 1) {
      prevDate = currentDate - 1;
    } else {
      prevDate = 1;
    }

    SubscribeToChannel("team-aquinas-zuri-challenge-007", (ctx) => {
      const message = ctx.data.data;
      console.log(ctx);
      console.log(message);

      setPeople(
        message
          .reverse()
          .filter(
            (notice) => currentDate == notice.created.slice(8, 10)
          )
      )

      setOldnotices(
        message
          .reverse()
          .filter(
            (notice) => prevDate >= notice.created.slice(8, 10)
          )
      )

      setNotices(
        message
        .slice(firstPageIndex, lastPageIndex)
          // .reverse()
          // .filter(
          //   (notice) => prevDate >= notice.created.slice(8, 10)
          // )
      )
      }
       );
}
