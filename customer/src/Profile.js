import React from "react"
import axios from "axios"

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.customer.name,
            email: props.customer.email,
            password: props.customer.password,
            address: props.customer.address,
            creditcard: props.customer.creditcard
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    componentDidMount() {
        console.log(this.props)
    }

    handleUpdate = async (event) => {
        event.preventDefault();

        const data = {
            password: this.state.password,
            address: this.state.address,
            creditcard: this.state.creditcard,
            email: this.state.email
        }

        /* Checks if data has been changed */
        if (data.password === this.props.customer.password &&
            data.address === this.props.customer.address &&
            data.creditcard === this.props.customer.creditcard) {
                alert("Profile Details Not Changed.")
            } else {
                console.log(data.password === this.props.customer.password)
                console.log(data.address === this.props.customer.address)
                console.log(data.creditcard === this.props.customer.creditcard)
                await axios.put('/api/put/updateCustomer', {params: data})
                    .catch(err => {
                        console.log(err)
                        alert("Error Ocurred During Update")
                    })
            }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state)
    }

    render() {

        console.log(this.state.creditcard)

        return (
        <div>
            <h4>Profile</h4>

            <form onSubmit={this.handleUpdate}>
                <label>Name:         {this.state.name}</label>
                <br></br>
                <label>Email:        {this.state.email}</label>
                <br></br>
                <label>Password:     <input type="text" value={this.state.password} name="password" onChange={this.handleChange}></input></label>
                <br></br>
                <label>Address:      <input type="text" value={this.state.address} name="address" onChange={this.handleChange}></input></label>
                <br></br>
                <label>Credit Card:  <input type="text" value={this.state.creditcard} name="creditcard" onChange={this.handleChange}></input></label>
                <br></br>
                <input type="submit" value="Update Profile"/>
            </form>

        </div>);
    }
}
export default Profile