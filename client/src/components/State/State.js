import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import MyState from './MyState';

const State = () => {
    const history = useHistory();

    const [loginState, setLoginState] = useState(false)
    useEffect(()=>{
        if(sessionStorage.getItem('user_id') !== null){
            setLoginState(true)
        }
    },[])
    function change(){
        if(loginState){
            history.push({
                pathname:'/detailState'
            })
            // window.location.reload()
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
            {/* <Button onClick={change}>{loginState? <MyState></MyState> : "Login"}</Button> */}
        </div>
    );
};

export default State;
