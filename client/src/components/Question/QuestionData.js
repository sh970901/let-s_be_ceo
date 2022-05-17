import React from 'react'
import { useState } from 'react'
// import ResultModal from './Modal/ResultModal'

const QuestionData = (props) => {
    
    function showQuestion(){
        console.log(props)
        for(var i=0; i<props.questions.length-1; i++){
            if(props.questions[i].content === props.content){
                if(props.questions[i].answer === null){
                    props.setAnswerData("대기 중...")
                }else{
                    props.setAnswerData(props.questions[i].answer)
                }           
            }        
        }
        props.setShowModal(true)
        props.setDetailId(props.id)
        props.setDetailContent(props.content)
        
        
        
    }
    return (
        <>
       
            <div className='item'>{props.no}</div>
            <div className='item' onClick={showQuestion} >{props.content}</div>
            <div className='item'>{props.date}</div>
            <div className='item'>{props.id}</div>
        </>
    )
}

export default QuestionData