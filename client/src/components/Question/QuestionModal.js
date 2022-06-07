import Modal from 'react-modal'
import React from 'react'
import { useEffect } from 'react'

//각 문의사항에 해당하는 내용과 답변이 담긴다.

Modal.setAppElement("#root")

const QuestionModal = (props) => {

  useEffect(() => {

  }, [])
  return (
    <div>

      <Modal 
      className='qnaModal'
      isOpen={props.openModal}
        onRequestClose={props.closeModal}
      >
        <div className='modalItem'>
        <br /><br /><br /><br /><br /><br />
          내용: {props.detailContent}<br /><br /><br /><br />


          아이디: {props.detailId} <br />
          답변: {props.answerData}
          <button onClick={props.closeModal}>닫기</button>
        </div>

      </Modal>

    </div>
  )
}

export default QuestionModal