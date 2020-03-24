import React from 'react';
import Home from './Home'
import MenuBar from './MenuBar'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import PizzaService from "./PizzaService"
import Orders from "./Orders"
import Reviews from "./Reviews";
import Profile from "./Profile"
// import logo from './logo.svg';
import 'primereact/resources/themes/nova-light/theme.css';

function App() {
  return (
    <Router>
      <h3>Food Delivery Service</h3>
      <Switch>
        <Route exact path = "/"><Home/></Route>
        {/* <Route path = "/home"><PizzaService/></Route>  */}
        <Route path = "/orders"><Orders/></Route>
        <Route path = "/reviews"><Reviews/></Route>
        <Route path = "/profile"><Profile/></Route>
      </Switch>
    </Router>
  );
}

export default App;
