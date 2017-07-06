import { combineForms } from 'react-redux-form';

const initialAddressState = {
  address1: '',
  address2: '',
};

const reducer = combineForms({
  address: initialAddressState,
});

export default reducer;
