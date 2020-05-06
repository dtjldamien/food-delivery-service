import React from 'react';
import axios from 'axios'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { RadioButton } from 'primereact/radiobutton'

class UpdatePromotion extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            oldData: {},
            modifiedData: {},
            type: "",
            ispercentage: false,
            currentPromotion: {}
        }
        this.updatePromotion = this.updatePromotion.bind(this)
    }

    componentDidMount() {

        const today = new Date()

        let data = this.props

        if (Date.parse(data.startdate) > today) {
            this.state.type = "Future"
        } else {
            this.state.type = "Current"
        } 

        this.setState({ oldData: data, modifiedData: data, ispercentage: data.ispercentage, currentPromotion: this.props[0] })

    }

    updatePromotion() {

        console.log(this.state)

        if (this.state.type === "Current") {
            // continue to update
            this.sendUpdatesToDB()
        } else if (this.state.type === "Future") {

            if (Object.keys(this.state.currentPromotion).length === 0) {
                // continue to update, no current promotion
                this.sendUpdatesToDB()
            } else {

                if (Date.parse(this.state.modifiedData.startdate) < new Date() && this.state.modifiedData.startdate !== this.state.oldData.startdate) {
                    /* If changed start date has past */
                    alert("Changed Start Date Has Already Passed.")
                } else if (Date.parse(this.state.modifiedData.startdate) <= Date.parse(this.state.currentPromotion.enddate) && Date.parse(this.state.modifiedData.startdate) >= Date.parse(this.state.currentPromotion.startdate)) {
                    /* If new start date is during the current promotion */
                    alert("Change in date clashes with current promotion.")
                } else if (Date.parse(this.state.modifiedData.startdate) > Date.parse(this.state.modifiedData.enddate)) {
                    /* If new start date is after the new end date */
                    alert("New start date is after new end date.")
                } else {
                    // continue to update, checks cleared?
                    this.sendUpdatesToDB()
                }
            }
        }
    }

    sendUpdatesToDB = async () => {

        const data = {
            rpid: this.state.modifiedData.rpid,
            startdate: this.formatDateTimeForDb(this.state.modifiedData.startdate),
            enddate: this.formatDateTimeForDb(this.state.modifiedData.enddate),
            promotionlimit: this.state.modifiedData.promotionlimit,
            discount: this.state.modifiedData.discount,
            ispercentage: this.state.ispercentage
        }

        await axios.put('/api/put/updateRestaurantPromotion', {params : data})
            .then(rsp => alert(rsp.data))
            .catch(err => {
                console.log(err)
                alert("An Error Has Ocurred.")
            })

        console.log(this.formatDateTimeForDb(this.state.modifiedData.startdate))

        this.setState({ visible: false })

    }

    /* NEEDED TO FORMAT DATE FOR DB */
    formatDateTimeForDb(date) {
        let newdate = date.toLocaleString().split(",")[0]
        let datearr = newdate.split("/")
        return datearr[1] + "/" + datearr[0] + "/" + datearr[2]
    }

    formatDateTime(dateTime) {
        return new Date(Date.parse(dateTime)).toLocaleString().split(',')[0]
    }

    render() {

        let editData = Object.assign({}, this.state.modifiedData)

        return (
            <div>
                <Dialog visible={this.state.visible} onHide={() => this.setState({modifiedData: this.state.oldData, visible: false})}>

                    <span className="p-float-label" style={{margin:"10px"}}>
                        <Calendar placeholder={this.formatDateTime(this.state.modifiedData.startdate)} dateFormat="dd/mm/yy" style={{width:"600px"}} id="startdate" value={this.state.modifiedData.startdate} onChange={(e) => {
                            editData.startdate = e.value
                            this.setState({ modifiedData: editData })}} />
                        <label htmlFor="startdate">Start Date: </label>
                    </span>
                    <br></br>
                    <span className="p-float-label" style={{margin:"10px"}}>
                        <Calendar placeholder={this.formatDateTime(this.state.modifiedData.enddate)} dateFormat="dd/mm/yy" style={{width:"600px"}} id="enddate" value={this.state.modifiedData.enddate} onChange={(e) => {
                            editData.enddate = e.value
                            this.setState({ modifiedData: editData })}} />
                        <label htmlFor="enddate">End Date: </label>
                    </span>
                    <br></br>
                    <span className="p-float-label" style={{margin:"10px"}}>
                        <InputText keyfilter="pint" style={{width:"600px"}} id="promotionlimit" value={this.state.modifiedData.promotionlimit} onChange={(e) => {
                            editData.promotionlimit = e.target.value
                            this.setState({ modifiedData: editData })}} />
                        <label htmlFor="promotionlimit">Promotion Limit: </label>
                    </span>
                    <br></br>
                    <span className="p-float-label" style={{margin:"10px"}}>
                        <InputText keyfilter="pint" style={{width:"600px"}} id="discount" value={this.state.modifiedData.discount} onChange={(e) => {
                            editData.discount = e.target.value
                            this.setState({ modifiedData: editData })}} />
                        <label htmlFor="discount">Discount: </label>
                    </span>
                    <br></br>

                    <RadioButton inputId="percentageDiscount" name="percentageDiscount" value={this.state.ispercentage} onChange={(e) => {
                            this.setState({ ispercentage : true })}} checked={this.state.ispercentage === true}/>
                    <label htmlFor="percentageDiscount"> Percentage Discount </label>
                    <RadioButton inputId="priceDiscount" name="priceDiscount" value={this.state.ispercentage} onChange={(e) => {
                            this.setState({ ispercentage : false })}} checked={this.state.ispercentage !== true}/>
                    <label htmlFor="percentageDiscount"> Price Discount</label>
                    
                    <br></br>
                    <br></br>
                    <Button label="Confirm Changes" onClick={() => {
                        this.updatePromotion()
                    }} />

                </Dialog>
                <Button label="Edit Promotion" onClick={() => this.setState({visible: true})}/>
            </div>
        )

    }

}

export default UpdatePromotion