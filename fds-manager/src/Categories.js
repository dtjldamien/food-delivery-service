import React from 'react'
import axios from 'axios';
import { Card } from 'primereact/card';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { RadioButton } from 'primereact/radiobutton'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class Categories extends React.Component {
    constructor() {
        super()
        this.state = {
            startDate: "",
            endDate: "",
            promotionlimit: 0,
            discount: 0,
            ispercentage: false
        }

        this.createPromotion = this.createPromotion.bind(this)
    }

    createPromotion = async (event) => {

        const data = {
            startdate: this.formatDateTimeForDb(this.state.startdate),
            enddate: this.formatDateTimeForDb(this.state.enddate),
            redeemLimit: this.state.promotionlimit,
            discount: this.state.discount,
            ispercentage: this.state.ispercentage,
        }

        await axios.post('/api/post/createFdsPromotion', {params : data})
            .then(rsp => alert("Promotion Created!"))
            .catch(err => {
                console.log(err)
                alert("An error has ocurred.")
            })
        
    }

    formatDateTimeForDb(date) {
        let newdate = date.toLocaleString().split(",")[0]
        let datearr = newdate.split("/")
        return datearr[1] + "/" + datearr[0] + "/" + datearr[2]
    }

    render() {
        return (
            <div>
                <div>
                <span className="p-float-label" style={{margin:"10px"}}>
                        <Calendar dateFormat="dd/mm/yy" style={{width:"600px"}} id="startdate" value={this.state.startdate} onChange={(e) => {this.setState({ startdate: e.value })}} />
                        <label htmlFor="startdate">Start Date: </label>
                    </span>
                    <br></br>
                    <span className="p-float-label" style={{margin:"10px"}}>
                        <Calendar dateFormat="dd/mm/yy" style={{width:"600px"}} id="enddate" value={this.state.enddate} onChange={(e) => {this.setState({ enddate: e.value })}} />
                        <label htmlFor="enddate">End Date: </label>
                    </span>
                    <br></br>
                    <span className="p-float-label" style={{margin:"10px"}}>
                        <InputText keyfilter="pint" style={{width:"600px"}} id="promotionlimit" value={this.state.promotionlimit} onChange={(e) => {this.setState({ promotionlimit: e.target.value })}} />
                        <label htmlFor="promotionlimit">Promotion Limit: </label>
                    </span>
                    <br></br>
                    <span className="p-float-label" style={{margin:"10px"}}>
                        <InputText keyfilter="pint" style={{width:"600px"}} id="discount" value={this.state.discount} onChange={(e) => {this.setState({ discount: e.target.value })}} />
                        <label htmlFor="discount">Discount: </label>
                    </span>
                    <br></br>

                    <RadioButton inputId="percentageDiscount" name="percentageDiscount" value={this.state.ispercentage} onChange={(e) => {this.setState({ ispercentage : true })}} checked={this.state.ispercentage === true}/>
                    <label htmlFor="percentageDiscount"> Percentage Discount </label>
                    <RadioButton inputId="priceDiscount" name="priceDiscount" value={this.state.ispercentage} onChange={(e) => {this.setState({ ispercentage : false })}} checked={this.state.ispercentage !== true}/>
                    <label htmlFor="percentageDiscount"> Price Discount</label>
                    
                    <br></br>
                    <br></br>

                    <Button label="Register" onClick={e => this.createPromotion(e)}/>
                </div>
            </div>
        )
    }

}

export default Categories