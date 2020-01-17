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
// import DeletePaths from "./components/navbar/deletePaths"
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
          {/* <Link className="link" to="/deletePaths">Delete Paths</Link> */}
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/addPaths">
            <AddPaths/>
          </Route>
          {/* <Route path="/deletePaths">
            <DeletePaths />
          </Route> */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


