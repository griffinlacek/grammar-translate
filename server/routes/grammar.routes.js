const express = require('express');
const grammarController = require('../controllers/grammar.controller.js')
const router = express.Router();

router.post('/grammar', grammarController.check);

module.exports = router;
