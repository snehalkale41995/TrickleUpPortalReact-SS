import React, { Component } from "react";
import InputElement from "../../../components/InputElement/InputElement";
import DropdownSelect from "../../../components/InputElement/Dropdown";
import { FormGroup, Col, Button, Label, Row } from "reactstrap";


const CropStepLayout = props => (
  <FormGroup style={{ padding: 20, backgroundColor: "#dcdcdc",marginLeft : -15 }}>
    <Label style={{ fontSize: 18, fontWeight: 700 }}>
      Step {props.id + 1} :
    </Label>
    <FormGroup row>
      <Col xs="12" md="10">
        <FormGroup row>
          <Col xs="12" md="5">
            <InputElement
              id={props.id}
              label="Step name"
              name = "Step_Name"
              placeholder="Step name"
              value={props.step.Step_Name}
              required={props.step.Step_NameRequired}
              onChange={(event) => props.onChangeStepValues(event)}
            />
          </Col>
          <Col md="5">
            <InputElement
              id={props.id}
              label="Media URL"
              name="MediaURL"
              placeholder="Media URL"
              value={props.step.MediaURL}
              required={props.step.MediaURLRequired}
              onChange={(event) => props.onChangeStepValues(event)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="5">
            <InputElement
              id={props.id}
              label="Step Description"
              name="Step_Description"
              placeholder="Step Description"
              value={props.step.Step_Description}
              required={props.step.Step_DescriptionRequired}
              onChange={(event) => props.onChangeStepValues(event)}
            />
          </Col>
          <Col md="5">
            <InputElement
              id={props.id}
              label="Description Audio"
              name="Description_Audio"
              placeholder="Description Audio"
              value={props.step.Description_Audio}
              required={props.step.Description_AudioRequired}
              onChange={(event) => props.onChangeStepValues(event)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="5">
            <InputElement
              id={props.id}
              label="Language"
              name="Language"
              placeholder="Select Language"
              value={props.step.Language}
              onChange={(event) => props.onChangeStepValues(event)}
            />
          </Col>
        </FormGroup>
      </Col>
      <Col md="2">
        <FormGroup row>
          <Button color="success" onClick={props.onAddRequiredMaterial}>
            Add required material
          </Button>
        </FormGroup>
        <FormGroup row>
          <Button type="danger" color="danger" onClick={props.onDeleteStep}>
            Delete Step
          </Button>
        </FormGroup>
      </Col>
    </FormGroup>
    <FormGroup row>
      <Col xs="12">{props.displayRequiredMaterial}</Col>
    </FormGroup>
  </FormGroup>
);

export default CropStepLayout;
