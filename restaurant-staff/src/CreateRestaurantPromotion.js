import React from 'react';
import axios from 'axios';

class CreateRestaurantPromotion extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rid: props.restaurantStaff.rid,
      email: "",
      password: props.restaurantStaff.password,
      name: props.restaurantStaff.name,
      promotionLimit: "",
      startDate: "",
      endDate: "",
      discountType: "",
      isPriceDiscount: false,
      discountValue: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCreateRestaurantPromotion = this.handleCreateRestaurantPromotion.bind(this)
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

  handleCreateRestaurantPromotion = async (event) => {
    event.preventDefault()
    const currentCount = 0
    if (this.state.discountType.valueOf() == new String("priceDiscount").valueOf()) {
      this.state.isPriceDiscount = true
    } else {
      this.state.isPriceDiscount = false
    }
    const restaurantPromotion = {
      email: this.state.email,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      currentCount: currentCount,
      promotionLimit: this.state.promotionLimit,
      isPriceDiscount: this.state.isPriceDiscount,
      discountValue: this.state.discountValue
    }

    console.log(restaurantPromotion)

    await axios.post('/api/post/createRestaurantPromotion', { params: restaurantPromotion })
      .then(res => alert("Restaurant Promotion Created Successfully!"))
      .catch(err => alert("Create Restaurant Promotion Error"))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleCreateRestaurantPromotion}>
          <label>Email: <input type="email" name="email" onChange={this.handleChange}></input></label>
          <br></br>
          <label>Promotion Limit: <input type="text" name="promotionLimit" onChange={this.handleChange}></input></label>
          <br></br>
          <label>Start Date: <input type="date" name="startDate" onChange={this.handleChange}></input></label>
          <br></br>
          <label>End Date: <input type="date" name="endDate" onChange={this.handleChange}></input></label>
          <br></br>
          <p>Select a discount type:</p>
          <label>Percentage Discount: </label><input type="radio" value="percentageDiscount" name="discountType" />
          <label>Price Discount: </label><input type="radio" value="priceDiscount" name="discountType" />
          <br></br>
          <label>Discount Value: <input type="number" name="discountValue" onChange={this.handleChange}></input></label>
          <br></br>
          <input type="submit" value="Create New Restaurant Promotion" />
        </form>
      </div>
    )
  }
}

export default CreateRestaurantPromotion;