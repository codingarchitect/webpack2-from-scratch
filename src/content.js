class Greeter {
  greet(name) {
    return `Hello ${name}`;
  }
}

const greeter = new Greeter();
const greeting = greeter.greet('from es2015');
export default greeting;