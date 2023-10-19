import React from 'react'
import ReactDOM from 'react-dom/client'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import './index.css'
import App from 'container/App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ToastContainer
      position="bottom-left"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <App />
  </React.StrictMode>,
)
