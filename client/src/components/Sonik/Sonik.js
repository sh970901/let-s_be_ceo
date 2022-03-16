import { React, useState, useEffect } from 'react'

const Sonik = () => {

    /* const [totalSales, setTotalSale] = useState()

    function T_sales() {
        setTotalSale()
    } */

    // 총 매출
    var totalSales = 3000

    // 고정비
    const [fixCost, setFixCost] = useState("")
    const [isfixCost, setIsfixCost] = useState(false)

    function fix_cost(e) {
        setFixCost(e.target.value)
        setIsfixCost(true)
    }

    //변동비
    const [varCost, setVarCost] = useState("")
    const [isVarCost, setIsVarCost] = useState(false)

    function var_cost(e) {
        setVarCost(e.target.value)
        setIsVarCost(true)
    }

    //목표 순이익
    const [netProfit, setNetProfit] = useState("")
    const [isNetProfit, setIsNetProfit] = useState(false)
    function t_net_profit(e) {
        setNetProfit(e.target.value)
        setIsNetProfit(true)
    }

    //메뉴평균 단가
    const [avgPrice, setAvgPrice] = useState("")
    const [isAvgPrice, setIsAvgPrice] = useState(false)

    function m_avg_uprice(e) {
        setAvgPrice(e.target.value)
        setIsAvgPrice(true)
    }

    // 손익분기점 구하기 -> 고정비 / ((총매출 - 변동비) / 총매출)
    var break_even
    function break_evenCalc(fixCost, varCost, totalSales) {
        break_even = fixCost / ((totalSales - varCost) / totalSales)
        return break_even
    }

    // 목표 순이익을 위한 목표 매출 구하기 -> (고정비 + 목표이익) / ((매출 - 변동비) / 총 매출)
    //var target_sales // target_sales값을 T_daily_sales_volumeCalc()에서 쓰기 때문에 전역변수로 선언
    var target_sales = ""
    function target_salesCalc(fixCost, netProfit, totalSales, varCost) {
        target_sales = (Number(fixCost) + Number(netProfit)) / ((totalSales - varCost) / totalSales)
        return target_sales
    }


    const [resultData, setResultData] = useState("")
    var resultText = ""
    function calc() {
        if (isfixCost && isVarCost) {
            break_evenCalc(fixCost, varCost, totalSales)
            resultText = "손익분기점은 " + break_even + " 입니다."
            setResultData(resultText)
        }
        if (isfixCost && isVarCost && isNetProfit) {
            target_salesCalc(fixCost, netProfit, totalSales, varCost)
            resultText = "손익분기점은 " + break_even + " 이며, 목표 순이익을 위한 목표 매출은 " + target_sales + "입니다."
            setResultData(resultText)
        }
        if (isfixCost && isVarCost && isNetProfit && isAvgPrice) {
           
            var targetVolume = (target_sales/91.25) /avgPrice
            resultText = "손익분기점은 " + break_even + " 이며, 목표 순이익을 위한 목표 매출은 " + target_sales + "입니다. 목표 매출을 위한 일 판매량은" +targetVolume+"입니다."
            setResultData(resultText)
        
        }
    }

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            고정비용:
            <input type="number" onChange={fix_cost} value={fixCost}></input><br />
            변동비용:
            <input type="number" onChange={var_cost} value={varCost}></input><br />
            목표순이익:
            <input type="number" onChange={t_net_profit} value={netProfit}></input><br />
            메뉴평균단가:
            <input type="number" onChange={m_avg_uprice} value={avgPrice}></input><br />
            <br />

            <button onClick={calc}>계산</button>
            <br />
            {resultData}
        </div>
    );
}

export default Sonik