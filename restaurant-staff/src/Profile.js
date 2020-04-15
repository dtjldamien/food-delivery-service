import React from 'react';
import axios from "axios"

class Profile extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          rid: props.restaurantStaff.rid,
          email: props.restaurantStaff.email,
          password: props.restaurantStaff.password,
          name: props.restaurantStaff.name,
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
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
    }

    /* Checks if data has been changed */
    if (data.email === this.props.restaurantStaff.email &&
        data.password === this.props.restaurantStaff.password) {
            alert("Profile Details Not Changed.")
        } else {
            console.log(data.email === this.props.restaurantStaff.email)
            console.log(data.password === this.props.restaurantStaff.password)
            await axios.put('/api/put/updateRestaurantStaff', {params: data})
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
            <label>Email:     <input type="text" value={this.state.email} name="email" onChange={this.handleChange}></input></label>
            <br></br>
            <label>Password:     <input type="text" value={this.state.password} name="password" onChange={this.handleChange}></input></label>
            <br></br>
            <input type="submit" value="Update Profile"/>
        </form>

    </div>);
  }
}

export default Profile