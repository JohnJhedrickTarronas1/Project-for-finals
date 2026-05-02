import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Discoveries from "./Components/Discoveries/Discoveries";
import Weather from "./Components/Weather";
import Converter from "./Components/Converter";

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