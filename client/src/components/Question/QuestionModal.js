import Modal from 'react-modal'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


Modal.setAppElement("#root")

const QuestionModal = (props) => {
  
  useEffect(()=>{
    
  },[])
  return (
    <div>
        <Modal isOpen ={props.openModal}
        onRequestClose={props.closeModal}
        >
            <div className='modalItem'>
            <div>문의 내용</div>
            아이디: {props.detailId} <br/>
            내용: {props.detailContent}<br/><br/><br/><br/>
            답변: {props.answerData}
            <button onClick={props.closeModal}>닫기</button>
            </div>
            
        </Modal>
        
    </div>
  )
}

export default QuestionModal