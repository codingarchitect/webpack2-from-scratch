import ioc from 'shared/utils/docs/ioc-container';
import componentFactory from 'shared/mag-component/component-factory';
import addressSample2CreationParams from './AddressSample2';

class AddressSampleInitialzer {
  constructor() {
    this._store; // eslint-disable-line
  }
  initialize() {
    addressSample2CreationParams.store = this._store; // eslint-disable-line
    componentFactory(addressSample2CreationParams);
  }
}

ioc.lazyInject('store', AddressSampleInitialzer, '_store');
ioc.registerType('AddressSampleInitialzer', AddressSampleInitialzer);
const initializer = new AddressSampleInitialzer();
initializer.initialize();

export default initializer;
