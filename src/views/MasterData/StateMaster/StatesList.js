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
import StateForm from "./StateForm";
import ConfirmModal from "../../../components/Modal/ConfirmModal";

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
      stateToDelete: {}
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
    state.Active = false;
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
          value: this.props.states.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.showForm ? (
      <StateForm {...this.props} edit={this.state.editState} />
    ) : this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="States"
        buttonName="Add state"
        buttonLink={this}
        buttonClick={() => {
          this.setState({ showForm: true });
        }}
      >
        <FormGroup row>
          <Col xs="12">
            <BootstrapTable
              ref="table"
              data={this.props.states}
              pagination={true}
              search={true}
              options={sortingOptions}
              //exportCSV={true}
              hover={true}
              csvFileName="States List"
            >
              <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
                Id
              </TableHeaderColumn>
              <TableHeaderColumn
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
        <ConfirmModal
          isOpen={this.state.modalStatus}
          onModalToggle={this.onModalToggle.bind(this)}
          onConfirmDelete={this.onConfirmDelete.bind(this)}
          title="Deactivate"
          message="Are you sure you want to deactivate this state record ?"
        />
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    statesList: state.stateReducer.statesList,
    states: state.stateReducer.states
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStatesList: () => dispatch(actions.getStatesList()),
    deleteState: (id, state) => dispatch(actions.deleteState(id, state))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StatesList);
