import React from "react"
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.customer.name,
            email: props.customer.email,
            password: props.customer.password,
            address: props.customer.address,
            creditCard: props.customer.creditCard
        };
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        console.log(this.props)
    }

    handleUpdate = async () => {
        
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

            <form>
                <label>Name:         {this.state.name}</label>
                <br></br>
                <label>Email:        {this.state.email}</label>
                <br></br>
                <label>Password:     <input type="text" value={this.state.password} name="password" onChange={this.handleChange}></input></label>
                <br></br>
                <label>Address:      <input type="text" value={this.state.address} name="address" onChange={this.handleChange}></input></label>
                <br></br>
                <label>Credit Card:  <input type="text" value={this.state.creditCard} name="creditCard" onChange={this.handleChange}></input></label>
                <br></br>
                <input type="submit" value="Register"/>
            </form>

        </div>);
    }
}
export default Profile