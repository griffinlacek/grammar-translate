var MsTranslator = require('mstranslator');

var client = new MsTranslator({
  api_key: "df0fd7b243f74c0c99060efa3b942f8a"
}, true);

/**
* Translate user text to desired language
* @param req
* @param res
* @returns void
*/
exports.translate = function(req, res) {
  if(!req.body.fromLang || !req.body.toLang) {
    res.status(404).send('Missing languages');
  }
  else {
    var params = {
      text: req.body.text,
      from: req.body.fromLang,
      to: req.body.toLang
    };

    client.translate(params, function(err, data) {
      if(err) {
        res.status(500).send(err);
      }
      res.json(data);
    });
  }
}

/**
* Gets Microsoft Translate supported languages
* @param req
* @param res
* @returns void
*/
exports.languages = function(req, res) {
  client.getLanguagesForTranslate(function(err, data) {
    if(err) {
      res.status(500).send(err);
    }
    res.json(data);
  });
}
