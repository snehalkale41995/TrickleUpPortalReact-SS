import React, { Component } from "react";
import { FormGroup, Col, Button, Label, Row } from "reactstrap";
import InputElement from "../../../components/InputElement/InputElement";

const CropMaterialLayout = props => (
  <FormGroup style={{ padding: 20, backgroundColor: "#808080" }}>
    <Label style={{ fontSize: 16, fontWeight: 500 }}>
      Material Id {props.id + 1} :
    </Label>
    <FormGroup row>
      <Col xs="12" md="10">
        <FormGroup row>
          <Col xs="12" md="5">
            <InputElement
              id={props.id}
              label="Material name"
              name="Material_Name"
              placeholder="Material name"
              value={props.material.Material_Name}
              required={props.material.Material_NameRequired}
              onChange={event => props.onChangeMaterialValues(event)}
            />
          </Col>
          <Col md="5">
            <InputElement
              id={props.id}
              label="Material transaction"
              name="Material_Transaction"
              placeholder="Material transaction"
              value={props.material.Material_Transaction}
              required={props.material.Material_TransactionRequired}
              onChange={event => props.onChangeMaterialValues(event)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="5">
            <InputElement
              id={props.id}
              label="Price per decimal"
              name="Per_Decimal_Price"
              placeholder="Price per decimal"
              value={props.material.Per_Decimal_Price}
              required={props.material.Per_Decimal_PriceRequired}
              onChange={event => props.onChangeMaterialValues(event)}
            />
          </Col>
          <Col md="5">
            <InputElement
              id={props.id}
              label="Quantity"
              name="Quantity"
              placeholder="Quantity"
              value={props.material.Quantity}
              required={props.material.QuantityRequired}
              onChange={event => props.onChangeMaterialValues(event)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="5">
            <InputElement
              id={props.id}
              label="Image path"
              name="Image_Path"
              placeholder="Image path"
              value={props.material.Image_Path}
              required={props.material.Image_PathRequired}
              onChange={event => props.onChangeMaterialValues(event)}
            />
          </Col>
          <Col md="5">
            <InputElement
              id={props.id}
              label="Audio Path"
              name="Audio_Path"
              placeholder="Audio Path"
              value={props.material.Audio_Path}
              required={props.material.Audio_PathRequired}
              onChange={event => props.onChangeMaterialValues(event)}
            />
          </Col>
        </FormGroup>
      </Col>
      <Col md="2">
        <FormGroup row>
          <Button color="success" onClick={props.onRepeatMaterial}>
            Repeat Material
          </Button>
        </FormGroup>
        <FormGroup row>
          <Button color="danger" onClick={props.onDeleteMaterial}>
            Delete Material
          </Button>
        </FormGroup>
      </Col>
    </FormGroup>
  </FormGroup>
);
export default CropMaterialLayout;
