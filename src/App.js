import React, { Component } from 'react';
import Header from './components/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
	      <div className='app-container'>

	        <div className='side-bar'>
	          sidebar
	        </div>

	        <div className='main-section'>
	          <div className='main-section-header' >
              <Header />
            </div>
	          <div className='main-section-container'>
              Main Section
	          </div>
	        </div>
	      </div>
	    </div>
    );
  }
}

export default App;
