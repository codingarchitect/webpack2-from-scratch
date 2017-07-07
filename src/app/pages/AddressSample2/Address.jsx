import React from 'react';
import { connect } from 'react-redux';

import { Control, Errors, Form } from 'react-redux-form';
import _ from 'lodash';
import PropTypes from 'prop-types';

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
          key={line}
        />
      );
    })
  );
};

const zipLines = address => [address.address1, address.address2, address.address3, address.address4,
  address.address5, address.address6, address.country, address.postcode].filter(line => line).join(',');

const Address = ({ forModel, mode, state }) => {
  if (mode !== 'singleLine') {
    return (<Form model={forModel} className="form-inline">
      { renderLines(mode) }
      <CountryPostCode forModel={forModel} mode={mode} />
    </Form>);
  }
  const address = _.get(state, forModel);
  return <address>{zipLines(address)}</address>;
};

function mapStateToProps(state) {
  return {
    state,
  };
}

Address.propTypes = {
  forModel: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired, // eslint-disable-line
  mode: PropTypes.string.isRequired,
};

Address.defaultProps = {
  mode: 'edit',
};

export default connect(mapStateToProps)(Address);
