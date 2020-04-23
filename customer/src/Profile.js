import React from "react"
import axios from "axios"
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'

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
                alert("Profile Details Successfully Changed!")
            }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state)
    }

    render() {

        const formStyle = {
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }

        return (
        <div>
            <h4>Profile</h4>

            <div style={formStyle}>

                <span className="p-float-label"> 
                    <InputText id="name" value={this.state.name} onChange={e => e}/>
                    <label htmlFor="name">Name: </label>
                </span>
                <br></br>
                <span className="p-float-label"> 
                    <InputText id="email" value={this.state.email} onChange={e => e}/>
                    <label htmlFor="email">Email: </label>
                </span>
                <br></br>
                <span className="p-float-label"> 
                    <Password id="password" value={this.state.password} feedback={false} onChange={e => this.setState({password: e.target.value})}/>
                    <label htmlFor="password">Password: </label>
                </span>
                <br></br>
                <span className="p-float-label"> 
                    <InputText id="address" value={this.state.address} onChange={e => this.setState({address: e.target.value})}/>
                    <label htmlFor="address">Address: </label>
                </span>
                <br></br>
                <span className="p-float-label"> 
                    <InputText id="creditCard" value={this.state.creditcard} onChange={e => this.setState({creditcard: e.target.value})}/>
                    <label htmlFor="creditCard">Credit Card: </label>
                </span>
                <br></br>
                <Button label="Update Profile" onClick={e => this.handleUpdate(e)}/>

           </div>

        </div>);
    }
}
export default Profile