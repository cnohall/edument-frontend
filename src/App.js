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
// import NoMatch from "./components/nomatch"
// import DeletePaths from "./components/navbar/deletePaths"
import './App.css';
import ShowPathsURL from "./components/showPathsURL";


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
          <Route exact path="/contact" component={Contact}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/addPaths"component={AddPaths}/>
          <Route exact path="/" component={Home}/>
          <Route path="*" component={ShowPathsURL}/>
          {/* <Route path="*" component={NoMatch} />     */}
          {/* <Route path="/deletePaths">
            <DeletePaths />
          </Route> */}

        </Switch>
      </div>
    </Router>
  );
}


