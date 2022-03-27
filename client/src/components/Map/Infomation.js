import React,{useEffect} from 'react'
import { useState } from 'react'


const Infomation = (props) => {
  const [buildingData, setBuildingData] = useState();
  const [isShowData, setIsShowData] = useState(false);

  useEffect(()=>{
    
    if(props.place.includes('동')){
      console.log(props.place)
      setIsShowData(true)
      fetch(`http://localhost:5000/api/building/${props.place}`)
      .then(res=>res.json())
      .then(data=>setBuildingData(data[0]))
    }else{
     console.log("데이터 없음")
    }
    
  },[props])


  function show(){
    console.log(buildingData.no)
  }
  return (
  <>
  <div>{props.place}</div>
  <button onClick={show}>정보확인</button>
  <div>
    {isShowData ? <>dd</> : null}
  </div>
  </>
    
  )
}

export default Infomation


// import { Doughnut, Pie } from "react-chartjs-2";



// const pieData = {
//   maintainAspectRatio: false,
//   responsive: false,
//   labels: ["usa", "europe", "africa"],
//   datasets: [
//     {
//       data: [200, 150, 20, 10],
//     }
//   ]
// };
// const options = {
//   legend: {
//     display: false,
//     position: "right"
//   },
//   elements: {
//     arc: {
//       borderWidth: 0
//     }
//   }
// };
// const pieOptions = {
//   legend: {
//     display: false,
//     position: "right",
//     legendCallback: function (chart) {
//       // Return the HTML string here.
//       console.log(chart);
//       return [
//         <ul>
//           <li>zzzz</li>
//           <li>zzzz</li>
//           <li>ppp</li>
//           <li>adasda</li>
//         </ul>
//       ];
//     }
//   },
//   elements: {
//     arc: {
//       borderWidth: 0
//     }
//   }
// };
// const data = {
//   maintainAspectRatio: false,
//   responsive: false,
//   labels: ["a", "b", "c", "d"],
//   datasets: [
//     {
//       data: [100, 100, 100, 100],
     
//     }
//   ]
// };

// //상권분석
// const Infomation = (props) => {
//   let chartInstance = null;
  

//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <div style={styles.relative}>
//         <Doughnut data={data} options={options} />
//         <div style={styles.pieContainer}>
//           <Pie
//             data={data}
//             options={pieOptions}
//             ref={(input) => {
//               chartInstance = input;
//             }}
//           />
//         </div>
//         <div id="legend" />
//       </div>
//     </div>
//   );

// }
// const styles = {
//   pieContainer: {
//     width: "40%",
//     height: "40%",
//     top: "50%",
//     left: "50%",
//     position: "absolute",
//     transform: "translate(-50%, -50%)"
//   },
//   relative: {
//     position: "relative"
//   }
// };
// export default Infomation

