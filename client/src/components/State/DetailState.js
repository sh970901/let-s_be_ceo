import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import s from '../../css/State.module.css';
import userImg from '../../img/user.png';


//로그인한 사용자 자신의 상세 정보를 볼 수 있으며 수정이 가능하다.

const DetailState = () => {
  const history = useHistory()
  const [id,setId] = useState("")
  const [pw,setPw] = useState("")
  const [email, setEmail] = useState("")

  //로그인한 사용자의 정보를 가져오기
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
  //내 정보 수정하기 
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
  <div className={s.state}>
    <div>
      <div>
        <Link to ="/">
          <Button className={s.btnBack}>뒤로</Button>
        </Link>
      </div>
      <div className={s.stateContainer}>
        <div className={s.titleArea}>
          <h1>USER</h1>
          <h1>Info.</h1>
        </div>
        <div className={s.contentArea}>
          <div className={s.imgArea}>
            <img className={s.userImg} src={userImg}></img>
          </div>
          <div className={s.dataArea}>
            <div className={s.dataItems}>
              <p>ID</p>
              <input className={s.dataInput} type="text" name="id" value={id} onChange={handleId} ></input>
            </div>

            <div className={s.dataItems}>
              <p>PW</p>
              <input className={s.dataInputs}  type="text" name="pw"  onChange={handlePw} placeholder="***" ></input>
            </div>

            <div className={s.dataItems}>
              <p>Email</p>
              <input className={s.dataInput} type="text" name="email" value={email} onChange={handleEmail} ></input>
            </div>
            
            <Button className={s.databtn} onClick={modify}>수정하기</Button>
          </div>
        </div>
            <Button className={s.btnDel} onClick={deleteId}>회원탈퇴</Button>
      </div>
    </div>
  </div>
  );
};

export default DetailState;