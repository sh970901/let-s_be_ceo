import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Bar, Doughnut, Pie } from 'react-chartjs-2'

const DetailSales = (props) => {
  const [bestSales, setBestSales] = useState(0) //매출 가장 높은상권
  const [bestArea, setBestArea] = useState() //매출가장 높은 상권

  const [area, setArea] = useState() //상권 선택

  const [areaName, setAreaName] = useState() //상권이름
  const [amount, setAmount] = useState() //분기당 매출 금액

  const [show, setShow] = useState(false) //데이터 보여주기
  const [showAreaData, setShowAreaData] = useState(false) //상권 선택


  var arr1 = [] //상권코드명 샘플
  var arr2 = [] //분기당 매출 금액 샘플

  var arr3 = 0 //최고 매출 금액 샘플
  var arr4 = "" //최고 매출 상권 샘플

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



  const salesData = {
    labels: areaName,
    datasets: [
      {
        label: '',
        borderWidth: 5, // 테두리 두께
        data: amount, // 수치
        fill: true,
        backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black', 'green'] // 각 막대 색
      }
    ]
  }

  let data = ["1","2","3","4","5","6"]
  let labels = ["1억미만", "1억", "2억", "3억", "4억", "5억", "6억"]

  let customLabels = labels.map((label, index) => `${label}: ${data[index]}`)
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
              data: data,
          },
      ],
  };
  function analyze() {
    setAreaName(arr1)
    setAmount(arr2)
    setBestSales(arr3)
    setBestArea(arr4)
    setShow(true)
  }

  function showData(e) {
    setArea(e.target.value)
  }
  function areaChoice() {
    console.log('dd')
    setShowAreaData(true)
  }
  return (
    <div>
      <br />
      <button onClick={analyze}>분석하기</button><br /><br />
      {show ? <div>

        업종의 평균 매출
        <Bar data={salesData} options={{ responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />
        <p>요식업 매출이 가장 많은 상권은 {bestArea}이고 금액은 {bestSales}원입니다.</p>
        상권을 선택해주세요:{' '}<select onClick={showData}>
          <option>상권선택</option>
          {areaName.map((v) => {
            return <option>{v}</option>
          })}
        </select> <br />
        <button onClick={areaChoice}>상권 선택</button>
      </div> : null}
      {showAreaData? <div>
        <Doughnut
        data={daySalesData}
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
      </div> : null}


    </div>
  )
}

export default DetailSales