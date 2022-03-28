import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement("#root")

const DetailModal = (props) => {
  return (
    <div className='detailModal'>
        <Modal
        isOpen={props.openModal}
        onRequestClose={props.closeModal}>
            <div className='modalItem'>
            <h3>상세분석</h3>
            {props.selectShop}
            <h1>DB...</h1>    
                
            <button onClick={props.closeModal}>닫기</button>
                
                
            </div>
        </Modal>
    </div>
  )
}

export default DetailModal