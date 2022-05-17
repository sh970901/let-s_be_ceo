import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Comment from './Comment';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UilArrowLeft } from '@iconscout/react-unicons'

//-----------------CSS import--------------------//
import s from '../../css/Board.module.css';

//게시판 상세보기
const BoardDetail = () => {
    const history = useHistory();
    const location = useLocation();
    const [comment, setComment] = useState("");
    const [commentRead, setCommentRead] = useState([]);
    // function fetchBoard(){
    //     fetch(`http://localhost:5000/api/comment/${location.state.props.title}`)
    //     .then(res=>res.json())
    //     .then(data=> {
    //         setCommentRead(data)
    //     })
    // }
    useEffect(()=>{
        fetch(`http://localhost:5000/api/comment/${location.state.props.title}`)
        .then(res=>res.json())
        .then(data=> {
            setCommentRead(data)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    function handleComment(e){
        e.preventDefault();
        setComment(e.target.value)
    }
    function writeComment(e){
        e.preventDefault();
        if(sessionStorage.getItem('user_id')!==null){
            if(comment === ""){
                alert("값을 입력하세요")
            }else{
                const userData = {
                    id: sessionStorage.getItem("user_id"),
                    comment: comment,
                    title: location.state.props.title
                }
                axios.post("http://localhost:5000/api/comment",userData)
                .then((res)=>{
                    if(res.status ===200){
                        alert("댓글 생성완료")
                        window.location.reload()
                    }
                })
            }
        }
        else{alert("로그인 후 사용가능합니다.")}

    }
    function deleteBoard(){
        const url = `http://localhost:5000/api/board/${location.state.props.no}`
        fetch(url, {
            method: 'DELETE'
        }).then((res)=>{
            if(res.status===200){
                alert("게시글이 삭제됨")
            } else{
                alert("게시글 삭제 실패")
            }})
        
        history.push('/board')
    }
    

    return (
        <div className={s.detailBoard}>
            <div>
            <Link to='/board'>
                <button className={s.btnBack}><UilArrowLeft/>Back</button>
            </Link>
            
            </div>
            <div className={s.createBoard}>
                <div className={s.detailTitleContainer}>
                    <div className={s.detailTitle}>
                        <div className={s.titleDiv}>
                            <span className={s.boardText}>TITLE</span>
                            <span>{location.state.props.title}</span>
                        </div>
                        <div className={s.DateDiv}>
                            <span className={s.boardText}>DATE</span>
                            <span>{location.state.props.day}</span>
                        </div>
                    </div>

                    <div className={s.detailTitle}>
                        <div className={s.titleDiv}>
                            <span className={s.boardText}>작성자</span>
                            <span>{location.state.props.writer}</span>
                        </div>
                    </div>
                </div>

                <div className={s.detailContent}>
                    <div className={s.titleDiv}>
                        {/* <span className={s.boardText}>CONTENT</span> */}
                    </div>
                    <textarea className={s.textarea} value={location.state.props.content} readOnly></textarea>            
                </div>    


                <div className={s.detailComment}>
                <span className={s.boardText}>Comment</span>
                    <Table striped bordered hover size="sm" className={s.commentTable}>
                        <thead>
                            <tr>
                                <th className={s.commentId}>ID</th>
                                <th className={s.comment}>댓글</th>
                                <th className={s.commentDate}>날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            {commentRead ? commentRead.map(c=>{
                                return(<Comment
                                key={c.no_comment}
                                no = {c.no_comment}
                                id={c.c_id}
                                comment={c.c_comment}
                                day = {c.c_day}></Comment>)
                            }): 
                            <tr>
                                <td>
                                    댓글 없음
                                </td>
                            </tr>}
                        </tbody>
                    </Table>
                </div>

                <div className={s.addComment}>
                    <div className={s.add}>
                        <span>댓글달기</span>
                        <input className={s.commentInput} type="text" value={comment} onChange={handleComment}></input>      
                        <button className={s.btn} onClick={writeComment}>입력</button>
                    </div> 

                    <div className={s.commentbtnArea}>
                        {location.state.props.writer === sessionStorage.getItem('user_id') ? <button className={s.btnDel} onClick={deleteBoard}>게시글 삭제</button> : ""}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardDetail;