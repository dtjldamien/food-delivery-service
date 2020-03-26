import React from "react"
import axios from 'axios'
import datatable, { DataTable } from 'primereact/datatable'
class Restaurants extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryName: "All",
            restaurantData: [
                {name: 'res1', id: '1'},
                {name: 'res2', id: '2'}
            ]
        }
    }
    componentDidMount() {
        this.setState((prevState)=>({categoryName: this.props.match.params.catname}))
        const restaurantParam = {
            catname: this.state.categoryName
        }
        axios.get('/api/get/getRestaurants', {params: restaurantParam})
        .then(data => data.data.map(restaurant => restaurant.rname))
        // .then(catnames => this.setState( {categories : catnames }))
        // .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <h1>{this.state.categoryName}</h1>
                <DataTable>
                    
                </DataTable>
            </div>
        )
    }
}
export default Restaurants 