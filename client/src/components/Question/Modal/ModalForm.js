import React from 'react'
import './Modal.css'

// 모달창의 틀 역할을 하며 css파일의 형식에 맞게 모달창을 띄움

const S_modalForm = (props) => { 
  const { open, close, header } = props; // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
 

  return (
     // 모달이 열릴때 openModal 클래스가 생성된다.
     <div className={open ? 'openModal modal' : 'modal'}>
     {open ? (
       <section>
         <header>
           {header} {/* 띄울 모달창의 제목을 띄우는 곳 정도로 생각 */}
           <button className="close" onClick={close}>
             &times;
           </button>
         </header>
         <main>{props.children}</main> {/* 호출한 모달창의 내용을 입력한다. */}
         <footer>
           <button className="close" onClick={close}>
             close
           </button>
         </footer>
       </section>
     ) : null}
   </div>
  )
}

export default S_modalForm