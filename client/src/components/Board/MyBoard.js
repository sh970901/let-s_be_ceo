import React from 'react';
import { Button, Table } from 'react-bootstrap';
import BoardInfo from './BoardInfo';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//내 게시글 보기
const MyBoard = () => {
    const [myBoard, setMyBoard] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/api/board/${sessionStorage.getItem('user_id')}`)
            .then((res) => (res.json()))
            .then((data) => {
                setMyBoard(data)
            })
    }, [])
    return (
        <div>
            <h1>내가 쓴 게시글</h1>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>제목</th>
                        <th>날짜</th>
                        <th>작성자</th>
                        <th>내용</th>
                    </tr>
                </thead>
                <tbody>
                    {myBoard ? myBoard.map(c => {
                        return (<BoardInfo
                            key={c.no_board}
                            no={c.no_board}
                            writer={c.b_writer}
                            title={c.b_title}
                            content={c.b_content}
                            day={c.b_day}>
                        </BoardInfo>)
                    }) :
                        <tr>
                            <td>
                                게시글 조회불가
                            </td>
                        </tr>}
                </tbody>
            </Table>
            <Link to ="/board">
            <Button>뒤로가기</Button>
            </Link>
            

        </div>
    );
};

export default MyBoard;
