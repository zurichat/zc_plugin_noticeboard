import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import UserMenu from '../UserMenu/UserMenu'
import avatar from './assets/avatar.svg'
import seenIcon from './assets/seenIcon.svg'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '400px'
  }
}))

const NoticeCard = () => {
  const classes = useStyles()

  return (
    <Box p={4}>
      <Grid container spacing={2}>
        {[0, 1, 2, 4, 5].map(value => (
          <Grid item xs={12} md={6} lg={4}>
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <img
                    src={avatar}
                    width='100%'
                    height='100%'
                    alt='profile-img'
                  />
                }
                action={<UserMenu />}
                title={
                  <Box fontSize='14px' fontWeight='fontWeightHeavy'>
                    Tiwa Suleiman
                  </Box>
                }
                subheader='24 days ago • 3 days ago'
              />
              <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  odio malesuada consequat, donec consectetur egestas arcu,
                  ligula.Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit.
                </Typography>
              </CardContent>
              <CardActions>
                <Box display='flex' flexDirection='column'>
                  <IconButton>
                    <img
                      src={seenIcon}
                      width='100%'
                      height='100%'
                      alt='seenIcon'
                    />
                  </IconButton>
                  <Box display='flex' justifyContent='center'>
                    380
                  </Box>
                </Box>
                <Button
                  style={{
                    textTransform: 'none',
                    marginLeft: 'auto',
                    color: '#00BB7C',
                    borderColor: '#00BB7C'
                  }}
                  variant='outlined'
                  size='large'
                >
                  View Notice
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default NoticeCard
