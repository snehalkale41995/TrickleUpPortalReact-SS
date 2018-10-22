import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import CardLayout from "../../../components/Cards/CardLayout";
import { FormGroup, Col, Button, Label } from "reactstrap";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import InputElement from "../../../components/InputElement/InputElement";
class RoleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFlag: false,
    };
  }
  componentDidMount() {
    
  }
//   onStateSelectChange(value) {
//     let currentState = {...this.state.currentState};
//     currentState.Id = value;
//     this.setState({
//       currentState: currentState
//     });
//   }
//   onStateCodeChange(event){
//     let currentState = {...this.state.currentState};
//     currentState.StateCode = event.target.value;
//     this.setState({
//       currentState: currentState
//     });
//   }
  render() {
    //const {currentState} = this.state;
    return (
     
      <div style={{marginTop :30}}>
      <CardLayout name="Role Form">
      <div style={{margin: 20}}>
        <FormGroup row />
        <FormGroup row>
          <Col xs="8" md="4">
          <Label />
            <DropdownSelect
              name="States"
              placeholder="Select State..."
              options={this.props.statesList}
              //value={currentState.Id}
             // onChange={this.onStateSelectChange.bind(this)}
              simpleValue
            />
          </Col>
          <Col  md="4">
            <InputElement
              type = "text"
              placeholder = "Please enter state code"
             // value = {currentState.StateCode}
              //onChange = {(stateCode) => this.onStateCodeChange(stateCode)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
           <Button  className="theme-positive-btn" >Submit</Button>
           </Col>
          </FormGroup>
          </div>
      </CardLayout>
      </div>);
  }
}
const mapStateToProps = state => {
  return {
    statesList: state.stateReducer.statesList,
    statesData: state.stateReducer.states
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(RoleForm);
