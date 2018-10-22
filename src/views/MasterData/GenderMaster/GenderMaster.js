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
import InputElement from "../../../components/InputElement/InputElement";
import Modal from "../../../components/Modal/MasterModal";
class GenderMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      modalFlag: false,
      GenderName :""
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
      <Link to={this} onClick={()=>this.onEditGender(row)}>
      <i className="fa fa-pencil" title="Edit" />
    </Link>
    );
  }
  onEditGender(row){
      this.setState({GenderName : row.GenderName});
      setTimeout(() => {
        this.setState({
            modalFlag: !this.state.modalFlag
          });
      } ,1000)
  }
  onAddGender() {
    this.setState({
      modalFlag: !this.state.modalFlag
    });
  }
  onToggleModal() {
    this.setState({
      modalFlag: !this.state.modalFlag
    });
  }
  onSubmitModal() {
    this.setState({
      modalFlag: !this.state.modalFlag
    });
  }
  onChangeValue(event){
    this.setState({
        GenderName : event.target.value
    })
  }
  render() {
    const sortingOptions = {
      defaultSortName: "GenderName",
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
          value: this.props.genders.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div style={{ marginTop: 30 }}>
        <CardLayout name="Genders">
          <FormGroup row>
            <Button onClick={this.onAddGender.bind(this)}>Add gender</Button>
          </FormGroup>
          <FormGroup row>
            <Col xs="12">
              <BootstrapTable
                ref="table"
                data={this.props.genders}
                pagination={true}
                search={true}
                options={sortingOptions}
                //exportCSV={true}
                hover={true}
                //csvFileName="Roles List"
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
                  dataField="GenderName"
                  headerAlign="left"
                  width="40"
                  csvHeader="State Name"
                  dataSort={true}
                >
                  Gender
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
        <Modal
          openFlag={this.state.modalFlag}
          toggleFunction={this.onToggleModal.bind(this)}
          confirmFunction={this.onSubmitModal.bind(this)}
          name="GenderName"
          label="Gender"
          header="Add gender"
          value={this.state.GenderName}
          onChange={this.onChangeValue.bind(this)}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    genders: state.rolesReducer.genders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRolesList: () => dispatch(actions.getRolesList())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GenderMaster);
