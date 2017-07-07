import React from 'react';

import { Control, Errors, Form } from 'react-redux-form';

import CountryPostCode from './CountryPostcode';
import addressSchema from './address-schema';
import LinePresentational from './Line.presentational';

import './address.less';

const makeErrorsComponent = model =>
  () =>
    (<Errors
      model={`.${model}`}
      wrapper="span"
      messages={{
        required: () => '*',
      }}
    />);

const renderLines = (mode) => {
  const properties = addressSchema.properties;
  const requiredLines = addressSchema.required;
  return (
    Object.keys(properties).map((line) => {
      const isRequired = requiredLines.includes(line);
      return (
        <span>
          <Control.text
            model={`.${line}`}
            validators={{
              required: lineVal => (isRequired ? lineVal && lineVal.length : true),
            }}
            mode={mode}
            label={properties[line].title}
            component={LinePresentational}
            required={isRequired}
            errorsComponent={makeErrorsComponent(line)}
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
