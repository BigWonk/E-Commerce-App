import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './HomePage/HomePage';
import Login from './Login/Login';
import Register from './Register/Register';
import Account from './AccountInfo/Account';
import Orders from './AccountInfo/Orders';
import { About } from './HomePage/About';
import { Contact } from './HomePage/Contacts';
import Store from './Store/Store';
import Cart from './Store/Cart';
import Checkout from './Store/Checkout';
function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<HomePage></HomePage>}></Route>
      <Route path='/login' element = {<Login></Login>}></Route>
      <Route path='/register' element = {<Register></Register>}></Route>
      <Route path='/account' element = {<Account></Account>}></Route>
      <Route path='/account/orders' element = {<Orders></Orders>}></Route>
      <Route path='/about' element = {<About></About>}></Route>
      <Route path='/contacts' element = {<Contact></Contact>}></Route> 
       <Route path='/store' element = {<Store></Store>}></Route> 
       <Route path='/cart' element = {<Cart></Cart>}></Route> 
       <Route path='/checkout' element = {<Checkout></Checkout>}></Route> 

    </Routes>
      
    </BrowserRouter>
  )
}

export default App
