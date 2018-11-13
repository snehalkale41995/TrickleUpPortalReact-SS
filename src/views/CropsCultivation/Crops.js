import React, { Component } from "react";
import CardLayout from "../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { FormGroup, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import AppConfig from "../../constants/AppConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../constants/Toaster";
class Crops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentWillMount() {
    this.props.getCropsList();
    let compRef = this;
    setTimeout(() => {
      compRef.setState({
        loading: false
      });
    }, 2000);
  }
  componentDidMount() {
    if (this.props.cropError) {
      Toaster.Toaster("Something went wrong !", this.props.cropError);
    }
  }
  onDeleteState(cell, row) {
    return (
      <Link to={this} style={{ pointerEvents: "none", opacity: 0.5 }}>
        <i className="fa fa-trash" title="Delete" />
      </Link>
    );
  }

  onEditState(cell, row) {
    return (
      <Link to={`${this.props.match.url}/CropForm/${row.Id}`}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }
  showImage(cell, row) {
    return (
      <img
        src={`${AppConfig.serverURL}/${row.FilePath}`}
        style={{ height: 50, width: 50 }}
        alt=""
      />
    );
  }
  render() {
    const sortingOptions = {
      defaultSortName: "CropName",
      noDataText: "No records found for crops",
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
      <CardLayout
        name="Crops"
        buttonName="Add crop"
        buttonLink={this}
        active="none"
        //buttonLink={`${this.props.match.url}/CropForm`}
      >
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
              <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
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
                Deactivate
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </FormGroup>
        <ToastContainer autoClose={1000} />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    cropsList: state.cropsReducer.cropsList,
    cropError: state.cropsReducer.cropError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCropsList: () => dispatch(actions.getCropsList())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Crops);
