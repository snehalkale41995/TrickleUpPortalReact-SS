import React from "react";
import {
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormGroup,
  Label
} from "reactstrap";
import "./inputStyle.css";
const InputElement = props => (
  <FormGroup>
    <Label>{props.label}</Label>
    <Input
      type={props.type}
      id={props.id}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      className={props.type}
      maxLength={props.maxLength}
      accept={props.accept}
    />
    {props.required ? (
      <div style={{ color: "red", fontSize: "12px" }} className="help-block">
        *{props.label} is required
      </div>
    ) : null}
    {props.invalid ? (
      <div style={{ color: "red", fontSize: "12px" }} className="help-block">
        *{props.label} is invalid
      </div>
    ) : null}
  </FormGroup>
);

export default InputElement;
