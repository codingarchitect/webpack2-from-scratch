This project is setup in a incremental basis based on 
https://webpack.github.io/docs/tutorials/getting-started/ &
https://medium.com/@wesharehoodies/easy-guide-for-webpack-2-0-from-scratch-fe508a3ce44e

Added support to code splitting using react router using https://hackernoon.com/code-splitting-for-react-router-with-webpack-and-hmr-bb509968e86f

Please have a look at the commit history and the commit comments for starting from zero to configuring webpack

To Debug webpack
Put a debugger statement in whichever node_module you need to debug.
For debugging webpack please use node --inspect-brk ./node_modules/webpack/bin/webpack.js command.
Open chrome://inspect and open node.js inspector link from there.


