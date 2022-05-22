import React from 'react';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import s from "../../css/Login.module.css";

//회원가입
const AddLogin = () => {
    const [addId, setAddId] = useState("")
    const [addPw, setAddPw] = useState("")
    const [addEmail, setAddEmail] = useState("")
    const [addPwCh, setAddPwCh] = useState("")
    const [usableID, setUsableID] = useState(false)

    const history = useHistory();

    function handleAddId(e) {
        e.preventDefault();
        setAddId(e.target.value);
    };
    function handleAddPw(e) {
        e.preventDefault();
        setAddPw(e.target.value);
    }
    function handleAddEmail(e) {
        e.preventDefault();
        setAddEmail(e.target.value);
    }
    function handleAddPwCh(e) {
        e.preventDefault();
        setAddPwCh(e.target.value);
    }
    function idCheck(e) {
        e.preventDefault();
        fetch("http://localhost:5000/api/login")
            .then((res) => (res.json()))
            .then((data) => {
                if(addId===""){
                    alert("아이디를 입력하세요")
                }else{
                for (var i = 0; i < data.length; i++) {
                    if (data[i].ID === addId) {
                        alert("존재하는 아이디입니다.")
                        setUsableID(false);
                        break;
                    }else{
                        if(i===data.length-1){
                            alert("사용가능한 아이디입니다.")
                            setUsableID(true);
                        }                 
                    }               
                }}           
            })
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (usableID === true) {
            if (addPw !== addPwCh) {
                return alert('비밀번호와 비밀번호 확인이 다릅니다.')
            } else {
                const userData = {
                    id: addId,
                    password: addPw,
                    email: addEmail
                };
                axios.post("http://localhost:5000/api/login", userData)
                    .then((res) => {
                        if(res.status===200){
                            alert("생성이 완료되었습니다.")
                            history.push('/login')
                        }
                    })
            }
        } else if(usableID === false) {
            alert("아이디 중복체크하세요")
        }
    }
    
    return (
        <div className={s.login__container}>
            <form onSubmit={handleFormSubmit} className={s.signup__form}>
                <div className={s.logo}>
                    <h1>Sign up</h1>
                </div>

                <div className={s.sign__userid}>
                    <div className={s.int__area}>
                        <input type='text' name='inputId' value={addId} onChange={handleAddId}></input>
                        <label for="id">USER ID</label>
                    </div>
                    <button onClick={idCheck} className={s.sign__btn}>중복체크</button>
                </div>
                
                <div className={s.int__area}>
                    <input type="password" name='inputPw' value={addPw} onChange={handleAddPw}></input>
                    <label for="id">PASSWORD</label>
                </div>

                <div className={s.int__area}>
                    <input type="password" name='inputPwCh' value={addPwCh} onChange={handleAddPwCh}></input>
                    <label for="id">PASSWORD</label>
                </div>

                <div className={s.int__area}>
                    <input type='text' name='inputEmail' value={addEmail} onChange={handleAddEmail}></input>
                    <label for="id">E-MAIL</label>
                </div>

                <div className={s.sign__btnarea}>
                    <button type='submit' className={s.btn}>가입</button>
                    <Link to='/login' className={s.link}>Back</Link>
                </div>
            </form>   


        </div>
    );
};

export default AddLogin;