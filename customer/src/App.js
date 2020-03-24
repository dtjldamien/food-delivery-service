import React from 'react';
import home from './home'
import MenuBar from './MenuBar'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import PizzaService from "./PizzaService"
import Orders from "./Orders"
import Ratings from "./Ratings";
// import logo from './logo.svg';
import 'primereact/resources/themes/nova-light/theme.css';

function App() {
  return (
    <Router>
      <h1>Food Delivery Service</h1>
      <Switch>
        <Route exact path = "/"><MenuBar activeItem = "Home"/></Route>
        <Route path = "/home"><PizzaService/></Route> 
        <Route path = "/orders"><Orders/></Route>
        <Route path = "/ratings"><Ratings/></Route>
      </Switch>
    </Router>
  );
}

export default App;
