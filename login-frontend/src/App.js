import React from 'react'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Admin from './components/Admin';
import User from './components/User';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';


export default function App() {

  return (
    <Router><Routes>
      <Route exact path="/" element={<Register />} />
      <Route exact path="login" element={<Login />} />
      <Route exact path="user" element={<NavBar />} />
      <Route exact path="admin" element={<User />} />
      <Route exact path="manager" element={<NavBar />} />
      <Route path="/admin/:id" element={<Admin />} />
    </Routes></Router>
  )
}
