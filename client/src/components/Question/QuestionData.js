import React from 'react'

const QuestionData = (props) => {
    
    function showQuestion(){
        console.log(props.questions)
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
        <div>
            <div className=""onClick={showQuestion}>
                <input type='text' value={props.id} readOnly></input><input type='text' value={props.content} readOnly></input>
                
            </div>
        </div>
    )
}

export default QuestionData