import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
class InActiveCropsTable extends Component {
  render() {
    const sortingOptions = {
      defaultSortName: "CropName",
      noDataText: "No records found for crops",
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
          value: this.props.cropList.length
        }
      ],
      sizePerPage: 5
    };
    return (
      <BootstrapTable
        ref="table"
        data={this.props.cropList}
        pagination={this.props.cropList.length > 0 ? true : false}
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
          width="40"
          dataSort={true}
        >
          Crop Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="FilePath"
          headerAlign="left"
          width="40"
          dataFormat={this.props.showImage}
          dataSort={true}
        >
          Image
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="Ready"
          headerAlign="left"
          width="40"
          dataSort={true}
        >
          Active
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="delete"
          dataFormat={this.props.onActiveCrop}
          headerAlign="left"
          width="20"
        >
          Activate
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default InActiveCropsTable;
