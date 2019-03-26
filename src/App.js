import React, { Component } from 'react';
import Header from './components/Header';
import SongDisplay from './components/SongDisplay';
import SideBar from './components/SideBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
	      <div className='app-container'>

	        <div className='side-bar'>
	          <SideBar />
	        </div>

	        <div className='main-section'>
	          <div className='main-section-header' >
              <Header />
            </div>
	          <div className='main-section-container'>
              <SongDisplay />
	          </div>
	        </div>
	      </div>
	    </div>
    );
  }
}

export default App;
