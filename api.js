const client = require('./connection.js');
const express = require('express');
const app = express();

app.listen(3333, ()=>{
  console.log('listening on port 3333');
})

client.connect();