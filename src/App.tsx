import React from 'react';
import logo from './logo.svg';
import Title from './components/title'
import './App.css';
import Body from './components/available_rooms';
import { useEffect } from 'react';
import { useState } from 'react';

import {getDatabase, ref, child, get} from 'firebase/database'
function App() {
  
  const handleClick = (()=>{
    const database = getDatabase()
    const dbref = ref(database);
  
    get(child(dbref,`Bob Wright`)).then((snapshot) => {
      if(snapshot.exists()){
        console.log(snapshot.val())
      } else {
        console.log("No data available")
      }
    }).catch((error)=>{
      console.log(error)
    });
  })
  
  return (
    <div className="App">
      <header className="App-header">
        Study Space Finder
      <button onClick={handleClick}>Click me</button>
      </header>
    </div>
  );
}
 
export default App;
