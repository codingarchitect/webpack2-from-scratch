Put a debugger statement in whichever node_module you need to debug.
For debugging webpack please use node --inspect-brk ./node_modules/webpack/bin/webpack.js command.
Open chrome://inspect and open node.js inspector link from there.