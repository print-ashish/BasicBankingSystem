import React from 'react'
import Home from './Components/Home';
import {Route} from 'react-router-dom'
import { Routes } from "react-router-dom";
import Customer from './Components/Customer';
import Navbar from './Components/Navbar';
import Transfer from './Components/Transfer';
import History from './Components/History'

function App() {
  return (
    <>
<Navbar/>
<Routes>
  
  <Route
 path="/"
 element={<Home />}
 />
  <Route
 path="/customers"
 element={<Customer />}
 />
  <Route
 path="/transfer"
 element={<Transfer />}
 />
  <Route
 path="/transactions"
 element={<History />}
 />

 
 </Routes>
    </>


   
    
 
  )
}
export default App;