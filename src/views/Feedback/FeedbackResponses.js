import React, { Component } from "react";
import CardLayout from "../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { FormGroup, Col, Button } from "reactstrap";
import DropdownSelect from "../../components/InputElement/Dropdown";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import AppConfig from "../../constants/AppConfig";

class FeedbackResponses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentWillMount() {
    this.props.getFeedbackQuestionList();
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
      <Link to={this} style={{ pointerEvents: "none", opacity: 0.5 }}>
        <i className="fa fa-trash" title="Delete" />
      </Link>
    );
  }

  onEditState(cell, row) {
    return (
      <Link to={this} style={{ pointerEvents: "none", opacity: 0.5 }}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }

  render() {
    const sortingOptions = {
      defaultSortName: "Questions",
      noDataText: "No records found for feedback Questions",
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
          value: this.props.feedbackQuestions.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout
        name="Feedback Response"
      >
        <FormGroup row>
          <Col xs="12">
            <BootstrapTable
              ref="table"
              data={this.props.feedbackQuestions}
              pagination={true}
              search={true}
              options={sortingOptions}
              //exportCSV={true}
              hover={true}
              //csvFileName="Crops List"
            >
              <TableHeaderColumn dataField="Id" headerAlign="left" isKey hidden>
                Id
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="Questions"
                headerAlign="left"
                width="40"
                csvHeader="Crop Name"
                dataSort={true}
              >
                Question
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
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    feedbackQuestions: state.feedbackReducer.feedbackQuestions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFeedbackQuestionList: () => dispatch(actions.getFeedbackQuestionList())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackResponses);
