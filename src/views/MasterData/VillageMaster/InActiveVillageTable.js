import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
class InActiveVillageTable extends Component {
  render() {
    return (
      <BootstrapTable
        ref="table"
        data={this.props.villages}
        pagination={true}
        search={true}
        options={this.props.sortingOptions}
        hover={true}
      >
        <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
          Id
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="VillageName"
          headerAlign="left"
          width="40"
          dataSort={true}
        >
          Village Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="GrampanchayatName"
          headerAlign="left"
          width="40"
          dataSort={true}
        >
          Grampanchayat
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="DistrictName"
          headerAlign="left"
          width="40"
          dataSort={true}
        >
          District
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="StateName"
          headerAlign="left"
          width="40"
          dataSort={true}
        >
          State
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="delete"
          dataFormat={this.props.onActivateVillage}
          headerAlign="left"
          width="20"
          export={false}
        >
          Activate
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
export default InActiveVillageTable;
