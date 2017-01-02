var MsTranslator = require('mstranslator');

var client = new MsTranslator({
  api_key: "df0fd7b243f74c0c99060efa3b942f8a"
}, true);

/**
* Add a new section
* @param req
* @param res
* @returns void
*/
exports.translate = function(req, res) {
  var params = {
    text: req.body.text,
    from: req.body.from,
    to: req.body.to
  };
  
  client.translate(params, function(err, data) {
    if(err) {
      res.status(500).send(err);
    }
    res.json(data);
  });
}
