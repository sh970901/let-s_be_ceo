import React from 'react'

const DetailPeople = (props) => {
  function analyze(){
    console.log(props)
    
  }
  return (
    <div>
      <br />
      <button onClick={analyze}>분석하기</button><br /><br />
      DetailPeople
    </div>
  )
}

export default DetailPeople