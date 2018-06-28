import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import CoursesElement from './components/CoursesElement';
import ResponsiveDrawer from './components/ResponsiveDrawer';

const Routes = () => (
  <Switch>
    <ResponsiveDrawer>
      <Route exact path="/" component={CoursesElement} />
    </ResponsiveDrawer>
  </Switch>
);

export default Routes;
