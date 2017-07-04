import React from 'react';

import Helmet from 'react-helmet';
import Form from 'react-jsonschema-form';

const schema = {
  definitions: {
    address: {
      type: 'object',
      properties: {
        address1: {
          type: 'string',
        },
        address2: {
          type: 'string',
        },
        address3: {
          type: 'string',
        },
        address4: {
          type: 'string',
        },
        address5: {
          type: 'string',
        },
        address6: {
          type: 'string',
        },
      },
      required: [
        'address1',
        'address2',
      ],
    },
    node: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        children: {
          type: 'array',
          items: {
            $ref: '#/definitions/node',
          },
        },
      },
    },
  },
  type: 'object',
  properties: {
    billing_address: {
      title: 'Delivery address',
      $ref: '#/definitions/address',
    },
  },
};

const log = type => console.log.bind(console, type);

const addressSample = () =>
  (<div>
    <Helmet title="Address Sample" />
    <Form
      schema={schema}
      onChange={log('changed')}
      onSubmit={log('submitted')}
      onError={log('errors')}
    />
  </div>);

export default addressSample;
