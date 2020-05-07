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
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'

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
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogin = async (event) => {
        
        event.preventDefault();

        /* Ensuring input boxes are not empty */
        if (this.state.email !== '' && this.state.password !== '') {
                const data = {
                    email: this.state.email
                }

                /* API Call to GET customer */
                await axios.get('/api/get/customerLogin', {params: data})
                        .then(data => this.setState({customer : data.data[0]}))
                        .catch(err => {
                            alert("Account Doesn't Exist")
                        })
            
                /* Check if customer is GET from database */
                if (this.state.customer !== undefined) {
                    if (this.state.password === this.state.customer.password) { 
                    /* Set state if customer passes authentication */
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

    loginPage() {

        const formStyle = {
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }

        /* Inputs for the customer email and password */
        const inputs =  <div>

                            <h2 style={{position:'absolute', left: '30%', top:'25%'}}>Food Delivery Service: Customer Login</h2>

                            <form onSubmit={this.handleLogin} style={formStyle}>
                                <span className="p-float-label"> 
                                    <InputText id="email" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>                                    
                                    <label htmlFor="email">Customer Email: </label>
                                </span>
                                <br></br>
                                <span className="p-float-label"> 
                                    <Password id="password" value={this.state.password} feedback={false} onChange={e => this.setState({password: e.target.value})}/>
                                    <label htmlFor="password">Password: </label>
                                </span>
                                <br></br>
                                <Button label="Log In" onClick={e => this.handleLogin(e)}/>
                                {" "}
                                <Button label="Register" type="button" icon="pi pi-info-circle" onClick={(e) => this.setState({visible: true})}/>
                            </form>
                        </div>;

        const loginCardStyle = {
            // display: 'inline-block',
            // width: '360px',
            // padding: '5px',
            // margin: '10px',
            // alignItems: 'center'
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)', height:'700px', width:'1000px'
        }

        return (
            <div>
                
                {/* Login Form Handling Login */}
                <Card footer={inputs} style={loginCardStyle}></Card>

                {/* Dialog of the register card */}
                <Dialog header="Register" style={{width: '50vw'}} visible={this.state.visible} onHide={() => this.setState({visible: false})}>
                    <Register/>
                </Dialog>

            </div>
        )
    }

    showContents() {
        return (
              <Router>
                  <MenuBar activeItem = "Restaurants" handleLogout={this.handleLogout}/>
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
