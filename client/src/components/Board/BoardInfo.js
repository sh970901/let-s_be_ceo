import React from 'react';
import { useHistory } from 'react-router-dom';

//게시판 꺼내기
const BoardInfo = (props) => {
    const history = useHistory()
    function selectBoard(e){
        e.preventDefault();
        history.push({
            pathname:'/boardDetail',
            state: {props: props}
        })
    }
    return (
     <tr onClick={selectBoard}>
         <td>{props.title}</td>
         <td>{props.day}</td>
         <td>{props.writer}</td>
         <td>{props.content}</td>
     </tr>  
    )
};

export default BoardInfo;
