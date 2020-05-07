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
            allAssignments: [],
            completedAssignments: [],
            uncompletedAssignments: []
        };
        this.formatDateTime = this.formatDateTime.bind(this)
    }

    componentDidMount() {

        const data = {
            email: this.state.email
        }

        axios.get('/api/get/viewAllAssignments', { params: data })
            .then(rsp => this.setState({ allAssignments: rsp.data }))
            .catch(err => console.log(err))

        axios.get('/api/get/viewCompletedAssignments', { params: data })
            .then(rsp => this.setState({ completedAssignments: rsp.data }))
            .catch(err => console.log(err))

        axios.get('/api/get/viewUncompletedAssignments', { params: data })
            .then(rsp => this.setState({ uncompletedAssignments: rsp.data }))
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
                <h1>Uncompleted Assignments</h1>
                <DataTable value={this.state.uncompletedAssignments} header={header} paginator={true} rows={10} paginatorTemplate="RowsPerPageDropdown PageLinks FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" globalFilter={this.state.globalFilter}>
                    <Column field="oid" header="Order Id" />
                    <Column field="rid" header="Restaurant Id" sortable={true} />
                    <Column field="address" header="Address" sortable={true} />
                    <Column field="assignedDateTime" header="Start Date" body={this.formatDateTime} sortable={true} />
                    <Column field="deliveredDateTime" header="Start Time" body={this.formatDateTime} sortable={true} />
                    <Column field="serviceReview" header="Hours" sortable={true} />
                </DataTable>
                &nbsp;
                <h1>Completed Assignments</h1>
                <DataTable value={this.state.completedAssignments} header={header} paginator={true} rows={10} paginatorTemplate="RowsPerPageDropdown PageLinks FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" globalFilter={this.state.globalFilter}>
                    <Column field="oid" header="Order Id" />
                    <Column field="rid" header="Restaurant Id" sortable={true} />
                    <Column field="address" header="Address" sortable={true} />
                    <Column field="assignedDateTime" header="Start Date" body={this.formatDateTime} sortable={true} />
                    <Column field="deliveredDateTime" header="Start Time" body={this.formatDateTime} sortable={true} />
                    <Column field="serviceReview" header="Hours" sortable={true} />
                </DataTable>
                &nbsp;
                <h1>All Assignments</h1>
                <DataTable value={this.state.allAssignments} header={header} paginator={true} rows={10} paginatorTemplate="RowsPerPageDropdown PageLinks FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" globalFilter={this.state.globalFilter}>
                    <Column field="oid" header="Order Id" />
                    <Column field="rid" header="Restaurant Id" sortable={true} />
                    <Column field="address" header="Address" sortable={true} />
                    <Column field="assignedDateTime" header="Start Date" body={this.formatDateTime} sortable={true} />
                    <Column field="deliveredDateTime" header="Start Time" body={this.formatDateTime} sortable={true} />
                    <Column field="serviceReview" header="Hours" sortable={true} />
                </DataTable>
            </div>
        )
    }
}

export default WorkSchedule