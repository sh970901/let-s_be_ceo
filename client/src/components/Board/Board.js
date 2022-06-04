import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap'
import { useState } from 'react';
import BoardInfo from './BoardInfo';
import { Link, useHistory } from 'react-router-dom';
import s from '../../css/Board.module.css'

import { UilSearch } from '@iconscout/react-unicons'

//게시판을 담당하며 렌더링될때 모든 게시글을 불러오며 
//게시글 쓰기 및 게시글 조회, 내가 쓴 글 조회, 해당 게시글 검색 등의 기능을 포함한다.


const Board = () => {
    const [boards, setBoards] = useState([])
    const [searchData, setSearchData] = useState("")
    const history = useHistory();
    
    //모든 게시글을 불러오며 게시글을 검색 후 다시 모든 게시글을 불러온다.
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
    //filter 함수를 활용하여 해당하는 텍스트를 포함하는 게시글을 불러온다.
    function searchBoard(e){
        e.preventDefault();
        const board=boards.filter((c)=>c.b_title.includes(searchData))
        setBoards(board)    
    }

    //로그인 된 사용자만 게시글을 작성할 수 있도록 설정 
    function writeBoard(e){
        e.preventDefault();
        //sessionStorage에 저장된 user_id값을 활용
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
            </div>  
            <div className={s.boardBody}>
                <Table className={s.table} striped hover size="sm">
                    <thead>
                        <tr>
                            <th className={s.date}>날짜</th>
                            <th className={s.title}>제목</th>
                            <th className={s.writer}>작성자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 모든 게시글에 대한 정보를 map함수를 활용하여 하나씩 담아온다 */}
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