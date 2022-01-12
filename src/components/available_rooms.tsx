import React from 'react';
import RoomCard from './card';

function Body(props: any) {
  return (
    <div>
      <RoomCard room = {props.room1}/>
      <RoomCard room = {props.room2}/>
    </div>
    
  );
}

export default Body;
