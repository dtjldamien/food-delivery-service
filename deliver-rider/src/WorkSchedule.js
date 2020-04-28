import React from "react"
import axios from 'axios'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class WorkSchedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: props.rider.email,
            name: props.rider.name,
            shifts: []
        };
        this.formatDateTime = this.formatDateTime.bind(this)
    }

    componentDidMount() {

        const data = {
            email: this.state.email
        }

        axios.get('/api/get/viewRiderShifts', { params: data })
            .then(rsp => this.setState({ shifts: rsp.data }))
            .catch(err => console.log(err))
    }

    formatDateTime(rowData, isStart) {
        let dateTime = isStart ? rowData.startdate : rowData.enddate

        return new Date(Date.parse(dateTime)).toLocaleString().split(',')[0]
    }

    render() {
        let header = (
            <div style={{ 'textAlign': 'left' }}>
                <i className="pi pi-search" style={{ margin: '4px 4px 0 0' }}></i>
                <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Global Search" size="50" />
            </div>
        );

        return (
            <div>
                <DataTable value={this.state.shifts} header={header} paginator={true} rows={10} paginatorTemplate="RowsPerPageDropdown PageLinks FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" globalFilter={this.state.globalFilter}>
                    <Column field="shiftId" header="shiftId" />
                    <Column field="shiftNo" header="Shift Number" sortable={true} />
                    <Column field="startDate" header="Start Date" body={this.formatDateTime} sortable={true} />
                    <Column field="startTime" header="Start Time" body={this.formatDateTime} sortable={true} />
                    <Column field="endDate" header="End Date" body={this.formatDateTime} sortable={true} />
                    <Column field="endTime" header="End TIme" body={this.formatDateTime} sortable={true} />
                    <Column field="Hours" header="Hours" sortable={true} />
                </DataTable>
            </div>
        )
    }
}

export default WorkSchedule