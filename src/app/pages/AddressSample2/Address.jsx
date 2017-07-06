import React from 'react';

import { Control, Errors, Form } from 'react-redux-form';

import CountryPostCode from './CountryPostcode';
import addressSchema from './address-schema';

import './address.less';

const renderLines = () => {
  const properties = addressSchema.properties;
  const requiredLines = addressSchema.required;
  return (
    Object.keys(properties).map((line) => {
      const isRequired = requiredLines.includes(line);
      return (
        <span className="form-group" key={line}>
          <label className="control-label" htmlFor={`address.${line}`}>
            {properties[line].title}{isRequired && '*'}
          </label>
          <Control.text
            model={`.${line}`}
            id={`address.${line}`}
            className="form-control"
            validators={{
              required: lineVal => (isRequired ? lineVal && lineVal.length : true),
            }}
          />
          <Errors
            model={`.${line}`}
            wrapper="span"
            messages={{
              required: () => '*',
            }}
          />
        </span>
      );
    })
  );
};

const makeAddress = forModel =>
  (<Form model={forModel} className="form-inline">
    { renderLines() }
    <CountryPostCode forModel={forModel} />
  </Form>);

export default makeAddress;
