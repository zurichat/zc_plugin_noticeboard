import React from 'react'
import './NoticeBoard.css'
import NoticeBoardHeader from './NoticeBoardHeader'
import AdminNotice from '../NoticeBoard/noticeBoardComponent/AdminNotice'

function NoticeBoard() {
  return (
    <div className='notice'>
      <NoticeBoardHeader />
      <AdminNotice />
    </div>
  )
}

export default NoticeBoard
