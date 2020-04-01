import React from 'react';
import Home from './Home'
import MenuBar from './MenuBar'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import axios from "axios";
import Orders from "./Orders"
import Reviews from "./Reviews";
import Profile from "./Profile"
import Restaurants from "./Restaurants"
import FoodItems from "./FoodItems"
import { Card } from "primereact/card"
import Register from "./Register"
import { Dialog } from "primereact/dialog"
import 'primereact/resources/themes/nova-light/theme.css';
import { Button } from 'primereact/button';

class App extends React.Component {
    
  constructor() {
    super()
    this.state = {
      customer: {},
      loggedIn: false,
      email: "",
      password: "",
      visible: false
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  showContents() {
    return (
      <Router>
        <MenuBar activeItem = "Restaurants"/>
        <button onClick={this.handleLogout}>Log Out</button>
        <Switch>
          <Route exact path = "/" render={(props) => <Home {...props} {...this.state}/>} />
          <Route path = "/orders" render={(props) => <Orders {...props} {...this.state}/>} />
          <Route path = "/reviews" render={(props) => <Reviews {...props} {...this.state}/>} />
          <Route path = "/profile" render={(props) => <Profile {...props} {...this.state}/>} />
          <Route exact path = "/restaurants" render={(props) => <Restaurants {...props} {...this.state}/>} />
          <Route exact path = "/restaurants/:catname" render={(props) => <Restaurants {...props} {...this.state}/>} />
          <Route exact path = "/restaurants/:catname/:rname" render={(props)=> <FoodItems {...props} {...this.state}/>}/>
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
                alert("Account Doesn't Exist")
              })
      
        if (this.state.customer !== undefined) {
          if (this.state.password === this.state.customer.password) { 
            this.setState({loggedIn: true})
          } else {
            alert("Invalid Password")
          }
        } else {
          alert("Account Not Found.")
        }

    }

  }

  handleLogout() {
    this.setState({loggedIn: false})
    this.setState({customer: {}})
    this.setState({email: ""})
    this.setState({password: ""})
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  loginPage() {

    console.log(this.state)

    const inputs =  <div>
                      <label>Customer Email: <input type="text" name="email" onChange={this.handleChange}/></label>
                      <br></br>
                      <label>Password: <input type="text" name="password" onChange={this.handleChange}></input></label>
                      <br></br>
                      <input type="submit" value="Log In"/>
                    </div>;

    const header = <h3>Food Delivery Service: Customer Login</h3>

    const loginCardStyle = {
      display: 'inline-block',
      width: '360px',
      padding: '5px',
      margin: '10px',
    }

    return (
      <div>
        <form onSubmit={this.handleLogin}>
          {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>}
          <Card header={header} footer={inputs} style={loginCardStyle}></Card>
        </form>
        <Dialog header="Register" visible={this.state.visible} onHide={() => this.setState({visible: false})}>
          <Register/>
        </Dialog>
        <Button label="Register" icon="pi pi-info-circle" onClick={(e) => this.setState({visible: true})}/>
      </div>
    )
  }

  render() {
    return (
      <div>

        {/* {!this.state.loggedIn && this.loginPage()} 
        {this.state.loggedIn && this.showContents()} */}
        {this.showContents()}
      </div>
    )
  }
}

export default App;
