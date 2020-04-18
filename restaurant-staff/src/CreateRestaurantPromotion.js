import React from 'react';
import axios from 'axios';

class CreateRestaurantPromotion extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rid: props.restaurantStaff.rid,
      email: props.restaurantStaff.email,
      password: props.restaurantStaff.password,
      name: props.restaurantStaff.name,
      promotionLimit: '',
      startDate: '',
      endDate: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  componentDidMount() {
    console.log(this.props)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  handleCreateRestaurantPromotions = async (event) => {
    event.preventDefault()
    const currentCount = 0
    const restaurantPromotion = {
      email: this.state.email,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      currentCount: currentCount,
      promotionLimit: this.state.promotionLimit
    }

    console.log(restaurantPromotion)

    await axios.post('/api/post/createRestaurantPromotion', restaurantPromotion)
    .then(res => alert("Restaurant Promotion Created Successfully!"))
    .catch(err => alert("Create Restaurant Promotion Error"))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleCreateRestaurantPromotions}>
          <label>Promotion Limit: <input type="number" name="promotionLimit" onChange={this.handleChange}></input></label>
          <br></br>
          <label>Start Date: <input type="date" name="startDate" onChange={this.handleChange}></input></label>
          <br></br>
          <label>End Date: <input type="date" name="endDate" onChange={this.handleChange}></input></label>
          <br></br>
          <input type="submit" value="Create Restaurant Promotion" />
        </form>
      </div>
    )
  }
}

export default CreateRestaurantPromotion;