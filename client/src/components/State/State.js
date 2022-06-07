import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import MyState from './MyState';

//오른쪽 상단 위에 사용자의 로그인상태를 표시하며 로그인 및 로그아웃 기능이 있다.

const State = () => {
    const history = useHistory();
    const [loginState, setLoginState] = useState(false)
    
    useEffect(()=>{
        if(sessionStorage.getItem('user_id') !== null){
            setLoginState(true)
        }
    },[])

    //로그인 상태에 따라 로그인 시 상세정보, 비로그인 시 로그인을 진행하도록 기능 제공
    function change(){
        if(loginState){
            history.push({
                pathname:'/detailState'
            })
        
        }
        else{
            history.push({
                pathname:'/login'
            })
        }
    }
    return (
        <div >
            {loginState ? <MyState></MyState> : <Button onClick={change}>LOGIN</Button>}
        </div>
    );
};

export default State;
