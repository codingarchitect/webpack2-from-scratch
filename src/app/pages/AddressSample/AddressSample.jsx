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
          title: 'Address1',
        },
        address2: {
          type: 'string',
          title: 'Address2',
        },
        address3: {
          type: 'string',
          title: 'Address3',
        },
        address4: {
          type: 'string',
          title: 'Address4',
        },
        address5: {
          type: 'string',
          title: 'Address5',
        },
        address6: {
          type: 'string',
          title: 'Address6',
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
    >
      <span />
    </Form>
  </div>);

export default addressSample;
