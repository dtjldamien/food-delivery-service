import React from "react"
import MenuBar from "./MenuBar"
import {BrowserRouter as Router, Switch, Link, useRouteMatch, Route} from "react-router-dom"
import PizzaService from "./PizzaService"
class Orders extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {
        return (
            <div>
                <MenuBar activeItem = "Orders"/>
                <div>Orders</div>
            </div>
        )
    }

}

export default Orders