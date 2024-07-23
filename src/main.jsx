import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './Store/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ShowUsers from './components/ShowUsers.jsx'
import CreateUser from './components/CreateUser.jsx'
import Navbar from './components/Navbar.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<ShowUsers/>}/>
          <Route path='create' element={<CreateUser/>}/>
        </Routes>
      </BrowserRouter>
      <App />
    </Provider>
  </React.StrictMode>,
)
