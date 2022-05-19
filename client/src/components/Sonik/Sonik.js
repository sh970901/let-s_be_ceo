import { React, useState } from 'react'
import ResultModal from './Modal/ResultModal'
import WordInfo_modal from './Modal/WordInfo_modal'
// import "./SonikCSS/input.css"
import logo from "../../img/headerlogo.png"

//-----------------CSS import--------------------//
import s from '../../css/Sonik.module.css';

import { UilAngleRightB } from '@iconscout/react-unicons'
import { UilPlusCircle } from '@iconscout/react-unicons'
import { UilCalculator } from '@iconscout/react-unicons'

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
        break_even = Math.ceil(break_even)
        return break_even
    }

    // 목표 순이익을 위한 목표 매출 구하기 -> (고정비 + 목표이익) / ((매출 - 변동비) / 총 매출)
    //var target_sales // target_sales값을 T_daily_sales_volumeCalc()에서 쓰기 때문에 전역변수로 선언
    var target_sales = ""
    function target_salesCalc(fixCost, netProfit, totalSales, varCost) {
        target_sales = (Number(fixCost) + Number(netProfit)) / ((totalSales - varCost) / totalSales)
        target_sales = Math.ceil(target_sales)
        return target_sales
    }

    // 목표 매출을 위한 일일 판매량 -> (목표매출 / 시간기준) / 메뉴 평균 단가
    var target_volume
    function T_daily_sales_volumeCalc(target_sales, avgPrice) { /* 91.25는 (365 / 4)인 1분기에 해당되는 값 */
        target_volume = (target_sales / 91.25) / avgPrice
        target_volume = Math.ceil(target_volume)
        return target_volume
    }

    var resultText = "" // 결과값 text초기화
    const [resultData, setResultData] = useState("") // 결과값 text를 담을 useState

    function calc() {
        if (isfixCost && isVarCost) {
            break_evenCalc(fixCost, varCost, totalSales)

            resultText = "손익분기점은 " + break_even + "만원 입니다."
            setResultData(resultText)
            setIsfixCost(false)
            setIsVarCost(false)
        }
        if (isfixCost && isVarCost && isNetProfit) {
            target_salesCalc(fixCost, netProfit, totalSales, varCost)

            resultText = "손익분기점은 " + break_even + "만원 이며,\n목표 순이익을 위한 목표 매출은 " + target_sales +  "만원 입니다."
            setResultData(resultText)

            setIsfixCost(false)
            setIsVarCost(false)
            setIsNetProfit(false)
        }
        if (isfixCost && isVarCost && isNetProfit && isAvgPrice) {
            T_daily_sales_volumeCalc(target_sales, avgPrice)

            resultText = "손익분기점은 " + break_even + "만원 이며,\n 목표 순이익을 위한 목표 매출은 " + target_sales 
                            + "만원 입니다.\n 목표 매출을 위한 일 판매 건수는" + target_volume + "개 입니다."
            setResultData(resultText)

            setIsfixCost(false)
            setIsVarCost(false)
            setIsNetProfit(false)
            setIsAvgPrice(false)
            /* 입력된 값들 초기화하여 두번째 실행부터 결과 text에 null이나 infinity값을 출력하는 것을 방지함 */

        }
        if (!(isfixCost && isVarCost)) {
            resultText = "고정비용과 변동비용은 최소한의 입력값입니다. \n 안내사항을 다시한번 읽어주세요!"
            setResultData(resultText)
        }
        setFixCost("")
        setVarCost("")
        setNetProfit("")
        setAvgPrice("")
    }

    return (
        <div className={s.sonik}>
            <div className={s.sonikContainer}>
                
                <div className={s.titlePlace}>

                    <div className={s.titleTitle}>
                        <h1 className={s.sonikTitle}>손익분기점 계산</h1>
                    </div>

                    <div className={s.titleContentContainer}>
                        <div className={s.titleContent1}>
                            <p>손익분기점 계산은 Let's Be Ceo 사용자에게</p>
                            <p>여러 정보를 입력받아 손익분기점을 기준으로</p>
                            <p>목표 매출, 목표 유치 고객 수에 대한 정보를 제공합니다.</p>
                        </div>


                        <div className={s.titleContent}>
                                                
                            <div className={s.contentItems}>
                                <p>고정비용 · 변동비용</p>
                                <p><UilAngleRightB/></p>
                                <p>대략적인 손익분기점</p>
                            </div>

                            <div className={s.contentItems}>
                                <p><UilPlusCircle/> 목표 순이익</p>
                                <p><UilAngleRightB/></p>
                                <p>목표 매출</p>
                            </div>

                            <div className={s.contentItems}>
                                <p><UilPlusCircle/> 메뉴 평균 단가</p>
                                <p><UilAngleRightB/></p>
                                <p>일 평균 판매량</p>
                            </div>

                        </div>
                    </div>

                </div>
                
                <div className={s.sonikInputPlace}>
                    <img src={logo}></img>
                    <div className={s.inputDiv}>

                        <div className={s.labelPlace}>
                            <label className={s.labels} htmlFor='fixcost'>고정비용</label>
                        </div>

                        <input type="number" onChange={fix_cost} value={fixCost} className={s.inputs} id='fixcost'
                            placeholder='단위: 만원'></input>
                        <WordInfo_modal
                            result={"생산량의 변동 여하에 관계 없이 불변적으로 지출되는 비용. \n 예시) 임대료, 급여, 대출이자, 기타 비용(인터넷, 정수기...) 등)"}
                            header={'고정비용'} />
                    </div>

                    <div className={s.inputDiv}>
                        <div className={s.labelPlace}>
                            <label className={s.labels} htmlFor='varcost'>변동비용</label>
                        </div>

                        <input type="number" onChange={var_cost} value={varCost} className={s.inputs} id='varcost' placeholder='단위: 만원'></input>
                        <WordInfo_modal
                            result={"생산량의 변동 여하에 따라 가변적으로 지출되는 비용. \n 예시) 원재료비, 전기세, 전화세, 수도세 등"}
                            header={'변동비용'} />
                    </div>


                    <div className={s.inputDiv}>
                        <div className={s.labelPlace}>
                            <label className={s.labels} htmlFor='netprofit'>목표순이익</label>
                        </div>
                        <input disabled={isfixCost && isVarCost ? false : true} type="number" onChange={t_net_profit} value={netProfit} className={s.inputs}
                            id='netprofit' placeholder='단위: 만원'></input>

                        <WordInfo_modal
                            result={"고정비, 변동비, 목표순이익 입력시 사용자가 목표로하는 순수이익을 위한 필요매출을 계산합니다."}
                            header={'목표 순이익'} />
                    </div>

                    <div className={s.inputDiv}>
                        <div className={s.labelPlace}>
                            <label className={s.labels} htmlFor='avgprice'>메뉴평균단가</label>
                        </div>
                        <input disabled={isfixCost && isVarCost && isNetProfit ? false : true}
                            type="number" onChange={m_avg_uprice} value={avgPrice} className={s.inputs} id='avgprice' placeholder='단위: 만원'></input>
                        <WordInfo_modal
                            result={"사용자의 매장 내 메뉴들의 평균가격 혹은 주요상품의 가격입력시 목표 매출을 위해 필요한 대략적인 일 필요 판매량을 계산합니다."}
                            header={'메뉴 평균 단가'} />
                    </div>

                    <ResultModal calc={calc} header={"계산 결과"} result={resultData}> 계산 </ResultModal> {/* ResultModal로 props에 headr, calc, resultdata담아서 보내기 */}
                </div>
                
                
            </div>
            
        </div>
    );
}

export default Sonik