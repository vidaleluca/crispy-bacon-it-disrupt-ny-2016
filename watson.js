var express = require('express');
var watson = require('watson-developer-cloud');
var bodyParser = require('body-parser');
var Async = require('async');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/watson/:message', function (req, res) {
  console.log("watson called");
  var tone_analyzer = watson.tone_analyzer({
      password: "wAEdcd3MijUf",
      username: "73462d15-d9df-4c85-94d7-cc65bdc58a84",
      version: 'v3-beta',
      version_date: '2016-02-11'
  });
  var message = req.param('message');
  tone_analyzer.tone({text: message},
  function(err, tone) {
    if (err){
      res.send("I can't hear you");
    }else{
      console.log(JSON.stringify(tone, null, 2));
      Async.sortBy(tone.document_tone.tone_categories[0].tones, function(item, callback){
        callback(null, item.score*-1);
      }, function(err, results){
        //console.log(JSON.stringify(results[0]));
        res.send("I feel a bit of " + results[0].tone_id +" in your words. Do you want tell me more?");
      });
    }
  });
});
app.listen(19000, function () {
  console.log('Example app listening on port 19000!');
});
