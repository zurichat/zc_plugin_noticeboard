import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';

export default function DialogComponent({
  open,
  handleClose,
  imgIcon,
  text,
  buttonStyles,
  buttonText,
  onClick,
}) {
  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <Box p={4}>
          <Box display="flex" justifyContent="center">
            <img src={imgIcon} width="40%" alt="icon" />
          </Box>
          <Box pt={3} display="flex" justifyContent="center">
            {text}
          </Box>
          <Box pt={3} display="flex" justifyContent="center">
            <Button
              onClick={onClick}
              className={buttonStyles}
              variant="contained"
              color="secondary"
            >
              {buttonText}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
