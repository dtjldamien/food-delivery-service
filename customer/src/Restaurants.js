import React from "react"
import {Route} from "react-router-dom"
class Restaurants extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryName: ""
        }
    }
    componentDidMount() {
        console.log(this.props.match.params)
        this.setState((prevState)=>({categoryName: this.props.match.params.catname}))
        console.log(this.state)
        console.log(this.props.location)
    }
    render() {
        return (
            <div>
                <h1>{this.state.categoryName}</h1>
            </div>
        )
    }
}
export default Restaurants 