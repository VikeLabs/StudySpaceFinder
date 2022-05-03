import React from 'react';
import logo from './logo.svg';
import Title from './components/title'
import './App.css';
import Body from './components/available_rooms';
import { useEffect } from 'react';
import { useState } from 'react';

import {getDatabase, ref, child, get} from 'firebase/database'
function App() {

  const fetchData = async () => {
    const date = "202205";
    const courseListUrl = `https://courseup.vikelabs.ca/api/courses/${date}`;

    const response = await fetch(courseListUrl)
      .then((response) => {return response.json()})
      .then(data =>{
        data.forEach((element: any) => {
          let code = element.code
          let subject = element.subject
          let query = `https://courseup.vikelabs.ca/api/sections/${date}?subject=${subject}&code=${code}`
          console.log(query)
        });
    })
  }
  
  const handleClick = ( async ()=>{
    // fetch()
    // const database = getDatabase()
    // const dbref = ref(database);
  
    // get(child(dbref,`Bob Wright`)).then((snapshot) => {
    //   if(snapshot.exists()){
    //     console.log(snapshot.val())
    //   } else {
    //     console.log("No data available")
    //   }
    // }).catch((error)=>{
    //   console.log(error)
    // });
  })
  
  return (
    <div className="App">
      <header className="App-header">
        Study Space Finder
      <button onClick={fetchData}>Click me</button>
      </header>
    </div>
  );
}
 
export default App;
