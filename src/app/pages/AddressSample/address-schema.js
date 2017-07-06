export default {
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
    address: {
      title: 'Delivery address',
      $ref: '#/definitions/address',
    },
  },
};
