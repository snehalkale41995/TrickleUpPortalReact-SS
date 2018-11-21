import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
class ActiveCropMaterialTable extends Component {
  render() {
    const sortingOptions = {
        defaultSortName: "Material_Name",
        noDataText: "No records found for crop step materials",
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
            value: this.props.cropMaterial.length
          }
        ],
        sizePerPage: 5
      };
    return (
        <BootstrapTable
              ref="table"
              data={this.props.cropMaterial}
              pagination={this.props.cropMaterial.length > 0 ? true : false}
              search={true}
              options={sortingOptions}
              hover={true}
            >
              <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
                Id
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="Material_Name"
                headerAlign="left"
                width="30"
                dataSort={true}
              >
                Material Name
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="Step_Name"
                headerAlign="left"
                width="70"
                dataSort={true}
              >
                Step Name
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="Quantity"
                headerAlign="left"
                width="30"
                dataSort={true}
              >
                Quantity
              </TableHeaderColumn>

              <TableHeaderColumn
                dataField="edit"
                dataFormat={this.props.onEdit}
                headerAlign="left"
                width="20"
                export={false}
              >
                Edit
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="delete"
                dataFormat={this.props.onDelete}
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

export default ActiveCropMaterialTable;
