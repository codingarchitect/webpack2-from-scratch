import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import extensibleComponent from 'shared/mag-component/extensible-component';
import Component3 from './component3.rt';

const addressForm = {
  Address1: () => (<FormGroup controlId="formInlineAddress1">
    <ControlLabel>Address1</ControlLabel>
    <FormControl type="text" placeholder="Address1" />
  </FormGroup>),
  Address2: () => (<FormGroup controlId="formInlineAddress2">
    <ControlLabel>Address2</ControlLabel>
    <FormControl type="text" placeholder="Address2" />
  </FormGroup>),
  Address3: () => (<FormGroup controlId="formInlineAddress3">
    <ControlLabel>Address3</ControlLabel>
    <FormControl type="text" placeholder="Address3" />
  </FormGroup>),
  Address4: () => (<FormGroup controlId="formInlineAddress4">
    <ControlLabel>Address4</ControlLabel>
    <FormControl type="text" placeholder="Address4" />
  </FormGroup>),
  Address5: () => (<FormGroup controlId="formInlineAddress5">
    <ControlLabel>Address5</ControlLabel>
    <FormControl type="text" placeholder="Address5" />
  </FormGroup>),
  Country: () => (<FormGroup controlId="formInlineCountry">
    <ControlLabel>Country</ControlLabel>
    <FormControl componentClass="select" placeholder="Country">
      <option value="UK">UK</option>
      <option value="US">US</option>
      <option value="Other">Other</option>
    </FormControl>
  </FormGroup>),
  Postcode: () => (<FormGroup controlId="formInlinePostcode">
    <ControlLabel>Postcode</ControlLabel>
    <FormControl type="text" placeholder="Postcode" />
  </FormGroup>),
};

export default extensibleComponent(Component3, 'oms-web-app/page3/component3', 'Form', addressForm);
