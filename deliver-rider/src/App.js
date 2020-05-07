import React from 'react';
import MenuBar from './MenuBar'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import axios from 'axios';
import './App.css';
import Profile from "./Profile";
import { Card } from "primereact/card";
import Register from "./Register";
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';
import 'primereact/resources/themes/nova-light/theme.css';
import Home from './Home';
import WorkSchedule from './WorkSchedule';
import Assignments from './Assignments';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      rider: {},
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
        <MenuBar activeItem="Delivery Rider" />
        <button onClick={this.handleLogout}>Log Out</button>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} {...this.state} />} />
          <Route path="/profile" render={(props) => <Profile {...props} {...this.state} />} />
          <Route path="/workSchedule" render={(props) => <WorkSchedule {...props} {...this.state} />} />
          <Route path="/assignments" render={(props) => <Assignments {...props} {...this.state} />} />
        </Switch>
      </Router>
    )
  }

  handleLogin = async (event) => {

    event.preventDefault();

    /* Ensuring input boxes are not empty */
    if (this.state.email !== '' && this.state.password !== '') {
      const data = {
        email: this.state.email,
      }

      /* API Call to GET delivery rider */
      await axios.get('/api/get/deliveryRiderLogin', { params: data })
        .then(data => this.setState({ rider: data.data[0] }))
        .catch(err => {
          alert("Account Doesn't Exist")
        })

      /* Check if restaurant staff is GET from database */
      if (this.state.rider !== undefined) {
        if (this.state.password === this.state.rider.password) {
          /* Set state if restaurantStaff passes authentication */
          this.setState({ loggedIn: true })
        } else {
          alert("Invalid Password")
        }
      } else {
        alert("Account Not Found.")
      }
    }
  }

  handleLogout() {
    this.setState({ loggedIn: false })
    this.setState({ rider: {} })
    this.setState({ email: "" })
    this.setState({ password: "" })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  loginPage() {

    console.log(this.state)

    /* Inputs for the delivery rider email and password */
    const inputs = <div>
      <label>Delivery Rider Email: <input type="text" name="email" onChange={this.handleChange} /></label>
      <br></br>
      <label>Password: <input type="text" name="password" onChange={this.handleChange}></input></label>
      <br></br>
      <input type="submit" value="Log In" />
    </div>;

    const header = <h3>Food Delivery Service: Delivery Rider Login</h3>

    const loginCardStyle = {
      display: 'inline-block',
      width: '360px',
      padding: '5px',
      margin: '10px',
    }

    return (
      <div>

        {/* Login Form Handling Login */}
        <form onSubmit={this.handleLogin}>
          {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>}
          <Card header={header} footer={inputs} style={loginCardStyle}></Card>
        </form>

        {/* Dialog of the register card */}
        <Dialog header="Register" visible={this.state.visible} onHide={() => this.setState({ visible: false })}>
          <Register />
        </Dialog>

        {/* e is the short form for events, basically make the register card visible */}
        <Button label="Register" icon="pi pi-info-circle" onClick={(e) => this.setState({ visible: true })} />

      </div>
    )
  }

  render() {
    return (
      <div>
        {!this.state.loggedIn && this.loginPage()}
        {this.state.loggedIn && this.showContents()}
        {/* {this.showContents()} */}
      </div>
    )
  }
}

export default App;