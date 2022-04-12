import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import s from "../../css/Login.module.css";

//로그인
const GoLogin = () => {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const history = useHistory();

    function handleInputId(e) {
        e.preventDefault();
        setInputId(e.target.value);
    };
    function handleInputPw(e) {
        e.preventDefault();
        setInputPw(e.target.value);
    }
    function checkLogin() {
        fetch("http://localhost:5000/api/login")
            .then((res) => (res.json()))
            .then(data => {
                for (var i = 0; i < data.length; i++) {
                    if (inputId === data[i].ID) {
                        if (inputPw === data[i].PW) {
                            alert("로그인 성공")
                            sessionStorage.setItem('user_id',inputId)
                            history.push({
                                pathname: '/',
                                state: {
                                    id: inputId,
                                    pw: inputPw
                                }
                            })
                            window.location.reload()
                            break;
                        }else{
                            alert("비밀번호가 잘못되었습니다")
                            break;
                        } }
                    else {
                        if (i === data.length-1) {
                            alert('존재하지 않는 ID 입니다')
                        }
                    }
                }
            })
    }
    
    return (
        <div className={s.login__container}>
            <div className={s.login__form}>
                <div className={s.logo}>
                    <h1>Login</h1>
                </div>

                <div>
                    <div className={s.int__area}>
                        <input type='text' name='inputId' value={inputId} onChange={handleInputId}></input>
                        <label for="id"> USER ID</label>
                    </div>

                    <div className={s.int__area}>
                        <input type="password" name='inputPw' value={inputPw} onChange={handleInputPw}></input>
                        <label for="pw"> PASSWORD</label>
                    </div>

                    <div className={s.btn__area}>
                        <div>
                            <button onClick={checkLogin} className={s.btn}>LOGIN</button>
                        </div>
                        <div>
                            <Link to='/addLogin'><button className={s.btn}>회원가입</button></Link>
                        </div>
                    </div>
                </div>

                <div className={s.link__area}>
                    <div className={s.link__div}>
                        <Link to='/findLogin' className={s.link}>
                            forgot Password?
                        </Link>
                    </div>
                    <div className={s.link__div}>
                        <Link to="/" className={s.link}>
                            go main
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoLogin;