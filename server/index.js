const express = require('express');
const path = require('path')
const bodyParser = require('body-parser'); 
let pg = require('pg'); 
let db = require('../database/index.js');
let helpers = require('./utils/helpers.js')

const app = express();

let PORT = process.env.PORT || 3000;

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

// Serves static files to client
app.use(express.static(path.join(__dirname, '../dist')));

// cors
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/script', (req, res) => {
  console.log('api/script req', req.body);

  helpers.toneAnalyzer.tone(
  {
    tone_input: req.body.script,
    content_type: 'text/plain'
  },
  function(err, tone) {
    if (err) {
      console.log(err);
    } else {
      req.body.tone = JSON.stringify(tone);
      db.saveScript(req.body, (err, res) => {
        if (err) { console.log('error querying database from pool.connect', err); }
        else {
          console.log('Saved script text to PostgreSQL', JSON.stringify(res));
        }
      });

      res.send(JSON.stringify(tone, null, 2));
    }
  });

});

// wild card routing all pages to the React Router
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});