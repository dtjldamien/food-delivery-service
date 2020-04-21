import React from 'react';
import axios from "axios"

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.rider.email,
            name: props.rider.name,
            vehicle: props.rider.vehicle,
            bankAccount: props.rider.bankAccount,
            password: props.rider.password,
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
            email: this.state.email,
            vehicle: this.state.vehicle,
            bankAccount: this.state.bankAccount,
            password: this.state.password,
        }

        /* Checks if data has been changed */
        if (data.email === this.props.rider.email &&
            data.vehicle === this.props.rider.vehicle &&
            data.bankAccount === this.props.rider.bankAccount &&
            data.password === this.props.rider.password) {
            alert("Profile Details Not Changed.")
        } else {
            console.log(data.email === this.props.rider.email)
            console.log(data.vehicle === this.props.rider.vehicle)
            console.log(data.bankAccount === this.props.rider.bankAccount)
            console.log(data.password === this.props.rider.password)
            await axios.put('/api/put/updateDeliveryRider', { params: data })
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

        return (
            <div>
                <h4>Profile</h4>

                <form onSubmit={this.handleUpdate}>
                    <label>Name:         {this.state.name}</label>
                    <br></br>
                    <label>Email:         {this.state.email}</label>
                    <br></br>
                    <label>Vehicle:     <input type="text" value={this.state.vehicle} name="vehicle" onChange={this.handleChange}></input></label>
                    <br></br>
                    <label>Bank Account Number:     <input type="number" value={this.state.bankAccount} name="bankAccount" onChange={this.handleChange}></input></label>
                    <br></br>
                    <label>Password:     <input type="text" value={this.state.password} name="password" onChange={this.handleChange}></input></label>
                    <br></br>
                    <input type="submit" value="Update Profile" />
                </form>

            </div>);
    }
}

export default Profile