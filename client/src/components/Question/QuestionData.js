import React from 'react'
import { useState } from 'react'

import s from "../../css/Question.module.css";

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
            <div className={s.item}><p>{props.no}</p></div>
            <div className={s.item} onClick={showQuestion} ><p>{props.content}</p></div>
            <div className={s.item}><p>{props.id}</p></div>
            <div className={s.item}><p>{props.date}</p></div>
        </>
    )
}

export default QuestionData