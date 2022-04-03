
import React from 'react'
import { useState } from 'react'
import { Bar, Doughnut, Pie } from 'react-chartjs-2'
import axios from 'axios';



const DetailPeople = (props) => {
  const [areaName, setAreaName] = useState() //상권 이름
  const [areaTotal, setAreaTotal] = useState() //상권 총 생활인구 
  const [home, setHome] = useState() //가구당 상주 인구 수 

  const [dePeopleAreaData, setDePepleAreaData] = useState() //상권선택시 정보 

  const [sun, setSun] = useState() //일요일 생활인구
  const [mon, setMon] = useState() //월요일 생활인구
  const [tuse, setTuse] = useState() //화 생활인구
  const [wed, setWed] = useState() //수 생활인구
  const [thur, setThur] = useState() //목 생활인구
  const [fri, setFri] = useState() //금 생활인구
  const [sat, setSat] = useState() //토 생활인구

  const [age10,setAge10] = useState(0) //연령대 10~60이상
  const [age20,setAge20] = useState(0)
  const [age30,setAge30] = useState(0)
  const [age40,setAge40] = useState(0)
  const [age50,setAge50] = useState(0)
  const [age60,setAge60] = useState(0)

  const [time0, setTime0] = useState(0) //00~06 시간대  
  const [time6, setTime6] = useState(0) //06~11 시간대 
  const [time11, setTime11] = useState(0) //11~14 시간대 
  const [time14, setTime14] = useState(0) //14~17 시간대 
  const [time17, setTime17] = useState(0) //17~21 시간대 
  const [time21, setTime21] = useState(0) //21~24 시간대 


  const [show, setShow] = useState(false)
  const [area, setArea] = useState() //상권 선택
  const [showArea, setShowArea] = useState(false) //상권차트 보여주는 조건


  var arr1 = [] //상권 이름 담는 배열 샘플
  var arr2 = [] //상권에 총 생활인구 수 샘플
  var arr3 = [] //가구당 상주 인구 수 샘플




  function analyze() {
    setShowArea(false)
    console.log(props.dePeople)
    props.dePeople?.map((v) => {
      arr1.push(v.상권_코드_명)
      arr2.push(v.총_생활인구_수)
      arr3.push(v.가구당_상주인구_수)
    })
    setAreaName(arr1)
    setAreaTotal(arr2)
    setHome(arr3)
    setShow(true)

  }


  function showData(e) {
    setShowArea(false)
    setArea(e.target.value)
  }

  
  function areaChoice() {
    setShowArea(true)
    fetchData()
  }


  const fetchData = async () => {
    const result = await axios(`http://localhost:5000/api/detailPeople/${props.place}/${area}`);
    console.log(result.data[0])
    setSun(result.data[0].일요일_생활인구_수)
    setMon(result.data[0].월요일_생활인구_수)
    setTuse(result.data[0].화요일_생활인구_수)
    setWed(result.data[0].수요일_생활인구_수)
    setThur(result.data[0].목요일_생활인구_수)
    setFri(result.data[0].금요일_생활인구_수)
    setSat(result.data[0].토요일_생활인구_수)

    setAge10(result.data[0].연령대_10_생활인구_수)
    setAge20(result.data[0].연령대_10_생활인구_수)
    setAge30(result.data[0].연령대_10_생활인구_수)
    setAge40(result.data[0].연령대_10_생활인구_수)
    setAge50(result.data[0].연령대_10_생활인구_수)
    setAge60(result.data[0].연령대_10_생활인구_수)

    setTime0(result.data[0].시간대_1_생활인구_수)
    setTime6(result.data[0].시간대_2_생활인구_수)
    setTime11(result.data[0].시간대_3_생활인구_수)
    setTime14(result.data[0].시간대_4_생활인구_수)
    setTime17(result.data[0].시간대_5_생활인구_수)
    setTime21(result.data[0].시간대_6_생활인구_수)
  }
  //총 생활인구 수 데이터
  const totalData = {
    labels: areaName,
    datasets: [
      {
        label: '',
        borderWidth: 5, // 테두리 두께
        data: areaTotal, // 수치
        fill: true,
        backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black', 'green'] // 각 막대 색
      }
    ]
  }
    //상권 내 요일 별 인구 수 데이터
    const dayData = {
      labels: ["일요일_생활인구_수", "월요일_생활인구_수","화요일_생활인구_수","수요일_생활인구_수","목요일_생활인구_수","금요일_생활인구_수","토요일_생활인구_수"],
      datasets: [
        {
          label: '',
          borderWidth: 5, // 테두리 두께
          data: [sun, mon, tuse,wed, thur, fri, sat], // 수치
          fill: true,
          backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black', 'green'] // 각 막대 색
        }
      ]
    }
    //상권 내 연령 별 인구 수 데이터
    const ageData = {
      labels: ["10대 생활인구 수", "20대 생활인구 수","30대 생활인구 수","40대 생활인구 수","50대 생활인구 수","60대 이상 생활인구 수"],
      datasets: [
        {
          label: '',
          borderWidth: 5, // 테두리 두께
          data: [age10,age20,age30,age40,age50,age60], // 수치
          fill: true,
          backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black', 'green'] // 각 막대 색
        }
      ]
    }
    //상권 내 시간대 별 인구 수 데이터
    const timeData = {
      labels: ["시간대_00_06_매출_금액", "시간대_06_11_매출_금액", "시간대_11_14_매출_금액", "시간대_14_17_매출_금액", "시간대_17_21_매출_금액", "시간대_21_24"],
      datasets: [
        {
          label: '',
          borderWidth: 5, // 테두리 두께
          data: [time0,time6,time11,time14,time17,time21], // 수치
          fill: true,
          backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black', 'green'] // 각 막대 색
        }
      ]
    }




  //가구원 수 데이터 
  const homeData = {
    labels: areaName,
    datasets: [
      {
        label: '',
        borderWidth: 5, // 테두리 두께
        data: home, // 수치
        fill: true,
        backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black', 'green'] // 각 막대 색
      }
    ]
  }
  return (
    <div>
      <br />
      <button onClick={analyze}>분석하기</button><br /><br />
      {show ? <div>
        상권 별 총 생활인구 수 비율
        <Bar data={totalData} options={{ responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />
        상권 별 가구원 수
        <Bar data={homeData} options={{ responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />
        상권을 선택해주세요:{' '}<select onChange={showData}>
          <option>상권선택</option>
          {areaName.map((v) => {
            return <option>{v}</option>
          })}
        </select> <br />
        <button onClick={areaChoice}>상권 선택</button>

      </div> : null}
      {showArea ? <div>
        상권 내 요일 별 생활인구 수
        <Bar data={dayData} options={{ responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />
        
        상권 내 연령 별 생활인구 수 
        <Bar data={ageData} options={{ responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />

        상권 내 시간대 별 생활인구 수
        <Bar data={timeData} options={{ responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />
      </div> : null}

    </div>
  )
}

export default DetailPeople