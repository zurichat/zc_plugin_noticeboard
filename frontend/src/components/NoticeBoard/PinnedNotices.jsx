import React, { useState, useEffect } from 'react'
import pin from '../../assets/pin.svg'
import './PinnedNotices.css'
import Card from './Card'
import { Button } from '@material-ui/core'

const PinnedNotices = () => {
  const [people, setPeople] = useState([])

  useEffect(() => {
    fetch(`/Data.json`)
      .then((res) => {
        return res.json() //return back a data
      })
      .then((data) => {
        const people = data.people
        console.log(people)

        setPeople(people)
      })
  }, [])
  return (
    <div>
      <div className='pinned-button-container'>
        <div className='pin-text'>
          <img src={pin} alt='pin' />
          <p className='text'>Pinned Notices</p>
        </div>
        <Button className='header-button' variant='contained'>
          View All
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
