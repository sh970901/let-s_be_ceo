import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
//내정보보기
const MyState = () => {
    const [info, setInfo] = useState("비로그인")
    const history = useHistory();

    useEffect(()=>{
        if(sessionStorage.getItem('user_id')!==null){
            setInfo(sessionStorage.getItem('user_id'))
        }
    },[])
    function logOut(e){
        e.preventDefault();
        sessionStorage.removeItem('user_id');
        history.push({
            pathname: '/login'
        })
        window.location.reload();
    }
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
