import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
//게시판 추가
const AddBoard = () => {

    const history = useHistory();
    const [boardTitle, setBoardTitle] = useState("");
    const [boardContent, setBoardConetent]= useState("");

    function handleBoardTitle(e){
        e.preventDefault();
        setBoardTitle(e.target.value)
    }
    function handleBoardContent(e){
        e.preventDefault();
        setBoardConetent(e.target.value);
    }
    function addBoard(){
        const userData = {
            title: boardTitle,
            content: boardContent,
            writer: sessionStorage.getItem('user_id')
        }
        axios.post("http://localhost:5000/api/board", userData)
        .then((res)=>{
            if(res.status===200){
                alert("생성이 완료되었습니다.")
                history.push('/board')
            }
            else{
                alert("생성이 실패하였습니다.")
            }
        })
    }
    
    return (
        <div>
            <h1>게시글 작성</h1>
            제목:<input type="text" name="boardTitle" value={boardTitle} onChange={handleBoardTitle}></input> <br/><br/>
            내용:<textarea name="boardContent" value={boardContent} onChange={handleBoardContent}></textarea><br/>
            <Button onClick={addBoard}>완료</Button> {' '}
            <Link to='/board'>
            <Button>취소</Button>
            </Link>
        </div>
    );
};

export default AddBoard;
