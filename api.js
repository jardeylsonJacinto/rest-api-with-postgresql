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

app.get('/users/:id', (req, res)=>{
  client.query('SELECT * FROM users WHERE id = $1', [req.params.id], (err, result)=>{
    if(!err) res.send(result.rows);
  });
})

app.post('/users', (req,res)=>{
  const user = req.body;
  const insertQuery = `insert into users (id, first_name, last_name, location) values(${user.id}, ${user.first_name}, ${user.last_name}, ${user.location})`
  client.query(insertQuery, (err, result)=>{
    if(!err) res.send('Inserted successfully');
    else res.send(err);
  });
  client.end;
})