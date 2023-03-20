const bodyParser = require('bodyParser');
const client = require('./connection.js');
const express = require('express');
const app = express();

app.use(bodyParser.json());

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

app.put('/users/:id', (req, res)=>{
  const user = req.body;
  const updateQuery = `update users set first_name = ${user.first_name}, last_name = ${user.last_name}, location = ${user.location} where id = ${user.id}`

  client.query(updateQuery, (err, result)=>{
    if(!err) res.send('Updated successfully');
    else res.send(err);
  });
  client.end;
})

app.delete('/users/:id', (req, res)=>{
  const insertQuery = `delete from users where id = ${req.params.id}`;
  client.query(insertQuery, (err, result)=>{
    if(!err) res.send('Deleted successfully');
    else res.send(err);
  });
  client.end;
})