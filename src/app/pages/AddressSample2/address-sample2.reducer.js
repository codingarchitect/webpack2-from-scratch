import { combineForms } from 'react-redux-form';

const initialAddressState = {
  address1: 'Line1',
  address2: 'Line2',
  postcode: 'UK',
};

const reducer = combineForms({
  address: initialAddressState,
});

export default reducer;
