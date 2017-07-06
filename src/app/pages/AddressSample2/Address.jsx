import React from 'react';

import { Control, Errors, Form } from 'react-redux-form';

import CountryPostCode from './CountryPostcode';
import addressSchema from './address-schema';

import './address.less';

const renderLines = (mode) => {
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
            readOnly={mode === 'readOnly'}
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

const makeAddress = (forModel, mode) =>
  (<Form model={forModel} className="form-inline">
    { renderLines(mode) }
    <CountryPostCode forModel={forModel} mode={mode} />
  </Form>);

export default makeAddress;
