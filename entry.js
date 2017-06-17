// See here https://stackoverflow.com/a/34237524 for why we need two loaders
require("!style-loader!css-loader!./style.css");
document.write(require("./content.js"));