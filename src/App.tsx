import React from 'react';
import logo from './logo.svg';
import { Routes, Route } from "react-router-dom"
import './App.css';
import Home from "./components/Home/index"
import About from "./components/About/index"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="about" element={ <About/> } />
      </Routes>
    </div>
  );
}

export default App;
