import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "typeface-roboto";

//Redux store
// import Provider from 'react-redux';
import store from "./store";

import { Provider } from "react-redux";



ReactDOM.render((
	<Provider store={store}>
		    <App />
  </Provider>
), document.getElementById('root'));
//Redux store end

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// serviceWorker.unregister();
