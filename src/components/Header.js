
import React, { Component } from 'react';
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
    console.log("logged successfully with " + method);
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
    // TODO: login
    console.log('login');
  }

  onRegister() {
    // TODO: register
    console.log('register');
  }

  render() {
    return (
      <div>
        <button onClick={() => this.openModal()}>SIGN IN</button>

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
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
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
                label: 'Nickname',
                type: 'text',
                inputClass: 'RML-form-control',
                id: 'login',
                name: 'login',
                placeholder: 'Nickname',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
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

export default Header;
