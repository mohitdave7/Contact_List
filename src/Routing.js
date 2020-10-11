import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../src/Components/home";
import DetailPage from "../src/Components/detailpage";
import favourites from "./Components/favourites";

function RoutingClass() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route path="/contact/:id" component={DetailPage} />
        <Route path="/favourites" component={favourites} />
      </Switch>
    </Router>
  );
}

export default RoutingClass;
