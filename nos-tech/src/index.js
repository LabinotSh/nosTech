import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'typeface-roboto'

// Redux store
// import store from './store'
// import { Provider } from 'react-redux'

ReactDOM.render(
  // Inject the store into react components, in our case <App /> component
  // store={store}

  <App />,

  document.getElementById('root')
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
