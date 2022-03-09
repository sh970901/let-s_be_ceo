import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Comment from './Comment';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        <div>
            <h1>게시글 상세 페이지</h1>
            <h2>제목</h2>
            <input type='text' value={location.state.props.title} readOnly></input>
            <p></p>
            <h2>날짜</h2>
            <input type='text' value={location.state.props.day} readOnly></input>
            <h2>작성자</h2>
            <input type='text' value={location.state.props.writer} readOnly></input>
            <h2>내용</h2>
            <textarea value={location.state.props.content} readOnly></textarea>
            <br /><br />
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>날짜</th>
                        <th>댓글</th>
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

            <h2>댓글</h2>
            <input type="text" value={comment} onChange={handleComment}></input>      
            <br></br>
            <Button onClick={writeComment}>댓글 달기</Button><br></br><br></br> 
            {location.state.props.writer === sessionStorage.getItem('user_id') ? <Button onClick={deleteBoard}>게시글 삭제</Button> : ""}
            {'  '}<Link to='/board'>
                <Button>뒤로가기</Button>
            </Link>
        </div>
    );
};

export default BoardDetail;
