// import React from 'react'
// import { useState } from 'react'
// import { useEffect } from 'react'

// const AreaData = (props) => {
//   const [dataNo, setDataNo] = useState(0) //넘버
//   const [monday, setMonday] = useState(0) //월요일 생활인구 수 
//   const [thesday, setThuesday] = useState(0) //화요일 생활인구 수
//   const [wednesday, setWednesday] = useState(0) // 수요일 생활인구 수
//   const [thursday, setThursday] = useState(0) // 목요일 생활인구 수 
//   const [friday, setFriday] = useState(0) // 금요일 생활인구 수
//   const [saturday, setSaturday] = useState(0)
//   const [sunday, setSunday] = useState(0)
//   const [time1, setTime1] = useState(0) //시간대 1 생활인구 수 
//   const [time2, setTime2] = useState(0) //시간대 2 생활인구 수 
//   const [time3, setTime3] = useState(0) //시간대 3 생활인구 수
//   const [time4, setTime4] = useState(0) //시간대 4 생활인구 수
//   const [time5, setTime5] = useState(0) //시간대 5 생활인구 수
//   const [time6, setTime6] = useState(0) //시간대 6 생활인구 수
//   const [averageSale, setAverageSale] = useState(0) //행정동 분기당 평균매출
//   const [name, setName] = useState(0) //행정동 이름
//   const [stay, setStay] = useState(0) //행정동 총 상주인구 수 
//   const [live, setLive] = useState(0) //행정동 총 생활인구 수 
//   const [work, setWork] = useState(0) //행정동 총 직장인구 수 
//   const [store, setStore] = useState(0) // 행정동 총점포수

//   function noErr(){
    
//     if(props.buildingData === undefined){
//       setDataNo("데이터가 존재하지 않습니다")
//       // props.setIsShowData(false)
//     }else{
//       setDataNo(props.buildingData.no)
//       setMonday(props.buildingData.월요일_생활인구_수)
//       setThuesday(props.buildingData.화요일_생활인구_수)
//       setWednesday(props.buildingData.수요일_생활인구_수)
//       setThursday(props.buildingData.목요일_생활인구_수)
//       setFriday(props.buildingData.금요일_생활인구_수)
//       setSaturday(props.buildingData.토요일_생활인구_수)
//       setSunday(props.buildingData.일요일_생활인구_수)
//       setTime1(props.buildingData.시간대_1_생활인구_수)
//       setTime2(props.buildingData.시간대_2_생활인구_수)
//       setTime3(props.buildingData.시간대_3_생활인구_수)
//       setTime4(props.buildingData.시간대_4_생활인구_수)
//       setTime5(props.buildingData.시간대_5_생활인구_수)
//       setTime6(props.buildingData.시간대_6_생활인구_수)
//       setAverageSale(props.buildingData.행정동_분기당_평균매출)
//       setName(props.buildingData.행정동_이름)
//       setStay(props.buildingData.행정동_총_상주인구_수)
//       setLive(props.buildingData.행정동_총_생활인구_수)
//       setWork(props.buildingData.행정동_총_직장인구_수)
//       setStore(props.buildingData.행정동_총점포수)
//     }
//   }
  

//   useEffect(()=>{
//     noErr()
//     // console.log(data.no)
//   },[props])

//   //요일별 시간별 원차트, 점포 수 행정동 전체 비교, 평균 매출을 평균값이랑 비교 , 상주인구 생활인구 직장인구는 텍스트로 
//   return (
//     <div>
//       No: {dataNo} <br/>
//       행정동 이름 : {name} <br/>
//       월요일 생활인구 수 : {monday}<br/>
//       화요일 생활인구 수 : {thesday}<br/>
//       수요일 생활인구 수 : {wednesday}<br/>
//       목요일 생활인구 수 : {thursday}<br/>
//       금요일 생활인구 수 : {friday}<br/>
//       토요일 생활인구 수 : {saturday}<br/>
//       일요일 생활인구 수 : {sunday}<br/>
//       시간대1(00~06) 생활인구 수 : {time1}<br/>
//       시간대2(06~11) 생활인구 수 : {time2}<br/>
//       시간대3(11~14) 생활인구 수 : {time3}<br/>
//       시간대4(14~17) 생활인구 수 : {time4}<br/>
//       시간대5(17~21) 생활인구 수 : {time5}<br/>
//       시간대6(21~24) 생활인구 수 : {time6}<br/>
//       행정동 분기당 요식업 평균 매출: {averageSale}<br/>
//       행정동 총 상주인구 수: {stay}<br/>
//       행정동 총 생활인구 수: {live}<br/>
//       행정동 총 직장인구 수: {work}<br/>
//       행정동 촘 요식업 점포 수: {store}<br/>
      
      
//       <br/>
//       <br/>
//       <br/>
//       <br/>
//       <br/>
//       <br/>
//       <br/>
//       <br/>
//       <br/>
//       <br/>
//       <br/>

//     </div>
//   )
// }

// export default AreaData