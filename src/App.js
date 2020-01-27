import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./components/home"
import About from "./components/navbar/about"
import Contact from "./components/navbar/contact"
import AddPaths from "./components/navbar/addPaths"
import './App.css';


export default function App() {
  return (
    <Router >
      <div>
        <nav>
          <Link className="link" to="/">Home</Link>
          <Link className="link" to="/contact">Contact</Link>
          <Link className="link" to="/about">About</Link>
          <Link className="link" to="/addPaths">Add Paths</Link>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route path="/addPaths" component={AddPaths} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}


