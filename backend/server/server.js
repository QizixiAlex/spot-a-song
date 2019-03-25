const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'password',
  database:'dev0'
});
connection.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('connection success!');
  }
});

app.get('/', (req, res)=>{
  // const {name, age} = req.query;
  // console.log(`name->${name}`);
  // console.log(`age->${age}`);
  res.send('welcome to dev server!');
})

app.post('/user/login', (req, res)=>{
  const {userName, userPassword} = req.query;
  // TODO:
})

app.post('/user/register', (req, res)=>{
  const {userName, userEmail, userPassword} = req.query;
  let query = `SELECT COUNT(user_id) FROM users WHERE user_name = "${userName}"`;
  console.log(query);
  connection.query(query, (err, results)=> {
    if (err) {
      return res.send(err);
    } else {
      console.log(results);
    }
  })
})

app.listen(4000, ()=>{
  console.log('dev server listening on port 4000!');
})
