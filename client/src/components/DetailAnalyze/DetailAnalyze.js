import React from 'react'
import {useLocation} from "react-router-dom";


const DetailAnalyze = () => {
const location = useLocation();

function show(){
    console.log(location.state)
}
  return (
    <div>
        <button onClick={show}>dd</button>
        DetailAnalyze</div>
  )
}

export default DetailAnalyze