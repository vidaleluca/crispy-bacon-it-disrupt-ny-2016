var express = require('express');
var watson = require('watson-developer-cloud');
var bodyParser = require('body-parser');
var Async = require('async');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/watson/:round/:message', function (req, res) {
  var tone_analyzer = watson.tone_analyzer({
      password: "wAEdcd3MijUf",
      username: "73462d15-d9df-4c85-94d7-cc65bdc58a84",
      version: 'v3-beta',
      version_date: '2016-02-11'
  });
  var message = req.param('message');
  var round = req.param('round');

  tone_analyzer.tone({text: message},
    function(err, tone) {
    if (err){
      res.send("I can't hear you");
    }else{
      Async.sortBy(tone.document_tone.tone_categories[0].tones, function(item, callback){
        callback(null, item.score*-1);
      }, function(err, results){
        console.log(JSON.stringify(results[0].tone_id));
        console.log("round ===> "+JSON.stringify(round));
        var speech ="";
        if(round==0){
          res.send({text:"I feel a bit of " + results[0].tone_id +" in your words. Do you want tell me more?",type:"anger"});
        }else if(results[0].tone_id =="anger"&&round>0){
          speech ="<speak>"+"Ok I got it. Let's try with this one "+ '<audio src="https://dl.dropboxusercontent.com/u/14492113/pumpup_converted.mp3" />'+'</speak>';
          res.send({text:speech,type:"anger"});
        }else if(results[0].tone_id =="disgust"&&round>0){
          if(round==1){
            speech = "Can I tell you a joke? Ca nesci na banana cana duviss";
            res.send({text:speech,type:"disgust"});
          }else if(round>1){
            speech = "Prrrrrrrrrrrrrrrrrrrrrrrrrrr";
            res.send({text:speech,type:"disgust"});
          }
        }else if(results[0].tone_id =="fear"&&round>0){
          speech = "Let's relax together... Ommmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm";
          res.send({text:speech,type:"fear"});
        }else if(results[0].tone_id =="joy"&&round>0){
          speech = "Great! Go out and celebrate with some friends";
          res.send({text:speech,type:"joy"});
        }else if(results[0].tone_id =="sadness"&&round>0){
          speech = "Come on, why don't you watch the last episode of Mr. Robot?";
          res.send({text:speech,type:"sadness"});
        }
      });
    }
  });
});
app.listen(19000, function () {
  console.log('Example app listening on port 19000!');
});
