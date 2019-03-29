import React, { Component } from 'react';
import { List, Avatar, Icon, Button, Modal, Select } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import './SongDisplay.css';

const ButtonGroup = Button.Group;
const Option = Select.Option;

class SongDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      selectedSongId: null,
      selectedPlaylistId: null,
      serverUrl: 'http://localhost:4000'
    };
  }

  getAllSongs() {
    axios.get(this.state.serverUrl+'/songs').then(res => {
      this.props.onUpdate(res.data.data);
    })
  }

  componentDidMount() {
    this.getAllSongs();
  }

  addToPlaylist() {
    axios.post(this.state.serverUrl+'/add_to_playlist', {
      playlistId : this.state.selectedPlaylistId,
      songId : this.state.selectedSongId
    });
    this.setState({
      showAddModal: false,
    });
  }

  openAddModal(songId) {
    this.setState({
      showAddModal: true,
      selectedSongId: songId
    });
  }

  handleCancel (){
    this.setState({
      showAddModal: false,
      showRemoveModal: false,
    });
  }

  handleChange (selectedPlaylistId){
    this.setState({
      selectedPlaylistId: selectedPlaylistId
    });
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
            {this.props.userId && <ButtonGroup style={{right: '45px'}}>
              <Button style={{width: '75px'}} onClick={()=>{this.openAddModal(song.song_id)}}>
                <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
              </Button>
            </ButtonGroup>}
          </List.Item>
        )}/>
        <Modal title="Add To Playlist"
          visible={this.state.showAddModal}
          onOk={()=>{this.addToPlaylist()}}
          onCancel={()=>{this.handleCancel()}}
        >
        <Select style={{ width: 120 }} onChange={(value)=>{this.handleChange(value)}}>
          {this.props.playlists.map(playlist => {
            return <Option key={playlist.playlist_name} value={playlist.playlist_id}>{playlist.playlist_name}</Option>
          })}
        </Select>
        </Modal>
        <a href="https://icons8.com/icon/63803/music-record">Music Record icon by Icons8</a>
    </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        userId: state.userId,
        songList: state.songList,
        playlists: state.playlists
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdate: (songList) => dispatch({type: 'SET_SONGLIST', songList: songList})
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SongDisplay);
