
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import GoLogin from './components/Login/GoLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Main from './components/Main/Main';
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
import MainPage from './components/Main/MainPage';
import Sonik from './components/Sonik/Sonik';

function App() {
  const [place, setPlace] = useState("기본")
  
  return (
    <div className='body'>
      <BrowserRouter>
        <div className='main-header'>
          <div className='header'>
            <Header />
          </div>
          <div className='state'>
            <State />
          </div>
        </div>
          <Switch>
            <Route exact path='/'>
              <MainPage></MainPage>
            </Route>
            <Route path="/login">
              <GoLogin></GoLogin>
            </Route>
            <Route path="/addLogin">
                <AddLogin></AddLogin>
            </Route>
            <Route path="/detailState">
                  <DetailState></DetailState>
            </Route>
            <Route path="/findLogin">
                  <FindLogin></FindLogin>
            </Route>

            <Route path="/board">
                  <Board></Board>
            </Route>

            <Route path="/boardDetail">
                <BoardDetail></BoardDetail>
            </Route>

            <Route path="/addBoard">
                  <AddBoard></AddBoard>
            </Route>

            <Route path="/myBoard">
                  <MyBoard></MyBoard>
            </Route>

            <Route path="/sonik">
                  <Sonik></Sonik>
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


      </BrowserRouter>
    </div>

  );
}

export default App;
