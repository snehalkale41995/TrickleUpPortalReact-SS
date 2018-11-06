import React, { Component } from "react";
import CardLayout from "../../components/Cards/CardLayout";
import InputElement from "../../components/InputElement/InputElement";
import { FormGroup, Col, Button, Label } from "reactstrap";
import CsvParse from "@vtex/react-csv-parse";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import uuid from "uuid";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Loader from "../../components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../constants/Toaster";

const csvData = [
  [
    "UserName",
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
    "FCMToken"
    // "CreatedBy",
    // "CreatedOn",
    // "Active"
    //"BulkUploadId"
  ]
];
class BulkRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showDataTable: false,
      CSVdata: [],
      showTableHeaderFormat: false,
      csvFileRequired: false,
      uploadFlag: false,
      bulkUserError: false
    };
  }
  componentWillMount() {
    this.props.getBulkUploadHistory();
  }

  handleData = data => {
    this.setState({
      showDataTable: true,
      CSVdata: data,
      csvFileRequired: false,
      bulkUserError: false
    });
  };

  onReset() {
    this.setState({
      showDataTable: false,
      CSVdata: [],
      csvFileRequired: false,
      bulkUserError: false
    });
  }

  onValidate() {
    let beneficiaries = [...this.state.CSVdata];
    let compRef = this;
    if (beneficiaries.length !== 0) {
      this.setState({ loading: true });
      this.props.bulkValidateBeneficiary(beneficiaries);
      setTimeout(() => {
        let validationError = this.props.bulkUserError;
        let CSVdata = compRef.props.bulkUserData;
        validationError
          ? this.setState({
              loading: false,
              CSVdata: CSVdata,
              bulkUserError: true
            })
          : this.setState({
              loading: false,
              uploadFlag: true,
              bulkUserError: false
            });
      }, 1000);
    } else {
      this.setState({ csvFileRequired: true });
    }
  }

  onSubmit() {
    let beneficiaries = [...this.state.CSVdata];
    let csvFileRequired = false;
    if (beneficiaries.length === 0) {
      csvFileRequired = true;
      this.setState({ csvFileRequired: true });
    }
    let compRef = this;
    if (!csvFileRequired) {
      let guid = uuid.v1(new Date());
      let currentUser = localStorage.getItem("user");
      beneficiaries.forEach(beneficiary => {
        beneficiary.BulkUploadId = guid;
        beneficiary.CreatedOn = new Date();
        beneficiary.Createdby = currentUser;
        beneficiary.Active = true;
      });
      this.props.bulkUploadBeneficiary(beneficiaries);
      this.setState({ loading: true });
      setTimeout(() => {
        let message = "";
        compRef.setState({ loading: false });
        compRef.props.beneficiaryError
          ? (message = "Something went wrong !")
          : (message = "Users uploaded successfully");

        Toaster.Toaster(message, compRef.props.beneficiaryError);
        setTimeout(() => {
          if (!compRef.props.beneficiaryError) {
            compRef.onReset();
            compRef.props.history.push("/beneficiary/beneficiaryList");
          }
        }, 1000);
      }, 2000);
    }
  }
  onShowTableFormat() {
    let showTableHeaderFormat = this.state.showTableHeaderFormat;
    this.setState({
      showTableHeaderFormat: !showTableHeaderFormat
    });
  }
  render() {
    let trStyle = (row, rowIndex) => {
      return { color: "#E00000" };
    };
    const historySortOptions = {
      defaultSortName: "CreatedOn",
      defaultSortOrder: "desc",
      sizePerPageList: [
        {
          text: "5",
          value: 5
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
      "UserName",
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
      "FCMToken"
      // "CreatedBy",
      // "CreatedOn",
      // "Active"
    ];
    const tableFormat = keys.map(key => {
      return <td className="csv-table-border">{key}</td>;
    });

    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout name="Bulk upload beneficiary">
        <div className="div-padding">
          <FormGroup row>
            <Col xs="12">
              <FormGroup row>
                <Col xs="12" md="6">
                  <CsvParse
                    keys={keys}
                    onDataUploaded={this.handleData}
                    //onError={this.handleError}
                    render={onChange => (
                      <InputElement
                        label="CSV file"
                        type="file"
                        accept=".csv, .tsv"
                        onChange={onChange}
                        required={this.state.csvFileRequired}
                      />
                    )}
                  />
                </Col>
                <Col md="6">
                  <FormGroup row>
                    <Label>Format required for CSV : &nbsp; &nbsp;</Label>
                    <CSVLink filename="_users.csv" data={csvData}>
                      Download
                    </CSVLink>
                    &nbsp; Or &nbsp;
                    <Link to={this} onClick={this.onShowTableFormat.bind(this)}>
                      View
                    </Link>
                    &nbsp; CSV header format
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                {this.state.showTableHeaderFormat ? (
                  <Col xs="12" md="10">
                    <table className="csv-table-border">
                      <tr className="csv-table-border">{tableFormat}</tr>
                    </table>
                    <div className="help-block">
                      *Please note : Sequence of headers should be exactly same.
                    </div>
                  </Col>
                ) : null}
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            {this.state.uploadFlag ? (
              <Col md="1">
                <Button
                  className="theme-positive-btn"
                  onClick={this.onSubmit.bind(this)}
                >
                  Upload
                </Button>
              </Col>
            ) : (
              <Col md="1">
                <Button
                  className="theme-positive-btn"
                  onClick={this.onValidate.bind(this)}
                >
                  Validate
                </Button>
              </Col>
            )}

            <Col md="1">
              <Button
                className="theme-reset-btn"
                onClick={this.onReset.bind(this)}
              >
                Reset
              </Button>
            </Col>
          </FormGroup>
          {this.state.showDataTable ? (
            <div>
              <h5>Your uploaded file : </h5>
              <BootstrapTable
                ref="table"
                data={this.state.CSVdata}
                pagination={true}
                //search={true}
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
                  dataField="UserName"
                  headerAlign="left"
                  dataSort={true}
                  width={20}
                >
                  UserName
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="Name"
                  headerAlign="left"
                  dataSort={true}
                  width={20}
                >
                  Name
                </TableHeaderColumn>
                <TableHeaderColumn
                  width={20}
                  dataField="PhoneNumber"
                  headerAlign="left"
                  dataSort={true}
                >
                  Phone Number
                </TableHeaderColumn>
                <TableHeaderColumn
                  width={12}
                  dataField="Age"
                  headerAlign="left"
                >
                  Age
                </TableHeaderColumn>
                {/* <TableHeaderColumn dataField="Gender" headerAlign="left">
                  Gender
                </TableHeaderColumn> */}
                <TableHeaderColumn
                  width={15}
                  dataField="State"
                  headerAlign="left"
                  dataSort={true}
                >
                  State
                </TableHeaderColumn>
                <TableHeaderColumn
                  width={15}
                  dataField="District"
                  headerAlign="left"
                  dataSort={true}
                >
                  District
                </TableHeaderColumn>
                <TableHeaderColumn
                  width={15}
                  dataField="Village"
                  headerAlign="left"
                  dataSort={true}
                >
                  Village
                </TableHeaderColumn>
                <TableHeaderColumn
                  width={20}
                  dataField="Grampanchayat"
                  headerAlign="left"
                  dataSort={true}
                >
                  Grampanchayat
                </TableHeaderColumn>
                {/* <TableHeaderColumn dataField="Aadhaar" headerAlign="left">
                  Aadhar Number
                </TableHeaderColumn> */}
                {this.state.bulkUserError ? (
                  <TableHeaderColumn
                    tdStyle={trStyle}
                    dataField="ErrorMessage"
                    headerAlign="left"
                    width={70}
                  >
                    ErrorMessage
                  </TableHeaderColumn>
                ) : null}
              </BootstrapTable>
              <hr />
            </div>
          ) : null}

          <div>
            <h5>Bulk upload history : </h5>
            <BootstrapTable
              ref="table"
              data={this.props.bulkUploadHistory}
              pagination={true}
              //search={true}
              options={historySortOptions}
              hover={true}
            >
              <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
                Id
              </TableHeaderColumn>

              <TableHeaderColumn dataField="BulkUploadId" headerAlign="left">
                Bulk upload id
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="Name"
                headerAlign="left"
                dataSort={true}
              >
                Created By
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="CreatedOn"
                headerAlign="left"
                dataSort={true}
              >
                Created On
              </TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>
        <ToastContainer autoClose={2000} />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    beneficiaryError: state.beneficiaryReducer.beneficiaryError,
    bulkUploadHistory: state.beneficiaryReducer.bulkUploadHistory,
    bulkUserData: state.beneficiaryReducer.bulkUserData,
    bulkUserError: state.beneficiaryReducer.bulkUserError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    bulkUploadBeneficiary: beneficiaries =>
      dispatch(actions.bulkUploadBeneficiary(beneficiaries)),
    getBulkUploadHistory: () => dispatch(actions.getBulkUploadHistory()),
    bulkValidateBeneficiary: beneficiaries =>
      dispatch(actions.bulkValidateBeneficiary(beneficiaries))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BulkRegistration);
