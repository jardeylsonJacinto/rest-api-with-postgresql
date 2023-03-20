const client = require('./connection.js');
const express = require('express');
const app = express();

app.listen(3333, ()=>{
  console.log('listening on port 3333');
})

client.connect();

app.get('/users', (req, res)=>{
  client.query('SELECT * FROM users', (err, result)=>{
    if(!err) res.send(result.rows);
  });
  client.end;
})

client.connect();