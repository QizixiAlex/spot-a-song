import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';

import './index.css';
import App from './App';
import reducer from './store/reducer';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}>
  <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossOrigin="anonymous"
/>
<link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/alpertuna/react-metismenu/master/dist/react-metismenu-standart.min.css" />
  <App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
