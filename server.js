const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = (process.env.PORT || 3000);

const translate = require('./server/routes/translate.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', translate);


app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
