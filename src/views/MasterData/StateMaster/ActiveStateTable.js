import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
class ActiveStateTable extends Component {
  render() {
    return (
      <BootstrapTable
        ref="table"
        data={this.props.states}
        pagination={this.props.states.length > 0 ? true : false}
        search={true}
        options={this.props.sortingOptions}
        hover={true}
        csvFileName="States List"
      >
        <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
          Id
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="StateName"
          headerAlign="left"
          width="60"
          csvHeader="State Name"
          dataSort={true}
        >
          State Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="StateCode"
          headerAlign="left"
          width="40"
          csvHeader="Code"
          dataSort={true}
        >
        State Code
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="edit"
          dataFormat={this.props.onEditState}
          headerAlign="left"
          width="20"
          export={false}
        >
          Edit
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="delete"
          dataFormat={this.props.onDeleteState}
          headerAlign="left"
          width="20"
          export={false}
        >
          Deactivate
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
export default ActiveStateTable;
