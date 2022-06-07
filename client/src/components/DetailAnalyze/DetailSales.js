import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Bar, Doughnut, Pie } from 'react-chartjs-2'

import s from "../../css/Analyze.module.css";

//상세매출에 대한 정보로 업종 선택 시 해당 동에 선택 업종에 대한 지역정보를 상권 별로 제공하고
//상권 선택 시 상권에 대한 지역 정보를 제공한다.

const DetailSales = (props) => {
  const [bestSales, setBestSales] = useState(0) //매출 가장 높은상권
  const [bestArea, setBestArea] = useState() //매출가장 높은 상권

  const [area, setArea] = useState() //상권 선택
  const [showAreaData, setShowAreaData] = useState(false) //상권 선택
  const [areaName, setAreaName] = useState() //상권이름
  const [amount, setAmount] = useState() //분기당 매출 금액
  const [show, setShow] = useState(false) //데이터 보여주기

  const [time0, setTime0] = useState(0) //00~06 시간대 매출 
  const [time6, setTime6] = useState(0) //06~11 시간대 매출
  const [time11, setTime11] = useState(0) //11~14 시간대 매출
  const [time14, setTime14] = useState(0) //14~17 시간대 매출
  const [time17, setTime17] = useState(0) //17~21 시간대 매출
  const [time21, setTime21] = useState(0) //21~24 시간대 매출

  const [sun, setSun] = useState() //일요일 매출
  const [mon, setMon] = useState() //월요일 매출
  const [tuse, setTuse] = useState() //화요일 매출
  const [wed, setWed] = useState() //수요일 매출
  const [thur, setThur] = useState() //목요일 매출
  const [fri, setFri] = useState() //금요일 매출
  const [sat, setSat] = useState() //토요일 매출

  //연령대 10대부터 60대이상 매출
  const [age10, setAge10] = useState(0) 
  const [age20, setAge20] = useState(0)
  const [age30, setAge30] = useState(0)
  const [age40, setAge40] = useState(0)
  const [age50, setAge50] = useState(0)
  const [age60, setAge60] = useState(0)

  const [man, setMan] = useState(0) //남성비율
  const [woman, setWoman] = useState(0) //여성비율


  var arr1 = [] //상권코드명 샘플
  var arr2 = [] //분기당 매출 금액 샘플

  var arr3 = 0 //최고 매출 금액 샘플
  var arr4 = "" //최고 매출 상권 샘플

  //해당 동에 업종에 대한 정보를 받아와 담는다.
  useEffect(() => {
    fetch(`http://localhost:5000/api2/detailSales/${props.place}/${props.category}`)
      .then(res => res.json())
      .then(data => data?.map((v) => {
        arr1.push(v.상권_코드_명)
        arr2.push(v.분기당_매출_금액)
      }))
  }, [props])

  useEffect(() => {
    fetch(`http://localhost:5000/api2/detailSales/${props.place}/${props.category}`)
      .then(res => res.json())
      .then(data => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].분기당_매출_금액 > bestSales) {
            arr3 = data[i].분기당_매출_금액
            arr4 = data[i].상권_코드_명
          }
        }
      }
      )
  }, [props])


  //분기당 매출 금액
  const salesData = {
    labels: areaName,
    datasets: [
      {
        label: '',
        borderWidth: 0, // 테두리 두께
        data: amount, // 수치
        fill: true,
        backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black', 'green'], // 각 막대 색
        barPercentage: 0.8,
        // barThickness: 10,
        
      }
    ]
  }


  //성별 매출 금액
  const sexData = {
    labels: ["남성 매출 금액", "여성 매출 금액"],
    datasets: [
      {
        label: '성별',
        borderWidth: 0, // 테두리 두께
        data: [man, woman], // 수치
        fill: true,
        backgroundColor: ['rgb(89, 89, 255)', 'rgb(255, 86, 86)'] // 각 막대 색
      }
    ]
  }


  //시간대 별 매출 금액
  let timeData = [time0, time6, time11, time14, time17, time21]
  let timeLabels = ["시간대_00_06_매출_금액", "시간대_06_11_매출_금액", "시간대_11_14_매출_금액", "시간대_14_21_매출_금액", "시간대_21_24_매출_금액",]

  let customTimeLabels = timeLabels.map((label, index) => `${label}: ${timeData[index]}`)
  const timeSalesData = {
    labels: customTimeLabels,
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
        data: timeData,
        cutout: "0%"
      },
    ],
  };
  //연령대 별 매출 금액
  let ageData = [age10, age20, age30, age40, age50, age60]
  let ageLabels = ["연령대_10_매출_금액", "연령대_20_매출_금액", "연령대_30_매출_금액", "연령대_40_매출_금액", "연령대_50_매출_금액", "연령대_60_이상_매출_금액"]

  let customAgeLabels = ageLabels.map((label, index) => `${label}: ${ageData[index]}`)
  const ageSalesData = {
    labels: customAgeLabels,
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
        data: ageData,
        cutout: "0%"
      },
    ],
  };

  //요일별 매출 금액
  let dayData = [sun, mon, tuse, wed, thur, fri, sat]
  let labels = ["일요일_매출_금액", "월요일_매출_금액", "화요일_매출_금액", "수요일_매출_금액", "목요일_매출_금액", "금요일_매출_금액", "토요일_매출_금액"]

  let customLabels = labels.map((label, index) => `${label}: ${dayData[index]}`)
  const daySalesData = {
    labels: customLabels,
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
        data: dayData,
        cutout: "0%"
      },
    ],
  };

 //업종을 선택한 후 해당 동에 대한 상세 분석
  function analyze() {
    if (props.category === "업종 선택" || props.category === undefined) {
      alert("업종을 선택해주세요.")
    } else {
      setAreaName(arr1)
      setAmount(arr2)
      setBestSales(arr3)
      setBestArea(arr4)
      setShow(true)
      setShowAreaData(false)
    }
  }

  function showData(e) {
    setShowAreaData(false)
    setArea(e.target.value)
  }

  //상권 선택 후 해당 상권에 대한 상세분석을 위한 정보를 담는다.
  function areaChoice() {
    if (area === "상권선택" || area === undefined) {
      alert("상권을 선택해주세요.")
    } else {
      fetch(`http://localhost:5000/api3/detailSales/${props.place}/${props.category}/${area}`)
        .then(res => res.json())
        .then(data => {
          console.log(data[0])
          setTime0(data[0].시간대_00_06_매출_금액)
          setTime6(data[0].시간대_06_11_매출_금액)
          setTime11(data[0].시간대_11_14_매출_금액)
          setTime14(data[0].시간대_14_17_매출_금액)
          setTime17(data[0].시간대_17_21_매출_금액)
          setTime21(data[0].시간대_21_24_매출_금액)

          setSun(data[0].일요일_매출_금액)
          setMon(data[0].월요일_매출_금액)
          setTuse(data[0].화요일_매출_금액)
          setWed(data[0].수요일_매출_금액)
          setThur(data[0].목요일_매출_금액)
          setFri(data[0].금요일_매출_금액)
          setSat(data[0].토요일_매출_금액)

          setAge10(data[0].연령대_10_매출_금액)
          setAge20(data[0].연령대_20_매출_금액)
          setAge30(data[0].연령대_30_매출_금액)
          setAge40(data[0].연령대_40_매출_금액)
          setAge50(data[0].연령대_50_매출_금액)
          setAge60(data[0].연령대_60_이상_매출_금액)

          setMan(data[0].남성_매출_금액)
          setWoman(data[0].여성_매출_금액)
        })
      setShowAreaData(true)
    }
  }

  return (
    <div>
      <div className={s.btnArea} onClick={analyze}>
        <h1>분석하기</h1>
      </div>
      {/* 해당 동에 상권 별 분석 정보 */}
      {show ? 
        <div className={s.analyzeContentConainer}>
          <div className={s.contentSectorsSquareSales}>
            <div className={s.sectorsItemSales}>
              <div className={s.setorsItemTitle}>
                <h4>분기당 매출 금액</h4>
                <h4>(업종별 상권 분기 매출 비교)</h4>
              </div>
              <Bar data={salesData}
                width={450}
                height={450}
                options={{
                responsive: false, legend: { display: false, position: "bottom" },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      }
                    }
                  ]
                }
              }}></Bar>
            </div>
            <div className={s.sectorsItemSales}>
              <div className={s.setorsItemTitle}>
                <h4>매출 분석</h4>
              </div>
              <div>
                <p>분기당 매출 금액이 가장 많은 상권 : {bestArea}
                <p>분기당 매출 금액 : {bestSales} 원</p></p>
              </div>
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
      {/* 상권 선택 시 해당 상권에 대한 정보 제공 */}
      {showAreaData ? 
        <div className={s.salesContainer}>
          <div className={s.salesSexRatio}>
            <div className={s.setorsItemTitle}>
              <h4>상권 내 성 별 매출 비율</h4>
            </div>
            <div className={s.salesSexData}>
              <Bar data={sexData} options={{ responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />
            </div>
          </div>
          <div className={s.salseDataContainer}>

            {/* ==============상권 내 시간대 별 매출 차트================ */}
            <div className={s.salesDataChart}>
              <h4>상권 내 시간대 별 매출 비율</h4>
              <Doughnut
                data={timeSalesData}
                width={300}
                height={300}
                options={{
                  responsive: false,
                  legend: { display: false, position: "bottom" },
                  datalabels: {
                    display: true,
                    color: "white",
                  },
                  tooltips: {
                    backgroundColor: "#5a6e7f",
                  }
                }}></Doughnut>
              </div>
              
              {/* ==============상권 내 요일 별 매출 차트================ */}
              <div className={s.salesDataChart}>
              <h4>상권 내 요일 별 매출 비율</h4>
                <Doughnut
                  data={daySalesData}
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

              {/* ==============상권 내 연령대 별 매출 차트================ */}
              <div className={s.salesDataChart}>
              <h4>상권 내 연령대 별 매출 비율</h4>
                <Doughnut
                  data={ageSalesData}
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
          </div>
      </div> : null}        
    </div>
  )
}

export default DetailSales