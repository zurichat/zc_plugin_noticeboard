import React, {useState, useEffect} from "react";
import moment from 'moment'
import axios from "axios";
import { UserProvider } from "./Data-fetcing";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';



import dot from "../../../assets/Ellipse135.svg";
import see from "../../../assets/Seen.svg";
import AdminMenu from "./AdminNoticeMenu";
import ViewNoticeModal from "../ViewNoticeCardModal/ViewNoticeModal";
import imgPlaceholder from '../../../assets/noticePlaceholderImage.svg'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '500px',
    padding:'10px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));


const CardComponent = ({ person, people }) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false);
  const [persons, setPersons] = React.useState([person]);
  const [count, setCount] = useState("");
  const [loading, setLoading] = useState(false);

  const filterUsers = (index) => {
    const user = persons.filter((person) => person._id === index);
    setPersons(user);
    setOpenModal(true);
  };

  const noticeViews = (noticeID) => {
    setLoading(true);
    axios
    .get(
      `https://noticeboard.zuri.chat/api/v1/organisation/614679ee1a5607b13c00bcb7/notices/${noticeID}`
    ).then(
      (response) => {
        console.log(response);
        setLoading(false);
      }
    ).catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  useEffect(() => {
      const apiCall = `https://noticeboard.zuri.chat/api/v1/organisation/614679ee1a5607b13c00bcb7/notices/?query=${user.email}`;
      fetch(apiCall)
      .then((result) => result.json())
      .then((data) => {
        setCount(data.views)
      })
    }, []);

    const viewNumber = () => {
    const viewss = count.split(" ").length + 1;
    return viewss
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentMonth = months[Number(person.created.slice(5, 7)) - 1];

  return (
    <>
    <article className="card-adminNotice">
        <Card className={classes.root}  >
      <CardHeader
        avatar={
          <Avatar className={classes.avatar} variant='square' src={person.author_img_url !== 'null' ? person.author_img_url : imgPlaceholder } />
           
        }
        action={
          <AdminMenu noticeID={person._id} />
        }
        title={person.author_name !== 'null' ? <Box fontWeight="fontWeightBold">{person.author_name}</Box> : <Box fontWeight="fontWeightBold">{person.author_username} </Box>}
        subheader={ moment(person.created).fromNow()}
      />
      <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
      {person.title.replace(/<[^>]+>/g, "")}
          </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        {person.message.replace(/<[^>]+>/g, "").substring(0, 150)}...
        </Typography>
      </CardContent>
      <Box display='flex' justifyContent='flex-end' pr='10px'>
      <CardActions disableSpacing>
            <div>
              <img src={see} alt="" />
              <p className="number"
              >{viewNumber(count)}</p>
            </div>
          <button
            className="card-button-adminNotice"
            onClick={() => {
              filterUsers(person._id);
              noticeViews(person._id);
            }}
          >
            {
              loading ? "Loading..." : "View Notice"
            }
          </button>
      </CardActions>
      </Box>
      {openModal && (
        <ViewNoticeModal persons={persons} closeModal={setOpenModal} />
      )}
    </Card>
      </article>
      </>
     
    
  );
};

export default CardComponent;
