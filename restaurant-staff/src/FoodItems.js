import React from "react"
import axios from "axios"
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import Promotions from "./Promotions"

class FoodItems extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            foodData: [],
            visible: false,
            foodEdit: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.updateFoodItem = this.updateFoodItem.bind(this)
        this.updateFoodItemDialog = this.updateFoodItemDialog.bind(this)
        this.setRowDataVisibility = this.setRowDataVisibility.bind(this)
    }

    componentDidMount() {

        const data = {
            rid: this.props.restaurantStaff.rid
        }

        axios.get('/api/get/getFoodItemsByRestaurantID', { params: data })
            .then(rsp => rsp.data.map(foodItems => foodItems))
            .then(foodItems => foodItems.map(food => {
                food.price = parseFloat(food.price).toFixed(2).toString()
                food.visible = false
                food.pvisible = false
                return food
            }))
            .then(foodItems => this.setState({ foodData: foodItems }))
            .catch(err => console.log(err))

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state)
    }

    setRowDataVisibility(rowData, visible) {
        //cloning array
        const data = this.state.foodData.slice()
        var copyData = []
        //assigning it to new array
        Object.assign(copyData, data)
        //set whatever properties you need in rowData to update foodData
        rowData.visible = visible
        //finding the index in the array of the rowdata
        const index = this.state.foodData.findIndex(function (ele) {
            return ele.fid === rowData.fid
        })
        //removing and replacing the dictionary at index with rowData
        copyData.splice(index, 1, rowData)
        //replace the entire foodData with new updated visibility rowData
        this.setState({ foodData: copyData })
    }

    setFoodItem(rowData) {
        //cloning array
        const data = this.state.foodData.slice()
        var copyData = []
        //assigning it to new array
        Object.assign(copyData, data)
        //finding the index in the array of the rowdata
        const index = this.state.foodData.findIndex(function (ele) {
            return ele.fid === rowData.fid
        })
        //removing and replacing the dictionary at index with rowData
        copyData.splice(index, 1, rowData)
        //replace the entire foodData with new updated visibility rowData
        this.setState({ foodData: copyData })
    }
    updateFoodItemToDB= async () => {

        const data = this.state.foodEdit

        await axios.put('/api/put/updateFoodItem', { params: data })
            .then(rsp => alert(rsp.data))
            .catch(err => { console.log(err); alert("An Error Has Ocurred.")})

    }
    updateFoodItem(rowData) {
        // const formStyle = {
        //     position: 'absolute', left: '50%', top: '50%',
        //     transform: 'translate(-50%, -50%)'
        // }

        /* Inputs for the customer email and password */
        const foodEdit = this.state.foodEdit
        const inputs = <div style={{margin:"30px"}}>
            {/* <h2 style={{ position: 'absolute', left: '30%', top: '25%' }}>Food Delivery Service: Edit FoodItem</h2> */}

                <span className="p-float-label" style={{margin:"10px"}}>
                    <InputText style={{width:"600px"}} id="fname" value={this.state.foodEdit.fname} onChange={(e) => {
                        foodEdit.fname = e.target.value
                        this.setState({ foodEdit: foodEdit })
                    }} />
                    <label htmlFor="fname">Food Name: </label>
                </span>
                <br></br>
                <span className="p-float-label" style={{margin:"10px"}}>
                    <InputText style={{width:"600px"}} id="description" value={this.state.foodEdit.description} onChange={(e) => {
                        foodEdit.description = e.target.value
                        this.setState({ foodEdit: foodEdit })
                    }} />
                    <label htmlFor="description">Description: </label>
                </span>
                <br></br>
                <span className="p-float-label" style={{margin:"10px"}}>
                    <InputText keyfilter="pmoney" style={{width:"600px"}} id="price" value={this.state.foodEdit.price} onChange={(e) => {
                        foodEdit.price = e.target.value
                        this.setState({ foodEdit: foodEdit })
                    }} />
                    <label htmlFor="price">Price: </label>
                </span>
                <br></br>
                <span className="p-float-label" style={{margin:"10px"}}>
                    <InputText keyfilter="pint" style={{width:"600px"}} id="availability" value={this.state.foodEdit.availability} onChange={(e) => {
                        foodEdit.availability = e.target.value
                        this.setState({ foodEdit: foodEdit })
                    }} />
                    <label htmlFor="availability">Availability: </label>
                </span>
                <br></br>
                <span className="p-float-label" style={{margin:"10px"}}>
                    <InputText keyfilter="pint" style={{width:"600px"}} id="dailylimit" value={this.state.foodEdit.dailylimit} onChange={(e) => {
                        foodEdit.dailylimit = e.target.value
                        this.setState({ foodEdit: foodEdit })
                    }} />
                    <label htmlFor="dailylimit">Daily Limit: </label>
                </span>
                <br></br>
            <Button label="Confirm Changes" onClick={() => {
                this.updateFoodItemToDB()
                this.setRowDataVisibility(rowData, false)
                this.setFoodItem(this.state.foodEdit)
                this.setState({foodEdit: {}})
            }} />
        </div>;
        return inputs;
    }

    updateFoodItemDialog(rowData, column) {

        return (
            <div>
                <Dialog header="Update Food Item" visible={rowData.visible} onHide={() => {
                    this.setRowDataVisibility(rowData, false)
                    this.setState({foodEdit: {}})
                    }}>
                    {this.updateFoodItem(rowData)}
                </Dialog>
                <Button label=" Edit Food Item" onClick={() => {
                    this.setRowDataVisibility(rowData, true)
                    this.setState({foodEdit: rowData})
                    }} />
            </div>
        )
    }

    render() {
        let header = (
            <div style={{ 'textAlign': 'left' }}>
                <i className="pi pi-search" style={{ margin: '4px 4px 0 0' }}></i>
                <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder={"Search"} size="25" />
            </div>
        );
        return (
            <div>
                <DataTable value={this.state.foodData} header={header} globalFilter={this.state.globalFilter}>
                    <Column field="fid" header="Food ID" />
                    <Column field="fname" header="Food Name" sortable={true} />
                    <Column field="description" header="Description" sortable={true} />
                    <Column field="price" header="Price" sortable={true} />
                    <Column field="availability" header="Current Availability" sortable={true} />
                    <Column field="dailylimit" header="Daily Limit" sortable={true} />
                    <Column field="fid" body={this.updateFoodItemDialog} />
                    <Column field="fid" body={(rowData) => <Promotions {...rowData}/>}/>
                </DataTable>
            </div>
        )
    }

}

export default FoodItems