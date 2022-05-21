import React from 'react'
import { Bar, Doughnut, Pie } from 'react-chartjs-2'
import { Chart, ArcElement, registerables } from 'chart.js'
import { useEffect } from 'react';
import { chartColors } from './chartColors';
import { useState } from 'react';

import s from '../../css/ChartData.module.css';

import { UilSchedule } from '@iconscout/react-unicons'
import { UilCalender } from '@iconscout/react-unicons'
import { UilClockEight } from '@iconscout/react-unicons'
import { UilTag } from '@iconscout/react-unicons'
import { UilEstate } from '@iconscout/react-unicons'

Chart.register(ArcElement);
Chart.register(...registerables);


const ChartData = (props) => {

  // =========================생활인구에 대한 데이터 저장 변수===============================

  // 요일별
  const [monday, setMonday] = useState(0) //월요일 생활인구 수 
  const [tuesday, setTuesday] = useState(0) //화요일 생활인구 수
  const [wednesday, setWednesday] = useState(0) // 수요일 생활인구 수
  const [thursday, setThursday] = useState(0) // 목요일 생활인구 수 
  const [friday, setFriday] = useState(0) // 금요일 생활인구 수
  const [saturday, setSaturday] = useState(0)//토
  const [sunday, setSunday] = useState(0)//일



  const listDay={"월요일":monday, "화요일":tuesday, "수요일":wednesday, "목요일":thursday, "금요일":friday, "토요일":saturday, "일요일":sunday}
  const [maxDayValue,setMaxDayValue] = useState(1) //가장 많은 시간대 인구 수 
  const [maxDay, setMaxDay] = useState("") //가장 많은 시간대 요일 
  const [minDayValue, setMinDayValue] = useState(1)
  const [minDay, setMinDay] = useState("")



  // 시간대 별
  const [time1, setTime1] = useState(0) //시간대 1 생활인구 수 
  const [time2, setTime2] = useState(0) //시간대 2 생활인구 수 
  const [time3, setTime3] = useState(0) //시간대 3 생활인구 수
  const [time4, setTime4] = useState(0) //시간대 4 생활인구 수
  const [time5, setTime5] = useState(0) //시간대 5 생활인구 수
  const [time6, setTime6] = useState(0) //시간대 6 생활인구 수

  const [stay, setStay] = useState(0) //행정동 총 상주인구 수 
  const [live, setLive] = useState(0) //행정동 총 생활인구 수 
  const [work, setWork] = useState(0) //행정동 총 직장인구 수 


  
  const listTime={"00~06시":time1, "06~11시":time2, "11~14시":time3, "14~17시":time4, "17~21시":time5, "21~24시":time6}
  const [maxTimeValue,setMaxTimeValue] = useState(1) //가장 많은 시간대 인구 수 
  const [maxTime, setMaxTime] = useState("") //가장 많은 시간대 요일 
  const [minTimeValue, setMinTimeValue] = useState(1)
  const [minTime, setMinTime] = useState("")
  const [shop, setShop] = useState("") //행정동 총 점포수



  const [averageSale, setAverageSale] = useState(0) //행정동 분기당 평균매출
  const allSale = 80551349 //전체 행정동 평균매출의 평균 


  useEffect(() => {


    simpleDayData()
    simpletimeData()
    simplePeopleData()
    simpleAverSale()

    simpleShop()

  }, [props])

  useEffect(()=>{
    setMaxTimeValue(Math.max(time1,time2,time3,time4,time5,time6))
    setMinTimeValue(Math.min(time1,time2,time3,time4,time5,time6))

    setMaxDayValue(Math.max(monday,tuesday,wednesday,thursday,friday,saturday,sunday))
    setMinDayValue(Math.min(monday,tuesday,wednesday,thursday,friday,saturday,sunday))
    
    
  },[listTime])
  

  useEffect(()=>{
    
    setMaxTime(Object.keys(listTime).find(key=>listTime[key] === maxTimeValue))
    setMinTime(Object.keys(listTime).find(key=>listTime[key] === minTimeValue))

    setMaxDay(Object.keys(listDay).find(key=>listDay[key] === maxDayValue))
    setMinDay(Object.keys(listDay).find(key=>listDay[key] === minDayValue))
  },[maxTimeValue])

  function simpleDayData() {
    if (props.buildingData === undefined) {
      console.log("데이터가 존재하지 않습니다. ")
      
    } else {
      setMonday(props.buildingData.월요일_생활인구_수)
      setTuesday(props.buildingData.화요일_생활인구_수)
      setWednesday(props.buildingData.수요일_생활인구_수)
      setThursday(props.buildingData.목요일_생활인구_수)
      setFriday(props.buildingData.금요일_생활인구_수)
      setSaturday(props.buildingData.토요일_생활인구_수)
      setSunday(props.buildingData.일요일_생활인구_수)
    }
  }

  function simpleShop() {
    if (props.buildingData === undefined) {
      console.log("데이터가 존재하지 않습니다. ")
    } else {   
      setShop(props.buildingData.행정동_총점포수)
    }
  }


  function simpletimeData() {
    if (props.buildingData === undefined) {
      console.log("데이터가 존재하지 않습니다.")
    } else {
      setTime1(props.buildingData.시간대_1_생활인구_수)
      setTime2(props.buildingData.시간대_2_생활인구_수)
      setTime3(props.buildingData.시간대_3_생활인구_수)
      setTime4(props.buildingData.시간대_4_생활인구_수)
      setTime5(props.buildingData.시간대_5_생활인구_수)
      setTime6(props.buildingData.시간대_6_생활인구_수)
    }
  }
  function simplePeopleData() {
    if (props.buildingData === undefined) {
      console.log("데이터가 존재하지 않습니다. ")
    } else {
      setStay(props.buildingData.행정동_총_상주인구_수)
      setLive(props.buildingData.행정동_총_생활인구_수)
      setWork(props.buildingData.행정동_총_직장인구_수)
    }
  }

  function simpleAverSale() {
    if (props.buildingData === undefined) {
      console.log("데이터가 존재하지 않습니다. ")
    } else {
      setAverageSale(props.buildingData.행정동_분기당_평균매출)
    }
  }


  const shopData = {
    labels: ['개포동', '논현동', '대치동', '도곡동', '삼성동', '수서동', '신사동', '역삼동', '일원동', '청담동'],
    datasets: [
      {
        label: '',
        borderWidth: 0, // 테두리 두께
        data: [261, 1531, 1002, 273, 1039, 120, 1578, 2413, 102, 599], // 수치
        fill: true,
        backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black', 'green'] // 각 막대 색
      }
    ]
  }



  const dayData = {
    labels: ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
    datasets: [
      {
        label: "요일 별 생활 인구 수",
        borderWidth: 0, // 테두리 두께
        data: [monday, tuesday, wednesday, thursday, friday, saturday, sunday], // 수치
        fill: true,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(201, 203, 207, 1)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
      }
    ]
  }
  const timeData = {
    labels: ["00~06시", "06~11시", "11~14시", "14~17시", "17~21시", "21~24시"],
    datasets: [
      {
        label: "시간대 별 생활 인구 수",
        borderWidth: 1, // 테두리 두께
        data: [time1, time2, time3, time4, time5, time6], // 수치
        fill: true,
        backgroundColor: ["#11b288", "#207ac7", "#207ac7", "#207ac7", "#d6d6d6", "#d6d6d6", "#d6d6d6", "#d6d6d6"] // 각 막대 색
      }
    ]
  }
  let data = [allSale, averageSale]
  let labels = ["강남구 행정동 전체 평균 매출", `${props.place} 평균 매출`]

  let customLabels = labels.map((label, index) => `${label}: ${data[index]}`)
  const chartdata = {
    labels: customLabels,
    datasets: [
      {
        label: "",
        backgroundColor: [
          "#83ce83",
          "#959595",
          "#f96a5d",
          "#00A6B4",
          "#6800B4",
        ],
        data: data,
        cutout: "0%"
      },
    ],
  };




  return (
    <div className={s.chartWrap}>

      <div className={s.chartDongContainer}>
        <div className={s.dongDataItem}>
          <h1>상주 인구 수</h1>
          <p> {stay === 0 ? '데이터 없음' : stay+' 명'} </p>
        </div>

        <div className={s.dongDataItem}>
          <h1>직장 인구 수</h1>
          <p> {work === 0 ? '데이터 없음' : work+' 명'} </p>
        </div>

        <div className={s.dongDataItem}>
          <h1>생활 인구 수</h1>
          <p> {live === 0 ? '데이터 없음' : live+' 명'} </p>
        </div>
        {/* <p className='prac'>상주 인구 수: {stay}</p>
        <p className='prac'>직장 인구 수: {work}</p>
        <p className='prac'>생활 인구 수: {live}</p> */}
      </div>

      <div className={s.chartPeopleContainer1}>
        
        <div className={s.chartPeopleItem}>
          <div className={s.peopleTitle}>
            <h4 className='prac'><UilCalender className={s.titleIcons}/> 요일 별 생활 인구 수</h4>
          </div>
          
          <div className={s.chartArea}>
            <Bar data={dayData} 
            width={300}
            height={300}
            options={{ indexAxis: 'y', responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />
          </div>
          
          <div className={s.peopleTextArea}>
            <div className={s.TextAreaItems}>
              <p>생활 인구가 가장 많은 요일 : </p>
              <p className={s.maxData}>{maxDay}</p>
              <p>{maxDayValue} 명</p>
            </div>
            <div className={s.TextAreaItems}>
              <p>생활 인구가 가장 적은 요일 : </p>
              <p className={s.minData}>{minDay}</p>
              <p>{minDayValue} 명</p>
            </div>
          </div>
        </div>

        <div className={s.chartPeopleItem}>
          <div className={s.peopleTitle}>
            <h4 className='prac'><UilClockEight className={s.titleIcons}/> 시간대 별 생활 인구 수</h4>
          </div>

          <div className={s.chartArea}>
            <Bar data={timeData}
              width={300}
              height={300}
              options={{ responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />
          </div>

          <div className={s.peopleTextArea}>
            <div className={s.TextAreaItems}>
              <p>생활 인구가 가장 많은 시간 : </p>
              <p className={s.maxData}>{maxTime}</p>
              <p>{maxTimeValue} 명</p>
            </div>
            <div className={s.TextAreaItems}>
              <p>생활 인구가 가장 적은 시간 : </p>
              <p className={s.minData}>{minTime}</p>
              <p>{minTimeValue} 명</p>
            </div>
          </div>
        </div>
      </div>

      <div className={s.chartPeopleContainer}>
        <div className={s.chartItem}>
          <div className={s.peopleTitle}>
            <h4 className='prac'><UilTag className={s.titleIcons}/> 행정동 전체와 해당 지역 매출 비율</h4>
          </div>
          <div className={s.chartArea}>
              <Doughnut
                data={chartdata}
                options={{
                  legend: { display: true, position: "right" },
                  datalabels: {
                    display: true,
                    color: "white",
                  },
                  tooltips: {
                    backgroundColor: "#5a6e7f",
                  }
                }}></Doughnut>
            </div>    
          </div>
              
          <div className={s.chartItem}>
            <div className={s.peopleTitle}>
              <h4 className='prac'><UilEstate className={s.titleIcons}/> 행정동 총 점포수</h4>
            </div>

            <div className={s.chartArea}>
              <Bar data={shopData} 
              width={300}
              height={300}
              options={{ responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />
            </div>

            <div className={s.shopTextArea}>
                <div className={s.TextAreaItems}>
                  <p>선택 지역 : </p>
                  <p className={s.maxData}>{props.place}</p>
                </div>
                <div className={s.TextAreaItems}>
                  <p>점포수 : </p>
                  <p className={s.maxData}>{shop}</p>
                  <p>개</p>
                </div>
            </div>
          </div>

      </div>

      {/* <Pie

        data={expData}    
        options={options}

        height={200}
        width={600}
      />
      <Doughnut
        data={data}
        options={options}
      ></Doughnut> */}
    </div>
  )
}

export default ChartData