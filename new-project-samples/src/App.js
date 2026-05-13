import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home/Home.js";
import Discoveries from "./Components/Discoveries/Discoveries.js";
import Weather from "./Components/Weather/Weather.js";
import Converter from "./Components/Converter/Converter.js";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discoveries" element={<Discoveries />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/currency" element={<Converter />} />
      </Routes>
    </Router>
  );
}

export default App;