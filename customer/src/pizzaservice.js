import axios from 'axios';
import React from 'react';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import 'primereact/resources/themes/nova-light/theme.css';
import MenuBar from "./MenuBar"
class PizzaService extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sells: []
        }
    }

    // Make ajax calls here
    componentDidMount() {
        axios.get('api/get/allsells')
        .then(data => this.setState({sells: data.data}))
        .catch(err => console.log(err));    
    }

    render() {

        console.log(this.state.pizza);
        console.log(this.state.customers);

        return (
            <div>
               <MenuBar activeItem = "Home"/> 
                <div style={{ width: 500 }}>
                    <DataTable value={this.state.sells}>
                        <Column field = 'rname' header='Restaurant'/>
                        <Column field = 'pizza' header='Pizza'/>
                        <Column field = 'price' header='Price'/>
                    </DataTable>
                </div>
            </div>
        )
        
    }
}

export default PizzaService