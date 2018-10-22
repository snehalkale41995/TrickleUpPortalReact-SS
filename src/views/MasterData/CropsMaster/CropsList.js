import React, { Component } from "react";
import CardLayout from "../../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormGroup, Col, Button } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import AppConfig from "../../../constants/AppConfig";

class CropsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentWillMount() {
    this.props.getCropsList();
    // this.props.getDistrictsList();
    let compRef = this;
    setTimeout(() => {
      compRef.setState({
        loading: false
      });
    }, 2000);
  }

  onDeleteState(cell, row) {
    let componentRef = this;
    return (
      <Link to={this}>
        <i className="fa fa-trash" title="Delete" />
      </Link>
    );
    //onClick={() => componentRef.deleteConfirm(row._id)}
  }

  onEditState(cell, row) {
    return (
      <Link to={`${this.props.match.url}/cropsForm/${row.Id}`}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }
  showImage(cell, row){
      return(
          <img src={`${AppConfig.serverURL}/${row.FilePath}`} style={{height: 50,width:50}}/>
      )
  }
  render() {
    const sortingOptions = {
      defaultSortName: "CropName",
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
          value: this.props.cropsList.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div style={{ marginTop: 30 }}>
        <CardLayout name="Crops">
          <FormGroup row>
          <Col xs="12" md="10" />
          <Col md="1" style={{ marginTop: -55, marginLeft: 45 }} >      
              <Link to={`${this.props.match.url}/cropsForm`}>
                <Button type="button" className="theme-positive-btn">
                  <i className="fa fa-plus" />&nbsp; Add crop
                </Button>
              </Link>
              &nbsp;&nbsp;
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="12">
              <BootstrapTable
                ref="table"
                data={this.props.cropsList}
                pagination={true}
                search={true}
                options={sortingOptions}
                //exportCSV={true}
                hover={true}
                csvFileName="Crops List"
              >
                <TableHeaderColumn
                  dataField="Id"
                  headerAlign="left"
                  isKey
                  hidden
                >
                  Id
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="CropName"
                  headerAlign="left"
                  width="40"
                  csvHeader="Crop Name"
                  dataSort={true}
                >
                  Crop Name
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="FilePath"
                  headerAlign="left"
                  width="40"
                  dataFormat={this.showImage.bind(this)}
                  csvHeader="FilePath"
                  dataSort={true}
                >
                  Image
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="Ready"
                  headerAlign="left"
                  width="40"
                  csvHeader="Active"
                  dataSort={true}
                >
                  Active
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="edit"
                  dataFormat={this.onEditState.bind(this)}
                  headerAlign="left"
                  width="20"
                  export={false}
                >
                  Edit
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="delete"
                  dataFormat={this.onDeleteState.bind(this)}
                  headerAlign="left"
                  width="20"
                  export={false}
                >
                  Delete
                </TableHeaderColumn>
              </BootstrapTable>
            </Col>
          </FormGroup>
        </CardLayout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cropsList: state.cropsReducer.cropsList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCropsList: () => dispatch(actions.getCropsList())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CropsList);
