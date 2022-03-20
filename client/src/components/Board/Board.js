import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap'
import { useState } from 'react';
import BoardInfo from './BoardInfo';
import { Link, useHistory } from 'react-router-dom';
//게시판
const Board = () => {
    const [boards, setBoards] = useState([])
    const [searchData, setSearchData] = useState("")
    const history = useHistory();
    
    useEffect(() => {
        fetch('http://localhost:5000/api/board')
            .then((res) => (res.json()))
            .then((data) => {
                setBoards(data)
            })
    }, [searchData])

    function handleSearch(e){
        e.preventDefault();
        setSearchData(e.target.value)
    }
    function searchBoard(e){
        e.preventDefault();
        console.log(`${searchData}로 검색`)
        const board=boards.filter((c)=>c.b_title.includes(searchData))
        // console.log(board)
        setBoards(board)    
    }
    function writeBoard(e){
        e.preventDefault();
        if(sessionStorage.getItem('user_id')!==null){
            history.push({
                pathname:'/addBoard'
            })
        }else{
            alert("로그인 후 사용가능합니다.")
            history.push({
                pathname:'/login'
            })
        }
        
    }

    return (
        <div>
            <h1>게시판</h1>{' '}<input type="text" name="searchData" value={searchData} onChange={handleSearch} placeholder="검색하기"></input>{' '}<Button onClick={searchBoard}>검색</Button>
            <div className='allBoard'>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>날짜</th>
                            <th>작성자</th>
                            <th>내용</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boards ? boards.map(c => {
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
            </div>
            
                <Button onClick={writeBoard}>게시글 쓰기</Button> {' '}
            
            <Link to='/myBoard'>
                <Button>내가 쓴 끌</Button>
            </Link>{' '}
        
        </div>
    );
};

export default Board;
