import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import translate from './server/routes/translate.routes';
import grammar from './server/routes/grammar.routes';
import routes from './web/router';
import NotFoundPage from './web/components/NotFoundPage';

const app = express();

const port = (process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// API Routes
app.use('/api', translate);
app.use('/api', grammar);

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// static assets
app.use(express.static(path.join(__dirname, './views')));

// universal routing and rendering
app.get('/*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if(err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if(redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if(renderProps) {
        markup = renderToString(<RouterContext {...renderProps}/>);
      }
      else {
        //render to 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
