import React from "react"
import {TabMenu} from "primereact/tabmenu"
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class MenuBar extends React.Component {
    constructor() {
        super()
        this.state = {
            items: [
                {label: 'Home', icon: 'pi pi-fw pi-home', command: (event)=> {window.location = "/"}},
                {label: 'Orders', icon: 'pi pi-fw pi-calendar', command: (event) => {window.location = "/orders"}},
                {label: 'Reviews', icon: 'pi pi-fw pi-pencil', command: (event) => {window.location = "/reviews"}},
                {label: 'Profile', icon: 'pi pi-fw pi-cog', command: (event) => {window.location = "/profile"}}
            ]
        }
    }

    render() {
        return (
            <TabMenu model = {this.state.items} activeItem={this.props.activeItem} onTabChange={(e) => this.setState({activeItem: e.value})}/>
        )
    }

}

export default MenuBar