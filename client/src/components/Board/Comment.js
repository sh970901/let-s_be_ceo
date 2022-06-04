import React from 'react';
import { Button } from 'react-bootstrap';

//해당 게시글에 등록되어있는 댓글의 정보를 하나씩 받아오는 컴포넌트
const Comment = (props) => {
    //댓글 삭제를 위한 함수
    function deleteComment(){
        const url = `http://localhost:5000/api/comment/${props.no}`
        fetch(url, {
            method: 'DELETE'
        })
        alert("댓글 삭제 완료")
        window.location.reload()
    }
    return (
        <>
        <tr>
            <td>{props.id}</td>
            <td>{props.comment}</td>
            <td>{props.day}</td>
        </tr>
        {/* 댓글 작성자만 삭제할 수 있도록 설정 */}
        {props.id===sessionStorage.getItem("user_id")? <Button onClick={deleteComment}>삭제</Button>: ''}
        </>
    );
};

export default Comment;