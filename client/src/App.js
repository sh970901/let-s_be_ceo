
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import GoLogin from './components/Login/GoLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/Main/Main';
import { Container, Row, Col } from 'react-bootstrap';
import State from './components/State/State';
import DetailState from './components/State/DetailState';
import AddLogin from './components/Login/AddLogin';
import FindLogin from './components/Login/FindLogin';
import Board from './components/Board/Board'
import BoardDetail from './components/Board/BoardDetail';
import AddBoard from './components/Board/AddBoard';
import MyBoard from './components/Board/MyBoard';
import Map from './components/Map/Map';
import { locations } from './components/Map/Locates';
import Infomation from './components/Map/Infomation';
import { useState } from 'react';

function App() {
  const [place, setPlace] = useState("기본")
  
  return (
    <BrowserRouter>
      <Container fluid>
        <Row>
          <Col sm={10}>
            <Header></Header>
          </Col>

          <Col sm={2}>
            <State></State>
          </Col>
        </Row>
        <br></br><br></br><br></br>
        <Switch>
          <Route exact path='/'>
            <Row>
              <Col>
                1of1
              </Col>
              <Col>
                <Main></Main>
              </Col>
              <Col>
                1of1
              </Col>
            </Row>
          </Route>
          <Route path="/login">
            <Row>
              <Col>
                1of1
              </Col>
              <Col>
                <GoLogin></GoLogin>
              </Col>
              <Col>
                1of1
              </Col>
            </Row>
          </Route>
          <Route path="/addLogin">
            <Row>
              <Col>
                1of1
              </Col>
              <Col>
                <AddLogin></AddLogin>
              </Col>
              <Col>
                1of1
              </Col>
            </Row>
          </Route>
          <Route path="/detailState">
            <Row>
              <Col>
                1of2
              </Col>
              <Col>
                <DetailState></DetailState>
              </Col>
              <Col>
                1of1
              </Col>
            </Row>
          </Route>
          <Route path="/findLogin">
            <Row>
              <Col>
                1of2
              </Col>
              <Col>
                <FindLogin></FindLogin>
              </Col>
              <Col>
                1of1
              </Col>
            </Row>
          </Route>

          <Route path="/board">
            <Row>
              <Col>
                1of2
              </Col>
              <Col>
                <Board></Board>
              </Col>
              <Col>
                1of1
              </Col>
            </Row>
          </Route>

          <Route path="/boardDetail">
            <Row>
              <Col>
                1of2
              </Col>
              <Col>
                <BoardDetail></BoardDetail>
              </Col>
              <Col>
                1of1
              </Col>
            </Row>
          </Route>

          <Route path="/addBoard">
            <Row>
              <Col>
                1of2
              </Col>
              <Col>
                <AddBoard></AddBoard>
              </Col>
              <Col>
                1of1
              </Col>
            </Row>
          </Route>

          <Route path="/myBoard">
            <Row>
              <Col>
                1of2
              </Col>
              <Col>
                <MyBoard></MyBoard>
              </Col>
              <Col>
                1of1
              </Col>
            </Row>
          </Route>

          <Route path="/map">
            <Row>
              <Col>
                <Infomation place={place}></Infomation>
              </Col>
              <Col>
                <Map location={locations} place={place} setPlace={setPlace}></Map>
              </Col>
              <Col>
                1of1
              </Col>
            </Row>
          </Route>

        </Switch>
<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <Row>
          <Col>
            1of1
          </Col>
          <Col>
            <Footer></Footer>
          </Col>
          <Col>
            1of1
          </Col>
        </Row>
        {/* <div className='Head'>
          <Header></Header>
        </div>
        <Switch>
          <>
            <div className='Body'>
              <Route exact path="/">
                <Main></Main>
              </Route>
              <Route path="/login">
                <GoLogin></GoLogin>
              </Route>
            </div>
          </>
        </Switch>
        <div className='Foot'>
          <Footer></Footer>
        </div> */}
      </Container>


    </BrowserRouter>

  );
}

export default App;
