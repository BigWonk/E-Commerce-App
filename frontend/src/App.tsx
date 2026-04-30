import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './HomePage/HomePage';
import Login from './Login/Login';
import Register from './Register/Register';
import Account from './AccountInfo/Account';
function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<HomePage></HomePage>}></Route>
      <Route path='/login' element = {<Login></Login>}></Route>
      <Route path='/register' element = {<Register></Register>}></Route>
      <Route path='/account' element = {<Account></Account>}></Route>

    </Routes>
      
    </BrowserRouter>
  )
}

export default App
