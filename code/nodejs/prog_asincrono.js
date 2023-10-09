var fs = require('fs');

console.log("hola");
fs.readFile("hi.js.txt", function(error, archivo){
    console.log("archivo");
})

console.log("ya!");