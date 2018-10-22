import React, { Component } from "react";
import CardLayout from "../../components/Cards/CardLayout";
import InputElement from "../../components/InputElement/InputElement";
import { FormGroup, Col, Button, Label } from "reactstrap";
import CsvParse from "@vtex/react-csv-parse";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
const csvData = [
  [
    "UserId",
    "Name",
    "PhoneNumber",
    "Age",
    "Gender",
    "State",
    "District",
    "Village",
    "Grampanchayat",
    "Aadhaar",
    "IMEI1",
    "IMEI2",
    "Role",
    "Language",
    "FCMToken",
    "CreatedBy",
    "CreatedOn",
    "Active"
  ]
];
export default class BulkRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDataTable: false,
      CSVdata: [],
      showTableHeaderFormat :false
    };
  }
  handleData = data => {
    this.setState({
      showDataTable: true,
      CSVdata: data
    });
  };
  onReset() {
    this.setState({
      showDataTable: false
      //CSVdata: []
    });
  }
  onSubmit() {
    let csvFileData = [ ...this.state.CSVdata];
    csvFileData.forEach((data) => {
      data.PhoneNumber = parseInt(data.PhoneNumber);
    })
    console.log("Bulk data submit" , this.state.CSVdata);
  }
  onShowTableFormat() {
    let showTableHeaderFormat = this.state.showTableHeaderFormat;
    this.setState({
      showTableHeaderFormat : !showTableHeaderFormat
    });
  }
  render() {
    const sortingOptions = {
      defaultSortName: "Name",
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
          value: this.state.CSVdata.length
        }
      ],
      sizePerPage: 5
    };
    const keys = [
      "UserId",
      "Name",
      "PhoneNumber",
      "Age",
      "Gender",
      "State",
      "District",
      "Village",
      "Grampanchayat",
      "Aadhaar",
      "IMEI1",
      "IMEI2",
      "Role",
      "Language",
      "FCMToken",
      "CreatedBy",
      "CreatedOn",
      "Active"
    ];
    const tableFormat = keys.map(key => {
      return <td className="csv-table-border">{key}</td>;
    });

    return (
      <div style={{ marginTop: 30 }}>
        <CardLayout name="Bulk Registration">
          <div style={{ margin: 20 }}>
            <FormGroup row>
              <Col xs="8" md="3">
                <FormGroup row>
                  <CsvParse
                    keys={keys}
                    onDataUploaded={this.handleData}
                    //onError={this.handleError}
                    render={onChange => (
                      <InputElement
                        label="Upload file"
                        type="file"
                        accept=".csv, .tsv"
                        onChange={onChange}
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup row>
                  <Label />
                  <h6>Format required for CSV : </h6> &nbsp; &nbsp;
                  <div style={{ fontSize: 14, margin: -3 }}>
                    <CSVLink filename="_fileFormat.csv" data={csvData}>
                      Download
                    </CSVLink>
                  </div>
                  <div style={{ fontSize: 14, margin: -3 }}>
                    Or &nbsp;
                    <Link to={this} onClick={this.onShowTableFormat.bind(this)}>
                      View
                    </Link>
                    &nbsp; CSV header format
                  </div>
                </FormGroup>
                <FormGroup row>
                  <Col xs="8" md="4">
                    <Button
                      className="theme-positive-btn"
                      onClick={this.onSubmit.bind(this)}
                    >
                      Submit
                    </Button>
                  </Col>
                  <Col md="4">
                    <Button
                      className="theme-reset-btn"
                      onClick={this.onReset.bind(this)}
                    >
                      Reset
                    </Button>
                  </Col>
                </FormGroup>
              </Col>
              {this.state.showTableHeaderFormat ? (
                <Col md="5">
                  <h6>Format required for CSV : </h6>
                  <table className="csv-table-border">
                    <tr className="csv-table-border">{tableFormat}</tr>
                  </table>
                  <div
                    style={{ color: "red", fontSize: "12px" }}
                    className="help-block"
                  >
                    *Please note : Sequence of headers should be exactly same.
                  </div>
                </Col>
              ) : null}
            </FormGroup>
            {this.state.showDataTable ? (
              <div>
                <h5>Your uploaded file : </h5>
                <BootstrapTable
                  ref="table"
                  data={this.state.CSVdata}
                  pagination={true}
                  search={true}
                  options={sortingOptions}
                  hover={true}
                >
                  <TableHeaderColumn
                    dataField="UserId"
                    headerAlign="left"
                    isKey
                    hidden
                  >
                    Id
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="Name"
                    headerAlign="left"
                    dataSort={true}
                  >
                    Name
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="PhoneNumber" headerAlign="left">
                    Phone Number
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="Age" headerAlign="left">
                    Age
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="Gender" headerAlign="left">
                    Gender
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="State" headerAlign="left">
                    State
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="District" headerAlign="left">
                    District
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="Village" headerAlign="left">
                    Village
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="Grampanchayat"
                    headerAlign="left"
                  >
                    Grampanchayat
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="Aadhaar"
                    headerAlign="left"
                  >
                    Aadhar Number
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            ) : null}
          </div>
        </CardLayout>
      </div>
    );
  }
}
