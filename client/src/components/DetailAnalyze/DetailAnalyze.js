import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {useLocation} from "react-router-dom";
import DetailLoate from './DetailLoate';
import DetailPeople from './DetailPeople';
import DetailSales from './DetailSales';


const DetailAnalyze = () => {
const location = useLocation();
const place = location.state.place

const [deLocate,setDeLocate] = useState()
const [category, setCategory] = useState()

const [dish, setDish] = useState()

function showData(e){
  setCategory(e.target.value)
  
}


useEffect(()=>{
  fetch(`http://localhost:5000/api/detailLocate/${place}`)
  .then(res=>res.json())
  .then(data=>setDeLocate(data))
},[])

useEffect(()=>{
  fetch(`http://localhost:5000/api/${place}`)
  .then(res=>res.json())
  .then(data=>setDish(data))
},[])




  return (
    <>
        
        업종을 선택해주세요: {'   '}
        <select onClick={showData}>
            <option>업종 선택</option>
            <option>분식전문점</option>
            <option>양식음식점</option>
            <option>일식음식점</option>
            <option>중식음식점</option>
            <option>치킨전문점</option>
            <option>패스트푸드점</option>
            <option>한식음식점</option>
            <option>호프_간이주점</option>
        </select>
        <td>
          <tr>
            상세지역
            <DetailLoate dish={dish} place={place} category={category} deLocate={deLocate}></DetailLoate>{'  '}
           
          </tr>
        </td>
        <td>
          <tr>
            상세인구
            <DetailPeople></DetailPeople>{'  '}
          </tr>
        </td>
        <td>
          <tr>
            상세매출
            <DetailSales></DetailSales>{'  '}
          </tr>
        </td>
    </>
  )
}

export default DetailAnalyze