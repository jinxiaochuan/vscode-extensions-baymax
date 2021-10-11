import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { useBasename } from 'history';
import checkGlobalErrors from 'js/lib/checkGlobalErrors';
import routers from './routers';

const BASENAME = '/vscode-snippets';

ReactDOM.render(
  <Router history={useBasename(() => browserHistory)({ basename: BASENAME })} routes={routers} />,
  document.getElementById('app'),
  () => {
    checkGlobalErrors();
  },
);
