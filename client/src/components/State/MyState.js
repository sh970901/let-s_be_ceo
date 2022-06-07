import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

//사용자의 로그인 상태에 따라 로그인, 비로그인을 표시하며 각 상태마다 기능을 구분한다.

const MyState = () => {
    const [info, setInfo] = useState("비로그인")
    const history = useHistory();

    //세션에 저장된 아이디 값이 null인지 확인
    useEffect(()=>{
        if(sessionStorage.getItem('user_id')!==null){
            setInfo(sessionStorage.getItem('user_id'))
        }
    },[])
    //로그아웃 버튼 클릭 시 
    function logOut(e){
        e.preventDefault();
        sessionStorage.removeItem('user_id');
        history.push({
            pathname: '/login'
        })
        window.location.reload();
    }
    //내 정보 확인하기
    function detailInfo(){
        history.push('/DetailState')
    }
    return (
        <div>
            <input type="text" value={info} disabled ></input><br/>
            <Button onClick={detailInfo}>내 정보</Button>{' '}<Button onClick={logOut}>LOGOUT</Button>
        </div>
    );
};

export default MyState;