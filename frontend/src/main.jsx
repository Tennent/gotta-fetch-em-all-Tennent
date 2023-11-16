import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Areas from './pages/Areas/Areas.jsx'
import Home  from './pages/Home/Home.jsx'
import Battle from './pages/Battle/Battle.jsx'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/areas/:name' element={<Areas />} />
        <Route path='/battle' element={<Battle />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)