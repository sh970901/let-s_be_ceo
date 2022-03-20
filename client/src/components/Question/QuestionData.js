import axios from 'axios'
import React from 'react'

const QuestionData = (props) => {

    function showQuestion(){
        props.setShowModal(true)
        props.setDetailId(props.id)
        props.setDetailContent(props.content)
        
        
        axios.get('http://localhost:5000/api/answer/',{
            params:{
                id: props.detailId,
                content: props.detailContent
            }
        }).then(res=>console.log(res))
        
        
    }
    return (
        <div>
            <div className="ques"onClick={showQuestion}>
                {props.id}: {props.content}
            </div>
        </div>
    )
}

export default QuestionData