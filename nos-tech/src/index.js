import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Redux store
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import { rootReducer } from './store/rootReducer'

// const store = createStore(rootReducer);

// ReactDOM.render((
// 	<Provider store={store}>
// 		    <App />
// 	</Provider>
//   ), document.getElementById('root'))
// // registerServiceWorker()
// //Redux render end

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// serviceWorker.unregister();
