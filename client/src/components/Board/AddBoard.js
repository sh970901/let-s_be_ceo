import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

//-----------------CSS import--------------------//
import s from '../../css/Board.module.css';

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
        <div className={s.board}>
            <div className={s.createBoard}>
                <h1>Create Board</h1>

                <div className={s.createBody}>
                    <div className={s.createInputs}>
                        <label for="" className={s.createLabel}>Board Title</label>
                        <input type="text" name="boardTitle" value={boardTitle} onChange={handleBoardTitle}
                        className={s.createInput}></input>
                    </div>

                    <div className={s.createInputs}>
                        <label for="" className={s.createLabel}>Board Content</label>
                        <textarea name="boardContent" value={boardContent} onChange={handleBoardContent}
                        className={s.createInputText} rows="10"></textarea>
                    </div>
                </div>

                <div className={s.btnArea}>
                <Button onClick={addBoard} className={s.btn}>완료</Button>
                <Link to='/board'><Button className={s.btn}>취소</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default AddBoard;