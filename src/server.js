// install and import express
const express = require('express');
var fs = require('fs');

const data = './assets/user.json';

let app = express();
app.use(express.json());

// Code here

const port = 8000;

app.get('/', async (req, res) => {
  try {
    fs.readFile(__dirname + '/assets/users.html', 'utf8', function (error, text) {
      if (error) {
        return res.send(error);
      }
      return res.send(text);
    });
  } catch (error) {
    return res.send(error);
  }
});

app.get('/users', async (req, res) => {
  try {
    fs.readFile(__dirname + '/assets/user.json', function (error, text) {
      if (error) {
        return res.send(error);
      }
      return res.send(text);
    });
  } catch (error) {
    return res.send(error);
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    for (let i in data) {
      if (data[i].id == req.params.id) {
        res.send(data[i]);
      }
    }
  } catch (error) {
    return res.send(error);
  }
});

app.post('/users', async (req, res) => {
  try {
    let id = data[data.length - 1].id;
    req.body.id = id + 1;
    data.push(req.body);
    fs.writeFile(
      __dirname + '/assets/user.json',
      JSON.stringify(data),
      function writeJSON(error) {
        if (error) {
          return console.log(error);
        } else {
          res.send(data[data.length - 1]);
        }
      }
    );
  } catch (error) {
    res.send(error);
  }
});
//runnig server
app.listen(port, async () => {
  try {
    console.log(`Serving on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
// Note: Do not remove this export statement
module.exports = app;
