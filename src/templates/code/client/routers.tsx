import React from 'react';
import { IndexRedirect, Route } from 'react-router';
import { NotFoundPage } from '@youzan/error-page';
import Loadable from 'js/components/loadable';
import NoAuth from 'js/components/noauth';
import Layout from './layout';

const IndexPage = Loadable(() => import('./views/index'));

export default (
  <Route path="/" component={Layout}>
    <IndexRedirect to="second" />
    <Route path="index" component={IndexPage} />
    <Route path="no-auth" component={NoAuth} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
