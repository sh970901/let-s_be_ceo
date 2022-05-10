import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Bar, Doughnut, Pie } from 'react-chartjs-2'
import { Chart, ArcElement, registerables } from 'chart.js'

Chart.register(ArcElement);
Chart.register(...registerables);

const DetailLoate = (props) => {

    const [areaNum, setAreaNum] = useState() //상권번호
    const [areaName, setAreaName] = useState() //상권이름
    const [facility, setFacility] = useState()//집객시설
    const [categoryNo, setCategoryNo] = useState()//음식점 수

    const [show, setShow] = useState(false)
    const [showArea, setShowArea] = useState(false) //상권차트 보여주는 조건
    const [area, setArea] = useState() //상권 선택

    const [apart0, setApart0] = useState(0)   //1억미만 아파트
    const [apart1, setApart1] = useState(0)  //1억 세대수
    const [apart2, setApart2] = useState(0)  //2억세대수
    const [apart3, setApart3] = useState(0)  //3억세대수
    const [apart4, setApart4] = useState(0)  //4억세대수
    const [apart5, setApart5] = useState(0)  //5억세대수
    const [apart6, setApart6] = useState(0)  //6억이상 세대수

    const [averApart, setAverApart] = useState(0) //아파트 평균 싯가
    const [bus, setBus] = useState(0) //버스정거장 수
    const [train, setTrain] = useState(0) //지하철 수

    useEffect(() => {
        var arr1 = [] //상권코드 담는 배열
        var arr2 = [] //상권 이름 담는 배열
        var arr3 = [] //집객 시설 담는 배열
        props.deLocate?.map((v) => {
            arr1.push(v.상권_코드)
            arr2.push(v.상권_코드_명)
            arr3.push(v.집객시설_수)
        })
        setAreaName(arr2)
        setAreaNum(arr1)
        setFacility(arr3)
    }, [props])



    function analyze() {
        if(props.category==="업종 선택" || props.category===undefined){
            alert("업종을 선택해주세요.")
        }
        else{
            setShow(true)
            setShowArea(false)
            var arr1 = []
            props.dish?.map((v) => {
                if (props.category === "분식전문점") {
                    arr1.push(v.분식전문점)
                }
                if (props.category === "양식음식점") {
                    arr1.push(v.분식전문점)
                } if (props.category === "일식음식점") {
                    arr1.push(v.일식음식점)
                } if (props.category === "중식음식점") {
                    arr1.push(v.중식음식점)
                } if (props.category === "치킨전문점") {
                    arr1.push(v.치킨전문점)
                } if (props.category === "패스트푸드점") {
                    arr1.push(v.패스트푸드점)
                } if (props.category === "한식음식점") {
                    arr1.push(v.한식음식점)
                } if (props.category === "호프간이주점") {
                    arr1.push(v.호프간이주점)
                }
            })
            setCategoryNo(arr1)
        }     
    }
    const facilityData = {
        labels: areaName,
        datasets: [
            {
                label: '',
                borderWidth: 5, // 테두리 두께
                data: facility, // 수치
                fill: true,
                backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black', 'green'], // 각 막대 색
                barPercentage: 0.8,
            }
        ]
    }
    const categoryData = {
        labels: areaName,
        datasets: [
            {
                label: '',
                borderWidth: 5, // 테두리 두께
                data: categoryNo, // 수치
                fill: true,
                backgroundColor: ['yellow', 'red', 'green', 'blue', 'white', 'black', 'green'], // 각 막대 색
                barPercentage: 0.8,
            }
        ]
    }
    let data = [apart0, apart1, apart2, apart3, apart4, apart5, apart6]
    let labels = ["1억미만", "1억", "2억", "3억", "4억", "5억", "6억"]

    let customLabels = labels.map((label, index) => `${label}: ${data[index]}`)
    const apartData = {
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



    function showData(e) {
        setArea(e.target.value)
        setShowArea(false)
    }
    function areaChoice() {
        if(area==="상권선택" || area===undefined){
            alert("상권을 선택해주세요.")
          }else{
            setShowArea(true)
            props.deLocate?.map((v) => {
                if (v.상권_코드_명 === area) {
                    setApart0(v.아파트_가격_1_억_미만_세대_수)
                    setApart1(v.아파트_가격_1_억_세대_수)
                    setApart2(v.아파트_가격_2_억_세대_수)
                    setApart3(v.아파트_가격_3_억_세대_수)
                    setApart4(v.아파트_가격_4_억_세대_수)
                    setApart5(v.아파트_가격_5_억_세대_수)
                    setApart6(v.아파트_가격_6_억_이상_세대_수)
                    setAverApart(v.아파트_평균_시가)
                    setBus(v.버스_정거장_수)
                    setTrain(v.지하철_역_수)
                }
            })
          }
       
    }
    return (
        <div>
            <br />
            <button onClick={analyze}>분석하기</button><br /><br />
            {show ?
                <div style={{ width: 1500, height: 300 }}>
                    집객 시설
                    <Bar data={facilityData}
                        width={1000}
                        height={300}
                        options={{ responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />
                    업종 개수
                    <Bar data={categoryData}
                        width={1000}
                        height={300}
                        options={{ responsive: false, legend: { display: true, position: "bottom" } }}></Bar><br />

                    상권을 선택해주세요:{' '}<select onChange={showData}>
                        <option>상권선택</option>
                        {areaName.map((v) => {
                            return <option>{v}</option>
                        })}
                    </select> <br />
                    <button onClick={areaChoice}>상권 선택</button>
                    {/* <Pie></Pie> */}
                </div> : null}
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {showArea ? <div>
                <Doughnut
                    data={apartData}
                    width={300}
                    height={300}
                    options={{
                        responsive: false,
                        legend: { display: false, position: "right" },
                        datalabels: {
                            display: true,
                            color: "white",
                        },
                        tooltips: {
                            backgroundColor: "#5a6e7f",
                        }
                    }}></Doughnut><br />
                    아파트 평균 싯가: {averApart}원<br />
                    버스 정거장 수: {bus}개<br />
                    지하철 정거장 수: {train}개<br />
            </div> : null}


        </div>
    )
}

export default DetailLoate