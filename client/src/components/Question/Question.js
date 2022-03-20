import React from 'react'
import { useState } from 'react'

const Question = () => {
  const [ques, setQues] = useState("")

  function handleQues(e){
    setQues(e.target.value)
  }
  function submitQues(){
    console.log(ques)
    // if(sessionStorage.getItem())
  }
  return (
    <div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        Question<br/>
        문의사항: {' '}
        <input type="text" name='text'value={ques} onChange={handleQues}></input>
        <button onClick={submitQues}>제출</button>
    </div>
  )
}

export default Question