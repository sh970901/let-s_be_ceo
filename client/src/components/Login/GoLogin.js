import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
        <div>
           <h1>로그인</h1>
            ID: <input type='text' name='inputId' value={inputId} onChange={handleInputId}></input><br/>
    
            PW: <input type="password" name='inputPw' value={inputPw} onChange={handleInputPw}></input><br /><br />
            <Button onClick={checkLogin} >LOGIN</Button>{'   '}  
            <Link to='/addLogin'>
                <Button>회원가입</Button>
            </Link>
            {'   '}
            <Link to='/findLogin'>
                <Button>ID/PW 찾기</Button>
            </Link>
            <br></br><br></br>
            <Link to="/">
                <Button>메인으로</Button>
            </Link>
        </div>
    );
};

export default GoLogin;
