import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './css/main.css'
import {NoPage} from "./components/NoPage.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<App />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
