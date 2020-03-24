import React from "react"
import MenuBar from "./MenuBar";
class Profile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (<div>
            <MenuBar activeItem="Profile" />
            <div>Profile</div>
        </div>);
    }
}
export default Profile