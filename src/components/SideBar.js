import React, { Component } from 'react';
import { Layout, Menu, Modal, Input, Icon } from 'antd';
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
    newPlaylistVisible: false,
    newPlaylistName: '',
    editPlaylistVisible: false,
    selectedPlaylistId: null,
    deletePlaylistVisible: false,
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
      newPlaylistVisible: true,
    });
  }

  updatePlaylists() {
    if (this.props.userId) {
      axios.get(this.state.serverUrl+`/playlists?userId=${this.props.userId}`)
      .then(res=>{
        this.props.onChangePlaylist(res.data.data);
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
      newPlaylistVisible: false,
    });
  }

  handleCancel (){
    this.setState({
      newPlaylistVisible: false,
      editPlaylistVisible: false,
      deletePlaylistVisible: false,
    });
  }

  changePlaylistName() {
    axios.post(this.state.serverUrl+'/rename_playlist', {
      newPlaylistName: this.state.newPlaylistName,
      playlistId: this.state.selectedPlaylistId
    }).then(res=>{
      this.updatePlaylists();
    });
    this.setState({
      editPlaylistVisible: false,
      selectedPlaylistId: null,
    });
  }

  onOpenEdit(playlistId, playlistName) {
    this.setState({
      selectedPlaylistId: playlistId,
      editPlaylistVisible: true,
      newPlaylistName: playlistName
    });
  }

  onOpenDelete(playlistId) {
    this.setState({
      selectedPlaylistId: playlistId,
      deletePlaylistVisible: true,
    });
  }

  deletePlaylist() {
    axios.delete(this.state.serverUrl+`/playlist?playlistId=${this.state.selectedPlaylistId}`)
    .then(res=>{
      this.updatePlaylists();
    });
    this.setState({
      deletePlaylistVisible: false
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
            return <Menu.Item key={artist.artist_name} onClick={()=>{this.filterByArtist(artist.artist_id)}}>{artist.artist_name}</Menu.Item>
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
            return <Menu.Item key={playlist.playlist_id} onClick={()=>{this.onSelectPlaylist(playlist.playlist_id)}}>
                    {playlist.playlist_name}
                    <Icon onClick={()=>this.onOpenDelete(playlist.playlist_id)} style={{float: 'right', position: 'absolute', top: '35%', left: '75%'}} type="delete" />
                    <Icon onClick={()=>this.onOpenEdit(playlist.playlist_id, playlist.playlist_name)} style={{float: 'right', position: 'absolute', top: '35%', left: '85%'}} type="edit" />
                  </Menu.Item>
          })
         }
         <Menu.Item onClick={()=>{this.createNewplaylist()}}>Create New Playlist</Menu.Item>
          </SubMenu>
        }
        </Menu>
        <Modal title="New Playlist"
          visible={this.state.newPlaylistVisible}
          onOk={()=>{this.handleSubmit(this.state.newPlaylistName)}}
          onCancel={()=>{this.handleCancel()}}
        >
          <Input
            placeholder="Enter new playlist name"
            onChange={this.onInputChange}
          />
        </Modal>
        <Modal title="Update Playlist Name"
          visible={this.state.editPlaylistVisible}
          onOk={()=>{this.changePlaylistName()}}
          onCancel={()=>{this.handleCancel()}}
        >
          <Input
            onChange={this.onInputChange}
          />
        </Modal>
        <Modal title="Delete Playlist"
          visible={this.state.deletePlaylistVisible}
          onOk={()=>{this.deletePlaylist()}}
          onCancel={()=>{this.handleCancel()}}
        >
          <Icon type="warning" />
          <p>Are you sure you want to delete this playlist?</p>
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
        onChangePlaylist: (playlists) => dispatch({type: 'SET_PLAYLISTS', playlists: playlists}),
        onChangeSongList: (songs) => dispatch({type: 'SET_SONGLIST', songList: songs})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
