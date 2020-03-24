import React from "react";
import MenuBar from "./MenuBar";
class Reviews extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (<div>
            <MenuBar activeItem="Reviews" />
            <h4>Reviews</h4>
        </div>);
    }
}
export default Reviews
