import React from 'react';

import Helmet from 'react-helmet';
import Form from 'react-jsonschema-form';

import Lookup from './Lookup';

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
        postcode: {
          type: 'string',
          title: 'Postcode',
        },
        country: {
          type: 'string',
          title: 'Country',
          enum: ['UK', 'US', 'IN'],
          enumNames: ['United Kingdom', 'United States', 'India'],
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
    delivery_address: {
      title: 'Delivery address',
      $ref: '#/definitions/address',
    },
  },
};

// Define the custom field component to use for the root object
const uiSchema = {
  delivery_address: {
    postcode: {
      'ui:widget': 'lookup',
    },
  },
};

// Define the custom field components to register; here our "geo"
// custom field component
const widgets = { lookup: Lookup };

const log = type => console.log.bind(console, type);

const addressSample = () =>
  (<div>
    <Helmet title="Address Sample" />
    <Form
      noHtml5Validate
      schema={schema}
      uiSchema={uiSchema}
      widgets={widgets}
      onChange={log('changed')}
      onSubmit={log('submitted')}
      onError={log('errors')}
    >
      <span />
    </Form>
  </div>);

export default addressSample;
