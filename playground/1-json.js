const fs = require('fs');

const dataBuffer = fs.readFileSync("1-json.json");

console.log(dataBuffer.toString());
const data = dataBuffer.toString();
const dataJSON = JSON.parse(data);
console.log(dataJSON);
