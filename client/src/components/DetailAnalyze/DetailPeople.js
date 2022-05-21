
import React from 'react'
import { useState } from 'react'
import { Bar, Doughnut, Pie } from 'react-chartjs-2'
import axios from 'axios';

import s from "../../css/Analyze.module.css";

const DetailPeople = (props) => {
  const [areaName, setAreaName] = useState() //상권 이름
  const [areaTotal, setAreaTotal] = useState() //상권 총 생활인구 
  const [home, setHome] = useState() //가구당 상주 인구 수 배열 (비교용)
  const [homeNum, setHomeNum] = useState(0) //상권에 가구당 상주 인구 수 

  const [sun, setSun] = useState() //일요일 생활인구
  const [mon, setMon] = useState() //월요일 생활인구
  const [tuse, setTuse] = useState() //화 생활인구
  const [wed, setWed] = useState() //수 생활인구
  const [thur, setThur] = useState() //목 생활인구
  const [fri, setFri] = useState() //금 생활인구
  const [sat, setSat] = useState() //토 생활인구

  const [age10, setAge10] = useState(0) //연령대 10~60이상
  const [age20, setAge20] = useState(0)
  const [age30, setAge30] = useState(0)
  const [age40, setAge40] = useState(0)
  const [age50, setAge50] = useState(0)
  const [age60, setAge60] = useState(0)

  const [time0, setTime0] = useState(0) //00~06 시간대  
  const [time6, setTime6] = useState(0) //06~11 시간대 
  const [time11, setTime11] = useState(0) //11~14 시간대 
  const [time14, setTime14] = useState(0) //14~17 시간대 
  const [time17, setTime17] = useState(0) //17~21 시간대 
  const [time21, setTime21] = useState(0) //21~24 시간대 

  const [workAge10, setWorkAge10] = useState(0) //직장인구 10대 
  const [workAge20, setWorkAge20] = useState(0)
  const [workAge30, setWorkAge30] = useState(0)
  const [workAge40, setWorkAge40] = useState(0)
  const [workAge50, setWorkAge50] = useState(0)
  const [workAge60, setWorkAge60] = useState(0)


  const [liveAge10, setLiveAge10] = useState(0) //상주인구 10대
  const [liveAge20, setLiveAge20] = useState(0)
  const [liveAge30, setLiveAge30] = useState(0)
  const [liveAge40, setLiveAge40] = useState(0)
  const [liveAge50, setLiveAge50] = useState(0)
  const [liveAge60, setLiveAge60] = useState(0)


  //조건에 맞는 인구수 찾기
  const [humanSex, setHumanSex] = useState() //성 
  const [humanAge, setHumanAge] = useState() //나이
  const [humanDay, setHumanDay] = useState() //요일
  const [humanTime, setHumanTime] = useState() //시간대

  const [goalData, setGoalData] = useState(0) //목표하는 인구 수 
  const [isGoal, setIsGoal] = useState(false) //목표 인구수 보여주기




  const [show, setShow] = useState(false)
  const [area, setArea] = useState() //상권 선택
  const [showArea, setShowArea] = useState(false) //상권차트 보여주는 조건


  var arr1 = [] //상권 이름 담는 배열 샘플
  var arr2 = [] //상권에 총 생활인구 수 샘플
  var arr3 = [] //가구당 상주 인구 수 샘플




  function analyze() {
     
      setShowArea(false)
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

  function handleSex(e) {
    setHumanSex(e.target.value)
  }
  function handleAge(e) {
    setHumanAge(e.target.value)
  }
  function handleDay(e) {
    setHumanDay(e.target.value)
  }
  function handleTime(e) {
    setHumanTime(e.target.value)
  }
  function showConditionData() {
    console.log(humanSex)
    if (humanSex !== "성별" && humanSex !== undefined && humanAge !== "연령대" && humanAge !== undefined && humanDay !== "요일" && humanDay !== undefined && humanTime !== "시간대" && humanTime !== undefined) {
      setIsGoal(true)
      fetch(`http://localhost:5000/human/${props.place}/${area}/${humanSex}연령대_${humanAge}_${humanDay}${humanTime}_생활인구_수`)
        .then(res => res.json())
        .then(data => {
          var value = Object.values(data[0])
          setGoalData(value[0])
        })
    } else {
      alert("위에 보기중 선택하세요.")
    }

  }


  function showData(e) {
    setShowArea(false)
    setArea(e.target.value)
  }


  function areaChoice() {
    if (area === "상권선택" || area === undefined) {
      alert("상권을 선택해주세요.")
    } else {
      setShowArea(true)
      fetchData()
    }

  }


  const fetchData = async () => {
    const result = await axios(`http://localhost:5000/api/detailPeople/${props.place}/${area}/`);
    console.log(result.data[0])
    setSun(result.data[0].일요일_생활인구_수)
    setMon(result.data[0].월요일_생활인구_수)
    setTuse(result.data[0].화요일_생활인구_수)
    setWed(result.data[0].수요일_생활인구_수)
    setThur(result.data[0].목요일_생활인구_수)
    setFri(result.data[0].금요일_생활인구_수)
    setSat(result.data[0].토요일_생활인구_수)

    setAge10(result.data[0].연령대_10_생활인구_수)
    setAge20(result.data[0].연령대_20_생활인구_수)
    setAge30(result.data[0].연령대_30_생활인구_수)
    setAge40(result.data[0].연령대_40_생활인구_수)
    setAge50(result.data[0].연령대_50_생활인구_수)
    setAge60(result.data[0].연령대_60_이상_생활인구_수)

    setTime0(result.data[0].시간대_1_생활인구_수)
    setTime6(result.data[0].시간대_2_생활인구_수)
    setTime11(result.data[0].시간대_3_생활인구_수)
    setTime14(result.data[0].시간대_4_생활인구_수)
    setTime17(result.data[0].시간대_5_생활인구_수)
    setTime21(result.data[0].시간대_6_생활인구_수)

    setWorkAge10(result.data[0].연령대_10_직장_인구_수)
    setWorkAge20(result.data[0].연령대_20_직장_인구_수)
    setWorkAge30(result.data[0].연령대_30_직장_인구_수)
    setWorkAge40(result.data[0].연령대_40_직장_인구_수)
    setWorkAge50(result.data[0].연령대_50_직장_인구_수)
    // setWorkAge60(result.data[0].연령대_60_이상_직장_인구_수)


    setLiveAge10(result.data[0].연령대_10_상주인구_수)
    setLiveAge20(result.data[0].연령대_20_상주인구_수)
    setLiveAge30(result.data[0].연령대_30_상주인구_수)
    setLiveAge40(result.data[0].연령대_40_상주인구_수)
    setLiveAge50(result.data[0].연령대_50_상주인구_수)
    setLiveAge60(result.data[0].연령대_60_이상_상주인구_수)

    setHomeNum(result.data[0].가구당_상주인구_수)
  }
  //총 생활인구 수 데이터
  const totalData = {
    labels: areaName,
    datasets: [
      {
        label: '',
        borderWidth: 0, // 테두리 두께
        data: areaTotal, // 수치
        fill: true,
        backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black', 'green'], // 각 막대 색
        barPercentage: 0.8,
      }
    ]
  }
  //상권 내 요일 별 인구 수 데이터
  const dayData = {
    labels: ["일요일_생활인구_수", "월요일_생활인구_수", "화요일_생활인구_수", "수요일_생활인구_수", "목요일_생활인구_수", "금요일_생활인구_수", "토요일_생활인구_수"],
    datasets: [
      {
        label: '',
        borderWidth: 0, // 테두리 두께
        data: [sun, mon, tuse, wed, thur, fri, sat], // 수치
        fill: true,
        backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black', 'green'], // 각 막대 색
        barPercentage: 0.5,
      }
    ]
  }
  //상권 내 연령 별 인구 수 데이터
  const ageData = {
    labels: ["10대 생활인구 수", "20대 생활인구 수", "30대 생활인구 수", "40대 생활인구 수", "50대 생활인구 수", "60대 이상 생활인구 수"],
    datasets: [
      {
        label: '',
        borderWidth: 0, // 테두리 두께
        data: [age10, age20, age30, age40, age50, age60], // 수치
        fill: true,
        backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black', 'green'], // 각 막대 색
        barPercentage: 0.5,
      }
    ]
  }
  //상권 내 시간대 별 인구 수 데이터
  const timeData = {
    labels: ["시간대_00_06_생활인구", "시간대_06_11_생활인구", "시간대_11_14_생활인구", "시간대_14_17_생활인구", "시간대_17_21_생활인구", "시간대_21_24_생활인구"],
    datasets: [
      {
        label: '',
        borderWidth: 0, // 테두리 두께
        data: [time0, time6, time11, time14, time17, time21], // 수치
        fill: true,
        backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black', 'green'], // 각 막대 색,
        barPercentage: 0.5,
      }
    ]
  }
  //상권 내 요일 별 상주인구 수 데이터
  // const liveData = {
  //   labels: ["10대 상주인구 수", "20대 상주인구 수", "30대 상주인구 수", "40대 상주인구 수", "50대 상주인구 수", "60대 이상 상주인구 수"],
  //   datasets: [
  //     {
  //       label: '',
  //       borderWidth: 5, // 테두리 두께
  //       data: [liveAge10,], // 수치
  //       fill: true,
  //       backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black', 'green'] // 각 막대 색
  //     }
  //   ]
  // }
  let liveData = [liveAge10, liveAge20, liveAge30, liveAge40, liveAge50, liveAge60]
  let liveLabels = ["10대 상주인구 수", "20대 상주인구 수", "30대 상주인구 수", "40대 상주인구 수", "50대 상주인구 수",]

  let customLiveLabels = liveLabels.map((label, index) => `${label}: ${liveData[index]}`)
  const dayLiveData = {
    labels: customLiveLabels,
    datasets: [
      {
        label: "",
        backgroundColor: [
          "#83ce83",
          "#959595",
          "#f96a5d",
          "#00A6B4",
          "#545775",
          "#663366",
          "#339966",
        ],
        data: liveData,
        cutout: "0%"
      },
    ],
  };


  //상권 내 요일 별 직장인구 수 데이터
  // const workData = {
  //   labels: ["10대 직장인구 수", "20대 직장인구 수", "30대 직장인구 수", "40대 직장인구 수", "50대 직장인구 수", "60대 이상 직장인구 수"],
  //   datasets: [
  //     {
  //       label: '',
  //       borderWidth: 5, // 테두리 두께
  //       data: [workAge10,], // 수치
  //       fill: true,
  //       backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black', 'green'] // 각 막대 색
  //     }
  //   ]
  // }
  let workData = [workAge10, workAge20, workAge30, workAge40, workAge50, workAge60]
  let workLabels = ["10대 직장인구 수", "20대 직장인구 수", "30대 직장인구 수", "40대 직장인구 수", "50대 직장인구 수", "60대 이상 직장인구 수"]

  let customWokrLabels = workLabels.map((label, index) => `${label}: ${workData[index]}`)
  const dayWorkData = {
    labels: customWokrLabels,
    datasets: [
      {
        label: "",
        backgroundColor: [
          "#83ce83",
          "#959595",
          "#f96a5d",
          "#00A6B4",
          "#545775",
          "#663366",
          "#339966",
        ],
        data: workData,
        cutout: "0%"
      },
    ],
  };




  //가구원 수 데이터 
  const homeData = {
    labels: areaName,
    datasets: [
      {
        label: '',
        borderWidth: 5, // 테두리 두께
        data: home, // 수치
        fill: true,
        backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black', 'green'], // 각 막대 색
      }
    ]
  }


  return (
    <div>
      <div className={s.btnArea} onClick={analyze}>
        <h1>분석하기</h1>
      </div>

      {show ? 
        <div className={s.analyzeContentConainer}>
          <div className={s.contentSectorsSquare}>
            <div className={s.sectorsItem}>
              <div className={s.setorsItemTitle}>
                <h4>상권 별 총 생활인구 수</h4>
              </div>
              <Bar data={totalData}
                width={450}
                height={450}
                options={{ responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />
            </div>
            
            <div className={s.sectorsItem}>
              <div className={s.setorsItemTitle}>
                <h4>상권 별 가구원 수</h4>
              </div>
            <Bar data={homeData}
              width={450}
              height={450}
              options={{ responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />
            </div>
          </div>

          <div className={s.selectArea}>
            <p>상권을 선택해주세요:</p>
            <select className={s.selectItem} 
              onChange={showData}>
              <option>상권선택</option>
              {areaName.map((v) => {
                return <option>{v}</option>
              })}
              </select> <br />
              <button onClick={areaChoice}>상권 선택</button>
          </div>
      </div> : null}


      {showArea ? 
        <div className={s.peopleDataContainer}>
          <div className={s.peopleDataChartArea}>
            <div className={s.peopleDataItems}>
              <h4>상권 내 요일 별 생활인구 수</h4>
              <Bar data={dayData}
                width={300}
                height={300}
                options={{ responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />
            </div>

            <div className={s.peopleDataItems}>
              <h4>상권 내 연령 별 생활인구 수</h4>
              <Bar data={ageData}
                width={300}
                height={300}
                options={{ responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />
            </div>

            <div className={s.peopleDataItems}>
              <h4>상권 내 시간대 별 생활인구 수</h4>
              <Bar data={timeData}
                width={300}
                height={300}
                options={{ responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />
            </div>
          </div>

          <div className={s.peopleDataChartArea}>
            <div className={s.peopleDataItems}>
              <h4>상권 내 요일별 직장인구</h4>
              <Doughnut
                data={dayWorkData}
                width={300}
                height={300}
                options={{
                  responsive: false,
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

              <div className={s.peopleDataItems}>
              <h4>상권 내 요일별 직장인구</h4>
                <Doughnut
                  data={dayLiveData}
                  width={300}
                  height={300}
                  options={{
                    responsive: false,
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

                <div className={s.peopleDataItems}>
                  <div className={s.peopleDataSexArea}>
                    <select onChange={handleSex}>
                      <option>성별</option>
                      <option>남성</option>
                      <option>여성</option>
                    </select>
                    <select onChange={handleAge}>
                      <option>연령대</option>
                      <option value='10'>10대</option>
                      <option value='20'>20대</option>
                      <option value='30'>30대</option>
                      <option value='40'>40대</option>
                      <option value='50'>50대</option>
                      <option value='60'>60대</option>
                    </select>
                    <select onChange={handleDay}>
                      <option>요일</option>
                      <option>일요일</option>
                      <option>월요일</option>
                      <option>화요일</option>
                      <option>수요일</option>
                      <option>목요일</option>
                      <option>금요일</option>
                      <option>토요일</option>
                    </select>
                    <select onChange={handleTime}>
                      <option>시간대</option>
                      <option value='시간대_1'>00-06</option>
                      <option value='시간대_2'>06-11</option>
                      <option value='시간대_3'>11-14</option>
                      <option value='시간대_4'>14-17</option>
                      <option value='시간대_5'>17-21</option>
                      <option value='시간대_6'> 21-24</option>
                    </select><button onClick={showConditionData}>조회하기</button><br /><br />
                  </div>

                  {isGoal ? <div>
                    해당 상권에서 조건에 만족하는 생활 인구 수는<br />
                    {goalData}{' '}입니다.
                  </div> : null}


                  가구당 상주 인구 수: {homeNum}<br />
                  실제 이동 인구 수 : ?????<br />
                  일 평균 인구 수 : ?????<br />
                </div>
              </div>
            </div> : null}
    </div>
  )
}

export default DetailPeople