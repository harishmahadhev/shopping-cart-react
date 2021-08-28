import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Badge } from "@material-ui/core";
import "./styles.css";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { varCtx } from "./loader";
export default function NavBar() {
  const { cart } = useContext(varCtx);
  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Navbar.Collapse className="justify-content-end">
        <Nav className="navbar">
          <Link to="/home" className="link" style={{ textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/cart" className="link" style={{ textDecoration: "none" }}>
            <Badge
              badgeContent={cart}
              color="error"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
            >
              <FaShoppingCart />
            </Badge>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
