const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'rootpassword',
  database:'dev0'
});
connection.connect(err => {
  if (err) {
    return err;
  }
});

app.get('/', (req, res)=>{
  res.send('welcome to dev server!');
})

app.listen(4000, ()=>{
  console.log('dev server listening on port 4000!');
})
