import React, { Component } from "react";
import CardLayout from "../../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormGroup, Col } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";

class CropsMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentWillMount() {
    let compRef = this;
    setTimeout(() => {
      compRef.setState({
        loading: false
      });
    }, 2000);
  }
  componentDidMount() {
    if (this.props.cropMaterialError) {
      Toaster.Toaster("Something went wrong !", this.props.cropMaterialError);
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
      <Link to={`${this.props.match.url}/CropsMaterialForm/${row.Id}`}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }

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
          value: this.props.cropStepsMaterial.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Crop Materials"
        buttonName="Add crop material"
       // buttonLink={this}
        //active="none"
        buttonLink={`${this.props.match.url}/CropsMaterialForm`}
      >
        <FormGroup row>
          <Col xs="12">
            <BootstrapTable
              ref="table"
              data={this.props.cropStepsMaterial}
              pagination={this.props.cropStepsMaterial.length > 0 ? true : false}
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
                dataField="Material_Name"
                headerAlign="left"
                width="30"
                csvHeader="Material_Name"
                dataSort={true}
              >
                Material Name
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="Step_Name"
                headerAlign="left"
                width="70"
                csvHeader="Crop Name"
                dataSort={true}
              >
                Step Name
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="Quantity"
                headerAlign="left"
                width="30"
                csvHeader="Crop Name"
                dataSort={true}
              >
                Quantity
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
    cropStepsMaterial: state.cropsReducer.cropStepsMaterial,
    cropMaterialError: state.cropsReducer.cropMaterialError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCropsList: () => dispatch(actions.getCropsList())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CropsMaterial);
