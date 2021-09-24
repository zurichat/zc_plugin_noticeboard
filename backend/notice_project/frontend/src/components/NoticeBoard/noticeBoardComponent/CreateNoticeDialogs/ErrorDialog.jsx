import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import DialogComponent from './DialogComponent'
import ErrorIcon from './assets/error.svg'

const useStyles = makeStyles({
  button: {
    backgroundColor: '#EB5757',
    color: 'white',
    textTransform: 'none'
  }
})

export default function ErrorDialog ({ open, handleClose }) {
  const classes = useStyles()

  return (
    <div>
      <DialogComponent
        open={open}
        onClick={handleClose}
        handleClose={handleClose}
        imgIcon={ErrorIcon}
        text='Error creating notice'
        buttonStyles={classes.button}
        buttonText='Try again'
      />
    </div>
  )
}
