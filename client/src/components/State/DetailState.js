import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
//내 상세 정보보기
const DetailState = () => {
  const history = useHistory()
  const [id,setId] = useState("")
  const [pw,setPw] = useState("")
  const [email, setEmail] = useState("")

  useEffect(()=>{
    fetch("http://localhost:5000/api/login")
    .then((res)=>res.json())
    .then(data=>{
      for(var i =0; i<data.length; i++){
        if(sessionStorage.getItem("user_id")===data[i].ID){
          setId(data[i].ID)
          setPw(data[i].PW)
          setEmail(data[i].Email)
        }
      }
    })
  },[])
  function handleId(e) {
    e.preventDefault();
    setId(e.target.value);
  }
  function handlePw(e) {
    e.preventDefault();
    setPw(e.target.value)
  }
  function handleEmail(e) {
    e.preventDefault();
    setEmail(e.target.value)
  }
  function modify() {
    const url=`http://localhost:5000/api/login/${sessionStorage.getItem("user_id")}`
    const data = {
      id: id,
      pw: pw,
      email: email
    }
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    })
    alert("수정되었습니다.")
    sessionStorage.removeItem('user_id')
    history.push('/login')
    window.location.reload()
  }
  function deleteId(){
    fetch(`http://localhost:5000/api/login/${sessionStorage.getItem("user_id")}`,{
      method: 'DELETE'
    } ).then((res)=>{
      if(res.status===200){
          alert("회원 탈퇴됨")
          sessionStorage.removeItem("user_id")
          history.push('/login')
          window.location.reload()
      } else{
          alert("탈퇴 실패")
      }})
  }
  return (
  <div>
      <h1>내 상세 정보</h1>
      ID:<input type="text" name="id" value={id} onChange={handleId} ></input><br/>
      PW: <input type="text" name="pw" value={pw} onChange={handlePw}></input><br/>
      Email:<input type="text" name="email" value={email} onChange={handleEmail}></input><br/>
      <Button onClick={modify}>수정하기</Button>{' '}
      <Link to ="/">
      <Button>뒤로</Button></Link> <br/><br/>
      <Button onClick={deleteId}>회원탈퇴</Button>
      
  </div>
  );
};

export default DetailState;
