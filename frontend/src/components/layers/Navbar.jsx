import { Link } from "react-router-dom";

const navStyle = {
  display: "flex",
  gap: "20px",
  padding: "16px",
  background: "#1f2937",
};

const linkStyle = {
  color: "#ffffff",
  textDecoration: "none",
  fontWeight: "bold",
};

const Navbar = () => {
  return (
    <div style={navStyle}>
      <Link to="/" style={linkStyle}>Dashboard</Link>
      <Link to="/alerts" style={linkStyle}>Alerts</Link>
      <Link to="/settings" style={linkStyle}>Settings</Link>
    </div>
  );
};

export default Navbar;
