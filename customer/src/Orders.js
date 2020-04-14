import React from "react"
import {BrowserRouter as Router, Switch, Link, useRouteMatch, Route} from "react-router-dom"
class Orders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    // componentDidMount() {
    //     // console.log(this.state)
    //     console.log(this.props)
    //     console.log(this.state)
    //     axios.get('/api/get/getFoodItemsByRestaurantID', {params: restaurantID})
    //     .then(data => data.data.map(foodItems => foodItems))
    //     .then(foodItems=>this.setState({foodData:foodItems}))
    // }
    render() {
        return (
            <div>
                <h4>Past Orders</h4>
            </div>
        )
    }
}

export default Orders