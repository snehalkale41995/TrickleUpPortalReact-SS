import React, { Component } from "react";
import CardLayout from "../../../components/Cards/CardLayout";
import { connect } from "react-redux";
//import * as actions from "../../../store/actions";
import { FormGroup, Col, Button } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";

class ContactsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentWillMount() {
    // this.props.getCropsList();
    let compRef = this;
    setTimeout(() => {
      compRef.setState({
        loading: false
      });
    }, 2000);
  }

  onDeleteState(cell, row) {
    return (
      <Link to={this} >
        <i className="fa fa-trash" title="Delete" />
      </Link>
    );
    //onClick={() => componentRef.deleteConfirm(row._id)}
  }

  onEditState(cell, row) {
    return (
      <Link to={`${this.props.match.url}/contactsForm/${row.Id}`}>
        <i className="fa fa-pencil" title="Edit" />
      </Link>
    );
  }
//   showImage(cell, row){
//       return(
//           <img src={`${AppConfig.serverURL}/${row.FilePath}`} style={{height: 50,width:50}}/>
//       )
//   }
  render() {
    const sortingOptions = {
      //defaultSortName: "CropName",
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
        // {
        //   text: "All",
        //   value: this.props.cropsList.length
        // }
      ],
      sizePerPage: 5
    };
    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div style={{ marginTop: 30 }}>
        <CardLayout name="Contacts">
          <FormGroup row>
          <Col xs="12" md="10" />
          <Col md="1" style={{ marginTop: -55, marginLeft: 45 }} >      
              <Link to={`${this.props.match.url}/contactsForm`}>
                <Button type="button" className="theme-positive-btn">
                  <i className="fa fa-plus" />&nbsp; Add contact
                </Button>
              </Link>
              &nbsp;&nbsp;
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="12">
              <BootstrapTable
                ref="table"
                //data={this.props.cropsList}
                pagination={true}
                search={true}
                options={sortingOptions}
                //exportCSV={true}
                hover={true}
                csvFileName="Contacts List"
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
                  //dataField="CropName"
                  headerAlign="left"
                  width="40"
                  csvHeader="Crop Name"
                  dataSort={true}
                >
                  Contact Name
                </TableHeaderColumn>
                <TableHeaderColumn
                  //dataField="FilePath"
                  headerAlign="left"
                  width="40"
                  //dataFormat={this.showImage.bind(this)}
                  csvHeader="FilePath"
                  dataSort={true}
                >
                  Number
                </TableHeaderColumn>
                <TableHeaderColumn
                  //dataField="Ready"
                  headerAlign="left"
                  width="40"
                  csvHeader="Active"
                  dataSort={true}
                >
                  Group
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
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
