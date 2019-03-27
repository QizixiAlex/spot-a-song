import React, { Component } from 'react';
import { Layout, Menu, Icon, Switch } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import './SideBar.css';

const SubMenu = Menu.SubMenu;
const {
  Header, Content, Footer, Sider,
} = Layout;

class SideBar extends Component {
  state = {
    theme: 'dark',
    current: '1',
  }

  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  userPlaylists() {
    const serverUrl = 'http://localhost:4000';
    if (this.props.userId) {
      axios.get(serverUrl+`/playlists?userId=${this.props.userId}`)
      .then(res=>{
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
      axios.get(serverUrl+`/playlist_songs?playlistId=${playlistId}`)
      .then(res=>{
        this.props.onSelectPlaylist(res.data.data);
      })
    }
  }

  render() {
    this.userPlaylists();
    return <Sider width={240} style={{ background: '#fff' }}>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
        <Menu.Item onClick={()=>{this.getAllSongs()}}>Music Library</Menu.Item>
        {this.props.userName &&
          <SubMenu title={`${this.props.userName}'s playlists'`}>
          {this.props.playlists.map(playlist => {
            return <Menu.Item key={playlist.playlist_id} onClick={()=>{this.onSelectPlaylist(playlist.playlist_id)}}>{playlist.playlist_name}</Menu.Item>
          })}
          </SubMenu>
        }
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigtion Two</span></span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
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
        onSelectPlaylist: (songs) => dispatch({type: 'SET_SONGLIST', songList: songs})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
