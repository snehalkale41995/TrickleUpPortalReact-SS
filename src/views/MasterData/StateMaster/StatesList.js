import React, { Component } from "react";
import CardLayout from "../../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormGroup, Col, Button, Row } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import StateForm from "./StateForm";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import * as constants from "../../../constants/StatusConstants";
class StatesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: "",
      modalFlag: false,
      stateToEdit: {},
      loading: true,
      showForm: false,
      modalStatus: false,
      stateToDelete: {},
      tableStatus: true
    };
  }
  componentWillMount() {
    this.props.getStatesList();
    let compRef = this;
    setTimeout(() => {
      compRef.setState({
        loading: false
      });
    }, 2000);
  }

  onStateValueChange(value) {
    this.setState({
      selectedState: value.value
    });
  }

  onDeleteState(cell, row) {
    let componentRef = this;
    return (
      <Link to={this} onClick={() => this.onDelete(row)}>
        <i className="fa fa-trash" title="Delete" />
      </Link>
    );
  }
  onDelete(row) {
    this.setState({
      stateToDelete: row
    });
    this.onModalToggle();
  }
  onConfirmDelete() {
    let state = { ...this.state.stateToDelete };
    this.state.tableStatus ? (state.Active = false) : (state.Active = true);
    //state.Active = false;
    this.props.deleteState(state.Id, state);
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }
  onModalToggle() {
    this.setState({
      modalStatus: !this.state.modalStatus
    });
  }

  onEditState(cell, row) {
    return (
      <Link to={this} onClick={() => this.onEdit(row)}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }
  onEdit(row) {
    this.setState({
      editState: row,
      showForm: true
    });
  }
  onStatusChange(value) {
    if (value !== null) {
      this.setState({ tableStatus: value });
    } else {
      this.setState({ tableStatus: true });
    }
  }
  onActivateState(cell, row) {
    return (
      <Link to={this} onClick={() => this.onDelete(row)}>
        <i class="fa fa-check-square-o" aria-hidden="true" title="Activate" />
      </Link>
    );
  }
  render() {
    const sortingOptions = {
      defaultSortName: "StateName",
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
          value: this.state.tableStatus
            ? this.props.states.length
            : this.props.inactiveStates.length
        }
      ],
      sizePerPage: 5
    };
    let trStyle = () => {
      return { color: "#E00000" };
    };
    return this.state.showForm ? (
      <StateForm {...this.props} edit={this.state.editState} />
    ) : this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div className="address-tabs-margin">
        <CardLayout
          name="States"
          buttonName="Add state"
          buttonLink={this}
          buttonClick={() => {
            this.setState({ showForm: true });
          }}
        >
          <Row className="address-drop-margin">
            <Col xs="12" md="10" />
            <Col md="2">
              <DropdownSelect
                label="Status"
                options={constants.tableStatus}
                value={this.state.tableStatus}
                onChange={this.onStatusChange.bind(this)}
                simpleValue
              />
            </Col>
          </Row>
          <FormGroup row>
            <Col xs="12">
              <BootstrapTable
                ref="table"
                data={
                  this.state.tableStatus
                    ? this.props.states
                    : this.props.inactiveStates
                }
                pagination={true}
                search={true}
                options={sortingOptions}
                hover={true}
                csvFileName="States List"
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
                  thStyle={trStyle}
                  dataField="StateName"
                  headerAlign="left"
                  width="60"
                  csvHeader="State Name"
                  dataSort={true}
                >
                  State Name
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="StateCode"
                  headerAlign="left"
                  width="40"
                  csvHeader="Code"
                  dataSort={true}
                >
                  Code
                </TableHeaderColumn>
                {this.state.tableStatus ? (
                  <TableHeaderColumn
                    dataField="edit"
                    dataFormat={this.onEditState.bind(this)}
                    headerAlign="left"
                    width="20"
                    export={false}
                  >
                    Edit
                  </TableHeaderColumn>
                ) : null}
                {this.state.tableStatus ? (
                  <TableHeaderColumn
                    dataField="delete"
                    dataFormat={this.onDeleteState.bind(this)}
                    headerAlign="left"
                    width="20"
                    export={false}
                  >
                    Deactivate
                  </TableHeaderColumn>
                ) : (
                  <TableHeaderColumn
                    dataField="delete"
                    dataFormat={this.onActivateState.bind(this)}
                    headerAlign="left"
                    width="20"
                    export={false}
                  >
                    Activate
                  </TableHeaderColumn>
                )}
              </BootstrapTable>
            </Col>
          </FormGroup>
          <ConfirmModal
            isOpen={this.state.modalStatus}
            onModalToggle={this.onModalToggle.bind(this)}
            onConfirmDelete={this.onConfirmDelete.bind(this)}
            title={this.state.tableStatus ? "Deactivate" : "Activate"}
            message={
              this.state.tableStatus
                ? "Are you sure you want to deactivate this state record ?"
                : "Are you sure you want to activate this state record ?"
            }
          />
        </CardLayout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    statesList: state.stateReducer.statesList,
    states: state.stateReducer.states,
    inactiveStates: state.stateReducer.inactiveStates
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStatesList: () => dispatch(actions.getStatesList()),
    deleteState: (id, state) => dispatch(actions.deleteState(id, state))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StatesList);
