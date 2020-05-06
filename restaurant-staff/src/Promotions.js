import React from 'react';
import axios from 'axios'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import UpdatePromotion from './UpdatePromotion';
import CreatePromotion from './CreatePromotion';

class Promotions extends React.Component {
 
    constructor(props) {
        super(props)
        this.state = {
            foodData: this.props,
            pastPromos: [],
            currentPromo: [],
            futurePromos: [],
            allPromos: [],
            visible: false
        }
        this.viewFoodItemRestaurantPromotions = this.viewFoodItemRestaurantPromotions.bind(this)
        this.getPromotionsByFid = this.getPromotionsByFid.bind(this)
        this.formatDateTime = this.formatDateTime.bind(this)
    }

    getPromotionsByFid = async () => {

        const data = {
            fid: this.state.foodData.fid
        }

        let pastpromos = []
        let currentpromo = []
        let futurepromos = []
        let today = Date.parse(new Date())

        await axios.get('/api/get/retrieveRestaurantPromotionsByFid', {params : data})
            .then(rsp => rsp.data.map(promo => {
            
                if (Date.parse(promo.startdate) > today) {
                    futurepromos.push(promo)
                } else if ((Date.parse(promo.startdate) <= today && Date.parse(promo.enddate) > today) && promo.currentcount < promo.promotionlimit) {
                    currentpromo.push(promo)
                } else {
                    pastpromos.push(promo)
                }
                
            }))

            this.setState({ pastPromos: pastpromos, currentPromo: currentpromo, futurePromos: futurepromos }) 

    }

    formatDateTime(rowData, isStart) {
        let dateTime = isStart ? rowData.startdate : rowData.enddate
        
        return new Date(Date.parse(dateTime)).toLocaleString().split(',')[0]
    }

    viewFoodItemRestaurantPromotions() {

        return (
        
            <div>

                { this.state.currentPromo.length > 0  && <CreatePromotion {...this.state.foodData} {...this.state.currentPromo}/> }
                <br></br>

                <DataTable header="Current Promotion" value={this.state.currentPromo}>
                    <Column style={{width: "60px"}} field="rpid" header="rpid"/>
                    <Column field="startdate" body={(rowData) => this.formatDateTime(rowData, true)} header="Start Date"/>
                    <Column field="enddate" body={(rowData) => this.formatDateTime(rowData, false)} header="End Date"/>
                    <Column field="currentcount" header="Redeemed"/>
                    <Column field="promotionlimit" header="Promotion Limit"/>
                    <Column field="discount" header="Discount"/>
                    <Column style={{width: "60px"}} field="ispercentage" header="Type" body={(rowData) => { return rowData.ispercentage ? "%" : "$" }}/>
                    <Column field="rpid" body={(rowData) => <UpdatePromotion {...rowData} {...this.state.currentPromo} />}/>
                </DataTable>
                <br></br>
                <br></br>
                <DataTable header="Future Promotions" value={this.state.futurePromos}>
                    <Column style={{width: "60px"}} field="rpid" header="rpid"/>
                    <Column field="startdate" body={(rowData) => this.formatDateTime(rowData, true)} header="Start Date"/>
                    <Column field="enddate" body={(rowData) => this.formatDateTime(rowData, false)} header="End Date"/>
                    <Column field="currentcount" header="Redeemed"/>
                    <Column field="promotionlimit" header="Promotion Limit"/>
                    <Column field="discount" header="Discount"/>
                    <Column style={{width: "60px"}} field="ispercentage" header="Type" body={(rowData) => { return rowData.ispercentage ? "%" : "$" }}/>
                    <Column field="rpid" body={(rowData) => <UpdatePromotion {...rowData} {...this.state.currentPromo}/>}/>
                </DataTable>
                <br></br>
                <br></br>
                <DataTable header="Past Promotions" value={this.state.pastPromos}>
                    <Column style={{width: "60px"}} field="rpid" header="rpid"/>
                    <Column field="startdate" body={(rowData) => this.formatDateTime(rowData, true)} header="Start Date"/>
                    <Column field="enddate" body={(rowData) => this.formatDateTime(rowData, false)} header="End Date"/>
                    <Column field="currentcount" header="Redeemed"/>
                    <Column field="promotionlimit" header="Promotion Limit"/>
                    <Column field="discount" header="Discount"/>
                    <Column style={{width: "60px"}}field="ispercentage" header="Type" body={(rowData) => { return rowData.ispercentage ? "%" : "$" }}/>
                </DataTable>

            </div>

        )

    }

    render() {

        return (
            <div>
                <Dialog header={"Restaurant Promotions For " + this.state.foodData.fname} visible={this.state.visible} onHide={() => this.setState({ visible: false })}>
                    {this.viewFoodItemRestaurantPromotions()}
                </Dialog>
                <Button label=" Promotions" onClick={() => {
                    this.getPromotionsByFid()
                    this.setState({ visible: true })
                }}/>
            </div>
        )
    }

}

export default Promotions
