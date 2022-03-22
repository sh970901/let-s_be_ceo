import React from 'react'
import { useEffect } from 'react'
//상권분석
const Infomation = (props) => {
  
  useEffect(()=>{
    showData()
  },[props])

  function showData(){
    if(props.place===""){
      
    }else{
      console.log("카카오맵 클릭")
      fetch("http://localhost:5000/api/building?no=1")
      .then(res=>res.json())
      .then(data=>console.log(data))
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
      
      </div>
    
  )
}

export default Infomation