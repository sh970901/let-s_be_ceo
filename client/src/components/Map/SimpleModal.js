import React from 'react'
import Modal from 'react-modal'
import { useEffect,useState } from 'react';
import ChartData from './ChartData';
import { Link } from 'react-router-dom';
import s from '../../css/SimpleAnal.module.css';

Modal.setAppElement("#root")

//해당 동 선택 시 보여지는 간단정보를 보여주는 Modal로 행정동에 대한 분석 정보를 담고 
//ChartData 컴포넌트로 값을 전달한다.  

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
    overlay: {zIndex: 1000,  
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'grid',
    justifyContent : 'center',
    alignItems : 'center',
    }
  }
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
      {/* 행정동에 대한 간단 정보를 전달 */}
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



