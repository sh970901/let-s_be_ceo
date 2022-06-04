const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
//Cross Origin Resource Sharing 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//database.json 파일 접근 (DB 연결 정보)
const data = fs.readFileSync('./database.json');

const conf = JSON.parse(data)

//DB연결 및 설정
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
  });
connection.connect();

//user목록 가져오기
app.get('/api/login', (req,res)=>{
    connection.query('SELECT * FROM user', function(err,rows,fields){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows)
    })
})

//회원가입 정보입력 시 DB에 INSERT
app.post('/api/login', (req,res)=>{
    let sql = 'INSERT INTO user VALUES (null,?,?,?)';
    let ID = req.body.id
    let PW = req.body.password
    let Email = req.body.email
    let params = [ID, PW, Email]
    connection.query(sql, params,
        (err, rows, fields) => {
          res.header("Access-Control-Allow-Origin", "*");
          res.send(rows);
    })
})

//해당 ID에 해당하는 회원정보 수정
app.put('/api/login/:oldId', (req,res)=>{
    let sql = 'UPDATE user SET ID=?, PW=?, Email=? WHERE ID=?  ';
    let ID = req.body.id
    let PW = req.body.pw
    let Email = req.body.email
    let oldID = req.params.oldId
    let params = [ID, PW, Email, oldID]
    connection.query(sql, params,
        (err, rows, fields) => {
          res.header("Access-Control-Allow-Origin", "*");
          res.send(rows);
    })
})

//해당 ID에 해당하는 회원정보 삭제
app.delete('/api/login/:id', (req,res)=>{
    connection.query('DELETE FROM user WHERE ID = ?', req.params.id, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

//전체 게시판 불러오기
app.get('/api/board', (req,res)=>{
    connection.query('SELECT * FROM board', function(err,rows,fields){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows)
    })
})

//해당 user가 작성한 게시글 불러오기
app.get('/api/board/:user', (req,res)=>{
    connection.query('SELECT * FROM board WHERE b_writer=?',req.params.user, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

//게시글 작성
app.post('/api/board',(req,res)=>{
    let sql = 'INSERT INTO board VALUES (null,?,?,?,now())'
    let writer = req.body.writer;
    let content = req.body.content;
    let title = req.body.title;
    let params = [title,content,writer]
    connection.query(sql, params, function(error, rows,field){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows)
    })
})
//해당 게시글을 삭제
app.delete('/api/board/:no', (req,res)=>{
    
    connection.query('DELETE FROM board WHERE no_board = ?', req.params.no, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

//게시글 검색을 위한 요청 처리
app.get('/api/comment/:title',(req,res)=>{
    console.log(req.params.title)
    connection.query('SELECT * FROM comment WHERE c_title=?',req.params.title, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

//댓글 생성 
app.post('/api/comment',(req,res)=>{
    let sql = 'INSERT INTO comment VALUES (null,?,?,?,now())';
    let id = req.body.id;
    let comment = req.body.comment;
    let title = req.body.title;
    let params = [comment, title, id]
    connection.query(sql, params, function(error, rows,field){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows)
    })
})
//해당 게시글에 댓글 삭제
app.delete('/api/comment/:no',(req,res)=>{
    connection.query('DELETE FROM comment WHERE no_comment = ?', req.params.no, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})


//로그인된 사용자의 문의사항 가져오기
app.get('/api/question/:id', (req,res)=>{
    connection.query('SELECT * FROM question WHERE id = ?', req.params.id, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

//문의사항 등록 
app.post('/api/question', (req,res)=>{
    let sql = 'INSERT INTO question VALUES (null,?,?,null,now());'
    let id = req.body.id;
    let content = req.body.content;
    let params = [id, content]
    console.log(params)
    connection.query(sql, params, function(error, rows,field){
        console.log(sql)
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows)
    })
})

//문의사항에 해당하는 답변 불러오기
app.get('/api/answer/', (req,res)=>{
    connection.query('SELECT * FROM question WHERE id=?', req.query.id,  function (error, rows, fields) {
        console.log(rows.content)
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

//행정동내의 음식점들의 총 점포수 
app.get('/api/building/shop', (req,res)=>{
    connection.query('SELECT 행정동_이름, 행정동_총점포수, 행정동_분기당_평균매출 FROM 간단정보',function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

// 선택된 행정동의 간단정보 모두가져오기
app.get('/api/building/:area', (req,res)=>{
    connection.query('SELECT * FROM 간단정보 WHERE 행정동_이름=?',req.params.area,function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})
// :place값에 담아온 행정동에 해당되는 상세인구 정보 가져오기
app.get('/api/detailPeople/:place', (req,res)=>{
    connection.query('SELECT * FROM 상세인구 WHERE 행정동_이름=?',req.params.place , function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

// place에 행정동, area에 상권명 을 담아와 해당되는 상권의 상세인구 정보가져오기
app.get('/api/detailPeople/:place/:area', (req,res)=>{
    connection.query('SELECT * FROM 상세인구 WHERE 행정동_이름=? and 상권_코드_명=?',[req.params.place, req.params.area] , function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

//place에 행정동을 담아와 해당되는 상세지역 정보 가져오기
app.get('/api/detailLocate/:place', (req,res)=>{
    connection.query('SELECT * FROM 상세지역 WHERE 행정동_이름=?',req.params.place, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

//place에 행정동을 담아와 해당되는 상세매출 정보 가져오기
app.get('/api/detailSales/:place', (req,res)=>{
    connection.query('SELECT * FROM 상세매출 WHERE 행정동_이름=?',req.params.place, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

//place에 행정동 이름, category에 업종종류 값을 담아와 해당되는 상세매출 정보 가져오기
app.get('/api2/detailSales/:place/:category', (req,res)=>{
    connection.query('SELECT * FROM 상세매출 WHERE 서비스_업종_코드_명=? AND 행정동_이름=?',[req.params.category,req.params.place],function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

//place에 행정동 이름, category에 업종명, area에 상권명을 담아와 행당되는 상세매출 정보가져오기
app.get('/api3/detailSales/:place/:category/:area', (req,res)=>{
    connection.query('SELECT * FROM 상세매출 WHERE 서비스_업종_코드_명=? AND 행정동_이름=? AND 상권_코드_명=? ',[req.params.category,req.params.place,req.params.area],function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})
//상세지역 테이블에서 place에 해당되는 각 업종의 유무 개수
app.get('/api/:place',(req,res)=>{
    connection.query('SELECT 분식전문점, 양식음식점, 일식음식점, 중식음식점, 치킨전문점, 패스트푸드점, 한식음식점, 호프간이주점 FROM 상세지역 WHERE 행정동_이름=? ',req.params.place,function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

//상세인구 테이블에서 행정동, 상권, 선택 세부사항을 담아와 해당되는 정보를 가져온다
app.get('/human/:place/:area/:condition', (req,res)=>{
    console.log(req.params.place, req.params.area, req.params.condition)
    const condition = req.params.condition
    connection.query(`SELECT ${condition} FROM 상세인구 WHERE 행정동_이름=? and 상권_코드_명=?`,[req.params.place, req.params.area] , function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})



app.listen(port, ()=> console.log("서버 작동"))