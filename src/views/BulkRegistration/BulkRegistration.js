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
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
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
    "FCMToken",
    "CreatedBy",
    "CreatedOn",
    "Active",
    "ErrorMessage"
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
      csvFileRequired : false,
      uploadFlag : false,
      bulkUserError : false
    };
  }
  componentWillMount() {
    this.props.getBulkUploadHistory();
  }

  handleData = data => {
    this.setState({
      showDataTable: true,
      CSVdata: data,
      csvFileRequired : false,
      bulkUserError : false
    });
  };
  
  onReset() {
    this.setState({
      showDataTable: false,
      CSVdata: [],
      csvFileRequired : false,
      bulkUserError : false
    });
  }

  onValidate(){
    let beneficiaries = [...this.state.CSVdata];
    let compRef = this;
    let csvFileRequired = false;
    if(beneficiaries.length ==0){
      csvFileRequired = true;
      this.setState({csvFileRequired : true})
    }
   if(!csvFileRequired){
    this.props.bulkValidateBeneficiary(beneficiaries);
     setTimeout(() => {
     compRef.setBeneficiaryData()
    }, 2000);
   }
  }

   setBeneficiaryData(){
     let compRef = this;
     let  CSVdata = compRef.props.bulkUserData;
     let bulkUserError = compRef.props.bulkUserError;
    if(compRef.props.bulkUserError){
        compRef.setState({
        loading: false,
        CSVdata : CSVdata,
        bulkUserError : true
      });
    }
    else{
       compRef.setState({
        loading: false,
        uploadFlag : true,
        bulkUserError : false
       })
    }
   }

  onSubmit() {
    let beneficiaries = [...this.state.CSVdata];
    let csvFileRequired = false;
    if(beneficiaries.length ==0){
      csvFileRequired = true;
      this.setState({csvFileRequired : true})
    }
    let compRef = this;
    if(!csvFileRequired){
       let guid = uuid.v1(new Date());
    beneficiaries.forEach(beneficiary => {
      beneficiary.BulkUploadId = guid;
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
    return { backgroundColor: '#F07B7B' };
  }
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
      "FCMToken",
      "CreatedBy",
      "CreatedOn",
      "Active",
      "ErrorMessage"
    ];
    const tableFormat = keys.map(key => {
      return <td className="csv-table-border">{key}</td>;
    });

    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div style={{ marginTop: 30 }}>
        <CardLayout name="Bulk upload beneficiary">
          <div style={{ margin: 20 }}>
            <FormGroup row>
              <Col xs="12"> 
                <FormGroup row style={{ marginLeft: 10 }}>
                  <Col xs="12" md="6">
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
                  </Col>
                   
                  <Col md="6">
                    {/* <FormGroup row style={{ marginLeft: 10 }}> */}
                    <FormGroup row>
                      <Label />
                      <h6>Format required for CSV : </h6> &nbsp; &nbsp;
                      <div style={{ fontSize: 14, margin: -3 }}>
                        <CSVLink filename="_users.csv" data={csvData}>
                          Download
                        </CSVLink>
                      </div>
                      {/* </FormGroup>
                      <FormGroup row> */}
                      <div style={{ fontSize: 14, margin: -3 , marginLeft : 5}}>
                        Or &nbsp;
                        <Link
                          to={this}
                          onClick={this.onShowTableFormat.bind(this)}
                        >
                          View
                        </Link>
                        &nbsp; CSV header format
                      </div>
                      </FormGroup>
                    {/* </FormGroup> */}
                  </Col>
                </FormGroup>
            <FormGroup style={{ marginLeft: 25, marginTop: -25 }}>
             {this.state.csvFileRequired ? (
             <div style={{ color: "red", fontSize: "12px"}} className="help-block">
             *please select File
           </div>
             ) : null}
          </FormGroup>
                {/* <FormGroup row >
                  <Label />
                  <h6>Format required for CSV : </h6> &nbsp; &nbsp;
                  <div style={{ fontSize: 14, margin: -3 }}>
                    <CSVLink filename="_users.csv" data={csvData}>
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
                </FormGroup> */}
                <FormGroup row>
                  {this.state.showTableHeaderFormat ? (
                    <Col xs="12" md="12">
                      {/* <h6>Format required for CSV : </h6> */}
                      <table className="csv-table-border">
                        <tr className="csv-table-border">{tableFormat}</tr>
                      </table>
                      <div
                        style={{ color: "red", fontSize: "12px", width: 400 }}
                        className="help-block"
                      >
                        *Please note : Sequence of headers should be exactly
                        same.
                      </div>
                    </Col>
                  ) : null}
                </FormGroup>
                </Col>
                </FormGroup>
     
                <FormGroup row style={{ marginLeft: 10 }}>
                 {!this.state.uploadFlag ? 
                   <Col  md="1">
                    <Button
                      className="theme-positive-btn"
                      onClick={this.onValidate.bind(this)}
                    >
                      Validate
                    </Button>
                  </Col> : null }
                  {this.state.uploadFlag ? 
                  <Col  md="1">
                    <Button
                      className="theme-positive-btn"
                      onClick={this.onSubmit.bind(this)}
                    >
                      Upload
                    </Button>
                  </Col> : null}
                  
                  <Col md="1">
                    <Button
                      className="theme-reset-btn"
                      onClick={this.onReset.bind(this)}
                    >
                      Reset
                    </Button>
                  </Col>
                </FormGroup>
              {/* </Col> */}
            {/* </FormGroup> */}
           
            {this.state.showDataTable ? (
              <div style={{ marginTop: 20 ,padding : 20 }}>
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
                    dataField="UserName"
                    headerAlign="left"
                    isKey
                  >
                    Email Id
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
                  <TableHeaderColumn dataField="Age" headerAlign="left"  hidden>
                    Age
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="Gender" headerAlign="left"  hidden>
                    Gender
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="State" headerAlign="left"  hidden>
                    State
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="District" headerAlign="left"  hidden>
                    District
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="Village" headerAlign="left"  hidden>
                    Village
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="Grampanchayat"
                    headerAlign="left"
                    hidden
                  >
                    Grampanchayat
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="Aadhaar" headerAlign="left"  hidden>
                    Aadhar Number
                  </TableHeaderColumn>
                   {this.state.bulkUserError ? 
                  <TableHeaderColumn tdStyle={ trStyle } dataField="ErrorMessage" headerAlign="left">
                    ErrorMessage
                  </TableHeaderColumn> : null
                   }
                </BootstrapTable>
                <hr />
              </div>
            ) : null}
            
            <div style={{ padding : 20}}>
              <h5>Bulk upload history : </h5>
              <BootstrapTable
                ref="table"
                data={this.props.bulkUploadHistory}
                //pagination={true}
                //search={true}
                options={sortingOptions}
                hover={true}
              >
                <TableHeaderColumn
                  dataField="Id"
                  headerAlign="left"
                  isKey
                  hidden
                >
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
                <TableHeaderColumn dataField="CreatedOn" headerAlign="left">
                  Created On
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
          <ToastContainer autoClose={2000} />
        </CardLayout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    beneficiaryError: state.beneficiaryReducer.beneficiaryError,
    bulkUploadHistory: state.beneficiaryReducer.bulkUploadHistory,
    bulkUserData : state.beneficiaryReducer.bulkUserData,
    bulkUserError : state.beneficiaryReducer.bulkUserError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    bulkUploadBeneficiary: beneficiaries =>
      dispatch(actions.bulkUploadBeneficiary(beneficiaries)),
    getBulkUploadHistory: () => dispatch(actions.getBulkUploadHistory()),
    bulkValidateBeneficiary: beneficiaries =>
      dispatch(actions.bulkValidateBeneficiary(beneficiaries)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BulkRegistration);
