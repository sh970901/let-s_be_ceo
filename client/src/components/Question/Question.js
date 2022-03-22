import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import QuestionData from './QuestionData';
import axios from 'axios';
import QuestionModal from './QuestionModal';

const Question = () => {
  const [questions, setQestions] = useState([]);
  const [content, setContent] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [answerData, setAnswerData] = useState("대기 중...")
  

  const [detailId, setDetailId] = useState("")
  const [detailContent, setDetailContent] = useState("")

  useEffect(()=>{
    fetch(`http://localhost:5000/api/question/${sessionStorage.getItem('user_id')}`)
    .then(res=>res.json())
    .then(data=>setQestions(data))   
  },[])
   useEffect(()=>{
    
   },[])
   function openModal(){
    setShowModal(true)
  }
  function closeModal(){
    setShowModal(false)
  }

  function handleQues(e){
    setContent(e.target.value)
  }
  function submitQues(){
    if(sessionStorage.getItem('user_id')!==null){
      const userData = {
        content: content,
        id: sessionStorage.getItem('user_id')
    }
    axios.post("http://localhost:5000/api/question", userData)
    .then((res)=>{
        if(res.status===200){
            alert("생성이 완료되었습니다.")
            window.location.reload()  
        }
        else{
            alert("생성에 실패했습니다.")
        }
    })
    }else{
      alert("로그인 후 사용가능합니다")
    }
    
  }
  return (
    <div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        Question<br/>
        {questions ? questions.map((c)=>{
         return(
         <QuestionData
         setAnswerData ={setAnswerData}
          questions = {questions}
          setDetailContent={setDetailContent}
          setDetailId={setDetailId}
          setShowModal={setShowModal}
          detailId={detailId}
          detailContent={detailContent}
          key={c.no}
          id={c.id}
          content={c.content}></QuestionData>)
        }) : null}
        {showModal ? <QuestionModal answerData={answerData} detailId={detailId} detailContent={detailContent} openModal={openModal} closeModal={closeModal}></QuestionModal>:null}
        
        문의사항: {' '}
        <input type="text" name='text'value={content} onChange={handleQues}></input>
        <button onClick={submitQues}>제출</button>
    </div>
  )
}

export default Question