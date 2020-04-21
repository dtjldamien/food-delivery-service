import React from 'react'
import axios from 'axios'

class Register extends React.Component {

    constructor() {
        super()
        this.state = {
            email: "",
            name: "",
            vehicle: "",
            bankAccount: "",
            password: "",
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

        const rider = {
            email: this.state.email,
            name: this.state.name,
            vehicle: this.state.vehicle,
            bankAccount: this.state.bankAccount,
            password: this.state.password,
        }

        console.log(rider)

        await axios.post('/api/post/registerDeliveryRider', {params : rider})
                .then(res => alert("Account Created Successfully!"))
                .catch(err => alert("Account Already Exists"))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleRegister}>
                    <label>Name: <input type="text" name="name" onChange={this.handleChange}></input></label>
                    <br></br>
                    <label>Email: <input type="text" name="email" onChange={this.handleChange}></input></label>
                    <br></br>
                    <label>Vehicle: <input type="text" name="vehicle" onChange={this.handleChange}></input></label>
                    <br></br>
                    <label>Bank Account Number: <input type="number" name="bankAccount" onChange={this.handleChange}></input></label>
                    <br></br>
                    <label>Password: <input type="text" name="password" onChange={this.handleChange}></input></label>
                    <br></br>
                    <input type="submit" value="Register"/>
                </form>
            </div>
        )
    }

}

export default Register