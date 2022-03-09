import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
//ID/PW찾기
const FindLogin = () => {

    const [mailFindId, setMailFindId] = useState("")
    const [mailFindPw, setMailFindPw] = useState("")
    const [idFind, setIdFind] = useState("")

    function handleMailId(e){
        e.preventDefault();
        setMailFindId(e.target.value);
    }
    function handleMailPw(e){
        e.preventDefault();
        setMailFindPw(e.target.value);
    }
    function handleId(e){
        e.preventDefault();
        setIdFind(e.target.value);
    }
    function checkEmail(e){
        e.preventDefault();
        fetch("http://localhost:5000/api/login")
        .then((res)=>(res.json()))
        .then((data)=> {
            for(var i=0; i < data.length; i++){
                if(mailFindId === data[i].Email){
                    alert(`당신의 아이디는 :  ${data[i].ID}입니다.`)
                    break;
                }
                else{
                    if(i===data.length-1){
                        alert("존재하는 아이디가 없습니다.")
                    }
                }
            }
        })
    }
    function checkPW(e){
        e.preventDefault();
        fetch("http://localhost:5000/api/login")
        .then((res)=>(res.json()))
        .then((data)=> {
            for(var i=0; i < data.length; i++){
                if(idFind===data[i].ID){
                    if(mailFindPw === data[i].Email){
                        alert(`비밀번호는 ${data[i].PW}입니다.`)
                        break;
                    }
                }
                else{
                    if(i===data.length-1){
                    alert("ID 또는 Email이 잘못입력되었습니다.")
                }}
            }
        })
    }
    return (
        <div>
            <h1>ID/PW찾기</h1>
            <h3>아이디 찾기</h3>
            이메일: <input type="text" name='mailFindId' value={mailFindId} onChange={handleMailId} ></input>{"  "}
            <Button onClick={checkEmail}>찾기</Button>
            <h3>비밀번호 찾기</h3>
            아이디: <input type='text' name='idFind' value={idFind} onChange={handleId}></input><br/>
            이메일: <input type='text' name='mailFindPw' value={mailFindPw} onChange={handleMailPw}></input>{"  "}
            <Button onClick={checkPW}>찾기</Button>
            <br/><br/><br/>
            <Link to ='/login'>
            <Button>돌아가기</Button>
            </Link>
        </div>
    );
};

export default FindLogin;
