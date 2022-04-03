import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import DetailLoate from './DetailLoate';
import DetailPeople from './DetailPeople';
import DetailSales from './DetailSales';


const DetailAnalyze = () => {
  const location = useLocation();
  const place = location.state.place

  const [deLocate, setDeLocate] = useState()  //상세지역 테이블 정보 담음
  const [dePeople, setDePeple] = useState()  //상세인구 테이블 정보 담음
  const [deSales, setDeSales] = useState() //상세매출 테이블 정보 담음




  const [category, setCategory] = useState()

  const [dish, setDish] = useState() //상세 지역에 요식업 정보담음 

  function showData(e) {
    setCategory(e.target.value)
    fetch(`http://localhost:5000/api2/detailSales/${place}/${category}`)
      .then(res => res.json())
      .then(data => setDeSales(data))

  }

  useEffect(() => {
    fetch(`http://localhost:5000/api/detailLocate/${place}`)
      .then(res => res.json())
      .then(data => setDeLocate(data))
  }, [])

  useEffect(() => {
    fetch(`http://localhost:5000/api/${place}`)
      .then(res => res.json())
      .then(data => setDish(data))
  }, [])
  useEffect(() => {
    fetch(`http://localhost:5000/api/detailPeople/${place}`)
      .then(res => res.json())
      .then(data => setDePeple(data))
  }, [])
  // useEffect(()=>{
  //   fetch(`http://localhost:5000/api/detailSales/${place}`)
  //   .then(res=>res.json())
  //   .then(data=>setDeSales(data))
  // },[])






  return (
    <>
      <h1>{place}</h1> <br />
      업종을 선택해주세요: {'   '}
      <select onChange={showData}>
        <option>업종 선택</option>
        <option>분식전문점</option>
        <option>양식음식점</option>
        <option>일식음식점</option>
        <option>중식음식점</option>
        <option>치킨전문점</option>
        <option>패스트푸드점</option>
        <option>한식음식점</option>
        <option>호프-간이주점</option>
      </select><br />
      <tr>
        <td className='s1'>
          상세지역<br />
          <DetailLoate dish={dish} place={place} category={category} deLocate={deLocate}></DetailLoate>{'  '}
        </td>
        <td className='s2'>

          상세인구<br />
          <DetailPeople dePeople={dePeople} place={place} category={category} ></DetailPeople>{'  '}

        </td>
        <td className='s3'>

          상세매출<br />
          <DetailSales deSales={deSales} place={place} category={category}></DetailSales>{'  '}
        </td>
      </tr>












    </>
  )
}

export default DetailAnalyze