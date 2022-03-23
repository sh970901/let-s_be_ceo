import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import State from './State/State';
//상단 내비게이션
const Header = () => {
    
    return (
        <div className='Header'>

            <div>
                <ul>
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
            {/* <Nav fill variant="tabs" defaultActiveKey="/" className='nav'>         
                <Nav.Item>
                    <Nav.Link href="/">LOGO</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/map">상권분석</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/sonik">손익분기점</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/board">게시판</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/question">QnA</Nav.Link>
                </Nav.Item>  
                <Nav.Item>
                <State></State>        
                </Nav.Item>   
            </Nav> */}
                   
        </div>
    );
};
export default Header;

