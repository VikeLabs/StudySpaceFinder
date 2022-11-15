import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/index";
import About from "./components/About/index";
import Nav from "components/common/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
