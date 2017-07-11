import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";
import { helpers } from "inversify-vanillajs-helpers";
import "reflect-metadata";

describe('dependency injection', () => {
  it('Should be able to inject GreeterService to GreeterComponent', () => {
    var TYPES = {
        GreeterComponent: "GreeterComponent",
        GreeterService: "GreeterService"
    };

    class GreeterComponent {
        constructor(props) {
            this.props = props;
            this._greeterService; // this property will be lazy injected
        }
        render() {
            return this._greeterService.greet(this.props);
        }
    }

    var greeterContainer = new Container();
    var lazyInject = getDecorators(greeterContainer).lazyInject;

    // helpers.annotate(MyComponent, []); Not required because we invoke "new"

    lazyInject(TYPES.GreeterService)(GreeterComponent.prototype, "_greeterService");

    greeterContainer.bind(TYPES.GreeterService).toConstantValue({
        greet: function ({name}) {
            return `Hello ${name}`;
        }
    });

    greeterContainer.bind(TYPES.GreeterComponent).to(GreeterComponent);

    var component = new GreeterComponent({ name: "Sendhil" }); // we invoke "new"
    expect(component.render()).toBe("Hello Sendhil");
  });
});