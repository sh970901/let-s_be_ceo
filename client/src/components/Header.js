import { Nav } from 'react-bootstrap';
//상단 내비게이션
const Header = () => {
    
    return (
        <div className='Header'>
            <Nav fill variant="tabs" defaultActiveKey="/" className='nav'>         
                <Nav.Item>
                    <Nav.Link href="/">LOGO</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/map">상권분석</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/">손익분기점</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/board">게시판</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                    <Nav.Link eventKey="home">게시판</Nav.Link>
                </Nav.Item> */}
                {/* <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        Disabled
                    </Nav.Link>
                </Nav.Item> */}      
            </Nav>       
        </div>
    );
};
export default Header;

