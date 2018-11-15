import React, { Component } from "react";
import CardLayout from "../../components/Cards/CardLayout";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { FormGroup, Col, Button, Progress } from "reactstrap";
import DropdownSelect from "../../components/InputElement/Dropdown";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import AppConfig from "../../constants/AppConfig";
import ProgressBar from "../../components/ProgressBars";

class FeedbackResponses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentWillMount() {
    this.props.getUserFeedbackList();
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
  showRatingStars(cell, row) {
    if (cell === 1) {
      return (
        <ProgressBar title="Strongly Disagree" status="danger" value={cell} />
      );
    } else if (cell === 2) {
      return <ProgressBar title="Disagree" status="danger" value={cell} />;
    } else if (cell === 3) {
      return <ProgressBar title="Neutral" status="warning" value={cell} />;
    } else if (cell === 4) {
      return <ProgressBar title="Agree" status="success" value={cell} />;
    } else if (cell === 5) {
      return (
        <ProgressBar title="Strongly Agree" status="success" value={cell} />
      );
    } else {
      return <ProgressBar title="Neutral" status="success" value={cell} />;
    }
  }
  render() {
    const sortingOptions = {
      defaultSortName: "Name",
      noDataText:
        "No records found for feedback response as we are work in progress",
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
          value: this.props.userFeedbacks.length
        }
      ],
      sizePerPage: 5
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <CardLayout name="Feedback Response">
        <FormGroup row className="div-padding">
          <Col xs="12">
            <BootstrapTable
              ref="table"
              data={this.props.userFeedbacks}
              pagination={true}
              search={true}
              options={sortingOptions}
              //exportCSV={true}
              hover={true}
              //csvFileName="Crops List"
            >
              <TableHeaderColumn
                dataField="userId"
                headerAlign="left"
                isKey
                hidden
              >
                Id
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="Name"
                headerAlign="left"
                width="40"
                dataSort={true}
              >
                Beneficiary
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="Feedback"
                headerAlign="left"
                width="30"
                dataFormat={this.showRatingStars.bind(this)}
                dataSort={true}
              >
                Rating
              </TableHeaderColumn>
              {/* <TableHeaderColumn
                dataField="Date"
                // dataFormat={this.onEditState.bind(this)}
                headerAlign="left"
                width="20"
                export={false}
              >
                Date
              </TableHeaderColumn> */}
            </BootstrapTable>
          </Col>
        </FormGroup>
      </CardLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    userFeedbacks: state.feedbackReducer.userFeedbacks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserFeedbackList: () => dispatch(actions.getUserFeedbackList())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackResponses);
