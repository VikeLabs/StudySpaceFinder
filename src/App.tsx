import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/index";
import About from "./components/About/index";
import Nav from "components/common/Nav";
import ClassroomCardsContainer from "components/Classrooms";
import RoomCalendar from "components/Classrooms/RoomCalendar";

//comment

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="classrooms" element={<ClassroomCardsContainer/>} />
        <Route path="classrooms/calendar" element={<RoomCalendar/>} />
      </Routes>
    </div>
  );
}

export default App;
