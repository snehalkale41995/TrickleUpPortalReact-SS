import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
class ActiveVillageTable extends Component {
  render() {
    return (
      <BootstrapTable
        ref="table"
        data={this.props.villages}
        pagination={this.props.villages.length > 0 ? true : false}
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
          Grampanchayat Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="DistrictName"
          headerAlign="left"
          width="40"
          dataSort={true}
        >
          District Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="StateName"
          headerAlign="left"
          width="40"
          dataSort={true}
        >
          State Name
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="edit"
          dataFormat={this.props.onEditVillage}
          headerAlign="left"
          width="20"
          export={false}
        >
          Edit
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="delete"
          dataFormat={this.props.onDeleteVillage}
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
export default ActiveVillageTable;
