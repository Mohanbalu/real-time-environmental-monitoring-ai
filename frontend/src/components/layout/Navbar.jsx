import { Link } from "react-router-dom";

const navStyle = {
  display: "flex",
  gap: "24px",
  padding: "16px 24px",
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
      <Link to="/">Dashboard</Link>
      <Link to="/alerts">Alerts</Link>
      <Link to="/settings">Settings</Link>
    </div>
  );
};

export default Navbar;
