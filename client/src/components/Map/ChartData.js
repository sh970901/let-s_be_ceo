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






  useEffect(() => {
    console.log(props)
    simpleDayData()
    simpletimeData()
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
  function simpletimeData(){
    if (props.buildingData === undefined) {
      console.log("데이터가 존재하지 않습니다. ")
    } else {
      setTime1(props.buildingData.시간대_1_생활인구_수)
      setTime2(props.buildingData.시간대_2_생활인구_수)
      setTime3(props.buildingData.시간대_3_생활인구_수)
      setTime4(props.buildingData.시간대_4_생활인구_수)
      setTime5(props.buildingData.시간대_5_생활인구_수)
      setTime6(props.buildingData.시간대_6_생활인구_수)
    }
  }

  function propsCheck() {
    console.log(props.buildingData[0])
  }


  const dayData = {
    labels: ["월요일 생활인구 수", "화요일 생활인구 수", "수요일 생활인구 수", "목요일 생활인구 수", "금요일 생활인구 수", "토요일 생활인구 수", "일요일 생활인구 수"],
    datasets: [
      {
        borderWidth: 1, // 테두리 두께
        data: [monday, tuesday, wednesday, thursday, friday, saturday, sunday], // 수치
        fill:true,
        backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black','green'] // 각 막대 색
      }
    ]
  }
  const timeData ={
    labels: ["시간대1(00~06) 생활인구 수", "시간대2(06~11) 생활인구 수", "시간대3(11~14) 생활인구 수", "시간대4(14~17) 생활인구 수", "시간대5(17~21) 생활인구 수", "시간대6(21~24) 생활인구 수"],
    datasets: [
      {
        borderWidth: 1, // 테두리 두께
        data: [time1, time2, time3, time4, time5, time6], // 수치
        fill:true,
        backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black','green'] // 각 막대 색
      }
    ]
  }
 

  
  return (
    <div>
      <button onClick={propsCheck}>props</button>
      <div>
      <h4>요일 별 생활 인구 수</h4> 
      <Bar data={dayData} options={{responsive:false, legend: {display: true, position: "bottom"}}}></Bar>
      <h4>시간대 별 생활 인구 수</h4>
      <Bar data={timeData} options={{responsive:false, legend: {display: true, position: "bottom"}}}></Bar>
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