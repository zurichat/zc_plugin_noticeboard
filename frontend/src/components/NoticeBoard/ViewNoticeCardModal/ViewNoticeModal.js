import React, { useState, useEffect } from 'react'
import ViewNoticeCards from './ViewNoticeCards'

const ViewNoticeModal = () => {
    const [datas, setData] = useState([])

  const getData = async () => {
    const res = await fetch(`/Data.json`)
    const data = await res.json()
    setData(data.user)
  }

  useEffect(() => {
    getData()
  }, [])

    return (
        <>
         {datas.map((data) => (
             <ViewNoticeCards data={data} key={data.id}/>
         ))}
        </>
    )
}

export default ViewNoticeModal

