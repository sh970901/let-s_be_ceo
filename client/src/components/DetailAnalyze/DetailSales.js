import React from 'react'

const DetailSales = (props) => {
  
  function analyze() {
      fetch(`http://localhost:5000/api2/detailSales/${props.place}and service=${props.category}`)
      .then(res=>res.json())
      .then(data=>console.log(data))
    var arr1=[]
  
  }
  return (
    <div>
      <br />
      <button onClick={analyze}>분석하기</button><br /><br />
      업종의 평균 매출

    </div>
  )
}

export default DetailSales