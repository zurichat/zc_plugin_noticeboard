import React, { useState, useEffect } from 'react'
import notice from '../../../assets/createNotice.svg'
import '../noticeBoardComponent/AdminNotice.css'
import Card from '../noticeBoardComponent/Card'
import { Button } from '@material-ui/core'
import data from './Data'
import logo from "../../../assets/svg/logo.svg"
import { withRouter } from 'react-router-dom'
// import axios from 'axios'

const PinnedNotices = props => {
  const [people, setPeople] = useState([])
  const [loading, isLoading] = useState(true)

  useEffect(() => {
    setPeople(data)
    isLoading(false)
  }, [])

  if (loading) {
    return (
      <div className='preloader'>
        <img className="logo" src={logo} alt="logo" />
        <h1 className='isLoading'>Loading...</h1>
        <i className='fas fa-spinner fa-spin'></i>
      </div>
    )
  }

  return (
    <div>
      
      <div className='pinned-button-container'>
        <div className='pin-text'>
          <p className='text'>Notices</p>
          
        </div>
        <Button className='header-button' 
          onClick={() => props.history.push('/create-notice')} variant='contained'>
          Create Notice <img src={notice} alt='create notice' />
        </Button>
      </div>
      {/* the is the beginning of the section where the card for each notice starts from */}
      <section>
        {people.map((person) => {
          return <Card person={person} key={person.id} />
        })}
      </section>
    </div>
  )
}

export default withRouter(PinnedNotices)

// !for some strange reason, the "userImage" path in the json data is not connecting
