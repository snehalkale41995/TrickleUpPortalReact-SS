import React from "react";
import { FormGroup } from "reactstrap";
import Select from "react-select";
import "react-select/dist/react-select.css";

const DropdownSelect = props => (
  <FormGroup className=".form-control">
    <Select
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      options={props.options}
      value={props.value}
      onChange={props.onChange}
      simpleValue
      searchable
      clearable
    />
    {props.required ? (
      <div style={{ color: "red", fontSize: "12px" }} className="help-block">
        *{props.name} is required
      </div>
    ) : null}
  </FormGroup>
);

export default DropdownSelect;
