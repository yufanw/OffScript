let ToneAnalyzer = require("watson-developer-cloud/tone-analyzer/v3")
let toneAPI = require ("../../config/toneAPI.js")
let NatLang = require('watson-developer-cloud/natural-language-understanding/v1.js');
let natlangAPI = require('../../config/natlangAPI.js')
let azureAPI = require('../../config/azureAPI.js')
let axios = require('axios');

function faceAnalyzer(image) {
  axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key' : azureAPI.credentials.key2
    },
    url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion",
    data: {
      "url": image
    }
  })
  .then(function(response) {
    console.log(response.data[0].faceAttributes)
  })
  .catch(function(response) {
    console.log(response.response)
  })
}

let toneAnalyzer = new ToneAnalyzer({
  username: toneAPI.credentials.username,
  password: toneAPI.credentials.password,
  version: '2016-05-19',
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api/'
});

<<<<<<< HEAD
 let natLang = new NatLang({
=======
let natLang = new NatLang({
>>>>>>> Added new helpers
  username: natlangAPI.credentials.username,
  password: natlangAPI.credentials.password,
  version: '2016-05-19',
  url:  "https://gateway.watsonplatform.net/natural-language-understanding/api"
});

<<<<<<< HEAD
=======
module.exports.faceAnalyzer = faceAnalyzer;
>>>>>>> Added new helpers
module.exports.toneAnalyzer = toneAnalyzer;
module.exports.natLang = natLang;