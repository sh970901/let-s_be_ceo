const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data)

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
  });
  connection.connect();
app.get('/api/login', (req,res)=>{
    connection.query('SELECT * FROM user', function(err,rows,fields){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows)
    })
})
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
app.delete('/api/login/:id', (req,res)=>{
    connection.query('DELETE FROM user WHERE ID = ?', req.params.id, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

app.get('/api/board', (req,res)=>{
    connection.query('SELECT * FROM board', function(err,rows,fields){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows)
    })
})
app.get('/api/board/:user', (req,res)=>{
    connection.query('SELECT * FROM board WHERE b_writer=?',req.params.user, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})
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
app.delete('/api/board/:no', (req,res)=>{
    console.log("삭제")
    connection.query('DELETE FROM board WHERE no_board = ?', req.params.no, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})
app.get('/api/comment/:title',(req,res)=>{
    connection.query('SELECT * FROM comment WHERE c_title=?',req.params.title, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})
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
app.delete('/api/comment/:no',(req,res)=>{
    connection.query('DELETE FROM comment WHERE no_comment = ?', req.params.no, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

app.get('/api/question/:id', (req,res)=>{
    connection.query('SELECT * FROM question WHERE id = ?', req.params.id, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

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

app.get('/api/answer/', (req,res)=>{
    connection.query('SELECT * FROM question WHERE id=?', req.query.id,  function (error, rows, fields) {
        console.log(rows.content)
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})


app.get('/api/building/shop', (req,res)=>{
    connection.query('SELECT 행정동_이름, 행정동_총점포수 FROM 간단정보',function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

app.get('/api/building/:area', (req,res)=>{
    connection.query('SELECT * FROM 간단정보 WHERE 행정동_이름=?',req.params.area,function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

app.get('/api/detailPeople/:place', (req,res)=>{
    connection.query('SELECT * FROM 상세인구 WHERE 행정동_이름=?',req.params.place , function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})
app.get('/api/detailPeople/:place/:area', (req,res)=>{
    connection.query('SELECT * FROM 상세인구 WHERE 행정동_이름=? and 상권_코드_명=?',[req.params.place, req.params.area] , function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})
app.get('/api/detailLocate/:place', (req,res)=>{
    connection.query('SELECT * FROM 상세지역 WHERE 행정동_이름=?',req.params.place, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})
app.get('/api/detailSales/:place', (req,res)=>{
    connection.query('SELECT * FROM 상세매출 WHERE 행정동_이름=?',req.params.place, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})
app.get('/api2/detailSales/:place/:category', (req,res)=>{
    connection.query('SELECT * FROM 상세매출 WHERE 서비스_업종_코드_명=? AND 행정동_이름=?',[req.params.category,req.params.place],function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})
app.get('/api3/detailSales/:place/:category/:area', (req,res)=>{
    connection.query('SELECT * FROM 상세매출 WHERE 서비스_업종_코드_명=? AND 행정동_이름=? AND 상권_코드_명=? ',[req.params.category,req.params.place,req.params.area],function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

app.get('/api/:place',(req,res)=>{
    connection.query('SELECT 분식전문점, 양식음식점, 일식음식점, 중식음식점, 치킨전문점, 패스트푸드점, 한식음식점, 호프간이주점 FROM 상세지역 WHERE 행정동_이름=? ',req.params.place,function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})



app.get('/human/:place/:area/:condition', (req,res)=>{
    console.log(req.params.place, req.params.area, req.params.condition)
    const condition = req.params.condition
    connection.query(`SELECT ${condition} FROM 상세인구 WHERE 행정동_이름=? and 상권_코드_명=?`,[req.params.place, req.params.area] , function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})



app.listen(port, ()=> console.log("서버 작동"))