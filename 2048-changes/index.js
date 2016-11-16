var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var http = require('http');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nodemongoexample';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
  db = databaseConnection;
});


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");
  response.set('Content-Type', 'text/html');
  var homePage = '';
  db.collection('scores', function(er, collection){
    collection.find().toArray(function(err, cursor){
      if(!err){
        homePage+= "<!DOCTYPE HTML><html><head><title>High Scores</title></head><body><b>High Scores</b>";
          cursor.sort((a,b) => {return parseInt(b.score) - parseInt(a.score)})
          for (var count = 0; count < cursor.length; count++){
            if(typeof(cursor[count].created_at) != "undefined"){
              homePage += "<p><b>User</b>" + cursor[count].username +"<b>Score</b>" + cursor[count].score + "<b>Timestamp:</b>" 
            }
          }
          homePage += "</body></html>"
          response.send(homePage);
      }
      else{
        response.send('<DOCTYPE HTML><html><head><title></head><body><h1>Uh Oh! An Error Occurred. Try Again!</h1></body></html>');
      }
    });
  });
});

app.post('/submit.json', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");

var username = request.body.username.replace(/[^\w\s]/gi,'');
var score = request.body.score.replace(/[^\w\s]/gi,'');
var grid = request.body.grid;

toInsert = {
  "username": username,
  "score": score,
  "grid": grid,
  "created_at": Date(),
  };

  db.collection('scores', function(error, coll) {
    var id = coll.insert(toInsert, function(error, saved) {
      if (error) {
        response.send(500);
      }
      else {
        response.send(200);
      }
      });
  });

 //  var options = {
 //    host: 'developer.mbta.com',
 //    path: '/lib/rthr/red.json',
 //  };

 // var req = http.get(options, function(res){
 //  body = "";
 //   res.on('data', function(chunk){
 //     body += chunk;
 //   }).on('end', function() {
 //     bodyParser.json(body);
 //     response.write(body, function() {response.end();})
 //   })
 // });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});





