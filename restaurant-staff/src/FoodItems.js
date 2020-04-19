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
        }
        // this.handleChange = this.handleChange.bind(this)
        // this.handleUpdate = this.handleUpdate.bind(this)
        // this.updateFoodItem = this.updateFoodItem.bind(this)
        // this.updateFoodItemDialog = this.viewFoodItemDialog.bind(this)
    }

    componentDidMount() {

        const data = {
            rid: this.props.restaurantStaff.rid
        }

        axios.get('/api/get/getFoodItemsByRestaurantID', {params: data})
            .then(rsp => this.setState({foodData: rsp.data}))
            .catch(err => console.log(err))

    }

    handleUpdate = async (event, fid) => {
        event.preventDefault();
    
        const data = {
            fid: fid,
            fname: this.state.foodData[fid][0],
            description: this.state.foodData[fid][1],
            price: this.state.foodData[fid][2],
        }
    
        /* Checks if data has been changed */
        if (data.fname === this.state.foodData[fid][1] &&
            data.description === this.state.foodData[fid][2] &&
            data.price === this.state.foodData[fid][3]) {
                alert("Food Item Details Not Changed.")
            } else {
                await axios.put('/api/put/updateFoodItem', {params: data})
                    .catch(err => {
                        console.log(err)
                        alert("Error Ocurred During Update")
                    })
            }
        }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state)
    }

    updateFoodItem(fid) {
        return (
            <div>
                <h4>Update Food Item</h4>

                <form onSubmit={this.handleUpdate}>
                    <label>fid:         {this.state.foodData[fid][0]}</label>
                    <br></br>
                    <label>Food Name:     <input type="text" value={this.state.foodData[fid][1]} name="fname" onChange={this.handleChange}></input></label>
                    <br></br>
                    <label>Description:     <input type="text" value={this.state.foodData[fid][2]} name="description" onChange={this.handleChange}></input></label>
                    <br></br>
                    <label>Price:     <input type="text" value={this.state.foodData[fid][3]} name="price" onChange={this.handleChange}></input></label>
                    <br></br>
                    <input type="submit" value="Update Food Item"/>
                </form>
            </div>
        )
    }

    updateFoodItemDialog(rowData, column) {

        return (
            <div>
                <Dialog header="Update Food Item" visible={this.state.visible} onHide={() => this.setState({visible: false})}>
                    {this.updateFoodItem()}
                </Dialog>
                <Button label=" Edit Food Item" onClick={()=> {
                        this.setState({visible: true})
                        this.updateFoodItem(rowData.fid)
                    }}></Button>
            </div>
        )
    }

    render() {
        console.log(this.state.foodData)
        return (
            <div>
                <DataTable value = {this.state.foodData}>
                    <Column field="fid" header = "fid"/>
                    <Column field="fname" header="fname" sortable={true}/>
                    <Column field="description" header= "description" sortable={true}/>
                    <Column field="price" header="price" sortable={true}/>
                    {/* <Column field="fid" body={this.updateFoodItemDialog}/> */}
                </DataTable>
            </div>
        )
    }

}

export default FoodItems