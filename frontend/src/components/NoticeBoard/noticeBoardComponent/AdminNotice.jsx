import React, { useState, useEffect } from 'react'
import notice from '../../../assets/createNotice.svg'
import '../noticeBoardComponent/AdminNotice.css'
import Card from '../noticeBoardComponent/Card'
import { Button } from '@material-ui/core'
import data from './Data'
// import axios from 'axios'

const PinnedNotices = () => {
  const [people, setPeople] = useState([])
  const [loading, isLoading] = useState(true)

  useEffect(() => {
    setPeople(data)
    isLoading(false)
  }, [])

  if (loading) {
    return (
      <div className='preloader'>
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
        <Button className='header-button' variant='contained'>
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

export default PinnedNotices

// !for some strange reason, the "userImage" path in the json data is not connecting
