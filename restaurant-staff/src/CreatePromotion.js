import React from 'react';
import axios from 'axios'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { RadioButton } from 'primereact/radiobutton'

class CreatePromotion extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            startdate: "",
            enddate: "",
            promotionlimit: "",
            discount: "",
            ispercentage: false,
            fid: "",
            fname: ""
        }
        this.createPromotion = this.createPromotion.bind(this)
    }

    componentDidMount() {
        
        this.setState({ fname: this.props.fname, fid: this.props.fid, currentPromotion: this.props[0] })

    }

    createPromotion() {

        if (Object.keys(this.state.currentPromotion).length === 0) {
            // continue to update, no current promotion
            this.sendToDB()
        } else {

            if (Date.parse(this.state.startdate) < new Date()) {
                /* If changed start date has past */
                alert("Changed Start Date Has Already Passed.")
            } else if (Date.parse(this.state.startdate) <= Date.parse(this.state.currentPromotion.enddate) && Date.parse(this.state.startdate) >= Date.parse(this.state.currentPromotion.startdate)) {
                /* If new start date is during the current promotion */
                alert("Change in date clashes with current promotion.")
            } else if (Date.parse(this.state.startdate) > Date.parse(this.state.enddate)) {
                /* If new start date is after the new end date */
                alert("New start date is after new end date.")
            } else {
                // continue to update, checks cleared?
                this.sendToDB()
            }
        }
        
    }

    sendToDB = async () => {

        const data = {
            startdate: this.formatDateTimeForDb(this.state.startdate),
            enddate: this.formatDateTimeForDb(this.state.enddate),
            promotionlimit: this.state.promotionlimit,
            discount: this.state.discount,
            ispercentage: this.state.ispercentage,
            fid: this.state.fid
        }

        await axios.post('/api/post/createRestaurantPromotion', {params : data})
            .then(rsp => alert(rsp.data))
            .catch(err => {
                console.log(err)
                alert("An error has ocurred.")
            })

    }

    /* NEEDED TO FORMAT DATE FOR DB */
    formatDateTimeForDb(date) {
        let newdate = date.toLocaleString().split(",")[0]
        let datearr = newdate.split("/")
        return datearr[1] + "/" + datearr[0] + "/" + datearr[2]
    }

    render() {

        return (
            <div>
                <Dialog header={"Create Promotion For: " + this.state.fname} visible={this.state.visible} onHide={() => this.setState({modifiedData: this.state.oldData, visible: false})}>

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
                    <Button label="Create Promotion" onClick={() => {
                        this.createPromotion()
                    }} />

                </Dialog>
                <Button label="Add Promotion" onClick={() => this.setState({visible: true})}/>
            </div>
        )

    }

}

export default CreatePromotion