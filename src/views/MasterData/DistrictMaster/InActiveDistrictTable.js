import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
class InActiveDirtrictTable extends Component {
  render() {
    return (
      <BootstrapTable
        ref="table"
        data={this.props.districts}
        pagination={true}
        search={true}
        options={this.props.sortingOptions}
        // exportCSV={true}
        hover={true}
        csvFileName="Districts List"
      >
        <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
          Id
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="DistrictName"
          headerAlign="left"
          width="60"
          csvHeader="District Name"
          dataSort={true}
        >
          District Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="StateName"
          headerAlign="left"
          width="40"
          csvHeader="State Name"
          dataSort={true}
        >
          State Name
        </TableHeaderColumn>

        <TableHeaderColumn
        dataField="delete"
        dataFormat={this.props.onActivateDistrict}
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

export default InActiveDirtrictTable;
