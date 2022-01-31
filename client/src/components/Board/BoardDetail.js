import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const BoardDetail = () => {
    const location = useLocation();
    useEffect(()=>{
        fetch(`http://localhost:5000/api/comment/${location.state.props.title}`)
        .then(res=>res.json())
        .then(data=> {
            setComments(data)
        })
    },[])
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
            <input type='text' value={location.state.props.content} readOnly></input>
            <br /><br />
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>작성자</th>
                        <th>댓글</th>
                    </tr>
                </thead>
                <tbody>
                    {}
                </tbody>
            </Table>
        </div>
    );
};

export default BoardDetail;
