import React, { useState, useEffect } from 'react';
import S_modalForm from './S_modalForm';
import ReactApexChart from 'react-apexcharts'
import s from "../../../css/Sonik.module.css"

// Sonik으로 부터 받은 props로 모달창의 동작과 결과값을 출력한다

const ResultModal = (props) => {

  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const [totalSales, setTotalSales] = useState() //Sonik.js로 부터 props로 받아온 총매출을 초기화/변경하기 위한 useState()
  const [fixCost, setFixCost] = useState() // props로 받아온 고정비용을 초기화/변경 하기 위한 useState
  const [varCost, setVarCost] = useState() // props로 받아온 변동비용을 초기화/변경 하기 위한 useState
  const [break_even, setBreak_even] = useState() // props로 받아온 손익분기점을 초기화/변경 하기 위한 useState
  const [netProfit, setNetProfit] = useState() // props로 받아온 목표순이익 초기화/변경 하기 위한 useState
  const [target_sales, setTarget_sales] = useState() // props로 받아온 목표 매출을 초기화/변경 하기 위한 useState
  const [avgPrice, setAvgPrice] = useState() // props로 받아온 매뉴들의 평균 단가를 초기화/변경 하기 위한 useState
  const [target_volume, setTarget_volume] = useState() // props로 받아온 일 목표 판매량을 초기화/변경 하기 위한 useState
  

  // 해당 컴포넌트 렌더링시 Sonik.js로 부터 props로 받아온 값들을 해당 컴포넌트에서 사용하기위해 알맞은 각 변수에 
  // useState()로 초기화 하는 useEffect
  useEffect(() => {  
    setTotalSales(props.totalSales) 
    setFixCost(props.fixCost)
    setVarCost(props.varCost)
    setBreak_even(props.break_even)
    setAvgPrice(props.avgPrice)
    setNetProfit(props.netProfit)
    setTarget_sales(props.target_sales)
    setTarget_volume(props.target_volume)
  }, [props]) // useEffect는 props의 상태가 바뀔 때마다 {}안의 내용을 수행한다.

  const openModal = () => { // 커스텀 모달창을 여는 함수
    setModalOpen(true); // ModalOpen useState()상태를 변경

  };

  const closeModal = () => { // 커스텀 모달창을 닫는 함수
    setModalOpen(false); // ModalOpen useState()상태를 변경
  };

  function OpenClickEvent() { // 모달창을 여는 버튼을 클릭했을 때 발생되는 함수
    openModal() // 모달창 열기 함수 호출
    props.calc() // Sonik.js로부터 props로 받아온 calc()함수 호출
  }

  function CloseClickEvent(){ // 모달창을 닫는 버튼을 클릭했을 때 발생되는 함수
    window.location.replace("/sonik") // 손익분기점 페이지 자체를 새로고침 -> props로 받아온 값들의 꼬임 현상으로 인하여 대처 방법을 찾지못해 임시방편으로 처리
    closeModal() // 모달창을 닫느 함수 호출
  }

  const series1 = [{ // 분기당 매출, 고정비용, 변동비용이 입력됬을 때 그래프선의 의미, 그래프선상에 표시될 값들이 저장된 변수
    name: '수익',
    data: [0, totalSales, totalSales * 2]
  }, {
    name: '지출',
    data: [fixCost, fixCost + varCost, Math.ceil((fixCost + varCost) + ((fixCost + varCost) / 3))]
  }
  ]
  const series2 = [{ // 분기당 매출, 고정비용, 변동비용, 목표순이익이 입력됬을 때 그래프선의 의미, 그래프선상에 표시될 값들이 저장된 변수
    name: '수익',
    data: [0, totalSales, target_sales]
  }, {
    name: '지출',
    data: [fixCost, fixCost + varCost, Math.ceil((fixCost + varCost) + ((fixCost + varCost) / 3))]
  }
  ]

  const options1 = { // 분기당 매출, 고정비용, 변동비용이 입력됬을 때 그래프 전체에 적용되는 옵션(그래프 크기, 애니메이션 등)
    chart: {
      height: 350,
      type: 'line'
    },
    zoom: {
      enabled: false
    },
    animations: {
      enabled: false
    },
    stroke: {
      width: [5, 5, 10],
      curve: 'straight'
    },
    xaxis: {
      categories: ['판매량 0', "판매량 N", "판매량 2N"]
    },
  }

  const options2 = { // 분기당 매출, 고정비용, 변동비용, 목표순이익이 입력됬을 때 그래프 전체에 적용되는 옵션(그래프 크기, 애니메이션 등)
    chart: {
      height: 350,
      type: 'line'
    },
    zoom: {
      enabled: false
    },
    animations: {
      enabled: false
    },
    stroke: {
      width: [5, 5, 10],
      curve: 'straight'
    },
    labels: [0+"개", (target_volume/2) +"개", target_volume + "개"],
    xaxis: {
    },
  }

  return (
    <React.Fragment> 
      <button className={s.button2} onClick={OpenClickEvent}>계산</button> {/* 계산 버튼이 눌렸을 때, 발생되는 event(함수)호출과 css적용 */}

      <S_modalForm open={modalOpen} close={CloseClickEvent} header="계산결과"> {/* S_Modal로 props에 modalOpen uesState와 closeModal함수 전달 */}
        {/* // Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 모달 */}
        {props.result} {/* Sonik.js로 부터 props로 받아온 결과값 출력 */}
        <div>
          { /* 총매출, 고정비용, 변동비용이 모두 입력된 경우에 */
            (Boolean(totalSales && fixCost && varCost)) === true
              ? <ReactApexChart options={ /* ReactApexChart 그래프 태그의 options의 값은 */
                (Boolean(netProfit && avgPrice)) === true /* 목표 순이익, 메뉴들의 평균 단가가 입력되었을 때 */
                  ? options2 /* option2로 사용 */
                  : options1 /* 그렇지 않은 경우에는 option1으로 사용 */
              } series={ /* ReactApexChart 그래프 태그의 series의 값은 */
                (Boolean(netProfit)) === true /* 목표 순이익이 입력된 경우에  */
                  ? series2 /* series값은 series2를 사용 */
                  : series1 /* 그렇지 않은 경우에는 series1사용 */
              } type="area" height={350} />
              : <div/>
          }
          <br />
          ※ 수익선과 지출선의 교차점이 손익분기점에 해당되는 지점입니다.<br />
          ※ 수익선이 지출선 보다 아래로 위치한 경우 적자이며, 위로 위치한 경우 흑자입니다.<br />
          <div>
            { /* 분기 당 매출, 고정비용, 변동비용, 목표순이익이 입력 되었을때 */
              (Boolean(totalSales && fixCost && varCost && netProfit)) === true 
                ? <div> {/* 아래에 작성한 text출력 */}
                  ※ X축은 판매량, Y축은 금액으로 단위는 만원 입니다.<br />
                  ※ 수익선의 가운데 Y값은 현재 분기당 매출이며, 가장 끝 Y값은 목표 순이익을 위한 목표 매출금액입니다.<br />
                  ※ 지출선의 가운데 Y값은 현재 발생하는 고정비와 변동비의 합이며, 가장 끝 Y값은 고정비와 변동비의 미래 예측치의 합으로 정확하지 않습니다.
                </div>
                : <div>{/* 그렇지 않은 경우에 아래의 text출력 */}
                  ※ X축은 판매량, Y축은 금액으로 단위는 만원 입니다.<br />
                  ※ 수익선의 가운데 Y값은 현재 분기당 매출이며, 가장 끝 Y값은 미래 예상 매출금액으로 시각적 정리를 위해 표기한 것으로 정확하지 않습니다.<br />
                  ※ 지출선의 가운데 Y값은 현재 발생하는 고정비와 변동비의 합이며, 가장 끝 Y값은 고정비와 변동비의 미래 예측치의 합으로 정확하지 않습니다.
                </div>
            }
          </div>
        </div>
      </S_modalForm>
    </React.Fragment>
  )
}

export default ResultModal