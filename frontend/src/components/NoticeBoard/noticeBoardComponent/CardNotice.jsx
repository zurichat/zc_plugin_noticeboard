import React from 'react'
import viewIcon from '../../../assets/Seen.svg'
import Button from '@material-ui/core/Button'
import UserMenu from './UserMenu/UserMenu'

const CardNotice = ({ user }) => {
  return (
    <div className='user-notice-card'>
      <div className='card-top'>
        <div className='avatar-grp'>
          <div className='avatar'>
            <img src={user.image} alt='user avatar' />
          </div>

          <div className='avatar-info'>
            <div className='avatar-name'>{user.username}</div>

            <div className='time-stamp'>
              <span className='stamp-day'>{user.date}</span>
              <span className='stamp-hour'>{user.timestamp}</span>
            </div>
          </div>
        </div>

        <div className='info-icon'>
          <UserMenu />
        </div>
      </div>

      <div className='card-body'>
        <div className='notice-title'>{user.title}</div>

        <div className='notice-message'>{user.info.substring(0, 120)}...</div>
      </div>

      <div className='card-buttons-grp'>
        <div className='view-icon-grp'>
          <div>
            <img src={viewIcon} alt='' />
          </div>

          <div className='views-num'>{user.views}</div>
        </div>

        <div>
          <Button className='view-btn' variant='outlined'>
            View notice
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CardNotice
