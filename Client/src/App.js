import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddEntity from "./components/AddEntity";
import Entity from "./components/Entity";
import EntitiesList from "./components/EntitiesList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/entities" className="navbar-brand">
          Grip Invest
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/entities"} className="nav-link">
              Entities
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add Entity
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/entities"]} component={EntitiesList} />
          <Route exact path="/add" component={AddEntity} />
          <Route path="/entities/:id" component={Entity} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
