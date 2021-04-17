import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


/*
use this instead of router
render() {
  let page = null
  switch (this.state.page) {
  case 'home':
    page = <Home />
    break
  case 'user':
    page = <User />
    break
  }
  return page
}

*/



ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
