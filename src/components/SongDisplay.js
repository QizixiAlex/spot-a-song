import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import './SongDisplay.css';

class SongDisplay extends Component {
  getAllSongs() {
    const serverUrl = 'http://localhost:4000';
    axios.get(serverUrl+'/songs').then(res => {
      this.props.onUpdate(res.data.data);
    })
  }

  componentDidMount() {
    this.getAllSongs();
  }

  render() {
    return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={this.props.songList}
        renderItem={song => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://img.icons8.com/color/48/000000/music-record.png" />}
              title={<a>{song.title}</a>}
              description={song.genre}
            />
          </List.Item>
        )}/>
        <a href="https://icons8.com/icon/63803/music-record">Music Record icon by Icons8</a>
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
