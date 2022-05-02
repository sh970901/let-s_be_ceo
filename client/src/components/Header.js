import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import State from './State/State';

import logo from "../img/headerlogo.png"
import s from "../css/Header.module.css";

//상단 내비게이션
const Header = () => {
    
    return (
        <div className={s.navbar}>
            <div className={s.navbar__logo}>
                <Link to ='/' className={s.link__logo}>
                    <img src={logo}/>
                </Link>
            </div>
            <ul className={s.navbar__menu}>
                <li>
                    <Link to='/map' className={s.link__menu}>
                        상권분석
                    </Link>
                </li>
                <li>
                    <Link to='/sonik' className={s.link__menu}>
                        손익분기
                    </Link>
                </li>
                <li>
                    <Link to='/board' className={s.link__menu}>
                        게시판
                    </Link>
                </li>
                <li>
                    <Link to='/question' className={s.link__menu}>
                        문의사항
                    </Link>
                </li>
            </ul>

            <div className={s.navbar__login}>
                <State></State>
            </div>
        </div>



        /**
            <div className={s.navbar}>
                <ul className={s.nav}>
                    <li>
                        <Link to ='/'>
                            Logo
                        </Link>
                    </li>
                    <li>
                        <Link to ='/map'>
                            상권분석
                        </Link>
                    </li>
                    <li>
                        <Link to ='/sonik'>
                            손익분기
                        </Link>
                    </li>
                    <li>
                        <Link to ='/board'>
                            게시판
                        </Link>
                    </li>
                    <li>
                        <Link to ='/question'>
                            문의사항
                        </Link>
                    </li>
                    <li>
                        <div>
                        <State></State>
                        </div>
                    
                    </li>
                </ul>
            </div>
            */
    );
};
export default Header;