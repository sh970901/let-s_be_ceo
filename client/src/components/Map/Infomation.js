import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import AreaData from './AreaData'
//상권분석
const Infomation = (props) => {
  const [areaData, setAreaData] = useState([])
  const [isData, setIsData] = useState(false)
  
  useEffect(()=>{
    showData()
  },[props])
  
  function showData(){
    if(props.place===""){
      setIsData(false)     
    }else{
      setIsData(true)
      fetch(`http://localhost:5000/api/building/${props.place}`)
      .then(res=>res.json())
      .then(data=>setAreaData(data))
    }
  }
  
  return (
    <div>
      <br/>
      <br/>
      <br/>
      <br/>
      <h2>상권분석</h2>
      {props.place}
      {isData ? <AreaData areaData={areaData}></AreaData>:null}
     
      
      </div>
    
  )
}

export default Infomation