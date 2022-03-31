import React from 'react'
import Modal from 'react-modal'
// import { Doughnut, Pie } from 'react-chartjs-2'
// import { Chart, ArcElement } from 'chart.js'
import { useEffect,useState } from 'react';
import ChartData from './ChartData';
import { Link, useHistory } from 'react-router-dom';



Modal.setAppElement("#root")

const SimpleModal = (props) => {
  const [buildingData, setBuildingData] = useState();
  const history = useHistory();

  useEffect(()=>{
    
    if(props.place.includes('동')){
      fetch(`http://localhost:5000/api/building/${props.place}`)
      .then(res=>res.json())
      .then(data=>setBuildingData(data[0]))
    }
    
  },[])


 const customStyles= {
   overlay: {zIndex: 1000,  backgroundColor: 'rgba(100, 100, 70, 0.5)',},
   content: {
    border: '1',
    borderRadius: '4px',
    bottom: 'auto',
    
    left: '50%',
    padding: '2rem',
    position: 'fixed',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    minWidth: '20rem',
    width: '100px',
    maxWidth: '1000px',
  
    
  }
  }

  // function showDetailAnalyze(){
  //   console.log("Dd")
  //   history.push({
  //     pathname:'/detailAnalyze',
  //     state: {props: props}
  // })
  // }





  return (
    <div>
      <Modal className="simpleModal"
        style={customStyles}
        isOpen={props.openModal}
        onRequestClose={props.closeModal}>
        <div className='modalItem'>
          <h3 className='prac'>간단 분석 {''}</h3>
          <h1 className='prac'>{props.place}</h1>
          <div>
            <ChartData place={props.place} buildingData={buildingData}></ChartData>
            
          </div>
          <Link to ={{
            pathname: '/detailAnalyze',
            state: {
              place: props.place
            }
          }}>
            <button>상세 분석</button></Link>
          
          
          <br/><br/>
          <button onClick={props.closeModal}>닫기</button>


        </div>
      </Modal>
    </div>
  )
}

export default SimpleModal



