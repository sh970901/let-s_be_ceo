import React from 'react'
import Modal from 'react-modal'
// import { Doughnut, Pie } from 'react-chartjs-2'
// import { Chart, ArcElement } from 'chart.js'
import { useEffect,useState } from 'react';
import ChartData from './ChartData';


Modal.setAppElement("#root")

const SimpleModal = (props) => {
  const [buildingData, setBuildingData] = useState();

  useEffect(()=>{
    
    if(props.place.includes('동')){
      fetch(`http://localhost:5000/api/building/${props.place}`)
      .then(res=>res.json())
      .then(data=>setBuildingData(data[0]))
    }
    
  },[])




 const customStyles= {
   overlay: {zIndex: 1000,  backgroundColor: 'rgba(100, 100, 70, 0.5)', max_width:'1000px', max_height: '800px'},
   content: {
    border: '0',
    borderRadius: '4px',
    bottom: 'auto',
    minHeight: '10rem',
    left: '50%',
    padding: '2rem',
    position: 'fixed',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    minWidth: '20rem',
    width: '80px',
    maxWidth: '1000px'
  }
  }

  





  return (
    <div>
      <Modal className="simpleModal"
        style={customStyles}
        isOpen={props.openModal}
        onRequestClose={props.closeModal}>
        <div className='modalItem'>
          <h3>상세분석</h3>
          <h1>DB...DB...DB...DB...DB...DB...DB...DB...DB...DB...DB...DB...DB...</h1>
          <div>
            <ChartData buildingData={buildingData}></ChartData>
            
          </div>


          <button onClick={props.closeModal}>닫기</button>


        </div>
      </Modal>
    </div>
  )
}

export default SimpleModal



