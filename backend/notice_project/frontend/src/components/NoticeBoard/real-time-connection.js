import {useContext} from 'react';
import { SubscribeToChannel } from '@zuri/control';
import { UserContext } from "../../Data-fetcing";

export const CentrifugoConnection = () =>{ 
    const { setPeople } = useContext(UserContext);
    const today = new Date();
    const date = today.getDate(); 
  
    const callback = (ctx) => {
      const message = ctx.data.data;
      setPeople(
        message
          .reverse()
          .filter(
            (notice) => notice.created.substring(8, 10) === date.toString()
          )
      );
      console.log(ctx)
    }
    SubscribeToChannel("noticeboard-team-aquinas-stage-10", callback ); 
}