import React from 'react'
import axios from 'axios'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'

class Register extends React.Component {

    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            address: "",
            creditCard: "",
            errMessage: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleRegister = async (event) => {

        event.preventDefault();

        const customer = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            creditCard: this.state.creditCard
        }

        await axios.post('/api/post/registerCustomer', {params : customer})
                .then(res => alert("Account Created Successfully!"))
                .catch(err => alert("Account Already Exists"))
    }

    render() {
        return (
            <div>
                <div>
                    <br></br>
                    <span className="p-float-label"> 
                        <InputText id="name" value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>
                        <label htmlFor="name">Name: </label>
                    </span>
                    <br></br>
                    <br></br>
                    <span className="p-float-label"> 
                        <InputText id="email" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
                        <label htmlFor="email">Email: </label>
                    </span>
                    <br></br>
                    <br></br>
                    <span className="p-float-label"> 
                        <Password id="password" value={this.state.password} feedback={false} onChange={e => this.setState({password: e.target.value})}/>
                        <label htmlFor="password">Password: </label>
                    </span>
                    <br></br>
                    <br></br>
                    <span className="p-float-label"> 
                        <InputText id="address" value={this.state.address} onChange={e => this.setState({address: e.target.value})}/>
                        <label htmlFor="address">Address: </label>
                    </span>
                    <br></br>
                    <br></br>
                    <span className="p-float-label"> 
                        <InputText id="creditCard" value={this.state.creditcard} onChange={e => this.setState({creditcard: e.target.value})}/>
                        <label htmlFor="creditCard">Credit Card: </label>
                    </span>
                    <br></br>
                    <Button label="Update Profile" onClick={e => this.handleUpdate(e)}/>
                </div>
            </div>
        )
    }

}

export default Register