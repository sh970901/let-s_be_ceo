import React from 'react'
import { Bar, Doughnut, Pie } from 'react-chartjs-2'
import { Chart, ArcElement, registerables } from 'chart.js'
import { useEffect } from 'react';
import { chartColors } from './chartColors';
import { useState } from 'react';

Chart.register(ArcElement);
Chart.register(...registerables);


const ChartData = (props) => {
  const [monday, setMonday] = useState(0) //월요일 생활인구 수 
  const [tuesday, setTuesday] = useState(0) //화요일 생활인구 수
  const [wednesday, setWednesday] = useState(0) // 수요일 생활인구 수
  const [thursday, setThursday] = useState(0) // 목요일 생활인구 수 
  const [friday, setFriday] = useState(0) // 금요일 생활인구 수
  const [saturday, setSaturday] = useState(0)//토
  const [sunday, setSunday] = useState(0)//일

  const [time1, setTime1] = useState(0) //시간대 1 생활인구 수 
  const [time2, setTime2] = useState(0) //시간대 2 생활인구 수 
  const [time3, setTime3] = useState(0) //시간대 3 생활인구 수
  const [time4, setTime4] = useState(0) //시간대 4 생활인구 수
  const [time5, setTime5] = useState(0) //시간대 5 생활인구 수
  const [time6, setTime6] = useState(0) //시간대 6 생활인구 수

  const [stay, setStay] = useState(0) //행정동 총 상주인구 수 
  const [live, setLive] = useState(0) //행정동 총 생활인구 수 
  const [work, setWork] = useState(0) //행정동 총 직장인구 수 

  const [averageSale, setAverageSale] = useState(0) //행정동 분기당 평균매출
  const allSale = 80551349 //전체 행정동 평균매출의 평균 


  useEffect(() => {


    simpleDayData()
    simpletimeData()
    simplePeopleData()
    simpleAverSale()



  }, [props])

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
        borderWidth: 5, // 테두리 두께
        data: [261, 1531, 1002, 273, 1039, 120, 1578, 2413, 102, 599], // 수치
        fill: true,
        backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black', 'green'] // 각 막대 색
      }
    ]
  }



  const dayData = {
    labels: ["월요일 생활인구 수", "화요일 생활인구 수", "수요일 생활인구 수", "목요일 생활인구 수", "금요일 생활인구 수", "토요일 생활인구 수", "일요일 생활인구 수"],
    datasets: [
      {
        label: "요일 별",
        borderWidth: 5, // 테두리 두께
        data: [monday, tuesday, wednesday, thursday, friday, saturday, sunday], // 수치
        fill: true,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
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
    labels: ["시간대1(00~06) 생활인구 수", "시간대2(06~11) 생활인구 수", "시간대3(11~14) 생활인구 수", "시간대4(14~17) 생활인구 수", "시간대5(17~21) 생활인구 수", "시간대6(21~24) 생활인구 수"],
    datasets: [
      {
        label: "시간대 별",
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
      },
    ],
  };




  return (
    <div>
      <div>
        <td>
          <tr>
            <h4 className='prac'>요일 별 생활 인구 수</h4>
            <Bar data={dayData} options={{ indexAxis: 'y', responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />
          </tr>
        </td>
        <td>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </td>
        <td>
          <tr>
            <h4 className='prac'>시간대 별 생활 인구 수</h4>
            <Bar data={timeData} options={{ responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />
          </tr>
        </td>
      

      </div><br />
      <td>
        <tr>
        <h4 className='prac'>행정동 전체와 해당 지역 매출 비율</h4>
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
            }}></Doughnut><br />
        </tr>
      </td>
      <td>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </td>
      <td>
        <tr>
          <h4 className='prac'>행정동 총 점포수</h4>
          <Bar data={shopData} options={{ responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />
        </tr>
      </td>


      <p className='prac'>상주 인구 수: {stay}</p>
      <p className='prac'>직장 인구 수: {work}</p>
      <p className='prac'>생활 인구 수: {live}</p>


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