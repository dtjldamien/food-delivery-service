import React from "react"
import axios from "axios"
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'

class FoodItems extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            foodData: [],
            visible: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.updateFoodItem = this.updateFoodItem.bind(this)
        this.updateFoodItemDialog = this.updateFoodItemDialog.bind(this)
    }

    componentDidMount() {

        const data = {
            rid: this.props.restaurantStaff.rid
        }

        axios.get('/api/get/getFoodItemsByRestaurantID', {params: data})
            .then(rsp => rsp.data.map(foodItems => foodItems))
            .then(foodItems => foodItems.map(food => {
                food.price = parseFloat(food.price).toFixed(2).toString()
                return food
            }))
            .then(foodItems => this.setState({ foodData: foodItems }))
            .catch(err => console.log(err))

    }

    handleUpdate = async (event, fid) => {
        
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state)
    }

    updateFoodItem(rowData) {
      
    }

    updateFoodItemDialog(rowData, column) {

        return (
            <div>
                <Dialog header="Update Food Item" visible={this.state.visible} onHide={() => this.setState({visible: false})}>
                    {this.updateFoodItem(rowData)}
                </Dialog>
                <Button label=" Edit Food Item" onClick={()=> {
                        this.setState({visible: true})
                    }}></Button>
            </div>
        )
    }


    render() {
        return (
            <div>
                <DataTable value = {this.state.foodData}>
                    <Column field="fid" header = "Food ID"/>
                    <Column field="fname" header="Food Name" sortable={true}/>
                    <Column field="description" header= "Description" sortable={true}/>
                    <Column field="price" header="Price" sortable={true}/>
                    <Column field="availability" header="Current Availability" sortable={true}/>
                    <Column field="dailylimit" header="Daily Limit" sortable={true}/>
                    <Column field="fid" body={this.updateFoodItemDialog}/>
                </DataTable>
            </div>
        )
    }

}

export default FoodItems