import React from 'react'
import Home from './Components/Home';
import {Route} from 'react-router-dom'
import { Routes } from "react-router-dom";
import Customer from './Components/Customer';
import Navbar from './Components/Navbar';
import Transfer from './Components/Transfer';

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

 
 </Routes>
    </>


   
    
 
  )
}
export default App;