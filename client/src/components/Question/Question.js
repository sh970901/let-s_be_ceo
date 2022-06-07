import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import QuestionData from './QuestionData';
import axios from 'axios';
import QuestionModal from './QuestionModal';

import s from "../../css/Question.module.css";


//사용자가 작성했던 문의사항을 모두 확인할 수 있으며 새로운 문의사항을 작성할 수 있다.


const Question = () => {
  const [questions, setQestions] = useState([]);
  const [content, setContent] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [answerData, setAnswerData] = useState("대기 중...")

  const [detailId, setDetailId] = useState("")
  const [detailContent, setDetailContent] = useState("")

  useEffect(() => {
    fetch(`http://localhost:5000/api/question/${sessionStorage.getItem('user_id')}`)
      .then(res => res.json())
      .then(data => setQestions(data))
  }, [])
  useEffect(() => {

  }, [])
  function openModal() {
    setShowModal(true)
  }
  function closeModal() {
    setShowModal(false)
  }

  function handleQues(e) {
    setContent(e.target.value)
  }
  //문의사항 제출하기
  function submitQues() {
    if (sessionStorage.getItem('user_id') !== null) {
      const userData = {
        content: content,
        id: sessionStorage.getItem('user_id')
      }
      axios.post("http://localhost:5000/api/question", userData)
        .then((res) => {
          if (res.status === 200) {
            alert("생성이 완료되었습니다.")
            window.location.reload()
          }
          else {
            alert("생성에 실패했습니다.")
          }
        })
    } else {
      alert("로그인 후 사용가능합니다")
    }

  }
   //문의사항 순번
  var no=0                                       
  return (
    <div className={s.question}>
      <div className={s.questionContainer}>
        <div className={s.titleArea}>
          <h1>문의사항</h1>
        </div>
        <div className={s.contentArea}>
          <div className={s.contentContainer1}>
            <div className={s.contentItem}><p>순번</p></div>
            <div className={s.contentItem}><p>문의내용</p></div>
            <div className={s.contentItem}><p>작성자</p></div>
            <div className={s.contentItem}><p>작성일</p></div>
          </div>
          <div className={s.contentContainer}>
            {questions ? 
            questions.map((c) => {
              no++;

              return (
                <QuestionData
                  setAnswerData={setAnswerData}
                  questions={questions}
                  setDetailContent={setDetailContent}
                  setDetailId={setDetailId}

                  date={c.date}
                  no={no}
                  setShowModal={setShowModal}
                  detailId={detailId}
                  detailContent={detailContent}
                  key={c.no}
                  id={c.id}
                  content={c.content}></QuestionData>
              )
            }) : null}
            {showModal ? <QuestionModal answerData={answerData} detailId={detailId} detailContent={detailContent} openModal={openModal} closeModal={closeModal}></QuestionModal> : null}
          </div>
        </div>
    
        <div className={s.submitArea}>
          <div className={s.submitTitle}>
            <p>문의사항 : </p>
            <input className={s.submit} type="text" name='text' value={content} onChange={handleQues}></input>
          </div>
          <div className={s.btnArea} onClick={submitQues}>
            <p>제출</p>
          </div>
        </div>
      </div>
    </div>
  )
}



export default Question