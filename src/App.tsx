import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Card from './components/card';
import Body from './components/available_rooms';

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
        <div className='header'>
          <h2>SSF</h2>
        </div>
        <h1 className='logo'>Study Space Finder</h1>
        <div className='container2'>
          {data ? data.map((user: any)=>{
            return <Card key={user.id} user={user}/>
          }) : null}
        </div>
      </header>
    </div>
  );
}

//.filter((user: any)=>user.id < 5)

export default App;
