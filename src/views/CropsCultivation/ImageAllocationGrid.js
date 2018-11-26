import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
class ImageAllocationGrid extends Component {
  render() {
    const options= {
      noDataText : "There is no image allocation."
    }
    return (
      <BootstrapTable
        ref="table"
        data={this.props.imageAllocation}
        hover={true}
        options={options}
      >
        <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
          Id
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="ImageName"
          headerAlign="left"
          width="30"
        >
            Image Name
        </TableHeaderColumn>
       
        <TableHeaderColumn
          dataField="Audio"
          headerAlign="left"
          width="60"
          dataFormat={this.props.showImage}
        >
          Image
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="Delete"
          headerAlign="left"
          width="30"
          dataFormat={this.props.onDelete}
        >
          Delete
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default ImageAllocationGrid;
