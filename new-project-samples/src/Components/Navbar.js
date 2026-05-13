import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">✦ Travel</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/discoveries">Discoveries</Link>
        <Link to="/weather">Weather</Link>
        <Link to="/currency">Converter</Link>
      </div>

      <div className="nav-search">
        <input placeholder="Search..." />
        <button>Go</button>
      </div>
    </nav>
  );
}

export default Navbar;
