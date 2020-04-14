import React from "react";
class Reviews extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    // viewOrder() {
    //     return (
    //         <div>
    //             <DataTable value = {this.state.cart}>
    //                 <Column field="fid" header = "fid"/>
    //                 <Column field="fname" header="fname" sortable={true}/>
    //                 <Column field="description" header= "description" sortable={true}/>
    //                 <Column field="price" header="price" sortable={true}/>
    //                 <Column field="quantity" header="quantity" sortable={true}/>
    //             </DataTable>
    //             <Button label="Checkout" onClick={()=> alert("pay by cash plz")}></Button>
    //         </div>
    //     )
    // }
    // viewOrderDialog() {
    //     return (
    //         <div>
    //             <Dialog header="View Order" visible={this.state.visible} onHide={() => this.setState({visible: false})}>
    //                 {this.viewOrder()}
    //             </Dialog>
    //             <Button label=" View Order" onClick={()=> this.setState({visible: true})}></Button>
    //         </div>
    //     )
    // }
    render() {
        return (
            <div>
            {/* <DataTable value = {this.state.reviewData}>
               <Column field="oid" header = "oid"/>
               <Column field="rating" header="Date/Time" sortable={true}/>
               <Column field="rName" header="rName" sortable={true}/>
               <Column field="foodReview" header= "foodReview" sortable={true}/>
               <Column field="deliveryFee" header="Delivery Fee" sortable={true}/>
               <Column field="address" header="Address" sortable={true}/>
               <Column field="oid" body={this.viewOrderDialog}/>
           </DataTable> */}
       </div>
        )
    }
}
export default Reviews
