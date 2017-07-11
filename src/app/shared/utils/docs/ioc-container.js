import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import 'reflect-metadata';

const container = new Container();
const lazyInject = getDecorators(container).lazyInject;
const TYPES = {};

export default {
  registerType: (key, service) => {
    TYPES[key] = key;
    container.bind(TYPES[key]).to(service);
  },
  registerValue: (key, service) => {
    TYPES[key] = key;
    container.bind(TYPES[key]).toConstantValue(service);
  },
  lazyInject: (key, ParentService, propertyName) => {
    lazyInject(TYPES[key])(ParentService.prototype, propertyName);
  },
};
