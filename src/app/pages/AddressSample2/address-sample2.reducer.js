import { combineForms } from 'react-redux-form';

const initialDeliveryAddress = {
  address1: 'Delivery1',
  address2: '',
  country: 'UK',
  postcode: '',
};

const initialInvoiceAddress = {
  address1: 'Invoice1',
  address2: '',
  country: 'UK',
  postcode: '',
};

const reducer = combineForms({
  deliveryAddress: initialDeliveryAddress,
  invoiceAddress: initialInvoiceAddress,
}, 'addressSample2');

export default reducer;
