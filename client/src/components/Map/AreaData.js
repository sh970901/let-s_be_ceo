import React from 'react'
import { useEffect } from 'react'
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";


const AreaData = (props) => {
    useEffect(()=>{
        
    },[])
const state = {
  dataPie: {
    labels: ["RED", "Green", "Yellow", "Grey", "Dark Grey"],
    datasets:[
      {
        data: [300, 50, 100, 40, 120],
          backgroundColor: [
            "#F7464A",
            "#46BFBD",
            "#FDB45C",
            "#949FB1",
            "#4D5360",
            "#AC64AD"
          ],
          hoverBackgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5",
            "#616774",
            "#DA92DB"
          ]
      }
    ]
  }
}

    function showData(){
      console.log(props.areaData)
    }

  return (
    <div>
      AreaData
      <button onClick={showData}>정보보기</button>
      {/* <MDBContainer>
        <Pie data={state.dataPie} options={{responsive: true}}></Pie>
      </MDBContainer> */}
    </div>
  )
}

export default AreaData