import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
class VideoGrid extends Component {
  render() {
    return (
      <BootstrapTable
        ref="table"
        data={this.props.videoFiles}
        pagination={this.props.videoFiles.length > 0 ? true : false}
        search={true}
        options={this.props.sortingOptions}
        hover={true}
      >
        <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
          Id
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="VideoName"
          headerAlign="left"
          width="20"
          dataSort={true}
        >
          Video Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="FilePath"
          dataFormat={this.props.playVideo}
          headerAlign="left"
          width="20"
        >
          Video
        </TableHeaderColumn>
        {/* <TableHeaderColumn
          dataField="delete"
          //dataFormat={this.props.onDeleteState}
          headerAlign="left"
          width="20"
        >
          Deactivate
        </TableHeaderColumn> */}
      </BootstrapTable>
    );
  }
}

export default VideoGrid;
