import "./Navbar.css";
import React from "react";
import Button from "../Button";
import { Link } from "react-router-dom";
import "../../stylesheet-components/css/settings/color.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <h2>Beauty Brands Challenge</h2>

      <Button className="btn-logoff">
        <Link to="/">
          <h4>Sair</h4>
        </Link>
      </Button>
    </div>
  );
};

export default Navbar;
