import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import bookmarkIcon from './assets/bookmarkIcon.svg'
import remindIcon from './assets/remindIcon.svg'
import copyLinkIcon from './assets/copyLinkIcon.svg'
import moreMessagesIcon from './assets/moreMessagesIcon.svg'

const useStyles = makeStyles({
  listItemText: {
    fontSize: '16px',
    color: '#999999',
    weight: 400
  }
})

const menuContent = [
  {
    img: bookmarkIcon,
    text: 'Bookmark'
  },
  { img: remindIcon, text: 'Remind me about this' },
  { img: copyLinkIcon, text: 'Copy link' },
  { img: moreMessagesIcon, text: 'More messages shortcut...' }
]

export default function UserMenu () {
  const classes = useStyles()
  const [openMenu, setOpenMenu] = useState(null)

  const handleOpen = event => {
    setOpenMenu(event.currentTarget)
  }

  const handleClose = () => {
    setOpenMenu(null)
  }

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <MoreVertRoundedIcon style={{ color: '#00bb7c' }} />
      </IconButton>
      <Menu
        anchorEl={openMenu}
        keepMounted
        open={openMenu}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {menuContent.map(({ img, text }) => (
          <MenuItem key={text} onClick={handleClose}>
            <ListItemIcon>
              <img width='50%' height='100%' src={img} alt={text} />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary={text}
            />
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
