// import React,{useEffect} from 'react'
// import { useState } from 'react'
// import AreaData from './AreaData';


// const Infomation = (props) => {
//   const [buildingData, setBuildingData] = useState();
//   const [isShowData, setIsShowData] = useState(false);
//   const [selectShop,setSelectShop] = useState()

//   const [showModal, setShowModal] = useState(false)
  


//   useEffect(()=>{
    
//     if(props.place.includes('동')){
//       setIsShowData(true)
//       fetch(`http://localhost:5000/api/building/${props.place}`)
//       .then(res=>res.json())
//       .then(data=>setBuildingData(data[0]))
//     }
    
//   },[props])

// function handleSet(e){
//   setSelectShop(e.target.value)
// }
// function showDetailData(){
//   console.log(selectShop)
//   if(selectShop === undefined || selectShop==="요식업"){
//     alert("요식업 종류를 선택해주세요")
//   }
//   else{
//     setShowModal(true)
//   }
// }
  
//   return (
//   <>
//   {/* <div>{props.place}</div> */}
  
//   <div>
//     {isShowData ? <AreaData setIsShowData={setIsShowData} buildingData={buildingData}></AreaData> : null}
//     <select onChange={handleSet}>
//       <option>
//         요식업
//       </option>
//       <option>
//         1
//       </option>
//       <option>
//         2
//       </option>
//       <option>
//         3
//       </option>
//     </select><br/>
//     {selectShop === "요식업"? null : <div>{selectShop}</div>} {'  '} <button onClick={showDetailData}>상세분석</button>
//     {/* {showModal ? <DetailModal openModal={openModal} closeModal={closeModal} selectShop={selectShop}></DetailModal> : null} */}

//   </div>
//   </>
    
//   )
// }

// export default Infomation


// // import { Doughnut, Pie } from "react-chartjs-2";



// // const pieData = {
// //   maintainAspectRatio: false,
// //   responsive: false,
// //   labels: ["usa", "europe", "africa"],
// //   datasets: [
// //     {
// //       data: [200, 150, 20, 10],
// //     }
// //   ]
// // };
// // const options = {
// //   legend: {
// //     display: false,
// //     position: "right"
// //   },
// //   elements: {
// //     arc: {
// //       borderWidth: 0
// //     }
// //   }
// // };
// // const pieOptions = {
// //   legend: {
// //     display: false,
// //     position: "right",
// //     legendCallback: function (chart) {
// //       // Return the HTML string here.
// //       console.log(chart);
// //       return [
// //         <ul>
// //           <li>zzzz</li>
// //           <li>zzzz</li>
// //           <li>ppp</li>
// //           <li>adasda</li>
// //         </ul>
// //       ];
// //     }
// //   },
// //   elements: {
// //     arc: {
// //       borderWidth: 0
// //     }
// //   }
// // };
// // const data = {
// //   maintainAspectRatio: false,
// //   responsive: false,
// //   labels: ["a", "b", "c", "d"],
// //   datasets: [
// //     {
// //       data: [100, 100, 100, 100],
     
// //     }
// //   ]
// // };

// // //상권분석
// // const Infomation = (props) => {
// //   let chartInstance = null;
  

// //   return (
// //     <div className="App">
// //       <h1>Hello CodeSandbox</h1>
// //       <div style={styles.relative}>
// //         <Doughnut data={data} options={options} />
// //         <div style={styles.pieContainer}>
// //           <Pie
// //             data={data}
// //             options={pieOptions}
// //             ref={(input) => {
// //               chartInstance = input;
// //             }}
// //           />
// //         </div>
// //         <div id="legend" />
// //       </div>
// //     </div>
// //   );


// // }
// // const styles = {
// //   pieContainer: {
// //     width: "40%",
// //     height: "40%",
// //     top: "50%",
// //     left: "50%",
// //     position: "absolute",
// //     transform: "translate(-50%, -50%)"
// //   },
// //   relative: {
// //     position: "relative"
// //   }
// // };
// // export default Infomation

