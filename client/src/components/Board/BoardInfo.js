import React from 'react';
import { useHistory } from 'react-router-dom';


//각 개시글을 하나씩 뽑아내는 컴포넌트 
const BoardInfo = (props) => {
    const history = useHistory()

    //게시글 선택시 게시글 상세정보로 이동
    function selectBoard(e){
        e.preventDefault();
        history.push({
            pathname:'/boardDetail',
            state: {props: props}
        })
    }
    return (
     <tr onClick={selectBoard}>
         <td>{props.day}</td>
         <td>{props.title}</td>
         <td>{props.writer}</td>
     </tr>  
    )
};

export default BoardInfo;