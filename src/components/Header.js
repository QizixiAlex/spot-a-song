
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactModalLogin from "react-modal-login";
import './Header.css';

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      loading: false,
      error: null
    };
  }

  openModal() {
    this.setState({
      showModal: true
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      error: null
    });
  }

  onLoginSuccess(method, response) {
    this.closeModal();
  }

  onLoginFail(method, response) {
    console.log("logging failed with " + method);
    this.setState({
      error: response
    });
  }

  startLoading() {
    this.setState({
      loading: true
    });
  }

  finishLoading() {
    this.setState({
      loading: false
    });
  }

  afterTabsChange() {
    this.setState({
      error: null
    });
  }

  onLogin() {
    const userName = document.querySelector('#username').value;
    const userPassword = document.querySelector('#password').value;
    const serverUrl = 'http://localhost:4000';
    if (!userName || !userPassword) {
      this.setState({
        error: true
      });
      return;
    }
    //call backend
    axios.post(serverUrl+'/user/login', {
      userName: userName,
      userPassword: userPassword
    }).then(res => {
      let loginResult = res.data.data;
      if (loginResult.length === 0) {
        this.setState({
          error: true
        });
      } else {
        const userInfo = loginResult[0];
        this.props.onUserLogin(userInfo.user_id,userInfo.username);
        this.onLoginSuccess();
      }
    }).catch(err => {
      this.setState({
        error: true
      });
    });
  }

  onRegister() {
    const userName = document.querySelector('#username').value;
    const userPassword = document.querySelector('#password').value;
    const serverUrl = 'http://localhost:4000';
    if (!userName || !userPassword) {
      this.setState({
        error: true
      });
      return;
    }
    //call backend
    axios.post(serverUrl+'/user/register', {
      userName: userName,
      userPassword: userPassword
    }).then(res => {
      let registerResult = res.data.data;
      const userId = registerResult.insertId;
      this.props.onUserLogin(userId,userName);
      this.onLoginSuccess();
    }).catch(err => {
      this.setState({
        error: true
      });
    });
  }

  render() {
    let loginStatus;
    if(this.props.userName === null) {
      loginStatus = <button onClick={() => this.openModal()}>SIGN IN</button>;
    } else {
      loginStatus = <p> Welcome {this.props.userName} </p>
    }
    return (
      <div>
        {loginStatus}
        <ReactModalLogin
          visible={this.state.showModal}
          onCloseModal={this.closeModal.bind(this)}
          loading={this.state.loading}
          error={this.state.error}
          tabs={{
            afterChange: this.afterTabsChange.bind(this)
          }}
          loginError={{
            label: "Couldn't sign in, please try again."
          }}
          registerError={{
            label: "Couldn't sign up, please try again."
          }}
          startLoading={this.startLoading.bind(this)}
          finishLoading={this.finishLoading.bind(this)}
          form = {{
            onLogin: this.onLogin.bind(this),
            onRegister: this.onRegister.bind(this),
            loginInputs: [
              {
                containerClass: 'RML-form-group',
                label: 'Username',
                type: 'username',
                inputClass: 'RML-form-control',
                id: 'username',
                name: 'username',
                placeholder: 'Username',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Password',
                type: 'password',
                inputClass: 'RML-form-control',
                id: 'password',
                name: 'password',
                placeholder: 'Password',
              }
            ],
            registerInputs: [
              {
                containerClass: 'RML-form-group',
                label: 'Username',
                type: 'text',
                inputClass: 'RML-form-control',
                id: 'username',
                name: 'username',
                placeholder: 'Username',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Password',
                type: 'password',
                inputClass: 'RML-form-control',
                id: 'password',
                name: 'password',
                placeholder: 'Password',
              }
            ],
            loginBtn: {
              label: "Sign in"
            },
            registerBtn: {
              label: "Sign up"
            },
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        userName: state.userName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUserLogin: (userId, userName) => dispatch({type: 'USER_LOGIN', userId: userId, userName: userName})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
