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
    let sql = 'INSERT INTO user VALUES (?,?,?)';
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
app.get('/api/board', (req,res)=>{
    connection.query('SELECT * FROM board', function(err,rows,fields){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows)
    })
})
app.get('/api/comment/:title',(req,res)=>{

})

app.listen(port, ()=> console.log("서버 작동"))