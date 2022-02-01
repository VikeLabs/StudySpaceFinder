import React from 'react';
import logo from './logo.svg';
import Title from './components/title'
import './App.css';
import Body from './components/available_rooms';
import { useEffect } from 'react';
import { useState } from 'react';
import { json } from 'stream/consumers';

function App() {
  const [data, setData] = useState<any>()

  useEffect(() => {
    const url='http://jsonplaceholder.typicode.com/users'

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setData(json);
      } catch (error) {
          console.log("error", error);
      }
    }

    fetchData()
  }, []);

  
  return (
    <div className="App">
      <header className="App-header">
          {data ? <p>{data.length}</p> : null}
      </header>
    </div>
  );
}

export default App;
