import MainSlider from "./MainSlider";
import styles from "../../css/MainPage.module.css";

import iconChat from "../../img/chat.png";
import iconService from "../../img/service.png";
import iconGps from "../../img/gps.png";
import { Link } from "react-router-dom";

export default function MainPage() {

    const about = "서울시 요식업 상권분석 플랫폼, Let's Be CEO!"

    return (
        <div className={styles.wrap}>

            <MainSlider />

            <ul className={styles.amount}>
                <li><div>
                    <div className={styles.contents1}>상권 수</div>
                    <div className={styles.result}>5,820</div>
                </div></li>
                <li><div>
                    <div className={styles.contents1}>요식업 점포 수</div>
                    <div className={styles.result}>100,000+</div>
                </div></li>
                <li><div>
                    <div className={styles.contents1}>분기별 매출 평균</div>
                    <div className={styles.result}>₩000,000,000,000</div>
                </div></li>
                <li><div>
                    <div className={styles.contents1}>분기별 유동인구 수</div>
                    <div className={styles.result}>000,000,000</div>
                </div></li>
            </ul>

            <div className={styles.body}>
                <div className={styles.main_about}>
                    <p className={styles.main_about_h}>ABOUT</p>
                    <p className={styles.main_about_p}>{about}</p>
                </div>

                <ul className={styles.icons}>
                    <li>
                        <div className={styles.iconImg}><img src={iconGps}></img></div>
                        <div className={styles.contents1_bold}>Analyze</div>
                        <div className={styles.contents1}>요식업 상권 분석</div>
                        <Link to='/map'>
                            <div className={styles.more} onClick={() => console.log("현범")}> MORE </div>
                        </Link>

                    </li>
                    <li>
                        <div className={styles.iconImg}><img src={iconChat}></img></div>
                        <div className={styles.contents1_bold}>Communication</div>
                        <div className={styles.contents1}>정보공유 게시판</div>
                        <Link to='/board'>
                            <div className={styles.more}> MORE </div>
                        </Link>


                    </li>
                    <li>
                        <div className={styles.iconImg}>
                            <img src={iconService}></img>
                        </div>
                        <div className={styles.contents1_bold}>
                            Contact Us
                        </div>
                        <div className={styles.contents1}>
                            문의사항, 질문과 답변
                        </div>
                        <Link to='/question'>
                            <div className={styles.more}> MORE </div>
                        </Link>

                    </li>
                </ul>
            </div>

            <div className={styles.main_text1}>

            </div>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/2znzBerWyWU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    );
}