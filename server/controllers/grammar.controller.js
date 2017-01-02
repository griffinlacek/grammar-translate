var lt = require('node-languagetool');

/**
* Checks user text for grammar errors
* @param req
* @param res
* @returns void
*/
exports.check = function(req, res) {
  lt.check(
    req.body.text,
    req.body.fromLang
  ).then(grammar => res.json(grammar));
}
