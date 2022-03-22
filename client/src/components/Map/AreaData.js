import React from 'react'
import { useEffect } from 'react'

const AreaData = (props) => {
    useEffect(()=>{
        console.log(props.areaData)
    },[])
  return (
    <div>AreaData</div>
  )
}

export default AreaData