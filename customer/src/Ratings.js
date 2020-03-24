import React from "react";
import MenuBar from "./MenuBar";
export class Ratings extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (<div>
            <MenuBar activeItem="Ratings" />
            <div>Ratings</div>
        </div>);
    }
}
export default Ratings
