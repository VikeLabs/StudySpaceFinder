import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/index";
import About from "./components/About/index";
import Nav from "components/common/Nav";
import ClassroomCardsContainer from "components/Classrooms";

//comment

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="classrooms" element={<ClassroomCardsContainer/>} />
      </Routes>
    </div>
  );
}

export default App;
