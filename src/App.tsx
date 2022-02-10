import React from 'react';
import logo from './logo.svg';
import Title from './components/title'
import './css/test.css';
import Body from './components/available_rooms';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="App">
      <header className="App-header">
        <Title/>
        <Body room1 = 'Available' room2 = 'Not Available' />
        <button onClick={() => setCount(count + 1)}>Add</button>
        <button onClick={() => setCount(count - 1)}>Subtract</button>
        <p>{count}</p>
      </header>
    </div>
  );
}
 
export default App;
