import React, { useState, useEffect } from 'react';
import S_modalForm from './S_modalForm';
import ReactApexChart from 'react-apexcharts'
import s from "../../../css/Sonik.module.css"

// Sonik으로 부터 받은 props로 모달창의 동작과 결과값을 출력한다

const ResultModal = (props) => {

  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const [totalSales, setTotalSales] = useState()
  const [fixCost, setFixCost] = useState()
  const [varCost, setVarCost] = useState()
  const [break_even, setBreak_even] = useState()
  const [netProfit, setNetProfit] = useState()
  const [target_sales, setTarget_sales] = useState()
  const [avgPrice, setAvgPrice] = useState()
  const [target_volume, setTarget_volume] = useState()
  
  useEffect(() => {
    setTotalSales(props.totalSales)
    setFixCost(props.fixCost)
    setVarCost(props.varCost)
    setBreak_even(props.break_even)
    setAvgPrice(props.avgPrice)
    setNetProfit(props.netProfit)
    setTarget_sales(props.target_sales)
    setTarget_volume(props.target_volume)
  }, [props])

  const openModal = () => {
    setModalOpen(true);

  };

  const closeModal = () => {
    setModalOpen(false);
  };

  function OpenClickEvent() {
    openModal()
    props.calc()
  }

  function CloseClickEvent(){
    window.location.replace("/sonik")
    closeModal()
  }

  const series1 = [{
    name: '수익',
    data: [0, totalSales, totalSales * 2]
  }, {
    name: '지출',
    data: [fixCost, fixCost + varCost, Math.ceil((fixCost + varCost) + ((fixCost + varCost) / 3))]
  }
  ]
  const series2 = [{
    name: '수익',
    data: [0, totalSales, target_sales]
  }, {
    name: '지출',
    data: [fixCost, fixCost + varCost, Math.ceil((fixCost + varCost) + ((fixCost + varCost) / 3))]
  }
  ]

  const options1 = {
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

  const options2 = {
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
      <button className={s.button2} onClick={OpenClickEvent}>계산</button>
      {/* header 부분에 텍스트를 입력한다,  */}

      <S_modalForm open={modalOpen} close={CloseClickEvent} header="계산결과"> {/* S_Modal로 props에 modalOpen uesState와 closeModal함수 전달 */}
        {/* // Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 모달 */}
        {props.result}
        <div>
          {
            (Boolean(totalSales && fixCost && varCost)) === true
              ? <ReactApexChart options={
                (Boolean(netProfit && avgPrice)) === true
                  ? options2
                  : options1
              } series={
                (Boolean(netProfit)) === true
                  ? series2
                  : series1
              } type="area" height={350} />
              : <div/>
          }
          <br />
          ※ 수익선과 지출선의 교차점이 손익분기점에 해당되는 지점입니다.<br />
          ※ 수익선이 지출선 보다 아래로 위치한 경우 적자이며, 위로 위치한 경우 흑자입니다.<br />
          <div>
            {
              (Boolean(totalSales && fixCost && varCost && netProfit)) === true
                ? <div>
                  ※ X축은 판매량, Y축은 금액으로 단위는 만원 입니다.<br />
                  ※ 수익선의 가운데 Y값은 현재 분기당 매출이며, 가장 끝 Y값은 목표 순이익을 위한 목표 매출금액입니다.<br />
                  ※ 지출선의 가운데 Y값은 현재 발생하는 고정비와 변동비의 합이며, 가장 끝 Y값은 고정비와 변동비의 미래 예측치의 합으로 정확하지 않습니다.
                </div>
                : <div>
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