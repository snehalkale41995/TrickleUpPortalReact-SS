import React, { Component } from "react";
import CardLayout from "../../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormGroup, Col, Row } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import StateForm from "./StateForm";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import * as constants from "../../../constants/StatusConstants";
import ActiveStateTable from "./ActiveStateTable";
import InActiveStateTable from "./InActiveStateTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Toaster from "../../../constants/Toaster";
class StatesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: "",
      modalFlag: false,
      stateToEdit: {},
      loading: false,
      showForm: false,
      modalStatus: false,
      stateToDelete: {},
      tableStatus: true
    };
  }
  componentWillMount() {
    this.props.getStatesList();
  }

  componentDidMount() {
    if (this.props.stateMasterError) {
      Toaster.Toaster("Something went wrong !", this.props.stateMasterError);
    }
  }
  onStateValueChange(value) {
    this.setState({
      selectedState: value.value
    });
  }

  onDeleteState(cell, row) {
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
    this.props.deleteState(state.Id, state);
    // let displayMessage = this.state.tableStatus
    //   ? "State deactivated successfully"
    //   : "State activated successfully";
    // setTimeout(() => {
    //   let message = "";
    //   this.props.stateMasterError
    //     ? (message = "Something went wrong !")
    //     : (message = displayMessage);
    //   Toaster.Toaster(message, this.props.stateMasterError);
    // }, 1000);
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
    const sortingOptionsActive = {
      defaultSortName: "StateName",
      noDataText: "No records found for active state",
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
    const sortingOptionsInActive = {
      defaultSortName: "StateName",
      noDataText: "No records found for inactive state",
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
          value: this.props.inactiveStates.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.showForm ? (
      <StateForm {...this.props} edit={this.state.editState} />
    ) : this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div className="address-tabs-margin">
        <CardLayout
          name="States"
          buttonName="Add State"
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
                search ={false}
                simpleValue
              />
            </Col>
          </Row>
          <FormGroup row>
            <Col xs="12">
              {this.state.tableStatus ? (
                <ActiveStateTable
                  states={this.props.states}
                  sortingOptions={sortingOptionsActive}
                  onEditState={this.onEditState.bind(this)}
                  onDeleteState={this.onDeleteState.bind(this)}
                />
              ) : (
                <InActiveStateTable
                  states={this.props.inactiveStates}
                  sortingOptions={sortingOptionsInActive}
                  onActivateState={this.onActivateState.bind(this)}
                />
              )}
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
        {/* <ToastContainer autoClose={1000} /> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    statesList: state.stateReducer.statesList,
    states: state.stateReducer.states,
    inactiveStates: state.stateReducer.inactiveStates,
    stateMasterError: state.stateReducer.stateMasterError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStatesList: () => dispatch(actions.getStatesList()),
    deleteState: (id, state) => dispatch(actions.deleteState(id, state))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StatesList);
