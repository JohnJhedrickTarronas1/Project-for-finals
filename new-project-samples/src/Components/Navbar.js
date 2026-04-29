import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ 
      background: "navy",
      padding: "15px"
      
     }}>
      <Link to="/" style={{color:'white', marginRight: "15px"}}>Home</Link>
      <Link to="/discoveries" style={{color:'white', marginRight: "15px"}}>Discoveries</Link>
      <Link to="/weather" style={{color:'white', marginRight: "15px"}}>Weather</Link>
      <Link to="/currency" style={{color:'white', marginRight: "15px"}}>Converter</Link>
    </nav>
  );
}

export default Navbar;