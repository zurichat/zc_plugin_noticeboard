import React, { useState, useEffect } from 'react'
import pin from '../../assets/pin.svg'
import './PinnedNotices.css'
import Card from './Card'
import { Button } from '@material-ui/core'

const PinnedNotices = () => {
  const [people, setPeople] = useState([])
  const [loading, isLoading] = useState(true)

  //   const getData = async () => {
  //     const response = await fetch(`/Data.json`)
  //     const data = await response.json()
  //     console.log(data);
  //     setPeople(data)
  //   }

  useEffect(() => {
    fetch(`/Data.json`)
      .then((res) => {
        return res.json() //return back a data
      })
      .then((data) => {
        const people = data.user
        console.log(people)
        setPeople(people)
        isLoading(false)
      })
    // getData()
  }, [])

  if (loading) {
    return (
      <div className='preloader'>
        <h1 className='isLoading'>Loading...</h1>
        <i class='fas fa-spinner fa-spin'></i>
      </div>
    )
  }

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
