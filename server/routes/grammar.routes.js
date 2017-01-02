const express = require('express');
const grammarController = require('../controllers/grammar.controller.js')
const router = express.Router();

router.post('/grammar', grammarController.check);

router.get('/grammar/languages', grammarController.languages);


module.exports = router;
