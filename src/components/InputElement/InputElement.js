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
    <InputGroup>
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
        disabled={props.disabled}
        onKeyPress={props.onKeyPress}
      />
      {props.isPassword ? (
        <InputGroupAddon
          addonType="append"
          onClick={props.onEyeToggle}
        >
          <InputGroupText>
            {props.showPassword ? (
              <i className="fa fa-eye" />
            ) : (
              <i className="fa fa-eye-slash" />
            )}
          </InputGroupText>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
    {props.required ? (
      <div className="help-block">
        *{props.label} is required
      </div>
    ) : null}
    {props.invalid ? (
      <div  className="help-block">
        *{props.label} is invalid
      </div>
    ) : null}
  </FormGroup>
);

export default InputElement;
