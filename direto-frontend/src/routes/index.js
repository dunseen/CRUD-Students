import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';


import Route from './routes';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} ></Route>
        <Route path="/signup" component={SignUp} ></Route>
        <Route path="/home" component={Home} isPrivate ></Route>
      </Switch>
    </BrowserRouter>
  )


}
