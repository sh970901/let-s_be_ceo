import { React, useState, useEffect } from 'react'
import ResultModal from './Modal/ResultModal'
import WordInfo_modal from './Modal/WordInfo_modal'
import logo from "../../img/headerlogo.png"

//-----------------CSS import--------------------//
import s from '../../css/Sonik.module.css';

import { UilAngleRightB } from '@iconscout/react-unicons'
import { UilPlusCircle } from '@iconscout/react-unicons'
import { UilCalculator } from '@iconscout/react-unicons'

const Sonik = () => {

    const [totalSales, settotalSales] = useState() // 강남구 전체 요식업 매장의 분기당 평균매출을 저장할 useState()
    var len = [] // json파일로 가져온 배열은 바로 length를 못쓰기 때문에 Object.keys()메서드로 키값만 가져와서 배열 길이값만 가져오는 용도
    var saleList = [] // 매출값을 json으로부터 뽑아와서 연산을 위해 배열에 옮겨놓기 위한 용도
    const [rememberTotal, setrememberTotal] = useState() //매출값 초기화시 원래 데이터를 기억하기 위한 변수
    var remember = 0 // 매출값을 저장하기 위한 중간 다리, 렌더링시 해당 변수는 다시 0으로 초기화 되어 바로 쓸수 없어서 위의 useState()로 남긴다

    const [holderSales, setholderSales] = useState()

    // 렌더링 시 한번만 뽑아올 데이터가 연산이 필요하다면 useEffect에 알맞게 작성할것 따로 함수를 작성해서 하는 경우 연산과정시 무한대로 접근하게 되어 오류발생
    // 따라서 렌더링 할 때 바로 연산하도록 코드 작성
    // 강남구 전체 요식업 매장의 분기당 평균매출
    useEffect(() => {
        fetch("http://localhost:5000/api/building/shop")
            .then(res => res.json()) // api로 부터 받아온 값을 json으로 형변환
            .then(data => { // 받아온 json 값들을 data로 하여 조작
                len = Object.keys(data) //json형식의 값(data) key값만을 저장한 배열
                var hap = 0 // salelist의 요소들의 합을 저장할 변수
                for (let i = 0; i < len.length; i++) { // 반복문으로 data의 데이터 개수 만큼 
                    saleList[i] = data[i].행정동_분기당_평균매출 // saleList배열에 각 행정동에 해당되는 분기당 평균 매출 저장
                    hap += saleList[i] // 모든 행정동의 분기당 평균 매출 합 
                }
                remember = Math.floor((hap / len.length) / 10000) // 결과값의 단위는 만원 단위로 모든 행정동의 분기당 평균 매출 합을 평균을 위해 행정도 개수 만큼 나누고 10000으로 나눈다
                setholderSales(String(remember) + " 만원") // input 태그의 placeholder옵션에 들어갈 강남구 분기당 평균 매출로 문자열로 형변환 후 holderSales에 초기화
                settotalSales(remember) // calc()에 사용되는 분기당 매출값을 현재 강남구 평균 분기 당 매출값으로 설정
                setrememberTotal(remember) // 1회 이상 계산이후 다시 페이지가 렌더링될 때 사용되는 분기당 평균 매출값으로 현재 강남구 분기당 매출값을 기억하는 용도
                setSendTTS(remember) // ResultModal에 전달할 강남구 분기당 평균 매출값
            })
    }, [])

    function userTotalSales(e) { // 사용자가 input에서 입력하는 값을 분기당 매출 값으로 설정하는 함수 
        settotalSales(Number(e.target.value)) // calc()에서 사용되는 totalSales의 값을 해당값으로 초기화
    }

    // 고정비
    const [fixCost, setFixCost] = useState("") 
    const [isfixCost, setIsfixCost] = useState(false) // 고정비가 입력되었는지 확인하기 위한 용도

    function fix_cost(e) { // 사용자가 input에서 입력하는 값을 고정비용으로 설정하는 함수 
        setFixCost(Number(e.target.value))
        setIsfixCost(true) // 고정비 입력 확인
    }

    //변동비
    const [varCost, setVarCost] = useState("") 
    const [isVarCost, setIsVarCost] = useState(false) // 변동비가 입력되었는지 확인하기 위한 용도

    function var_cost(e) { // 사용자가 input에서 입력하는 값을 변동비용으로 설정하는 함수
        setVarCost(Number(e.target.value))
        setIsVarCost(true) // 변동비 입력 확인
    }

    //목표 순이익
    const [netProfit, setNetProfit] = useState("")
    const [isNetProfit, setIsNetProfit] = useState(false) // 목표 순이익이 입력되었는지 확인하기 위한 용도
    function t_net_profit(e) {
        setNetProfit(Number(e.target.value))
        setIsNetProfit(true)
    }

    //메뉴평균 단가
    const [avgPrice, setAvgPrice] = useState("")
    const [isAvgPrice, setIsAvgPrice] = useState(false)

    function m_avg_uprice(e) {
        setAvgPrice(Number(e.target.value))
        setIsAvgPrice(true)
    }

    // 손익분기점 구하기 -> 고정비 / (1 - ( 변동비 / 총매출 ))
    var break_even
    function break_evenCalc(fixCost, varCost, totalSales) {
        break_even = fixCost / (1 - (varCost / totalSales))

        if (break_even == Infinity) { //손익 분기점 공식에 의해 무한대인 경우에는 적자로 구분
            break_even = "계속되는 적자로 구할 수 없습니다."
            return break_even
        }
        else {
            break_even = Math.ceil(break_even) + "만원입니다."
            return break_even
        }
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
        target_volume = Math.ceil(target_volume) // 소수점 버리는 내장함수
        return target_volume
    }

    var resultText = "" // 결과값 text초기화
    const [resultData, setResultData] = useState("") // 결과값 text를 담을 useState

    function calc() { // 사용자가 입력한 경우에 따라 다른 계산과 결과 값 호출

        if (isfixCost && isVarCost) { // 고정비용과 변동비용이 입력된 경우
            break_evenCalc(fixCost, varCost, totalSales) // 손익분기점 계산 함수 호출
            
            // 사용자에게 출력할 결과 text 
            resultText = "손익분기점은 " + break_even 
            setResultData(resultText) 
           
            // 고정비, 변동비 입력했는지 여부 값 초기화
            setIsfixCost(false)
            setIsVarCost(false)

            // 모달창의 그래프에 사용하기 위해 전달할 고정비, 변동비, 총매출, 손익분기 값 설정
            setSendTTS(totalSales) 
            setSendFC(fixCost)     
            setSendVC(varCost)     
            setSendBE(break_even)
        }
        if (isfixCost && isVarCost && isNetProfit) { // 고정비, 변동비, 목표순이익 입력된 경우
            target_salesCalc(fixCost, netProfit, totalSales, varCost) // 손익분기, 목표순이익을 위한 목표매출 구하는 함수 호출

            // 사용자에게 출력할 text설정
            resultText = "손익분기점은 " + break_even + "\n목표 순이익을 위한 목표 매출은 " + target_sales + "만원 입니다."
            setResultData(resultText)

            // 고정비, 변동비, 목표순이익 입력했는지 여부 값 초기화
            setIsfixCost(false)
            setIsVarCost(false)
            setIsNetProfit(false)

            //모달창의 그래프에 사용하기 위해 전달할 고정비, 변동비, 총매출, 손익분기 값, 목표순이익, 목표매출값 설정
            setSendTTS(totalSales)
            setSendFC(fixCost)
            setSendVC(varCost)
            setSendBE(break_even)
            setSendNP(netProfit)
            setSendTS(target_sales)
        }
        if (isfixCost && isVarCost && isNetProfit && isAvgPrice) { // 고정비, 변동비, 목표순이익, 매뉴들의 평균가 값을 입력한 경우
            T_daily_sales_volumeCalc(target_sales, avgPrice) // 손익분기, 목표매출, 일 목표 판매량을 구하는 함수 호출

            // 사용자에게 출력할 text값 설정
            resultText = "손익분기점은 " + break_even + "\n 목표 순이익을 위한 목표 매출은 " + target_sales
                + "만원 입니다.\n 목표 매출을 위한 일 판매 건수는 " + target_volume + "개 입니다."
            setResultData(resultText)

            // 고정비, 변동비, 목표순이익, 평균가격 입력했는지 여부값 초기화
            setIsfixCost(false)
            setIsVarCost(false)
            setIsNetProfit(false)
            setIsAvgPrice(false)
            
            //모달창의 그래프에 사용하기 위해 전달할 고정비, 변동비, 총매출, 손익분기 값, 목표순이익, 목표매출값, 평균가격, 일 목표 판매량 값 설정
            setSendTTS(totalSales)
            setSendFC(fixCost)
            setSendVC(varCost)
            setSendBE(break_even)
            setSendNP(netProfit)
            setSendTS(target_sales)
            setSendAP(avgPrice)
            setSendTV(target_volume)
        }
        if (!(isfixCost && isVarCost)) { // 고정비, 변동비는 최소한으로 입력받아야하는 값이기 때문에 그렇지 않은 경우 사용자에게 알림 출력
            resultText = "고정비용과 변동비용은 최소한의 입력값입니다, \n  안내사항을 다시한번 읽어주십시요."
            setResultData(resultText)
        }
        /* 입력된 값들 초기화하여 두번째 실행부터 결과 text에 null이나 infinity값을 출력하는 것을 방지함 */
        setFixCost("")
        setVarCost("")
        setNetProfit("")
        setAvgPrice("")
        settotalSales(rememberTotal) // 원래 강남구 전체의 분기당 평균 매출로 총매출 값 초기화
    }

    // ResultModal의 그래프 표시에 전달할 각 비용변수
    const [sendTTS, setSendTTS] = useState() // 분기당 매출
    const [sendFC, setSendFC] = useState() // 고정비
    const [sendVC, setSendVC] = useState() // 변동비
    const [sendBE, setSendBE] = useState() // 손익분기
    const [sendNP, setSendNP] = useState() // 목표순이익
    const [sendTS, setSendTS] = useState() // 목표매출
    const [sendAP, setSendAP] = useState() // 메뉴 평균단가
    const [sendTV, setSendTV] = useState() // 하루 목표 판매량

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
                            <p>목표 이익을 위한 매출, 일일 판매량에 대한 정보를 제공합니다.</p>
                            <p>※ 안내사항 ※</p>
                            <p>● 모든 입력값의 단위는 만원 단위로 입력해주세요.</p>
                            <p>● 입력할 분기당 매출과 고정비용, 변동비용, 목표 순이익은 한 분기에 해당되는 금액을 입력해주세요.</p>
                            <p>● 분기당 매출을 입력하지 않으면 강남구 전체 요식업소들의 분기당 매출의 평균값으로 설정됩니다.</p>
                            <p>● 고정비용과 변동비용은 필수 입력값이며, 결과값으로 한 분기의 손익분기 매출 값을 제공합니다.</p>
                            <p>● 목표 순이익을 추가로 입력하면, 추가적으로 순이익을 위한 한 분기의 목표 매출 값을 제공합니다.</p>
                            <p>● 메뉴 평균 단가를 입력하면 한 분기 목표 매출을 위해 필요한 일평균 판매량을 제공합니다.</p>
                        </div>


                        <div className={s.titleContent}>

                            <div className={s.contentItems}>
                                <p>고정비용 · 변동비용</p>
                                <p><UilAngleRightB /></p>
                                <p>대략적인 손익분기점</p>
                            </div>

                            <div className={s.contentItems}>
                                <p><UilPlusCircle /> 목표 순이익</p>
                                <p><UilAngleRightB /></p>
                                <p>목표 매출</p>
                            </div>

                            <div className={s.contentItems}>
                                <p><UilPlusCircle /> 메뉴 평균 단가</p>
                                <p><UilAngleRightB /></p>
                                <p>일 평균 판매량</p>
                            </div>

                        </div>
                    </div>

                </div>

                <div className={s.sonikInputPlace}>
                    <img src={logo}></img>
                    <div className={s.inputDiv}>

                        <div className={s.labelPlace}>
                            <label className={s.labels} htmlFor='totalSales'>분기당 매출</label>
                        </div>

                        <input type="number" onChange={userTotalSales} value={totalSales} className={s.inputs} id='totalSales'
                            placeholder={holderSales}></input>
                        <WordInfo_modal
                            result={"한 분기(3개월)에 발생되는 매출을 만원 단위로 적어주세요.\n\n 예시) 89320050원은 8932까지만 입력. \n\n 아무 값도 입력하지 않고 계산할 시 강남구 전체 요식업 매장의 평균 분기당 매출로 \n 계산이 진행됩니다."}
                            header={'분기당 매출'} />
                    </div>

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
                    <ResultModal calc={calc} header={"계산 결과"} result={resultData} totalSales={sendTTS} fixCost={sendFC} varCost={sendVC} break_even={sendBE}
                        netProfit={sendNP} target_sales={sendTS} avgPrice={sendAP} target_volume={sendTV}> 계산 </ResultModal>
                    {/* ResultModal로 props에 headr, calc, resultdata담아서 보내기 */}
                </div>


            </div>

        </div>
    );
}

export default Sonik