import { combineForms } from 'react-redux-form';

const initialDeliveryAddress = {
  address1: 'Delivery1',
  address2: 'Delivery2',
  country: 'UK',
};

const initialInvoiceAddress = {
  address1: 'Invoice1',
  address2: 'Invoice2',
  country: 'UK',
  postcode: 'M23 9BE',
};

const initialBillingAddress = {
  address1: 'Billing1',
  country: 'UK',
};

const initialCountries = [{
  CountryCode: 'IN',
  Name: 'India',
}, {
  CountryCode: 'UK',
  Name: 'United Kingdom',
}, {
  CountryCode: 'US',
  Name: 'United States',
}];

const reducer = combineForms({
  deliveryAddress: initialDeliveryAddress,
  invoiceAddress: initialInvoiceAddress,
  billingAddress: initialBillingAddress,
  countries: initialCountries,
}, 'addressSample2');

export default reducer;
