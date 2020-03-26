import React from "react"
class Restaurants extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <div>
                Hello
                {this.props.location.state.category}
            </div>
        )
    }
}
export default Restaurants 