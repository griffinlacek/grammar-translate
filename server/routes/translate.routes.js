const express = require('express');
const translateController = require('../controllers/translate.controller.js')
const router = express.Router();

router.post('/translate', translateController.translate);

router.get('/translate/languages', translateController.languages);

module.exports = router;
