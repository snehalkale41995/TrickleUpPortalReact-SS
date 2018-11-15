import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
class AudioGrid extends Component {
  render() {
    return (
      <BootstrapTable
        ref="table"
        data={this.props.imageFiles}
        pagination={this.props.imageFiles.length > 0 ? true : false}
        search={true}
        options={this.props.sortingOptions}
        hover={true}
      >
        <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
          Id
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="ImageName"
          headerAlign="left"
          width="20"
          dataSort={true}
        >
        Image Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="FilePath"
          dataFormat={this.props.showImage}
          headerAlign="left"
          width="20"
        >
          Image
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default AudioGrid;
