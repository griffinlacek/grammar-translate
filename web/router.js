// web/routes.js
import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import NotFoundPage from './components/NotFoundPage';


const routes = (
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={Layout}>
      <IndexRoute component={IndexPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Router>
);

export default routes;
