const requireAll = context => context.keys().map(context);

const loadComponents = (store, context) => {
  const components = requireAll(context);
  console.log(components);
  return components;
};

const loadComponentLinks = (store, context) => {
  const componentLinks = requireAll(context);
  console.log(componentLinks);
  return componentLinks;
};

export default { loadComponents, loadComponentLinks };
