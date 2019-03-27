import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import './SongDisplay.css';

class SongDisplay extends Component {
  getAllSongs() {
    const serverUrl = 'http://localhost:4000';
    axios.get(serverUrl+'/songs').then(res => {
      this.props.onUpdate(res.data.data);
    })
  }

  render() {
    if (this.props.songList.length === 0) {
      this.getAllSongs();
    }
    return (
    <div>
      <ListGroup variant="flush">
        {this.props.songList.map(song => {
          return <ListGroup.Item key={song.song_id}>{song.title}</ListGroup.Item>
        })}
      </ListGroup>
    </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        songList: state.songList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdate: (songList) => dispatch({type: 'SET_SONGLIST', songList: songList})
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SongDisplay);
