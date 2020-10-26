import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//Redux store
import store from './store';
import { createStore } from 'redux';

import { Provider } from 'react-redux';

ReactDOM.render(
	<Provider store={store}>
		    <App />
  </Provider>, 
  document.getElementById('root')
)
//Redux store end


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
