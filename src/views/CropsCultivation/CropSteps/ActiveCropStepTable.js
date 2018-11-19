import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
class ActiveCropStepTable extends Component {
  render() {
    const sortingOptions = {
      defaultSortName: "CropName",
      noDataText: "No records found for crop steps",
      defaultSortOrder: "asc",
      sizePerPageList: [
        {
          text: "5",
          value: 5
        },
        {
          text: "10",
          value: 10
        },
        {
          text: "20",
          value: 20
        },
        {
          text: "All",
          value: this.props.cropSteps.length
        }
      ],
      sizePerPage: 5
    };
    return (
      <BootstrapTable
        ref="table"
        data={this.props.cropSteps}
        pagination={this.props.cropSteps.length > 0 ? true : false}
        search={true}
        options={sortingOptions}
        hover={true}
      >
        <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
          Id
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="CropName"
          headerAlign="left"
          width="20"
          dataSort={true}
        >
          Crop Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="Step_Name"
          headerAlign="left"
          width="40"
          dataSort={true}
        >
          Step Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="Step_Description"
          headerAlign="left"
          width="60"
          dataSort={true}
        >
          Step Description
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="FilePath"
          headerAlign="left"
          width="20"
          dataFormat={this.props.showImage}
          dataSort={true}
        >
          Image
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="edit"
          dataFormat={this.props.onEdit}
          headerAlign="left"
          width="20"
        >
          Edit
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="delete"
          dataFormat={this.props.onDelete}
          headerAlign="left"
          width="20"
        >
          Deactivate
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default ActiveCropStepTable;
