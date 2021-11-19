/* eslint-disable linebreak-style */
import { useContext } from 'react';
// eslint-disable-next-line import/no-unresolved
import { SubscribeToChannel } from '@zuri/utilities';
import { UserContext } from '../Context/Data-fetcing';

// Performs subscribing to Noticeboard room on centrifugo

const CentrifugoConnection = async () => {
  const { setPeople, setNotices, setOldnotices } = useContext(UserContext);

  const date = new Date();
  const currentDate = date.getDate();

  let prevDate = null;
  if (currentDate > 1) {
    prevDate = currentDate - 1;
  } else {
    prevDate = 1;
  }

  SubscribeToChannel('team-aquinas-zuri-challenge-007', (ctx) => {
    const message = ctx.data.data;

    if (message === null) {
      setPeople([]);
    } else {
      setPeople(
        message
          .reverse()
          .filter((notice) => currentDate === notice.created.slice(8, 10)),
      );
    }

    if (message === null) {
      setOldnotices([]);
    } else {
      setOldnotices(
        message
          .reverse()
          .filter((notice) => prevDate >= notice.created.slice(8, 10)),
      );
    }

    setNotices(
      message,
      // .reverse()
      // .filter(
      //   (notice) => prevDate >= notice.created.slice(8, 10)
      // )
    );
  });
};
export default CentrifugoConnection;
