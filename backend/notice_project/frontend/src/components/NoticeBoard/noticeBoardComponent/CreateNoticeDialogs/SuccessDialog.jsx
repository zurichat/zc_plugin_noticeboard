import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import DialogComponent from './DialogComponent'
import SuccessIcon from './assets/success.svg'

const useStyles = makeStyles({
  button: {
    backgroundColor: '#00B87C',
    color: 'white',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#00B87C'
    }
  }
})

export default function SuccessDialog ({ open, handleClose }) {
  const classes = useStyles()
  const { push } = useHistory()

  const handleOnClick = () => {
    push('/noticeboard/admin-notice')
  }

  return (
    <div>
      <DialogComponent
        onClick={handleOnClick}
        open={open}
        handleClose={handleClose}
        imgIcon={SuccessIcon}
        text='Notice Created'
        buttonStyles={classes.button}
        buttonText='Go to notices'
      />
    </div>
  )
}
