const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'password',
  database:'spot_a_song_dev0'
});
connection.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('connection success!');
  }
});

app.get('/', (req, res)=>{
  res.send('welcome to dev server!');
})

//user login
app.post('/user/login', (req, res)=>{
  const userName = req.body.userName;
  const userPassword = req.body.userPassword;
  let loginQuery = `SELECT user_id, username FROM users WHERE username = '${userName}' AND password = '${userPassword}'`;
  connection.query(loginQuery, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  })
})

//user register
app.post('/user/register', (req, res)=>{
  const userName = req.body.userName;
  const userPassword = req.body.userPassword;
  // TODO: Check if user with same username exists
  let registerQuery = `INSERT INTO users(username, password) VALUES('${userName}', '${userPassword}')`;
  connection.query(registerQuery, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  })
})

//get all songs
app.get('/songs', (req, res)=>{
  let allSongQuery = 'SELECT * FROM songs';
  connection.query(allSongQuery, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  })
})

//get playlists of current user
app.get('/playlists', (req, res)=>{
  const {userId} = req.query;
  let userPlaylistsQuery = `SELECT distinct playlists.playlist_name, playlists.playlist_id FROM playlists, playlist_songs WHERE playlists.user_id = ${userId} AND playlists.playlist_id = playlist_songs.playlist_id`;
  connection.query(userPlaylistsQuery, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  })
})

//get songs form a playlist
app.get('/playlist_songs', (req, res)=>{
  const {playlistId} = req.query;
  let playlistSongsQuery = `SELECT * FROM playlist_songs, songs WHERE playlist_songs.playlist_id = ${playlistId} AND playlist_songs.song_id = songs.song_id`;
  connection.query(playlistSongsQuery, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  })
})

app.listen(4000, ()=>{
  console.log('dev server listening on port 4000!');
})
