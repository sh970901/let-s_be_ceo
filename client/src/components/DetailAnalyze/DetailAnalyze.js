import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import DetailLoate from './DetailLoate';
import DetailPeople from './DetailPeople';
import DetailSales from './DetailSales';

import s from "../../css/Header.module.css";

const DetailAnalyze = () => {
  const location = useLocation();
  const place = location.state.place

  const [deLocate, setDeLocate] = useState()  //상세지역 테이블 정보 담음
  const [dePeople, setDePeple] = useState()  //상세인구 테이블 정보 담음
  const [deSales, setDeSales] = useState() //상세매출 테이블 정보 담음

  const [category, setCategory] = useState()

  const [dish, setDish] = useState() //상세 지역에 요식업 정보담음 

  const [showDetailLocate, setShowDetailLocate] = useState(false) //상세 지역정보 클릭시 상세 지역정보
  const [showDetailPeople, setShowDetailPeople] = useState(false) //상세 인구정보
  const [showDetailSale, setShowDetailSale] = useState(false) //상세매출

  const [showDetailSummary, setShowDetailSummary] = useState(true) //상세정보 기본 설명란 

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


  function clickLocate() {
    setShowDetailSummary(false)
    setShowDetailPeople(false)
    setShowDetailSale(false)
    setShowDetailLocate(true)
  }

  function clickPeople() {
    setShowDetailSummary(false)
    setShowDetailLocate(false)
    setShowDetailSale(false)
    setShowDetailPeople(true)
  }
  function clickSale() {
    setShowDetailSummary(false)
    setShowDetailLocate(false)
    setShowDetailPeople(false)
    setShowDetailSale(true)
  }

  function clickSummary(){
    setShowDetailSummary(true)
    setShowDetailLocate(false)
    setShowDetailPeople(false)
    setShowDetailSale(false)

  }


  return (
    <>
      <h1>{place}</h1> <br />
      <div className={s.navbar}>
        <ul className={s.navbar__menu}>
        <li>
            <div className={s.link__menu} onClick={clickSummary}> 
              분석 설명서
            </div>
          </li>
          <li>
            <div className={s.link__menu} onClick={clickLocate}>
              상세지역
            </div>
          </li>
          <li>
            <div className={s.link__menu} onClick={clickPeople}>
              상세인구
            </div>
          </li>
          <li>
            <div className={s.link__menu} onClick={clickSale}>
              상세매출
            </div>
          </li>
        </ul>
      </div>

      {showDetailSummary ? 
      <>
        <br/><br/><br/><br/><br/>
        <div>
          
          상세분석 설명~~~~~
          인구는 분석 누르면 ~~~~~~ 상권 선택하면 상권 끼리 비교~~~<br/>
          지역은 업종 선택 후 상권 선택 ~ ~~~ ~<br/>
          매출은 업종 선택 후 상권 선택 ~~~~<br/>
        </div>
      </>
       : null}
      {showDetailSale ?
        <>
          <br /><br /><br /><br />
          <h1>매출 분석하기</h1>
          <div>
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
            <DetailSales deSales={deSales} place={place} category={category}></DetailSales>
          </div>
        </>
        : null}
      {showDetailLocate ?
        <>
          <br /><br /><br /><br />
          <h1>지역 분석하기</h1>
          <div>
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
            <DetailLoate dish={dish} place={place} category={category} deLocate={deLocate}></DetailLoate>
          </div>
        </>
        : null}
      {showDetailPeople ?
        <>
          <div>
            <br /><br /><br /><br />
            <h1>인구 분석하기</h1>
            <div>
              <DetailPeople dePeople={dePeople} place={place} category={category} ></DetailPeople>
            </div>
          </div>
        </>
        : null}
      

    </>
  )
}

export default DetailAnalyze