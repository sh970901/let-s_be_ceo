import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap'
import { useState } from 'react';
import BoardInfo from './BoardInfo';
import { Link, useHistory } from 'react-router-dom';
import s from '../../css/Board.module.css'

import { UilSearch } from '@iconscout/react-unicons'


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
        <div className={s.board}>

            

            <div className={s.btnPlace}>
                    <button className={s.btnBoard} onClick={writeBoard}> 게시글 쓰기</button>
                    <Link to='/myBoard'>
                        <button className={s.btnBoard}> 내가 쓴 글</button>
                    </Link>
            </div>

            <div className={s.Ssearch}>
                {/* <div className={s.searchInputs}>
                    <UilSearch></UilSearch>
                    <input className={s.searchInput} type="text" name="searchData" value={searchData} onChange={handleSearch} placeholder="검색하기"></input>
                </div>
                <button className={s.searchBtn} onClick={searchBoard}>검색</button> */}
            </div>

            
            <div className={s.boardBody}>
                {/* <h1>자유게시판</h1> */}
                <Table className={s.table} striped hover size="sm">
                    <thead>
                        <tr>
                            <th className={s.date}>날짜</th>
                            <th className={s.title}>제목</th>
                            {/* <th className={s.content}>내용</th> */}
                            <th className={s.writer}>작성자</th>
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
            
            <div className={s.search}>
                <div className={s.searchInputs}>
                    <UilSearch></UilSearch>
                    <input className={s.searchInput} type="text" name="searchData" value={searchData} onChange={handleSearch} placeholder="검색하기"></input>
                </div>
                <button className={s.searchBtn} onClick={searchBoard}>검색</button>
            </div>

        </div>
    );
};

export default Board;