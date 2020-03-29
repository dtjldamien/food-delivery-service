import React from 'react'
import axios from 'axios'

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
        console.log(this.state)
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

        console.log(customer)

        await axios.post('/api/post/registerCustomer', {params : customer})
                .then(res => alert("Account Created Successfully!"))
                .catch(err => alert("Account Already Exists"))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleRegister}>
                    <label>Name:        <input type="text" name="name" onChange={this.handleChange}></input></label>
                    <br></br>
                    <label>Email:        <input type="text" name="email" onChange={this.handleChange}></input></label>
                    <br></br>
                    <label>Password:     <input type="text" name="password" onChange={this.handleChange}></input></label>
                    <br></br>
                    <label>Address:      <input type="text" name="address" onChange={this.handleChange}></input></label>
                    <br></br>
                    <label>Credit Card:  <input type="text" name="creditCard" onChange={this.handleChange}></input></label>
                    <br></br>
                    <input type="submit" value="Register"/>
                </form>
            </div>
        )
    }

}

export default Register