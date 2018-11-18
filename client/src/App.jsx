import React from 'react';
import { Route } from 'react-router-dom';
import Main from './views/Main';
import SideNav from './components/SideNav';

const App = () => (
  <div id="react-container">
    <Route component={SideNav} />
    <Main id="react-body" />
  </div>
);

export default App;
