import React, { Component } from 'react';
import { Layout, Menu, Button, Modal, Input } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import './SideBar.css';

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

class SideBar extends Component {

  state = {
    theme: 'dark',
    current: '1',
    genreList: [],
    artistList: [],
    serverUrl: 'http://localhost:4000',
    visible: false,
    newPlaylistName: ''
  }

  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  onInputChange = (e) => {
    this.setState({newPlaylistName: e.target.value});
  }

  createNewplaylist() {
    this.setState({
      visible: true,
    });
  }

  updatePlaylists() {
    if (this.props.userId) {
      axios.get(this.state.serverUrl+`/playlists?userId=${this.props.userId}`)
      .then(res=>{
        console.log(res.data.data);
        this.props.onUpdateUser(res.data.data);
      })
    }
  }

  getAllSongs() {
    axios.get(this.state.serverUrl+'/songs').then(res => {
      this.props.onChangeSongList(res.data.data);
    })
  }

  getAllGenres() {
    axios.get(this.state.serverUrl+'/genres').then(res => {
      this.setState({
        genreList: res.data.data,
      });
    })
  }

  getAllArtists() {
    axios.get(this.state.serverUrl+'/artists').then(res => {
      this.setState({
        artistList: res.data.data,
      });
    })
  }

  filterByGenre(genreName) {
    axios.get(this.state.serverUrl+`/genre_songs?genreName='${genreName}'`).then(res => {
      this.props.onChangeSongList(res.data.data);
    }).catch(err => {
      this.props.onChangeSongList([]);
    })
  }

  filterByArtist(artistId) {
    axios.get(this.state.serverUrl+`/artist_songs?artistId='${artistId}'`).then(res => {
      this.props.onChangeSongList(res.data.data);
    }).catch(err => {
      this.props.onChangeSongList([]);
    })
  }

  onSelectPlaylist(playlistId) {
    if (playlistId) {
      axios.get(this.state.serverUrl+`/playlist_songs?playlistId=${playlistId}`)
      .then(res=>{
        this.props.onChangeSongList(res.data.data);
      })
    }
  }

  componentDidMount(){
    this.getAllGenres();
    this.getAllArtists();
  }

  handleSubmit (newPlaylistName){
    axios.post(this.state.serverUrl+'/playlists', {
      playlistName: newPlaylistName,
      userId: this.props.userId
    }).then(res=>{
      this.updatePlaylists();
    });
    this.setState({
      visible: false,
    });
  }

  handleCancel (){
    this.setState({
      visible: false,
    });
  }

  render() {
    return <Sider width={256} height={280} theme={this.state.theme}>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
        <Menu.Item onClick={()=>{this.getAllSongs()}}>Music Library</Menu.Item>
        <SubMenu title="Artists" >
          {this.state.artistList.map(artist => {
            return <Menu.Item key={artist.artist_id} onClick={()=>{this.filterByArtist(artist.artist_id)}}>{artist.artist_name}</Menu.Item>
          })}
        </SubMenu>
        <SubMenu title="Genres">
          {this.state.genreList.map(genre => {
            return <Menu.Item key={genre.genre} onClick={()=>{this.filterByGenre(genre.genre)}}>{genre.genre}</Menu.Item>
          })}
        </SubMenu>
        {this.props.userName &&
          <SubMenu title={`${this.props.userName}'s playlists'`}>
          {this.props.playlists.map(playlist => {
            return <Menu.Item key={playlist.playlist_id} onClick={()=>{this.onSelectPlaylist(playlist.playlist_id)}}>{playlist.playlist_name}</Menu.Item>
          })
         }
         <Menu.Item onClick={()=>{this.createNewplaylist()}}>Create New Playlist</Menu.Item>
          </SubMenu>
        }
        </Menu>
        <Modal title="New Playlist"
          visible={this.state.visible}
          onOk={()=>{this.handleSubmit(this.state.newPlaylistName)}}
          onCancel={()=>{this.handleCancel()}}
        >
        <Input
          placeholder="Enter new playlist name"
          onChange={this.onInputChange}
        />
        </Modal>
        </Sider>
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
        onChangeSongList: (songs) => dispatch({type: 'SET_SONGLIST', songList: songs})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
