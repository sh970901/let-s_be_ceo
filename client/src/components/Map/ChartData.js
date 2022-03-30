import React from 'react'
import { Doughnut, Pie } from 'react-chartjs-2'
import { Chart, ArcElement } from 'chart.js'
import { useEffect } from 'react';
import { chartColors } from './chartColors';
import { useState } from 'react';
Chart.register(ArcElement);


const ChartData = (props) => {
  const [monday, setMonday] = useState(0) //월요일 생활인구 수 
  const [tuesday, setTuesday] = useState(0) //화요일 생활인구 수
  const [wednesday, setWednesday] = useState(0) // 수요일 생활인구 수
  const [thursday, setThursday] = useState(0) // 목요일 생활인구 수 
  const [friday, setFriday] = useState(0) // 금요일 생활인구 수
  const [saturday, setSaturday] = useState(0)
  const [sunday, setSunday] = useState(0)



    useEffect(() => {
        console.log(props)
        simpleData()

    }, [props])

    function simpleData(){
      if(props.buildingData === undefined){
        console.log("데이터가 존재하지 않습니다. ")
      }else{
        console.log(props.buildingData)
        setMonday(props.buildingData.월요일_생활인구_수)
        setTuesday(props.buildingData.화요일_생활인구_수)
        setWednesday(props.buildingData.수요일_생활인구_수)
        setThursday(props.buildingData.목요일_생활인구_수)
        setFriday(props.buildingData.금요일_생활인구_수)
        setSaturday(props.buildingData.토요일_생활인구_수)
        setSunday(props.buildingData.일요일_생활인구_수)
      }
    }


      
      const data = {
        labels: ["월요일 생활인구 수", "화요일 생활인구 수", "수요일 생활인구 수", "목요일 생활인구 수", "금요일 생활인구 수", "토요일 생활인구 수", "일요일 생활인구 수"],
        datasets: [
          {
            data: [monday, tuesday, wednesday, thursday, friday,saturday, sunday],
            backgroundColor: [
              "rgb(242,165,152)",
              "rgb(255,232,157)",
              "rgb(236,107,109)",
              "rgb(122,231,125)",
              "rgb(200,153,151)",
              "rgb(220,223,151)",
              "rgb(240,213,151)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
          }
        ],
       
        plugins: {
          labels: {
            render: "percentage",
            fontColor: ["green", "white", "red"],
            precision: 2
          },
        },
         text: "23%",
      };



    const expData = {
        labels: ["1", "2", "3"],
        datasets: [
            {
                data: [35, 33, 33],
                borderWidth: 5,
                hoverBorderWidth: 10,
                hoverBackgroundColor: chartColors,
                backgroundColor: [
                    "rgba(238, 102, 121, 1)",
                    "rgba(98, 181, 229, 1)",
                    "rgba(255, 198, 0, 1)"
                ],
                // fill: true
            }
        ]
    }
    const options = {
            
        elements: {
          
          center: {
            legend: { display: true, position: "right" },
            text: "",
            color: "#FF6384", // Default is #000000
            fontStyle: "Arial", // Default is Arial
            sidePadding: 20, // Default is 20 (as a percentage)
            minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
            lineHeight: 25 // Default is 25 (in px), used for when text wraps
          }
        },
        
      }
      function dd(){
        console.log(props.buildingData[0])
      }
    return (
        <div>
          <button onClick={dd}>dd</button>
            <Pie
                
                data={expData}
                options={options}
            
                height={200}
                width={600}
            />
            <Doughnut
                data={data}
                options={options}
            ></Doughnut>
        </div>
    )
}

export default ChartData