var lt = require('node-languagetool');

/**
* Checks user text for grammar errors
* @param req
* @param res
* @returns void
*/
exports.check = function(req, res) {
  if(!req.body.fromLang) {
    res.status(404).send({ error: 'No defined language to check.' });
  }
  else {
    lt.check(req.body.text, req.body.fromLang)
    .then(grammar => res.json(grammar))
    .catch(error => {
      res.status(500).send(error);
    });
  }
}

/**
* Gets LanguageTool supported languages
* @param req
* @param res
* @returns void
*/
exports.languages = function(req, res) {
  lt.languages()
  .then(langs => res.json(langs))
  .catch(error => {
    res.status(500).send(error);
  });
}
