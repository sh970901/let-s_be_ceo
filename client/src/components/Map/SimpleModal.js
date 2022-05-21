import React from 'react'
import Modal from 'react-modal'
// import { Doughnut, Pie } from 'react-chartjs-2'
// import { Chart, ArcElement } from 'chart.js'
import { useEffect,useState } from 'react';
import ChartData from './ChartData';
import { Link, useHistory } from 'react-router-dom';

import s from '../../css/SimpleAnal.module.css';
import { UilAnalytics } from '@iconscout/react-unicons'


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
    overlay: {zIndex: 1000,  
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'grid',
    // justifyItems: 'center',
    justifyContent : 'center',
    alignItems : 'center',
    },
   content: {
      // width : '1080px',
      // maxwidth: '1080px',
      // display : 'grid',
    // height:'720px',
    // border: '1px solid #fff',
    // borderRadius: '4px',
    // bottom: 'auto',
    
    // left: '50%',
    // padding: '2rem',
    // position: 'fixed',
    // right: 'auto',
    // top: '50%',
    // transform: 'translate(-120%,-50%)',
    // minWidth: '20rem',
    // width: '100px',
    // maxWidth: '1000px',

    
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
      <Modal className={s.simpleModal}
        style={customStyles}
        isOpen={props.openModal}
        onRequestClose={props.closeModal}>

      <div className={s.modalTitleContainer}>
          <h1>상권 간단분석 : </h1>
          <h1 className='prac'>{props.place}</h1>
      </div>

      <div className={s.modalContentContainer}>
            <ChartData place={props.place} buildingData={buildingData}></ChartData>
      </div>

      <div className={s.btnArea}>
            <Link to ={{
              pathname: '/detailAnalyze',
              state: {
                place: props.place
              }
            }}>
            <button className={s.modalBtn}>상세 분석</button></Link>
            
            <button className={s.modalBtn} onClick={props.closeModal}>닫기</button>
      </div>

      </Modal>
    </div>
  )
}

export default SimpleModal



