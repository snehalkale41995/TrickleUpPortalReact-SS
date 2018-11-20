import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
class AudioGrid extends Component {
  render() {
    return (
      <BootstrapTable
        ref="table"
        data={this.props.audioFiles}
        pagination={this.props.audioFiles.length > 0 ? true : false}
        search={true}
        options={this.props.sortingOptions}
        hover={true}
      >
        <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
          Id
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="FileName"
          headerAlign="left"
          width="20"
          dataSort={true}
        >
          File Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="FilePath"
          dataFormat={this.props.playAudio}
          headerAlign="left"
          width="20"
        >
          Audio
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="delete"
          //dataFormat={this.props.onDeleteState}
          headerAlign="left"
          width="20"
        >
          Deactivate
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default AudioGrid;
