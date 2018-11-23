import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
class AudioAllocationGrid extends Component {
  render() {
    const sortingOptions = {
      defaultSortName: "FieldType",
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
          value: this.props.audioAllocation.length
        }
      ],
      sizePerPage: 5
    };
    return (
      <BootstrapTable
        ref="table"
        data={this.props.audioAllocation}
        options={sortingOptions}
        hover={true}
      >
        <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
          Id
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="FieldType"
          headerAlign="left"
          width="30"
          dataSort={true}
        >
          Field Type
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="LanguageName"
          headerAlign="left"
          width="30"
          dataSort={true}
        >
          Language
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="FileName"
          headerAlign="left"
          width="30"
          dataSort={true}
        >
          File Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="Audio"
          headerAlign="left"
          width="60"
          dataFormat={this.props.playAudio}
        >
          Audio
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="Edit"
          headerAlign= "left"
          width="30"
          dataFormat={this.props.onDelete}
        >
          Delete
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default AudioAllocationGrid;
