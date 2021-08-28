import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { React, useState } from "react";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { varCtx } from "./loader";
import NavBar from "./NavBar";
export default function App() {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(0);
  return (
    <varCtx.Provider value={{ cart, setCart, loading, setLoading }}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/home" component={Home}></Route>
        </Switch>
      </Router>
    </varCtx.Provider>
  );
}
