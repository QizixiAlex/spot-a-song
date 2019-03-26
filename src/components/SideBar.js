import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { connect } from 'react-redux';
import './SideBar.css';

class SideBar extends Component {

  userPlaylists() {
    const serverUrl = 'http://localhost:4000';
    if (this.props.userId) {
      axios.get(serverUrl+`/playlists?userId=${this.props.userId}`).
      then(res=>{
        this.props.onUpdateUser(res.data.data);
      })
    }
  }

  getAllSongs() {
    const serverUrl = 'http://localhost:4000';
    axios.get(serverUrl+'/songs').then(res => {
      this.props.onSelectPlaylist(res.data.data);
    })
  }

  onSelectPlaylist(playlistId) {
    const serverUrl = 'http://localhost:4000';
    if (playlistId) {
      axios.get(serverUrl+`/playlist_songs?playlistId=${playlistId}`).
      then(res=>{
        console.log(res);
        this.props.onSelectPlaylist(res.data.data);
      })
    }
  }

  render() {
    this.userPlaylists();
    return <div>
      <p onClick={()=>{this.getAllSongs()}}>MUSIC LIBRARY</p>
      {this.props.userName && <p>{this.props.userName}'s playlists</p>}
      <ListGroup variant="flush">
       {this.props.playlists.map(playlist => {
         return <ListGroup.Item onClick={()=>{this.onSelectPlaylist(playlist.playlist_id)}}>{playlist.playlist_name}</ListGroup.Item>
       })}
     </ListGroup>
    </div>
  }
}

const mapStateToProps = state => {
    return {
        userName: state.userName,
        userId: state.userId,
        playlists: state.playlists
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateUser: (playlists) => dispatch({type: 'SET_PLAYLISTS', playlists: playlists}),
        onSelectPlaylist: (songs) => dispatch({type: 'SET_SONGLIST', songList: songs})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
