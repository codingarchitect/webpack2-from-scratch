import { combineForms } from 'react-redux-form';

const initialAddressState = {
  address1: '',
  address2: '',
  country: 'UK',
  postcode: '',
};

const reducer = combineForms({
  address: initialAddressState,
}, 'addressSample2');

export default reducer;
