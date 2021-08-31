import React from 'react'
import './NoticeBoard.css'
// this import is for the button and the pinned notification
import PinnedNotices from './PinnedNotices'

function NoticeBoard() {
  return (
    <div className='notice'>
      <PinnedNotices />
    </div>
  )
}

export default NoticeBoard
