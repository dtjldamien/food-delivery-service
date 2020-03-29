import react from 'react'
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
        this.handleRegister = this.handleRegister(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleRegister() {

        const customer = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            creditCard: this.state.creditCard
        }

        axios.post('/api/post/registerCustomer', {params : customer})
            .catch(err => this.setState({errMessage: "Failed to create account"}))
    }

    render() {
        <div>
            <form onSubmit={this.handleRegister}>
                <label>Name:        <input type="text" name="name" onChange={this.handleChange}></input></label>
                <label>Email:        <input type="text" name="email" onChange={this.handleChange}></input></label>
                <label>Password:     <input type="text" name="password" onChange={this.handleChange}></input></label>
                <label>Address:      <input type="text" name="address" onChange={this.handleChange}></input></label>
                <label>Credit Card:  <input type="text" name="creditCard" onChange={this.handleChange}></input></label>
                <input type="submit" value="Register"/>
            </form>
        </div>
    }

}