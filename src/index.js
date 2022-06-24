// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
// import Invoices from './routes/invoices'
// import Invoice from './routes/invoice'
import Stores from './pages/stores'
import Store from './pages/store'
import Login from './pages/login'
import CreateStore from './pages/CreateStore'
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Stores />}/>
        <Route path="login" element={<Login />}/>
        <Route path="stores/:id" element={<Store />} />
        <Route path="stores/create" element={<CreateStore />} />
      </Route>
      <Route
        path="*"
        element={
          <main style={{ padding: '1rem' }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
