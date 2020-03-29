import React from 'react';
import Home from './Home'
import MenuBar from './MenuBar'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import axios from "axios";
import Orders from "./Orders"
import Reviews from "./Reviews";
import Profile from "./Profile"
import Restaurants from "./Restaurants"
import { Card } from "primereact/card"
// import logo from './logo.svg';
import 'primereact/resources/themes/nova-light/theme.css';

class App extends React.Component {
    
  constructor() {
    super()
    this.state = {
      customer: {},
      loggedIn: false,
      email: "",
      password: "",
      errorMessage: ''
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  showContents() {
    return (
      <Router>
        <h3>Food Delivery Service</h3>
        <button onClick={this.handleLogout}>Log Out</button>
        <MenuBar activeItem = "Restaurants"/>
        <Switch>
          <Route exact path = "/" render={() => <Home {...this.state} />}/>
          <Route path = "/orders" render={() => <Orders {...this.state} />} />
          <Route path = "/reviews" render={() => <Reviews {...this.state} />} />
          <Route path = "/profile" render={() => <Profile {...this.state} />} />
          <Route exact path = "/restaurants" render={() => <Restaurants {...this.state} />} />
          <Route path = "/restaurants/:catname" render={() => <Restaurants {...this.state} />} />
        </Switch>
      </Router>
    )
  }

  handleLogin = async (event) => {
    
    event.preventDefault();

    if (this.state.email !== '' && this.state.password !== '') {
      const data = {
        email: this.state.email
      }

      await axios.get('/api/get/customerLogin', {params: data})
              .then(data => this.setState({customer : data.data[0]}))
              .catch(err => {
                this.setState({errorMessage: "Invalid Credentials"})
                console.log(err.message)
              })
      
        if (this.state.password === this.state.customer.password) { 
          this.setState({loggedIn: true})
        } else {
          alert("Invalid Password")
        }

    }

  }

  handleLogout() {
    this.setState({loggedIn: false})
    this.setState({customer: {}})
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  loginPage() {

    const inputs =  <div>
                      <label>Customer Email: <input type="text" name="email" onChange={this.handleChange}/></label>
                      <br></br>
                      <label>Password: <input type="text" name="password" onChange={this.handleChange}></input></label>
                      <br></br>
                      <input type="submit" value="Log In"/>
                    </div>;

    const header = <h3>Food Delivery Service: Customer Login</h3>

    const cardStyle = {
      display: 'inline-block',
      width: '360px',
      padding: '5px',
      margin: '10px'
    }

    return (
      <div>
        <form onSubmit={this.handleLogin}>
          {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>}
          <Card header={header} footer={inputs} style={cardStyle}>
            
          </Card>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div>

        {!this.state.loggedIn && this.loginPage()} 
        {this.state.loggedIn && this.showContents()}

      </div>
    )
  }
}

export default App;
