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

/**
* Gets LanguageTool supported languages
* @param req
* @param res
* @returns void
*/
exports.languages = function(req, res) {
  lt.languages().then(langs => res.json(langs));
}
