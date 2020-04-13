import React from 'react'
import axios from 'axios'

class Register extends React.Component {

    constructor() {
        super()
        this.state = {
            rid: "",
            email: "",
            password: "",
            name: "",
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

        const restaurantStaff = {
            rid: this.state.rid,
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
        }

        console.log(restaurantStaff)

        await axios.post('/api/post/registerRestaurantStaff', {params : restaurantStaff})
                .then(res => alert("Account Created Successfully!"))
                .catch(err => alert("Account Already Exists"))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleRegister}>
                    <label>Restaurant ID: <input type="text" name="rid" onChange={this.handleChange}></input></label>
                    <br></br>
                    <label>Email: <input type="text" name="email" onChange={this.handleChange}></input></label>
                    <br></br>
                    <label>Password: <input type="text" name="password" onChange={this.handleChange}></input></label>
                    <br></br>
                    <label>Name: <input type="text" name="name" onChange={this.handleChange}></input></label>
                    <br></br>
                    <input type="submit" value="Register"/>
                </form>
            </div>
        )
    }

}

export default Register