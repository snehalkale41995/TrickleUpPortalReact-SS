import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
class InActiveGenderTable extends Component {
  render() {
    return (
      <BootstrapTable
        ref="table"
        data={this.props.genders}
        pagination={true}
        search={true}
        options={this.props.sortingOptions}
        hover={true}
      >
        <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
          Id
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="GenderName"
          headerAlign="left"
          width="20"
          csvHeader="State Name"
          dataSort={true}
        >
          Gender
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="delete"
          dataFormat={this.props.onDeleteState}
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

export default InActiveGenderTable;
