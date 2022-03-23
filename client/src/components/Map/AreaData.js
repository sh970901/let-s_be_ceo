import React from 'react'
import { useEffect } from 'react'

const AreaData = (props) => {
    useEffect(()=>{
        
    },[])


    function showData(){
      console.log(props.areaData)
    }

  return (
    <div>
      AreaData
      <button onClick={showData}>정보보기</button>
    </div>
  )
}

export default AreaData