import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
//댓글관리
const Comment = (props) => {
    const history = useHistory()
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
        {props.id===sessionStorage.getItem("user_id")? <Button onClick={deleteComment}>삭제</Button>: ''}
        </>
    );
};

export default Comment;